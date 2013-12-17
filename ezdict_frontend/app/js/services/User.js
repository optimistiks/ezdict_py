define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('User', ['$resource', 'constants', function ($resource, constants) {
            var User = $resource([constants.API_URL, '/users/:userId/:action', constants.API_FORMAT].join(''),
                {},
                {
                    isAuthenticated: {
                        method: 'POST',
                        params: {
                            action: 'isAuthenticated'
                        }
                    },
                    login: {
                        method: 'POST',
                        params: {
                            action: 'login'
                        }
                    },
                    logout: {
                        method: 'POST',
                        params: {
                            action: 'logout'
                        }
                    }
                });

            User.prototype.errors = {};

            User.prototype.hasErrors = function (field) {
                return this.errors[field] && this.errors[field].length > 0;
            };

            User.prototype.getErrors = function (field) {
                var errors = [];
                if (this.errors[field] && this.errors[field].length > 0) {
                    errors = this.errors[field]
                }
                return errors;
            };

            User.prototype.getErrorString = function (field, glue) {
                glue = glue || '<br>';
                var errors = this.getErrors(field);
                return errors.join(glue);
            };

            return User;
        }]);
});