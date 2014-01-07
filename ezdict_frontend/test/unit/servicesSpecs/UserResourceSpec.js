define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('User', function () {

        var $window, $httpBackend, user;

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
                $window = {location: {}};

                // this $window will be used when injected in our controller
                $provide.constant('$window', $window);
            });

            inject(['$httpBackend', 'User', function (_$httpBackend_, User) {
                $httpBackend = _$httpBackend_;
                user = new User();
            }])
        });

        it('should test User interface', function () {
            expect(user.$isAuthenticated).toBeDefined();
            expect(user.$login).toBeDefined();
            expect(user.$logout).toBeDefined();
            expect(user.errors).toBeDefined();
            expect(user.hasErrors).toBeDefined();
            expect(user.getErrors).toBeDefined();
            expect(user.getErrorString).toBeDefined();
        });

        it('should test errors fetching', function () {
            var emailErrors = [
                'Error one',
                'Error two',
            ];
            user.errors = {
                'email': emailErrors
            };
            expect(user.hasErrors('email')).toEqual(true);
            expect(user.getErrors('email')).toEqual(emailErrors);
            expect(user.getErrorString('email', ',')).toEqual(emailErrors.join(','));
        });
    })
});
