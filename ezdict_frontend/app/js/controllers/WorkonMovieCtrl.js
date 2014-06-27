define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('WorkonMovieCtrl', [
            '$scope', '$stateParams', '$http', 'Stream',
            function ($scope, $stateParams, $http, Stream) {
                $scope.movieId = $stateParams.id;
                $scope.streamUrl = null;

                $scope.stream = Stream.start({id: $scope.movieId});

                $scope.$on('$destroy', function () {
                        $scope.stream.$stop();
                    }
                );
            }
        ])
    ;
});
