define(['app'], function (app) {
    'use strict';
    return app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider.
            state('indexLayout', {
                abstract: true,
                url: '',
                templateUrl: '/partials/index/index.html'
            }).
            state('indexLayout.landpage', {
                url: '/',
                views: {
                    'headline': {
                        templateUrl: '/partials/index/headline.html'
                    },
                    'header': {
                        templateUrl: '/partials/index/header.html'
                    }
                }
            }).
            state('infoLayout', {
                abstract: true,
                url: '',
                templateUrl: '/partials/index/info-layout.html'
            }).
            state('infoLayout.layout', {
                abstract: true,
                url: '',
                views: {
                    'headline': {
                        templateUrl: '/partials/index/headline.html'
                    },
                    'header': {
                        templateUrl: '/partials/index/header.html'
                    }
                }
            }).
            state('infoLayout.layout.about', {
                url: '/about',
                views: {
                    'main@infoLayout': {
                        templateUrl: '/partials/index/about.html'
                    }
                }
            }).
            state('infoLayout.layout.contact', {
                url: '/contact',
                views: {
                    'main@infoLayout': {
                        templateUrl: '/partials/index/contact.html'
                    }
                }
            })
        ;
    })
});