define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('WorkonTVideoCtrl', [
            '$scope', '$stateParams',
            function ($scope, $stateParams) {
                $scope.movieId = $stateParams.id;
            }
        ])
    ;
});
