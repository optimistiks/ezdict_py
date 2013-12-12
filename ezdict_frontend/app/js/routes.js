define(['app'], function (app) {
    'use strict';
    console.log('loading index routes');
    return app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        //$urlRouterProvider.otherwise("/");
        $stateProvider.state('index', {
                url: '/',
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