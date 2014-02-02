define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('SearchResultCtrl', ['$scope', '$stateParams', 'Text', 'constants',
            function ($scope, $stateParams, Text, constants) {
                $scope.textSearchResult = null;

                if ($stateParams.query && $stateParams.type) {
                    switch ($stateParams.type) {
                        case constants.TYPE_TEXT:
                            Text.query({query: $stateParams.query}, function (texts, responseHeaders) {
                                $scope.textSearchResult = texts;
                            });
                            break;
                        default:
                    }
                }
            }]);
});
