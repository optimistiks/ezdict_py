define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('DashboardHeaderCtrl', ['$scope', '$window', 'toaster', 'User',function ($scope, $window, toaster, User) {

            /**
             * this is called when logout button is pressed
             */
            $scope.logout = function () {
                User.logout(function () {
                    $window.location.href = '/';
                }, function (httpResponse) {
                    toaster.pop('error', httpResponse.data.detail);
                });
            };
        }]);
});