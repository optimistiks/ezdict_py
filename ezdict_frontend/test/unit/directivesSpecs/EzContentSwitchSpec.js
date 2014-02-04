define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('ezcontentswitch directive test', function () {
        var $compile,
            $rootScope,

            /**
             * a fake state object for listening to transitionTo calls
             */
                $state;

        /**
         * load app before each test
         */
        beforeEach(module('ezdict'));

        /**
         * provide fake state and fake state parameters before each test
         */
        beforeEach(module(function ($provide) {
            $state = {
                transitionTo: function () {
                }
            };
            $provide.constant('$state', $state);
        }));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_, $templateCache) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $templateCache.put('/partials/dashboard/ez-content-switch.html', '<div>123</div>');
        }));

        it('tests directive template loading', function () {
            var element = $compile('<div ezcontentswitch></div>')($rootScope);
            $rootScope.$digest();
            expect(element.html()).toContain('123');
        });

        it('tests directive scope signature', function () {
            var element = $compile('<div ezcontentswitch></div>')($rootScope);
            $rootScope.$digest();
            var $scope = element.isolateScope();
            expect($scope.changeType).toBeDefined();
            expect($scope.getIsActive).toBeDefined();
        });

        it('tests changeType method', function () {
            var element = $compile('<div ezcontentswitch></div>')($rootScope);
            $rootScope.$digest();
            var $scope = element.isolateScope();
            spyOn($state, 'transitionTo');
            $scope.changeType();
            expect($state.transitionTo).toHaveBeenCalled();
        });
    });
});
