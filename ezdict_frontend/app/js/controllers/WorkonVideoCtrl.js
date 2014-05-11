define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('WorkonVideoCtrl', ['$scope', '$stateParams',
              function ($scope, $stateParams) {
                  $scope.videoId = $stateParams.id;
              }]);
});
