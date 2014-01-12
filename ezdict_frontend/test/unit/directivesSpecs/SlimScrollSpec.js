define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('Unit testing great quotes', function () {
        var $compile,
            $rootScope,
            $httpBackend,
            $window;

        // Load the myApp module, which contains the directive
        beforeEach(module('ezdict'));

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_, _$window_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $window = _$window_;
            $httpBackend.when('POST', '/api/users/isAuthenticated.json').respond(200, {id: 1});
        }));

        it('Replaces the element with the appropriate content', function () {
            spyOn($window.jQuery.fn, 'slimScroll');
            // Compile a piece of HTML containing the directive
            var element = $compile("<div slimscroll=\"{height: '280px', railVisible: true, distance: '5px', color: '#1B3F32'}\"></div>")($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect($window.jQuery.fn.slimScroll).toHaveBeenCalled();
        });
    });
});
