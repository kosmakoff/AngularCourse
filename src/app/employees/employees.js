'use strict';

angular.module('awesome-app.employees', ['ui.router']).

config(function config($stateProvider) {

    $stateProvider
        .state('employees', {
            url: '^/employees',
            controller: 'EmployeesCtrl',
            templateUrl: 'employees/employees.tpl.html'
        });
});