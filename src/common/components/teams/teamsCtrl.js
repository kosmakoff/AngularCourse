'use strict';

angular.module('awesome-app.common.components.teams').

controller('TeamsCtrl', function($scope, $rootScope, $window, TeamMemberModel, TeamMemberCollection) {
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
    
    $scope.removeTeam = function (team) {
        if (!$window.confirm('Did you really mean to delete team ' + team.teamName + '?')) {
            return;
        }
        
        var index = $scope.teams.indexOf(team);
        $scope.teams.splice(index, 1);
        
        var firstTeam = $scope.teams[0];
        $scope.setTeamOpen(firstTeam);
    };
    
    $scope.setTeamOpen = function(team) {
        if ($scope.openTeam !== team) {
            $scope.openTeam = team;
            // emit event
            $scope.$emit('teamSelected', team);
        }
    };
    
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        switch (toState.name) {
            case "employees.item":
                var teamName = toParams.teamName;
                var teamsToOpen = $scope.teams.filter(function (team) {
                    return team.teamNameNormalized === teamName;
                });

                if (teamsToOpen.length < 1) {
                    return;
                }

                $scope.openTeam = teamsToOpen[0];
                break;

            case "employees":
                $scope.openTeam = null;
                break;
        }
    });
});