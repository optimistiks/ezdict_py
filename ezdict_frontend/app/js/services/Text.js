define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('Text', ['$resource', 'constants', function ($resource, constants) {
            var Text = $resource([constants.API_URL, '/texts/:id/:action', constants.API_FORMAT, '?query=:query'].join(''),
                {},
                {});

            return Text;
        }]);
});
