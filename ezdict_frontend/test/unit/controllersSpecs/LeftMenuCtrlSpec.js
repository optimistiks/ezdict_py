define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('LeftMenuCtrl', function () {

        var $httpBackend, $scope, ctrl, Text, $window, $rootScope, $state;

        beforeEach(function () {

            $state = {
                go: function () {
                }
            };

            /**
             * load application
             */
            module('ezdict');

            module(function ($provide) {
                $window = {location: {}};

                // this $window will be used when injected in our controller
                $provide.constant('$window', $window);
                $provide.constant('$state', $state);
            });

            inject(function (_$httpBackend_, _$rootScope_, $controller) {
                $httpBackend = _$httpBackend_;
                $httpBackend.when('POST', '/api/users/isAuthenticated.json').respond(200, {id: 1});
                $scope = _$rootScope_.$new();
                ctrl = $controller('LeftMenuCtrl', {$scope: $scope});
            })
        });

        it('should test that all controller methods are defined', function () {
            expect($scope.goToAddMaterials).toBeDefined();
            expect($scope.goToSearch).toBeDefined();
            expect($scope.currentStateIsAdd).toBeDefined();
            expect($scope.currentStateIsSearch).toBeDefined();
        });

        it('should test navigating to add materials', function () {
            spyOn($state, 'go');
            $scope.goToAddMaterials();
            expect($state.go).toHaveBeenCalledWith('dashboard.layout.default.add');
        });

        it('should test navigating to search', function () {
            spyOn($state, 'go');
            $scope.goToSearch();
            expect($state.go).toHaveBeenCalledWith('dashboard.layout.default.search');
        });
    })
});
