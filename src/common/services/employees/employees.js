'use strict';

angular.module('awesome-app.common.services.employees', []).

factory('Employees', function($resource) {
    return $resource('https://raw.githubusercontent.com/javascript-awesome/angular-911/master/datasources/staff.json'); 
});