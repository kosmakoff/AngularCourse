'use strict';

angular.module('awesome-app.employees').

controller('EmployeesCtrl', function ($scope, Employees) {
    $scope.teams = [];
    
    $scope.members = [];
    
    $scope.searchMembers = function(query) {
        return Employees.query(function(employee){
            var regex = new RegExp(query, 'i');
            return regex.test(employee.name) || regex.test(employee.job) || regex.test(employee.grade);
        });
    };
});
