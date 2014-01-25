define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('WorkonTextCtrl', ['$scope', '$stateParams', 'Text', '$sce',
              function ($scope, $stateParams, Text, $sce) {
                  $scope.text = Text.get({id: $stateParams.id}, function (text, responseHeaders) {
                      $scope.content = $sce.trustAsHtml(text.text);
                  });
              }]);
});
