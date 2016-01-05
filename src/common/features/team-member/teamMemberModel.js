'use strict';

angular.module('awesome-app.common.features.team-member').

factory('TeamMemberModel', function (AbstractEntity) {

    var TeamMemberModel = AbstractEntity.extend({
        /**
         * Initialize object
         * @param {String} name
         */
        initialize: function (memberObject) {
            this.id = memberObject.id;
            this.name = memberObject.name;
            this.job = memberObject.job;
            this.grade = memberObject.grade;
        }        
    });

    return TeamMemberModel;
});