define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('SearchCtrlSpec', function () {

        var $httpBackend, $scope, ctrl, $state, $window;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            module(function ($provide) {
                // We are defining the new $window
                $window = {location: {}};

                // this $window will be used when injected in our controller
                $provide.constant('$window', $window);
            });

            inject(function (_$httpBackend_, $rootScope, $controller, _$state_) {
                $httpBackend = _$httpBackend_;
                $scope = $rootScope.$new();
                ctrl = $controller('SearchCtrl', {$scope: $scope});
                $state = _$state_;
            })
        });

        it('should test controller instantiation', function () {
            expect($scope.query).toBeDefined();
            expect($scope.search).toBeDefined();
            expect($scope.searchOnEnter).toBeDefined();
        });

        it('should test text search and result broadcasting', function () {
            $httpBackend.when('POST', '/api/users/isAuthenticated.json').respond(200, {id: 1});
            spyOn($state, 'go');
            $scope.search();
            $httpBackend.flush();
            expect($state.go).toHaveBeenCalled();
        });
    })
});
