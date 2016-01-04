'use strict';

angular.module('awesome-app.employees').

controller('EmployeesCtrl', function ($scope, Employees) {
    
    $scope.employees = Employees.query();

});
