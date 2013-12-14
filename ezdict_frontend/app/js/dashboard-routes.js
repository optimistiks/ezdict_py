define(['app'], function (app) {
    'use strict';
    return app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider.
            state('dashboardLayout', {
                abstract: true,
                url: '',
                templateUrl: '/partials/dashboard/dashboard-layout.html'
            }).
            state('dashboardLayout.dashboard', {
                abstract: true,
                url: '',
                views: {
                    'header@dashboardLayout': {
                        templateUrl: '/partials/dashboard/header.html'
                    },
                    'left-column@dashboardLayout': {
                        templateUrl: '/partials/dashboard/widgets.html'
                    },
                    'right-column@dashboardLayout': {
                        templateUrl: '/partials/dashboard/history.html'
                    },
                    'footer@dashboardLayout': {
                        templateUrl: '/partials/dashboard/ticket-panel.html'
                    }
                }
            }).
            state('dashboardLayout.dashboard.search', {
                url: '/dashboard',
                views: {
                    'main@dashboardLayout': {
                        templateUrl: '/partials/dashboard/search.html'
                    }
                }
            });
    })
});