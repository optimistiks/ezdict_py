define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('ezcontentswitch directive test', function () {
        var $compile,
            $rootScope,
            $httpBackend,

            /**
             * fake state parameters
             */
            $stateParams,

            /**
             * a fake state object for listening to transitionTo calls
             */
            $state,

            /**
             * provider instance for mocking objects in specific tests
             */
            $provide;

        /**
         * load app before each test
         */
        beforeEach(module('ezdict'));

        /**
         * provide fake state and fake state parameters before each test
         */
        beforeEach(module(function (_$provide_) {
            $provide = _$provide_;
            $state = {
                transitionTo: function () {
                }
            };
            $stateParams = {typeOfContent: 'text'};
            $provide.constant('$state', $state);
            $provide.constant('$stateParams', $stateParams);
        }));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_, $templateCache) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when('POST', '/api/users/isAuthenticated.json').respond(200, {id: 1});
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
