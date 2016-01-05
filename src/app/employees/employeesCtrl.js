'use strict';

angular.module('awesome-app.employees').

controller('EmployeesCtrl', function ($scope, $state, Employees) {
    $scope.teams = [];
    
    $scope.$on('teamSelected', function(event, team) {
        console.log('If you see it then it is working', team);
        $state.go("employees.item", {teamName: team.teamNameNormalized});
    });
});
