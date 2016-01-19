'use strict';

angular.module('awesome-app.common.filters', [])

.filter('nbsp', function () {
    return function (input) {
        return input.replace(/\s/g, '\u00A0');
    };
});