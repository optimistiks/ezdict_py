/*global angular*/
define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('Subtitles', ['$resource', 'constants', 'AbstractModel',
            function ($resource, constants, AbstractModel) {
                var

                    Subtitles = $resource(
                        [constants.API_URL, '/subtitles/:action', constants.API_FORMAT, '?imdbCode=:imdbCode'].join(''),
                        {
                        },
                        {
                        }
                    );

                Subtitles.prototype = angular.extend(Subtitles.prototype, new AbstractModel());

                return Subtitles;
            }]);
});
