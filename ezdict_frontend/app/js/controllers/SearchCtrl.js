define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('SearchCtrl', ['$scope', 'constants', '$state', '$stateParams',
              function ($scope, constants, $state, $stateParams) {
                  $scope.query = $stateParams.query || '';

                  /**
                   * this is called when search button is pressed
                   */
                  $scope.search = function () {
                      if ($scope.query) {
                          $state.go(constants.ROOT_STATE + '.search', {'query': $scope.query});
                      }
                  };

                  /**
                   * this is called on key press, when focus is on the search query input
                   */
                  $scope.searchOnEnter = function ($event) {
                      if ($event.keyCode === constants.ENTER_KEYCODE) {
                          $scope.search();
                      }
                  };
              }]);
});