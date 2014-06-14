define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('DashboardInterceptor', ['$q', '$window', 'toaster', 'TextMessages',
            function ($q, $window, toaster, messages) {
                return {
                    'responseError': function (rejection) {
                        if (rejection.status === 403) {
                            toaster.save('error', 'Требуется авторизация', messages.AUTH_REQUEST_AFTER_REDIRECT);
                            $window.location.href = '/';
                        } else {
                            toaster.pop('error', 'Ошибка ' + rejection.status, rejection.message);
                        }

                        return $q.reject(rejection);
                    }
                };
            }]);
});