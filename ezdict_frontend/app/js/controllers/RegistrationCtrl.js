define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('RegistrationCtrl', ['$scope', 'User', 'toaster', '$window', 'constants',
            function ($scope, User, toaster, $window, constants) {
                toaster.popSaved();
                $scope.user = new User();
                $scope.password = null;

                /**
                 * this is called when register button is clicked
                 */
                $scope.register = function () {
                    $scope.registerButtonDisabled = true;
                    $scope.user.password = $scope.password;
                    $scope.user.$save(function (user, responseHeaders) {
                        User.login({}, {'username': $scope.user.email, 'password': $scope.password},
                            function (user, responseHeaders) {
                                $window.location.href = constants.DASHBOARD_PATHNAME;
                            }
                        );
                    }, function (httpResponse) {
                        $scope.user.errors = httpResponse.data;
                        $scope.registerButtonDisabled = false;
                    });
                }

                /**
                 * this is called on key press, when focus is on the one of the register form inputs
                 */
                $scope.registerOnEnter = function ($event) {
                    if ($event.keyCode === constants.ENTER_KEYCODE) {
                        $scope.register();
                    }
                }
            }]);
});