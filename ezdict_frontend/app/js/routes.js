define(['app'], function (app) {
    'use strict';
    return app.config(function ($stateProvider, $urlRouterProvider) {
        //$urlRouterProvider.otherwise("/");
        $stateProvider.state('index', {
                url: '/',
                views: {
                    'headline': {
                        templateUrl: 'partials/index/headline.html'
                    },
                    'header': {
                        templateUrl: 'partials/index/header.html'
                    },
                    'main': {
                        templateUrl: 'partials/index/main.html'
                    }
                }
            }).state('about', {
                url: '/about',
                templateUrl: 'partials/index/about.html'
            }).state('about.list', {
                url: "/list",
                templateUrl: "partials/index/about.me.html",
                controller: function ($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                }
            })
    })
});