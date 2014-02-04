define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('RegistrationCtrl', function () {

        var
            /**
             * mocked $window module
             * @type {{}}
             */
                $window,

            /**
             * controller scope
             */
                $scope,

            /**
             * controller instance
             */
                ctrl,

            /**
             * mocked http backend for handling api calls
             */
                $httpBackend;

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
                ctrl = $controller('RegistrationCtrl', {$scope: $scope});
            })
        });

        it('should test controller instantiation', function () {
            expect($scope.register).toBeDefined();
            expect($scope.user).toBeDefined();
            expect($scope.registerButtonDisabled).toBeFalsy();
            expect($scope.password).toBeNull();
        });

        it('should successfully create a user', function () {
            var user = {
                'id': 1,
                'nickname': 'chuck',
                'email': 'norris@chuck.com'
            };

            $httpBackend.when('POST', '/api/users.json').respond(200, user);
            $httpBackend.when('POST', '/api/users/login.json').respond(200);

            expect($scope.user.id).toBeUndefined();
            expect($scope.registerButtonDisabled).toBeFalsy();

            $scope.user.email = user.email;
            $scope.user.nickname = user.nickname;
            $scope.password = 'roundhouse';

            $scope.register();

            expect($scope.registerButtonDisabled).toBeTruthy();

            expect($scope.user.password).toEqual($scope.password);

            $httpBackend.flush();

            expect($scope.registerButtonDisabled).toBeTruthy();

            expect($scope.user.id).toEqual(user.id);
            expect($scope.user.nickname).toEqual(user.nickname);
            expect($scope.user.email).toEqual(user.email);

            expect($window.location.href).toEqual('/home');
        });

        it('should fail to create a user', function () {
            var userResponseFail = {
                'nickname': ['Обязательное поле'],
                'email': ['Обязательное поле'],
                'password': ['Обязательное поле']
            };

            $httpBackend.when('POST', '/api/users.json').respond(400, userResponseFail);

            expect($scope.registerButtonDisabled).toBeFalsy();

            $scope.register();

            expect($scope.registerButtonDisabled).toBeTruthy();

            $httpBackend.flush();

            expect($scope.registerButtonDisabled).toBeFalsy();

            expect($scope.user.errors.nickname.length).toEqual(1);
            expect($scope.user.errors.email.length).toEqual(1);
            expect($scope.user.errors.password.length).toEqual(1);
        });
    });

});
