define(['app'], function (app) {
    'use strict';
    return app.
        config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('Interceptor');
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        }]);
});