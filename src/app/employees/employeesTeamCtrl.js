'use strict';

angular.module('awesome-app.employees').

controller('EmployeesTeamCtrl', function ($scope, $rootScope, $state, $q, Employees, Teams, TeamMemberModel) {
    var teamNameNormalized = $state.params.teamNameNormalized;
    var team = Teams.getTeamByNormalizedName(teamNameNormalized);
    
    if (!team) {
        // team not found, redirect to root
        $state.go('employees');
        return;
    }
    
    $scope.team = team;
});