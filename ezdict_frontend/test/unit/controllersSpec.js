'use strict';


//this is a test suite for controllers used in ezdictIndex application
describe('ezdictIndex controllers', function () {

    //load application before each test
    beforeEach(module('ezdictIndex'));

    //this is a test suite for controller which handles the user registration
    describe('RegistrationCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
             //create a mock of $http service, which will respond to various requests
             //initiated by controller
            $httpBackend = _$httpBackend_;

            //create a new scope for the controller
            scope = $rootScope.$new();

            //instantiate a controller
            ctrl = $controller('RegistrationCtrl', {$scope: scope});
        }));

        it('should test controller instantiation', function () {
            expect(scope.register).toBeDefined();
            expect(scope.user).toBeDefined();
            expect(scope.registerButtonDisabled).toBeFalsy();
        });

        it('should successfully create a user', function () {
            var userResponseSuccess = {
                'id': 1,
                'nickname': 'chuck',
                'email': 'norris@chuck.com'
            };

            $httpBackend.when('POST', '/api/users.json').respond(200, userResponseSuccess);

            expect(scope.user.id).toBeUndefined();
            expect(scope.registerButtonDisabled).toBeFalsy();

            scope.register();

            expect(scope.registerButtonDisabled).toBeTruthy();

            $httpBackend.flush();

            expect(scope.registerButtonDisabled).toBeTruthy();

            expect(scope.user.id).toEqual(userResponseSuccess.id);
            expect(scope.user.nickname).toEqual(userResponseSuccess.nickname);
            expect(scope.user.email).toEqual(userResponseSuccess.email);
        });

        it('should fail to create a user', function () {
            var userResponseFail = {
                'nickname': ['Обязательное поле'],
                'email': ['Обязательное поле'],
                'password': ['Обязательное поле']
            };

            $httpBackend.when('POST', '/api/users.json').respond(400, userResponseFail);

            expect(scope.registerButtonDisabled).toBeFalsy();

            scope.register();

            expect(scope.registerButtonDisabled).toBeTruthy();

            $httpBackend.flush();

            expect(scope.registerButtonDisabled).toBeFalsy();

            expect(scope.user.errors.nickname.length).toEqual(1);
            expect(scope.user.errors.email.length).toEqual(1);
            expect(scope.user.errors.password.length).toEqual(1);
        });
    });

});
