define(['app'], function (app) {
    'use strict';
    return app.config(function ($locationProvider, $stateProvider, $urlRouterProvider, constants) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise(constants.DASHBOARD_PATHNAME + '/search');
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
            state(constants.ROOT_STATE, {
                url: constants.DASHBOARD_PATHNAME,
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
                        templateUrl: '/partials/dashboard/ticket-panel.html',
                        controller: 'PanelCtrl'
                    },
                    'main': {
                        templateUrl: '/partials/dashboard/inner-layout.html'
                    }
                }
            }).
            state(constants.ROOT_STATE + '.search', {
                url: '/search?query&typeOfContent',
                views: {
                    'inner-main@dashboard.layout.default': {
                        templateUrl: '/partials/dashboard/search.html'
                    }
                }
            }).
            state(constants.ROOT_STATE + '.workon', {
                abstract: true,
                url: '',
                views: {
                    'main@dashboard.layout': {
                        templateUrl: '/partials/dashboard/workon-layout.html'
                    }
                }
            }).
            state(constants.ROOT_STATE + '.workon.text', {
                url: '/workon/text/:id',
                templateUrl: '/partials/dashboard/workon-text.html'
            }).
            state(constants.ROOT_STATE + '.add', {
                url: '/add/:typeOfContent',
                views: {
                    'inner-main@dashboard.layout.default': {
                        templateUrl: '/partials/dashboard/add-content.html'
                    }
                }
            });
    })
});