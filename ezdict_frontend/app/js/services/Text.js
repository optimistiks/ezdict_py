/*global angular*/
define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('Text', ['$resource', 'constants', 'AbstractModel',
            function ($resource, constants, AbstractModel) {
                var Text = $resource(
                    [constants.API_URL, '/texts/:id/:action', constants.API_FORMAT, '?query=:query'].join(''),
                    {
                        id: '@id'
                    },
                    {
                        'update': { method: 'PUT' }
                    }
                );

                Text.prototype = angular.extend(Text.prototype, new AbstractModel());

                return Text;
            }]);
});
