'use strict';

angular.module('awesome-app.common.components.teamTabs')

.directive('teamTabOne', function () {
    return {
        restrict: 'E',
        scope: {
            team: '='
        },
        controller: 'TeamTabOneCtrl',
        templateUrl: '../common/components/teamTabs/teamTabsTabOne/teamTabOne.tpl.html',
    };
});