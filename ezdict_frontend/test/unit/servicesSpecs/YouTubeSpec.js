define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('YouTube', function () {

        var youtube, $rootScope, $window;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict.services');

            inject(['YouTube', '$rootScope', '$window', function ($_YouTube, $_rootScope, $_window) {
                youtube = $_YouTube;
                $rootScope = $_rootScope;
                $window = $_window;
            }]);
        });

        it('should load youtube api', function () {
            var script = {},
                appendTo = jasmine.createSpy('appendTo'),
                promise;

            spyOn(document, 'createElement').andReturn(script);
            spyOn(angular, 'element').andReturn({appendTo: appendTo, off: angular.noop});

            promise = youtube.loadApi();

            expect(promise.then).toBeDefined();
            expect($window.gapiLoad).toBeDefined();
            expect($window.ytApiLoad).toBeDefined();

            expect(document.createElement).toHaveBeenCalled();
            expect(script.src).toEqual('https://apis.google.com/js/client.js?onload=gapiLoad');
            expect(angular.element).toHaveBeenCalledWith(script);
            expect(appendTo).toHaveBeenCalledWith('head');

            $window.gapi = {
                client: {
                    setApiKey: jasmine.createSpy('setApiKey'),
                    load: jasmine.createSpy('load'),
                    youtube: {
                        check: 'check'
                    }
                }
            };

            $window.gapiLoad();
            expect($window.gapi.client.setApiKey).toHaveBeenCalledWith('AIzaSyB1mHg4-kxXyFBnI287igMiMAKZhQjMg50');
            expect($window.gapi.client.load).toHaveBeenCalledWith('youtube', 'v3', $window.ytApiLoad);

            $window.ytApiLoad();
            expect(youtube.check).toEqual('check');
            expect(youtube.loaded).toBeTruthy();
        });
    });
});
