define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('Text', ['$resource', 'constants', '$rootScope', function ($resource, constants, $rootScope) {
            var Text = $resource([constants.API_URL, '/texts/:textId/:action', constants.API_FORMAT, '?query=:query'].join(''),
                {},
                {});

            /**
             * broadcasts the content search result
             * @param result
             */
            Text.broadcastSearchResult = function (result) {
                $rootScope.$broadcast('searchResult', result);
            };

            return Text;
        }]);
});
