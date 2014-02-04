define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('SearchResultCtrlSpec', function () {

        var $httpBackend, $scope, ctrl, $stateParams;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            module(function ($provide) {
                $stateParams = {query: 'testagain', typeOfContent: 'text'};
                $provide.constant('$stateParams', $stateParams);
            });

            inject(function (_$httpBackend_, _$rootScope_, $controller, _Text_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', '/api/texts.json?query=testagain').respond(200, [
                    {id: 1},
                    {id: 2}
                ]);
                $scope = _$rootScope_.$new();
                ctrl = $controller('SearchResultCtrl', {$scope: $scope});
            })
        });

        it('should test if controller loads texts', function () {
            $httpBackend.flush();
            expect($scope.textSearchResult.length).toEqual(2)
        });
    })
});
