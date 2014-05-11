/*global document, gapi, angular*/
define(['./module'], function (factory) {
    'use strict';
    factory.

        factory('YouTube', [
            '$window', '$q',

            function ($window, $q) {
                var
                    KEY = 'AIzaSyB1mHg4-kxXyFBnI287igMiMAKZhQjMg50',

                    /**
                     * @class YouTube
                     */
                    YouTube = function () {
                        this.loaded = false;
                    };

                YouTube.prototype = {};

                YouTube.prototype.ready = function (callback) {
                    if (this.loaded === true) {
                        callback();
                    } else {
                        this.loadApi().then(function () {
                            callback();
                        });
                    }
                };

                YouTube.prototype.loadApi = function () {
                    var that = this,
                        deferred = $q.defer(),
                        script;

                    $window.ytApiLoad = function () {
                        angular.extend(that, $window.gapi.client.youtube);
                        that.loaded = true;
                        deferred.resolve($window.gapi.client.youtube);
                    };

                    $window.gapiLoad = function () {
                        $window.gapi.client.setApiKey(KEY);
                        $window.gapi.client.load('youtube', 'v3', ytApiLoad);
                    };

                    script = document.createElement('script');
                    script.src = 'https://apis.google.com/js/client.js?onload=gapiLoad';
                    angular.element(script).appendTo('head');

                    return deferred.promise;
                };

                return new YouTube();
            }]);
});