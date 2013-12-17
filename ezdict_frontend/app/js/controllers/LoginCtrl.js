define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('LoginCtrl', ['$scope', '$window', 'User', 'constants', 'toaster',
             function ($scope, $window, User, constants, toaster) {

                 /**
                  * login credentials
                  * @type {{}}
                  */
                 $scope.loginData = {};

                 /**
                  * this is called on login button click
                  */
                 $scope.login = function () {
                     $scope.loginButtonDisabled = true;
                     User.login({}, $scope.loginData,
                         function (user, responseHeaders) {
                             $window.location.href = constants.DASHBOARD_PATHNAME;
                         },
                         function (httpResponse) {
                            toaster.pop('error', 'Ошибка', httpResponse.data.detail);
                            $scope.loginButtonDisabled = false;
                         }
                     );
                 }

                 /**
                  * this is called on key press, when focus is in login or password fields
                  */
                 $scope.loginOnEnter = function ($event) {
                     if ($event.keyCode === constants.ENTER_KEYCODE) {
                         $scope.login();
                     }
                 }
             }]);
});