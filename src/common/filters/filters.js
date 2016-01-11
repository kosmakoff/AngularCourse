'use strict';

angular.module('awesome-app.common.filters', [])

.filter('nbsp', function () {
    return function (input) {
        return input.replace(/\s/g, '\u00A0');
    };
})

.filter('slice', function () {
    return function (arr, start, end) {
        return arr.slice(start, end);
    };
})

;