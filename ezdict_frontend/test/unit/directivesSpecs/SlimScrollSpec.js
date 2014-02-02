define(['dashboard-bootstrap', 'angular-mock'], function () {
    'use strict';

    describe('slimscroll directive test', function () {
        var $compile,
            $rootScope,
            $httpBackend,
            $window;

        beforeEach(module('ezdict'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_, _$window_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $window = _$window_;
            $httpBackend.when('POST', '/api/users/isAuthenticated.json').respond(200, {id: 1});
        }));

        it('calls for jquery slimscroll method', function () {
            spyOn($window.jQuery.fn, 'slimScroll');
            $compile("<div slimscroll=\"{height: '280px', railVisible: true, distance: '5px', color: '#1B3F32'}\"></div>")($rootScope);
            $rootScope.$digest();
            expect($window.jQuery.fn.slimScroll).toHaveBeenCalled();
        });
    });
});
