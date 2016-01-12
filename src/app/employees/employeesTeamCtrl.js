'use strict';

angular.module('awesome-app.employees').

controller('EmployeesTeamCtrl', function ($scope, $rootScope, $state, $q, Employees, Teams, TeamMemberModel) {
    $scope.search = {
        currentPage: 1,
        pageSize: 10,
        totalCount: null,
        filter: '',
        filteredMembers: []
    };
    
    var teamNameNormalized = $state.params.teamNameNormalized;
    var team = Teams.getTeamByNormalizedName(teamNameNormalized);
    
    if (!team) {
        // team not found, redirect to root
        $state.go('employees');
        return;
    }
    
    $scope.team = team;
    
    $scope.members = team.members.slice(0);
    
    $scope.searchMembers = function (query, skip, take) {
        return Employees.query({q: query, skip: skip, take: take}).$promise;
    };
    
    $scope.searchMembersSimple = function (query) {
        var deferred = $q.defer();
        
        var promise = $scope.searchMembers(query);
        
        promise.then(function (data) {
            deferred.resolve(data.employees);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    };
    
    $scope.updateTeam = function() {
        team.members = [];
        for (var i = 0; i < $scope.members.length; i++) {
            var member = $scope.members[i];
            var memberModel = new TeamMemberModel(member);
            team.addMember(memberModel);
        }
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

        $scope.searchMembers($scope.search.filter, skip, take).then(function (data) {
            $scope.search.filteredMembers = data.employees;
            $scope.search.totalCount = data.totalCount;
        });
    };
});