define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('User', function () {

        var user;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            inject(['User', function (User) {
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
