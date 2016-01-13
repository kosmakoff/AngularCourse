'use strict';

angular.module('awesome-app.common.services.employees', [])

.factory('Employees', function ($resource) {
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
})

.factory('EmployeesSearch', function ($q, Employees) {
    return {
        searchMembers: function (query, skip, take) {
            return Employees.query({ q: query, skip: skip, take: take }).$promise;
        },

        searchMembersSimple: function (query) {
            var deferred = $q.defer();

            var promise = this.searchMembers(query);

            promise.then(function (data) {
                deferred.resolve(data.employees);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    };
});