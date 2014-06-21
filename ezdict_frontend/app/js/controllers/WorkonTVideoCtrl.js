define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('WorkonTVideoCtrl', [
            '$scope', '$stateParams', '$http',
            function ($scope, $stateParams, $http) {
                $scope.movieId = $stateParams.id;
                $scope.streamUrl = null;

                $http.post('/api/tvideo').
                    then(function(response) {
                        $scope.streamUrl = response.data.url;
                    }
                );
            }
        ])
    ;
});
