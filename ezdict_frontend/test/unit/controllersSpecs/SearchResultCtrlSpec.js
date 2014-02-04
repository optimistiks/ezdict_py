define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('SearchResultCtrlSpec', function () {

        var $httpBackend, $scope, ctrl, Text, $window, $rootScope, $stateParams;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            module(function ($provide) {
                // We are defining the new $window
                $window = {location: {}};
                $stateParams = {query: 'testagain', typeOfContent: 'text'};

                // this $window will be used when injected in our controller
                $provide.constant('$window', $window);
                $provide.constant('$stateParams', $stateParams);
            });

            inject(function (_$httpBackend_, _$rootScope_, $controller, _Text_) {
                $httpBackend = _$httpBackend_;
                $scope = _$rootScope_.$new();
                $httpBackend.when('POST', '/api/users/isAuthenticated.json').respond(200, {id: 1});
                $httpBackend.when('GET', '/api/texts.json?query=testagain').respond(200, [{id: 1}, {id:2}]);
                ctrl = $controller('SearchResultCtrl', {$scope: $scope});
                $rootScope = _$rootScope_;
                Text = _Text_;
            })
        });

        it('should test if controller loads texts', function () {
            $httpBackend.flush();
            expect($scope.textSearchResult.length).toEqual(2)
        });
    })
});
