define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('SearchResultCtrl', ['$scope', '$stateParams', 'Text', 'constants', 'YouTube', 'Movie',
            function ($scope, $stateParams, Text, constants, youtube, Movie) {
                $scope.textSearchResult = null;
                $scope.videoSearchResult = null;

                $scope.moviesPopular = [];
                $scope.moviesNew = [];
                $scope.moviesRating = [];

                //search for popular
                Movie.searchYts({
                    sort: 'peers'
                }).$promise.then(function (response) {
                        $scope.moviesPopular = response.MovieList;
                        return response.MovieList;
                    });

                //search for new
                Movie.searchYts({
                    sort: 'date'
                }).$promise.then(function (response) {
                        $scope.moviesNew = response.MovieList;
                        return response.MovieList;
                    });

                //search for rating
                Movie.searchYts({
                    sort: 'rating'
                }).$promise.then(function (response) {
                        $scope.moviesRating = response.MovieList;
                        return response.MovieList;
                    });

                $scope.isVideo = function () {
                    return $stateParams.typeOfContent === constants.TYPE_VIDEO;
                };

                $scope.isText = function () {
                    return $stateParams.typeOfContent === constants.TYPE_TEXT;
                };

                $scope.isQuery = function () {
                    return !!$stateParams.query;
                };

                if ($stateParams.query && $stateParams.typeOfContent) {
                    switch ($stateParams.typeOfContent) {
                        case constants.TYPE_TEXT:
                            Text.query({query: $stateParams.query}, function (texts, responseHeaders) {
                                $scope.textSearchResult = texts;
                            });
                            break;
                        case constants.TYPE_VIDEO:
                            Movie.search({
                                keywords: $stateParams.query
                            }).then(function (movies) {
                                    $scope.videoSearchResult = movies;
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
