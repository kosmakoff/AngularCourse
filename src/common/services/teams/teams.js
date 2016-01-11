'use strict';

angular.module('awesome-app.common.services.teams', []).

factory('Teams', function () {
    var Teams = {};

    var teams = [];
    
    Teams.getAllTeams = function () {
        return teams;
    };
    
    Teams.getTeamByNormalizedName = function (normalizedName) {
        var teamsFiltered = teams.filter(function (team) {
            return team.teamNameNormalized === normalizedName;
        });
        
        return teamsFiltered[0];
    };
    
    return Teams;
});