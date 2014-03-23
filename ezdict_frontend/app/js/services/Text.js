define(['./module', './ErrorsHandlerMixin'], function (factory, ErrorsHandlerMixin) {
    'use strict';
    factory.
        factory('Text', ['$resource', 'constants', '$window', function ($resource, constants, $window) {
            var Text = $resource(
                [constants.API_URL, '/texts/:id/:action', constants.API_FORMAT, '?query=:query'].join(''),
                {
                    id: '@id'
                },
                {
                    'update': { method: 'PUT' }
                }
            );

            Text.prototype = $window.angular.extend(Text.prototype, ErrorsHandlerMixin);

            return Text;
        }]);
});
