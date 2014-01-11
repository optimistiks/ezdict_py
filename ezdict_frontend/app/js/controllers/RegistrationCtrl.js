define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('RegistrationCtrl', ['$scope', 'User', 'toaster', '$window', 'constants',
            function ($scope, User, toaster, $window, constants) {
                toaster.popSaved();
                $scope.user = new User();
                $scope.password = null;
                $scope.registerButtonDisabled = false;
                $scope.triedToRegister = false;

                /**
                 * this is called when register button is clicked
                 */
                $scope.register = function () {
                    $scope.registerButtonDisabled = true;
                    $scope.triedToRegister = true;

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
                };

                /**
                 * @param fieldname
                 * @returns {string}
                 */
                $scope.inputValidityClass = function (fieldname) {
                    if ($scope.triedToRegister) {
                        if ($scope.user.hasErrors(fieldname)) {
                            return 'reg-valid-error';
                        } else {
                            return 'reg-valid-ok';
                        }
                    }
                }
            }]);
});