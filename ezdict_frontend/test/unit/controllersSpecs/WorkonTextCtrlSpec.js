define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('WorkonTextCtrl', function () {

        var $httpBackend, $scope, ctrl, Text, $window, $rootScope, $stateParams;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            module(function ($provide) {
                $window = {location: {}};
                $stateParams = {id: 1};

                // this $window will be used when injected in our controller
                $provide.constant('$window', $window);
                $provide.constant('$stateParams', $stateParams);
            });

            inject(function (_$httpBackend_, _$rootScope_, $controller) {
                $httpBackend = _$httpBackend_;
                $httpBackend.when('POST', '/api/users/isAuthenticated.json').respond(200, {id: 1});
                $httpBackend.when('GET', /^\/api\/texts\/1.json/).respond({id: 1, text: 'text'});
                $scope = _$rootScope_.$new();
                ctrl = $controller('WorkonTextCtrl', {$scope: $scope});
            })
        });

        it('should test if controller loads text', function () {
            $httpBackend.flush();
            expect($scope.text).toBeDefined();
            expect($scope.text.text).toEqual('text');
        });
    })
});
