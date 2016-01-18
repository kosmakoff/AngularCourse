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
    
    $rootScope.$on('teamMembersChanged', function (event, data) {
        console.log('teamMembersChanged', data);
        
        if (data.team !== $scope.team) {
            // not possible, but still...
            return;
        }
        
        // remove
        for (var i = 0; i < data.diff.remove.length; i++) {
            for (var j = 0; j < $scope.members.length; j++) {
                if (data.diff.remove[i]._id === parseInt($scope.members[j]._id)) {
                    $scope.members.splice(j, 1);
                    j = 0;
                    continue; // next i
                }
            }
        }
        
        // add
        for (var i = 0; i < data.diff.add.length; i++) {
            var alreadyExists = false;
            for (var j = 0; j < $scope.members.length; j++) {
                if (data.diff.add[i]._id === parseInt($scope.members[j]._id)) {
                    alreadyExists = true;
                    break;
                }
            }
            if (!alreadyExists) {
                $scope.members.push(data.diff.add[i]);
            }
        }
    });
});
