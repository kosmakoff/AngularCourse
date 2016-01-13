'use strict';

angular.module('awesome-app.common.components.teamTabs')

.directive('teamTabTwo', function () {
    return {
        restrict: 'E',
        scope: {
            team: '='
        },
        controller: 'TeamTabTwoCtrl',
        templateUrl: '../common/components/teamTabs/teamTabsTabTwo/teamTabTwo.tpl.html',
    };
});