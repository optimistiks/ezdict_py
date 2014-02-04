define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('LoginCtrl', function () {

        var $window, $scope, ctrl, $httpBackend;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            /**
             * mock the $window module
             */
            module(function ($provide) {
                // We are defining the new $window
                $window = {location: {}, angular: angular};

                // this $window will be used when injected in our controller
                $provide.constant('$window', $window);
            });

            inject(function (_$httpBackend_, $rootScope, $controller) {
                $httpBackend = _$httpBackend_;
                $scope = $rootScope.$new();
                ctrl = $controller('LoginCtrl', {$scope: $scope});
            })
        });

        it('should test controller instantiation', function () {
            expect($scope.login).toBeDefined();
            expect($scope.loginData).toBeDefined();
            expect($scope.loginButtonDisabled).toBeFalsy();
        });

        it('should successfully login a user', function () {
            $httpBackend.when('POST', '/api/users/login.json').respond(200);
            expect($scope.loginButtonDisabled).toBeFalsy();
            $scope.login();
            expect($scope.loginButtonDisabled).toBeTruthy();
            $httpBackend.flush();
            expect($scope.loginButtonDisabled).toBeTruthy();
            expect($window.location.href).toEqual('/home');
        });

        it('should fail to login', function () {
            var failedLogin = {'detail': ''};
            $httpBackend.when('POST', '/api/users/login.json').respond(400, failedLogin);
            expect($scope.loginButtonDisabled).toBeFalsy();
            $scope.login();
            expect($scope.loginButtonDisabled).toBeTruthy();
            $httpBackend.flush();
            expect($scope.loginButtonDisabled).toBeFalsy();
        });
    })
});
