define(['./module'], function (factory) {
    'use strict';
    factory.

        factory('TextMessages', [function () {
            return {
                'REGISTRATION_SUCCESS': 'Регистрация успешна, входим...',
                'AUTH_REQUEST_AFTER_REDIRECT': 'Пожалуйста, войдите в систему.'
            }
        }]);
});