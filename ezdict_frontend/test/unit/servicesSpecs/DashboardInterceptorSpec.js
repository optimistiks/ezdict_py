define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('DashboardInterceptor', function () {

        var $window;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict.services');

            /**
             * mock the $window module
             */
            module(function ($provide) {
                $window = {location: {}, angular: angular};
                $provide.constant('$window', $window);
            });
        });

        it('should test redirection on 403 error', inject(['DashboardInterceptor', function (interceptor) {
            expect(interceptor.responseError).toBeDefined();
            $window.location.href = '/home';
            interceptor.responseError({status: 403});
            expect($window.location.href).toEqual('/');
        }]));
    })
});
