define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('SearchResultCtrl', ['$scope', function ($scope) {
            $scope.textSearchResult = null;

            /**
             * listens to content search result broadcast
             */
            $scope.$on('searchResult', function (event, result) {
                $scope.textSearchResult = result;
            });
        }]);
});
