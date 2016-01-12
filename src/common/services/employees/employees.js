'use strict';

angular.module('awesome-app.common.services.employees', []).

    factory('Employees', function ($resource) {
        return $resource('/api/employees/:emp_id', {}, {
            query: {
                method: 'GET',
                isArray: false,
                transformResponse: function (data, headersGetter) {
                    var response = {};
                    
                    var headers = headersGetter();
                    
                    response.employees = JSON.parse(data);
                    response.totalCount = headers['x-total-count'];
                    response.pageSize = headers['x-page-size'];
                    
                    return response;
                }
            }
        });
    });