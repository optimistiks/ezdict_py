define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('DashboardInterceptor', function () {

        var $window, $httpBackend;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict.services');

            /**
             * mock the $window module
             */
            module(function ($provide) {
                // We are defining the new $window
                $window = {location: {}};

                // this $window will be used when injected in our controller
                $provide.constant('$window', $window);
            });

            inject(function (_$httpBackend_) {
                $httpBackend = _$httpBackend_;
            })
        });

        it('should test redirection on 403 error', inject(['DashboardInterceptor', function (interceptor) {
            expect(interceptor.responseError).toBeDefined();
            $window.location.href = '/home';
            interceptor.responseError({status: 403});
            expect($window.location.href).toEqual('/');
        }]));
    })
});
