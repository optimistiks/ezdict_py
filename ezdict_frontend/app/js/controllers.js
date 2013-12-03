'use strict';
/* Controllers */
angular.module('ezdictIndex.controllers', ['toaster']).

    controller('RegistrationCtrl', ['$scope', 'User', 'toaster', 'TextMessages', function ($scope, User, toaster, messages) {
        $scope.user = new User();
        $scope.register = function () {
            $scope.registerButtonDisabled = true;
            $scope.user.$save(
                function (user, responseHeaders) {
                    toaster.pop('success', messages.REGISTRATION_SUCCESS);
                },
                function (httpResponse) {
                    $scope.user.errors = httpResponse.data;
                    $scope.registerButtonDisabled = false;
                }
            );
        }
    }]);
