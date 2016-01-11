'use strict';

angular.module('awesome-app.employees').

controller('EmployeesTeamCtrl', function ($scope, $rootScope, $state, Employees, Teams, TeamMemberModel) {
    
    console.log("EmployeesTeamCtrl init");
    
    var _filter = "";
    
    $scope.search = {
        itemsPerPage: 10,
        filter: function (newValue) {
            if (arguments.length > 0) {
                // setter
                _filter = newValue;
                
                if (_filter.trim().length < 3) {
                    $scope.filteredMembers = [];
                    return;
                }
                
                $scope.searchMembers(_filter).then(function (employees) {
                    $scope.search.filteredMembers = employees;
                    $scope.search.totalItems = employees.length;
                    $scope.search.currentPage = 1;
                });
                
            } else {
                // getter;
                return _filter;
            }
        },
        
        filteredMembers: []
    };
    
    var teamNameNormalized = $state.params.teamNameNormalized;
    var team = Teams.getTeamByNormalizedName(teamNameNormalized);
    
    if (!team) {
        console.log('Could not find team \'' + teamNameNormalized + '\'');
        $state.go('employees');
        return;
    }
    
    $scope.team = team;
    
    $scope.members = team.members.slice(0);
    
    $scope.searchMembers = function(query) {
        return Employees.query(function(employee){
            var regex = new RegExp(query, 'i');
            return regex.test(employee.name) || regex.test(employee.job) || regex.test(employee.grade);
        });
    };
    
    $scope.updateTeam = function() {
        team.members = [];
        for (var i = 0; i < $scope.members.length; i++) {
            var member = $scope.members[i];
            var memberModel = new TeamMemberModel(member);
            team.addMember(memberModel);
        }
    };
});