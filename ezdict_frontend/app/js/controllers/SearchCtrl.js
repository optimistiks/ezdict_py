define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('SearchCtrl', ['$scope', 'constants', '$state', '$stateParams', '$rootScope',
            function ($scope, constants, $state, $stateParams, $rootScope) {
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

                /**
                 * if state changes to search state with empty search query,
                 * and there is something entered to the search input field,
                 * then do the search using input value immediately
                 */
                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    if (toState.name === constants.ROOT_STATE + '.search' && !toParams.query && $scope.query) {
                        event.preventDefault();
                        $scope.search();
                    }
                })

            }]);
});