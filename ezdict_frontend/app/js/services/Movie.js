/*global angular*/
define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('Movie', ['$resource', 'constants', 'AbstractModel',
            function ($resource, constants, AbstractModel) {
                var Movie = $resource(
                    [constants.API_URL, '/movies/:action', constants.API_FORMAT].join(''),
                    {
                    },
                    {
                    }
                );

                Movie.prototype = angular.extend(Movie.prototype, new AbstractModel());

                return Movie;
            }]);
});
