define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('SearchCtrlSpec', function () {

        var $scope, ctrl, $state;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            inject(function ($rootScope, $controller, _$state_) {
                $scope = $rootScope.$new();
                ctrl = $controller('SearchCtrl', {$scope: $scope});
                $state = _$state_;
            })
        });

        it('should test controller instantiation', function () {
            expect($scope.search).toBeDefined();
            expect($scope.searchOnEnter).toBeDefined();
        });

        it('should test state change on search', function () {
            $scope.query = 'test';
            spyOn($state, 'go');
            $scope.search();
            expect($state.go).toHaveBeenCalled();
        });
    })
});
