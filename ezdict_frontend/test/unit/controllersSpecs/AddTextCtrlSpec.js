define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('AddTextCtrl', function () {

        var $httpBackend, $scope, ctrl, $stateParams;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            module(function ($provide) {
                $stateParams = {typeOfContent: 'text'};
                $provide.constant('$stateParams', $stateParams);
            });

            inject(function (_$httpBackend_, _$rootScope_, $controller) {
                $httpBackend = _$httpBackend_;
                $httpBackend.when('POST', /^\/api\/texts.json/).respond({id: 53, updated: 0});
                $httpBackend.when('PUT', /^\/api\/texts\/53.json/).respond({id: 53, updated: 1});
                $scope = _$rootScope_.$new();
                ctrl = $controller('AddTextCtrl', {$scope: $scope});
            })
        });

        it('should test controller interface', function () {
            expect($scope.save).toBeDefined();
        });

        it('should test new text saving', function () {
            $scope.save();
            $httpBackend.flush();
            expect($scope.text.id).toEqual(53);
            expect($scope.text.updated).toEqual(0);
        });

        it('should test existing text updating', function () {
            $scope.save();
            $httpBackend.flush();
            expect($scope.text.id).toEqual(53);
            expect($scope.text.updated).toEqual(0);
            $scope.save();
            $httpBackend.flush();
            expect($scope.text.id).toEqual(53);
            expect($scope.text.updated).toEqual(1);
        });
    })
});
