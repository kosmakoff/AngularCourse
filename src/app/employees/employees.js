'use strict';

angular.module('awesome-app.employees', ['ui.router', 'ui.bootstrap', 'ngTagsInput']).

config(function config($stateProvider) {

    $stateProvider
        .state('employees', {
            url: '^/employees',
            controller: 'EmployeesCtrl',
            templateUrl: 'employees/employees.tpl.html'
        })
        .state('employees.item', {
            url: '/{teamName}',
            controller: 'EmployeesTeamCtrl',
            templateUrl: 'employees/employeesTeam.tpl.html'
        });
});