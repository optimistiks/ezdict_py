'use strict';
// Declare app level module which depends on filters, and services
angular.module('ezdictIndex', [
        'ngRoute', 'ezdictIndex.filters', 'ezdictIndex.services', 'ezdictIndex.directives', 'ezdictIndex.controllers'
    ]).

    config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
        $routeProvider.otherwise({redirectTo: '/view1'});
        $httpProvider.interceptors.push('ResponseInterceptor');
    }]).

    constant('API_URL', '/api').constant('API_FORMAT', '.json');
