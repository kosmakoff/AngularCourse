'use strict';

angular.module('awesome-app.common.components.teams').

controller('TeamsCtrl', function($scope, $rootScope, TeamMemberModel, TeamMemberCollection) {
    $scope.newTeamName = '';
    $scope.openTeam = null;
    
    $scope.isTeamNameValid = function(teamName) {
        var trimmed = teamName.trim().replace(/\s/g, ''); 
        return /^[\w\d]+$/i.test(trimmed);
    };
    
    $scope.addNewTeam = function(teamName) {
        var newTeam = new TeamMemberCollection(teamName.trim());
        $scope.teams.push(newTeam);
        $scope.newTeamName = '';
        
        $scope.setTeamOpen(newTeam);
    };
    
    $scope.setTeamOpen = function(team) {
        if ($scope.openTeam != team) {
            $scope.openTeam = team;
            // emit event
            $scope.$emit('teamSelected', team);
        }
    };
    
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        // logic
        console.log('State changed from ' , fromState, ' to ', toState, ' with ', toParams);
        
        if (toState.name == "employees.item") {
            var teamName = toParams.teamName;
            var teamsToOpen = $scope.teams.filter(function (team) {
                return team.teamNameNormalized === teamName;
            });
            
            if (teamsToOpen.length < 1) {
                return;
            }
            
            $scope.openTeam = teamsToOpen[0];
        }
    });
});