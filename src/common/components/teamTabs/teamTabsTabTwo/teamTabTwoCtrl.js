'use strict';

angular.module('awesome-app.common.components.teamTabs').

controller('TeamTabTwoCtrl', function ($scope, EmployeesSearch) {
    $scope.search = {
        currentPage: 1,
        pageSize: 10,
        totalCount: null,
        filter: '',
        filteredMembers: []
    };
    
    $scope.doSearch = function (resetPage) {
        // initiate the new search
        if ($scope.search.filter.trim().length < 3) {
            $scope.search.filteredMembers = [];
            return;
        }

        if (resetPage) {
            $scope.search.currentPage = 1;
        }

        var skip = ($scope.search.currentPage - 1) * $scope.search.pageSize;
        var take = $scope.search.pageSize;

        EmployeesSearch.searchMembers($scope.search.filter, skip, take).then(function (data) {
            $scope.search.filteredMembers = data.employees;
            $scope.search.totalCount = data.totalCount;
        });
    };
});
