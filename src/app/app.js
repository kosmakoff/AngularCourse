'use strict';

angular.module('awesome-app', [
    'ui.router',
    'ui.router.title',
    'ngSanitize',
    'ngResource',
    'templates-app',
    'awesome-app.common',
    
    // pages
    'awesome-app.home',
    'awesome-app.employees',
    'awesome-app.about'
]).
config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
}]);
