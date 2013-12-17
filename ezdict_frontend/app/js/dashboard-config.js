define(['app'], function (app) {
    'use strict';
    return app.
        config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('Interceptor');
            $httpProvider.interceptors.push('DashboardInterceptor');
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        }]).
        run(['$rootScope', '$state' , 'User', function ($rootScope, $state, User) {

            /**
             * current application user
             * @type {User}
             */
            $rootScope.user = new User();

            /**
             * on state change, if there is no user in rootScope, cancel change, then check authentication,
             * if it's ok, continue to target state, otherwise it will be redirected to index (interceptor handles that)
             */
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (!$rootScope.user.id) {
                    event.preventDefault();
                    $rootScope.user.$isAuthenticated(function (user, responseHeaders) {
                        $state.go(toState.name);
                    });
                }
            })
        }]);
});