'use strict';

angular.module('awesome-app.employees').

controller('EmployeesCtrl', function ($scope, $state, Employees) {
    $scope.teams = [];
    
    $scope.$on('teamSelected', function(event, team) {
        $state.go("employees.item", {teamNameNormalized: team.teamNameNormalized});
    });
});
