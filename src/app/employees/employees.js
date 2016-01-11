'use strict';

angular.module('awesome-app.employees', ['ui.router', 'ui.bootstrap', 'ngTagsInput']).

config(function config($stateProvider) {

    $stateProvider
        .state('employees', {
            url: '^/employees',
            controller: 'EmployeesCtrl',
            templateUrl: 'employees/employees.tpl.html',
            resolve: {
                $title: function () {
                    return 'Teams';
                }
            }
        })
        .state('employees.item', {
            url: '/{teamNameNormalized}',
            controller: 'EmployeesTeamCtrl',
            templateUrl: 'employees/employeesTeam.tpl.html',
            resolve: {
                $title: function ($stateParams, Teams) {
                    var teamNameNormalized = $stateParams.teamNameNormalized;
                    var team = Teams.getTeamByNormalizedName(teamNameNormalized);
                    
                    return team ? 'Team ' + team.teamName + ' employees' : 'Team employees';
                }
            }
        });
});