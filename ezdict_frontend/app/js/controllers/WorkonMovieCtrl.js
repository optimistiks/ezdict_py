define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('WorkonMovieCtrl', [
            '$scope', '$stateParams', '$http', 'Stream', 'Movie',
            function ($scope, $stateParams, $http, Stream, Movie) {
                $scope.movieId = $stateParams.id;
                $scope.streamUrl = null;
                $scope.movieData = Movie.getFromYts({id: $stateParams.id});

                $scope.stream = Stream.start({id: $scope.movieId});

                $scope.$on('$destroy', function () {
                        $scope.stream.$stop();
                    }
                );
            }
        ])
    ;
});
