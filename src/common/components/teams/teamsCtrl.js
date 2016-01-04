'use strict';

angular.module('awesome-app.common.components.teams').

controller('TeamsCtrl', function($scope, TeamMemberModel, TeamMemberCollection) {
    $scope.newTeamName = '';
    
    $scope.isTeamNameValid = function(teamName) {
        var trimmed = teamName.trim().replace(/\s/g, ''); 
        return /^[\w\d]+$/i.test(trimmed);
    };
    
    $scope.addNewTeam = function(teamName) {
        var newTeam = new TeamMemberCollection(teamName.trim());
        
        $scope.teams.push(newTeam);
        $scope.newTeamName = '';
    };
});