define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('WorkonTVideoCtrl', [
            '$scope', '$stateParams', '$http',
            function ($scope, $stateParams, $http) {
                $scope.movieId = $stateParams.id;

                $http.post('/api/tvideo').then(function(response) {console.log('responsee', response)});
            }
        ])
    ;
});
