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
                    $scope.text.$save(
                        function (text, responseHeaders) {
                            $state.go(constants.ROOT_STATE + '.workon.text', {id: text.id});
                        },
                        function (httpResponse) {
                            toaster.pop('error', 'Ошибка');
                        });
                }
            }]);
});
