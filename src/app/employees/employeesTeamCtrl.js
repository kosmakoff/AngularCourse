'use strict';

angular.module('awesome-app.employees').

controller('EmployeesTeamCtrl', function ($scope, $rootScope, $state, Employees, TeamMemberModel) {
    var teamNameNormalized = $state.params.teamNameNormalized;
    var teams = $scope.$parent.teams.filter(function(team) {
        return team.teamNameNormalized === teamNameNormalized;
    });
    
    if (!teams.length) {
        console.log('Could not find team \'' + teamNameNormalized + '\'');
        $state.go('employees');
        return;
    }
    
    var team = teams[0];
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