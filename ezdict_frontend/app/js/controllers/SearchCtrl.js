define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('SearchCtrl', ['$scope', 'Text', 'constants', function ($scope, Text, constants) {
            $scope.query = '';

            /**
             * this is called when search button is pressed
             */
            $scope.search = function () {
                Text.query({query: $scope.query}, function (texts, responseHeaders) {
                    Text.broadcastSearchResult(texts)
                });
            };

            /**
             * this is called on key press, when focus is on the search query input
             */
            $scope.searchOnEnter = function ($event) {
                if ($event.keyCode === constants.ENTER_KEYCODE) {
                    $scope.search();
                }
            };
        }]);
});