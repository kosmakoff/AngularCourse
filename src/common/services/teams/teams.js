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
    
    Teams.teamHasMember = function (team, employee) {
        var members = team.members.filter(function (m) {
            return m._id === employee._id;
        });
        
        return !!members.length;
    };
    
    Teams.addMemberToTeam = function (team, employee) {
        // check if member already exists
        if (!this.teamHasMember(team, employee)) {
            team.members.push(employee);
            return true;
        } else {
            return false;
        }
    };
    
    Teams.removeMemberFromTeam = function (team, employee) {
        // find index
        for (var i = 0; i < team.members.length; i++) {
            if (team.members[i]._id === employee._id) {
                team.members.splice(i, 1);
                break;
            }
        }
    };
    
    return Teams;
});