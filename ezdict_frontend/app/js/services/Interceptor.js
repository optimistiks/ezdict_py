define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('Interceptor', ['$log', '$injector', '$q', '$rootScope', '$window', 'toaster',
            function ($log, $injector, $q, $rootScope, $window, toaster) {
                var ngProgress = null;
                var getNgProgress = function () {
                    var ngProgress = ngProgress || $injector.get('ngProgress');
                    return ngProgress
                };

                $rootScope.pendingRequests = 0;

                return {
                    'request': function (config) {
                        if ($rootScope.pendingRequests === 0) {
                            getNgProgress().reset();
                            getNgProgress().start();
                        }

                        $rootScope.pendingRequests++;

                        return config || $q.when(config);
                    },

                    'requestError': function (rejection) {
                        $rootScope.pendingRequests--;

                        if ($rootScope.pendingRequests === 0) {
                            getNgProgress().reset();
                        }

                        return $q.reject(rejection);
                    },

                    'response': function (response) {
                        $rootScope.pendingRequests--;

                        if ($rootScope.pendingRequests === 0) {
                            getNgProgress().complete();
                        }

                        return response || $q.when(response);
                    },

                    'responseError': function (rejection) {
                        $rootScope.pendingRequests--;

                        if ($rootScope.pendingRequests === 0) {
                            getNgProgress().reset();
                        }

                        return $q.reject(rejection);
                    }
                };
            }]);
});