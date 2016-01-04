'use strict';

angular.module('awesome-app.common.services.employees', [ ]).

factory('Employees', function($http) {
    var url = 'https://raw.githubusercontent.com/javascript-awesome/angular-911/master/datasources/staff.json';
    
    var jsonPromise = $http.get(url/*, {cache: true}*/).then(function(response){
        return response.data;
    });
    
    var Employees = {};
    
    Employees.get = function(id) {
        return jsonPromise.then(function(data){
            var result = null;
            
            angular.forEach(data, function(item) {
                if (item.id == id) {
                    result = item;
                }
            });
            
            return result;
        });
    };
    
    Employees.query = function(filter) {
        return jsonPromise.then(function(data){
            var results = [];
            
            angular.forEach(data, function(item) {
                if (filter(item)) {
                    results.push(item);
                }
            });
            
            return results;
        });
    };
    
    return Employees;
});