define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('SearchResultCtrl', ['$scope', '$stateParams', 'Text', function ($scope, $stateParams, Text) {
            $scope.textSearchResult = null;

            if ($stateParams.query) {
                Text.query({query: $stateParams.query}, function (texts, responseHeaders) {
                    $scope.textSearchResult = texts;
                });
            }
        }]);
});
