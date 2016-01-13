'use strict';

angular.module('awesome-app.common.components.teamTabs').

controller('TeamTabOneCtrl', function ($scope, $rootScope, $state, $q, TeamMemberModel, EmployeesSearch) {
    $scope.members = $scope.team.members.slice(0);

    $scope.updateTeam = function() {
        $scope.team.members = [];
        for (var i = 0; i < $scope.members.length; i++) {
            var member = $scope.members[i];
            var memberModel = new TeamMemberModel(member);
            $scope.team.addMember(memberModel);
        }
    };
    
    $scope.searchMembersSimple = function (query) {
        return EmployeesSearch.searchMembersSimple(query);
    };
});
