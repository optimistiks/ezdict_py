define(['app'], function (app) {
    'use strict';
    return app.
        config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
            //$locationProvider.html5Mode(true);
            //$urlRouterProvider.otherwise("/what");
        });
});