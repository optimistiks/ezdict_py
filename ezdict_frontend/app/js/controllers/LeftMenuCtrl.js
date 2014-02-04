define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('LeftMenuCtrl', ['$scope', '$state', 'constants',
            function ($scope, $state, constants) {
                $scope.goToAddMaterials = function () {
                    $state.go(constants.ROOT_STATE + '.add');
                };

                $scope.goToSearch = function () {
                    $state.go(constants.ROOT_STATE + '.search');
                };

                $scope.currentStateIsAdd = function () {
                    return $state.current.name === constants.ROOT_STATE + '.add';
                };

                $scope.currentStateIsSearch = function () {
                    return $state.current.name === constants.ROOT_STATE + '.search';
                };
            }]);
});
