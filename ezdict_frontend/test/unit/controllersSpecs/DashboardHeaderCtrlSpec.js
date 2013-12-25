define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('DashboardHeaderCtrl', function () {

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
                $window = {location: {}};

                // this $window will be used when injected in our controller
                $provide.constant('$window', $window);
            });

            inject(function (_$httpBackend_, $rootScope, $controller) {
                $httpBackend = _$httpBackend_;
                $scope = $rootScope.$new();
                ctrl = $controller('DashboardHeaderCtrl', {$scope: $scope});
            })
        });

        it('should test controller instantiation', function () {
            expect($scope.logout).toBeDefined();
        });

        it('should successfully logout a user', function () {
            $httpBackend.when('POST', '/api/users/logout.json').respond(200);
            $httpBackend.when('POST', '/api/users/isAuthenticated.json').respond(403);
            $window.location.href = '/home';
            $scope.logout();
            $httpBackend.flush();
            expect($window.location.href).toEqual('/');
        });
    })
});
