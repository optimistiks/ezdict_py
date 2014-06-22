define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('WorkonMovieCtrl', [
            '$scope', '$stateParams', '$http',
            function ($scope, $stateParams, $http) {
                $scope.movieId = $stateParams.id;
                $scope.streamUrl = null;

                $http.post('/api/stream/start').
                    then(function(response) {
                        $scope.streamUrl = response.data.url;
                    }
                );
            }
        ])
    ;
});
