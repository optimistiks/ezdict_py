define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('AuthCheckCtrl', ['$scope', '$window', 'User', 'constants',
             function ($scope, $window, User, constants) {

                 /**
                  * current user authentication flag. Default is true, so body is hidden, and it redirects to dashboard
                  * page if user is really authenticated, so index page is not displayed to authenticated users
                  * @type {boolean}
                  */
                 $scope.isAuthenticated = true;

                 User.isAuthenticated(function () {
                     $window.location.href = constants.DASHBOARD_PATHNAME;
                 }, function () {
                     $scope.isAuthenticated = false;
                 })
             }]);
});