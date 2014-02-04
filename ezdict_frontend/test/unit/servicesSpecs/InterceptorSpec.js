define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('Interceptor', function () {

        var $rootScope;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict.services');

            inject(function (_$rootScope_) {
                $rootScope = _$rootScope_;
            })
        });

        it('should check interceptor interface', inject(['Interceptor', function (interceptor) {
            expect(interceptor.request).toBeDefined();
            expect(interceptor.requestError).toBeDefined();
            expect(interceptor.response).toBeDefined();
            expect(interceptor.responseError).toBeDefined();
        }]));

        it('should check pending requests count', inject(['Interceptor', function (interceptor) {
            expect($rootScope.pendingRequests).toEqual(0);
            interceptor.request();
            expect($rootScope.pendingRequests).toEqual(1);
            interceptor.request();
            expect($rootScope.pendingRequests).toEqual(2);
            interceptor.request();
            expect($rootScope.pendingRequests).toEqual(3);
            interceptor.requestError();
            expect($rootScope.pendingRequests).toEqual(2);
            interceptor.response();
            expect($rootScope.pendingRequests).toEqual(1);
            interceptor.responseError();
            expect($rootScope.pendingRequests).toEqual(0);
        }]));
    })
});
