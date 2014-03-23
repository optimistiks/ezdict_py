define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('AddTextCtrl', ['$scope', '$stateParams', 'constants', 'Text', '$state', 'toaster',
            function ($scope, $stateParams, constants, Text, $state, toaster) {
                $scope.constants = constants;
                $scope.type = $stateParams.typeOfContent;
                $scope.text = new Text();
                $scope.ckEditorOptions = {
                    height: '200px',
                    width: 'auto'
                };

                $scope.save = function () {
                    var errorCallback = function () {
                            toaster.pop('error', 'Ошибка');
                        },
                        successCallback = function () {
                            toaster.pop('success', 'Сохранено');
                        };

                    if ($scope.text.id) {
                        $scope.text.$update(successCallback, errorCallback);
                    } else {
                        $scope.text.$save(successCallback, errorCallback);
                    }
                };
            }]);
});
