define(['app'], function (app) {
    'use strict';
    console.log('loading dashboard routes');
    return app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider.
            state('dashboard', {
                url: '/dashboard',
                views: {
                    'header': {
                        templateUrl: 'partials/dashboard/header.html'
                    },
                    'widgets': {
                        templateUrl: 'partials/dashboard/widgets.html'
                    }
                }
            });
    })
});