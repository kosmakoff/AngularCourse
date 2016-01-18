'use strict';

angular.module('awesome-app.common.services.teams', []).

factory('Teams', function ($rootScope) {
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
            return parseInt(m._id) === parseInt(employee._id);
        });
        
        return !!members.length;
    };
    
    var notifyTeamMembersChanged = function (team, add, remove) {
        $rootScope.$emit('teamMembersChanged', {
            team: team,
            diff: {
                add: add,
                remove: remove
            }
        });
    };
    
    Teams.addMemberToTeam = function (team, employee) {
        // check if member already exists
        if (!this.teamHasMember(team, employee)) {
            employee._id = parseInt(employee._id); // fix type
            team.members.push(employee);
            notifyTeamMembersChanged(team, [employee], []);
            return true;
        } else {
            return false;
        }
    };
    
    Teams.removeMemberFromTeam = function (team, employee) {
        // find index
        for (var i = 0; i < team.members.length; i++) {
            if (parseInt(team.members[i]._id) === parseInt(employee._id)) {
                team.members.splice(i, 1);
                notifyTeamMembersChanged(team, [employee]);
                break;
            }
        }
    };
    
    return Teams;
});