define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('SearchResultCtrlSpec', function () {

        var $httpBackend, $scope, ctrl, Text, $window, $rootScope;

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

            inject(function (_$httpBackend_, _$rootScope_, $controller, _Text_) {
                $httpBackend = _$httpBackend_;
                $scope = _$rootScope_.$new();
                ctrl = $controller('SearchResultCtrl', {$scope: $scope});
                $rootScope = _$rootScope_;
                Text = _Text_;
            })
        });

        it('should test controller instantiation', function () {
            expect($scope.textSearchResult).toBeNull();
        });

        it('should test if controller scope listens to searchResult event', function () {
            $httpBackend.when('POST', '/api/users/isAuthenticated.json').respond(200, {id: 1});
            $rootScope.$broadcast('searchResult', 'testValue');
            expect($scope.textSearchResult).toEqual('testValue')
        });
    })
});
