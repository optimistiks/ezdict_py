define(['./module', './ErrorsHandlerMixin'], function (factory, ErrorsHandlerMixin) {
    'use strict';
    factory.
        factory('User', ['$resource', 'constants', '$window', function ($resource, constants, $window) {
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

            User.prototype = $window.angular.extend(User.prototype, new ErrorsHandlerMixin());

            return User;
        }]);
});