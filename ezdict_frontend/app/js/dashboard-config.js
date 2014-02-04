define(['app'], function (app) {
    'use strict';
    return app.
        config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('Interceptor');
            $httpProvider.interceptors.push('DashboardInterceptor');
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        }]).
        run(['$rootScope', '$state' , 'User', 'constants', '$log',
            function ($rootScope, $state, User, constants, $log) {

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
                    $log.log('$stateChangeStart event start');

                    $log.log('changing from: ', fromState, fromParams);
                    $log.log('changing to: ', toState, toParams);

                    /**
                     * navigate to the search state by default
                     */
                    if (toState.name === constants.ROOT_STATE) {
                        $log.log('redirecting from default to search');
                        event.preventDefault();
                        $state.go(constants.ROOT_STATE + '.search');
                    }

                    /**
                     * check auth on every state change
                     */
                    if (!$rootScope.user.id) {
                        $log.log('no user id in rootScope');
                        event.preventDefault();
                        $rootScope.user.$isAuthenticated(function (user, responseHeaders) {
                            $state.go(toState.name, toParams);
                        });
                    }

                    /**
                     * set default typeOfContent parameter
                     */
                    if (!toParams.typeOfContent) {
                        toParams.typeOfContent = fromParams.typeOfContent || constants.TYPE_TEXT;
                    }

                    $log.log('$stateChangeStart event end');
                })
            }]);
});