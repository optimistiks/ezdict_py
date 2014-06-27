/*global angular*/
define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('Stream', ['$resource', 'constants', 'AbstractModel',
            function ($resource, constants, AbstractModel) {
                var Stream = $resource(
                    [constants.API_URL, '/streams/:action', constants.API_FORMAT].join(''),
                    {
                    },
                    {
                        start: {
                            method: 'POST',
                            params: {
                                action: 'start'
                            }
                        },
                        stop: {
                            method: 'POST',
                            params: {
                                action: 'stop'
                            }
                        }
                    }
                );

                Stream.prototype = angular.extend(Stream.prototype, new AbstractModel());

                return Stream;
            }]);
});
