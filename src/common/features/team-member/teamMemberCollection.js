'use strict';

angular.module('awesome-app.common.features.team-member').

factory('TeamMemberCollection', function (AbstractEntity, TeamMemberModel) {

    var TeamMemberCollection = AbstractEntity.extend({
        /**
         * Initialize collection
         * @param {String} collectionName
         */
        initialize: function (teamName) {
            this.teamName = teamName;
            this.members = [];
        },
        /**
         * Add member
         * @param {TeamMemberModel} member
         * @returns {TeamMemberCollection}
         */
        addMember: function (member) {
            if (member instanceof TeamMemberModel) {
                this.members.push(member);
            }
            return this;
        }
    });

    return TeamMemberCollection;
});