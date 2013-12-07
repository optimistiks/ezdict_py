define(['./module'], function (factory) {
    'use strict';
    factory.

        factory('Interceptor', ['$injector', '$q', '$rootScope', 'toaster', function ($injector, $q, $rootScope, toaster) {
            var ngProgress = null;
            var getNgProgress = function () {
                var ngProgress = ngProgress || $injector.get('ngProgress');
                console.log(ngProgress);
                return ngProgress
            };

            $rootScope.pendingRequests = 0;

            return {
                'request': function (config) {
                    console.log('interceptor.request()');

                    if ($rootScope.pendingRequests === 0) {
                        getNgProgress().start();
                    }

                    $rootScope.pendingRequests++;

                    return config || $q.when(config);
                },

                'requestError': function (rejection) {
                    console.log('interceptor.requestError()');

                    $rootScope.pendingRequests--;

                    if ($rootScope.pendingRequests === 0) {
                        getNgProgress().reset();
                    }

                    return $q.reject(rejection);
                },

                'response': function (response) {
                    console.log('interceptor.response()');

                    $rootScope.pendingRequests--;

                    if ($rootScope.pendingRequests === 0) {
                        getNgProgress().complete();
                    }

                    return response || $q.when(response);
                },

                'responseError': function (rejection) {
                    console.log('interceptor.responseError()');

                    $rootScope.pendingRequests--;

                    if ($rootScope.pendingRequests === 0) {
                        getNgProgress().reset();
                    }

                    if (rejection.data.detail) {
                        toaster.pop('error', 'Ошибка ' + rejection.status, rejection.data.detail);
                    }

                    return $q.reject(rejection);
                }
            };
        }]);
});