'use strict';

angular.module('awesome-app.about').

controller('AboutCtrl', function ($scope, Employees) {
    
    $scope.employees = Employees.query();

});
