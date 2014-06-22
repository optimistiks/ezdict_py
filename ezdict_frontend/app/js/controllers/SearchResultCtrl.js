define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('SearchResultCtrl', ['$scope', '$stateParams', 'Text', 'constants', 'YouTube', 'Movie',
            function ($scope, $stateParams, Text, constants, youtube, Movie) {
                $scope.textSearchResult = null;
                $scope.videoSearchResult = null;

                if ($stateParams.query && $stateParams.typeOfContent) {
                    switch ($stateParams.typeOfContent) {
                        case constants.TYPE_TEXT:
                            Text.query({query: $stateParams.query}, function (texts, responseHeaders) {
                                $scope.textSearchResult = texts;
                            });
                            break;
                        case constants.TYPE_VIDEO:
                            $scope.videoSearchResult = Movie.query({
                                keywords: $stateParams.query,
                                quality: '720p'
                            });
                            /*                            youtube.ready(function () {
                             var request = youtube.search.list({
                             q: $stateParams.query,
                             part: 'id,snippet',
                             type: 'video',
                             videoEmbeddable: true,
                             maxResults: 20,
                             videoCaption: 'closedCaption'
                             });
                             request.execute(function (response) {
                             $scope.videoSearchResult = response.items;
                             });
                             });*/
                            break;
                        default:
                    }
                }
            }]);
});
