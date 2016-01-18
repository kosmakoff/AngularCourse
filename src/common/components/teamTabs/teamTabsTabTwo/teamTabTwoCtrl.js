'use strict';

angular.module('awesome-app.common.components.teamTabs').

controller('TeamTabTwoCtrl', function ($scope, EmployeesSearch, Teams) {
    $scope.selectedEmployeeId = null;
    
    $scope.search = {
        currentPage: 1,
        pageSize: 10,
        totalCount: null,
        filter: '',
        filteredMembers: [],
        
        isLoading: false
    };
    
    $scope.doSearch = function (resetPage) {
        // reset the selected employee ID
        
        $scope.search.isLoading = true;
        
        $scope.selectedEmployeeId = null;
        
        // initiate the new search
        if ($scope.search.filter.trim().length < 3) {
            $scope.search.filteredMembers = [];
            $scope.search.isLoading = false;
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
        }).then(function () {
            $scope.search.isLoading = false;
        });
    };
    
    $scope.selectEmployee = function (employee) {
        $scope.selectedEmployeeId = $scope.selectedEmployeeId === employee._id
            ? null
            : employee._id;
    };
    
    $scope.addEmployee = function (employee) {
        Teams.addMemberToTeam($scope.team, employee);
    }
    
    $scope.removeEmployee = function (employee) {
        return Teams.removeMemberFromTeam($scope.team, employee);
    }
    
    $scope.teamHasMember = function (employee) {
        return Teams.teamHasMember($scope.team, employee);
    }
});
