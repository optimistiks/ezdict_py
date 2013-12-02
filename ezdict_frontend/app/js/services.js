'use strict';
/* Services */

angular.module('ezdictIndex.services', ['ngResource', 'toaster']).

factory('User', ['$resource', 'API_URL', 'API_FORMAT', function ($resource, API_URL, API_FORMAT) {
    return $resource([API_URL, '/users/:userId/:action', API_FORMAT].join(''), {}, {});
}]).

factory('ResponseInterceptor', ['$q', 'toaster', function ($q, toaster) {
    return {
        'responseError': function (rejection) {
            // do something on error
            console.log('Error intercepted', rejection);
            if (rejection.data.detail) {
                toaster.pop('error', 'Error ' + rejection.status, rejection.data.detail);
            }
            return $q.reject(rejection);
        }
    };
}]);

