'use strict';

angular.module('awesome-app.employees').

controller('EmployeesCtrl', function ($scope, $rootScope, $state, Employees, Teams) {
    $scope.teams = Teams.getAllTeams();
    
    $scope.$on('teamSelected', function (event, team) {
        if (team) {
            $state.go("employees.item", { teamNameNormalized: team.teamNameNormalized });
        } else {
            $state.go("employees");
        }
    });
});
