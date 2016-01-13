'use strict';

angular.module('awesome-app.common.components.teams')

.directive('awesomeTeams', function () {

    return {
        restrict: 'E',
        scope: {
            teams: "="
        },
        controller: 'TeamsCtrl',
        templateUrl: '../common/components/teams/teams.tpl.html',
        link: function linkFn (scope, element, attrs) {
        }
    };

});
