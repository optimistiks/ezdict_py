define(['app'], function (app) {
    'use strict';
    return app.
        config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('Interceptor');
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        }]).
        run(['$rootScope', '$state' , 'User', '$window', 'constants',
             function ($rootScope, $state, User, $window, constants) {

                 /**
                  * redirects authenticated user to dashboard page
                  */
                 $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                     if (!$rootScope.userIsGuest) {
                         event.preventDefault();
                         User.isAuthenticated(function (user, responseHeaders) {
                             $window.location.href = constants.DASHBOARD_PATHNAME;
                         }, function (httpResponse) {
                             $rootScope.userIsGuest = true;
                             $state.go(toState.name);
                         });
                     }
                 })
             }]);
});