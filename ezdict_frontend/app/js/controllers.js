'use strict';
/* Controllers */
angular.module('ezdictIndex.controllers', []).

    controller('RegistrationCtrl', ['$scope', 'User', function ($scope, user) {
        $scope.user = {
            'nickname': '',
            'email': '',
            'password': ''
        };
        $scope.register = function () {
            console.log('this is a register method in scope')
            user.query(function (data) {
                    console.log('this is a user query callback', data)
                }, function (arg1, arg2, arg3) {
                    console.log('this is a user query error callback', arg1, arg2, arg3)
                });
        }
    }]);
