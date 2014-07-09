define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('WorkonMovieCtrl', [
            '$scope', '$stateParams', '$http', 'Stream', 'Movie', 'Subtitles',
            function ($scope, $stateParams, $http, Stream, Movie, Subtitles) {
                $scope.movieId = $stateParams.id;
                $scope.streamUrl = null;
                $scope.subtitles = null;
                $scope.movieData = null;

                Movie.getFromYts({id: $stateParams.id}).$promise.then(function (movieData) {
                    $scope.movieData = movieData;
                    Subtitles.get({imdbCode: movieData.ImdbCode}).$promise.then(function(subtitles) {
                        $scope.subtitles = subtitles;
                    });
                });

                $scope.stream = Stream.start({id: $scope.movieId});

                $scope.$on('$destroy', function () {
                        $scope.stream.$stop();
                    }
                );
            }
        ])
    ;
});
