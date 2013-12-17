define(['app'], function (app) {
    'use strict';
    return app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/home');
        $stateProvider.
            state('dashboard', {
                abstract: true,
                url: '',
                template: '<div ui-view></div>'
            }).
            state('dashboard.layout', {
                abstract: true,
                url: '',
                templateUrl: '/partials/dashboard/dashboard-layout.html'
            }).
            state('dashboard.layout.default', {
                abstract: true,
                url: '',
                views: {
                    'header': {
                        templateUrl: '/partials/dashboard/header.html'
                    },
                    'left-column': {
                        templateUrl: '/partials/dashboard/widgets.html'
                    },
                    'right-column': {
                        templateUrl: '/partials/dashboard/history.html'
                    },
                    'footer': {
                        templateUrl: '/partials/dashboard/ticket-panel.html'
                    }
                }
            }).
            state('dashboard.layout.default.search', {
                url: '/home',
                views: {
                    'main@dashboard.layout': {
                        templateUrl: '/partials/dashboard/search.html'
                    }
                }
            });
    })
});