/*global angular*/
define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('User', ['$resource', 'constants', 'AbstractModel',
            function ($resource, constants, AbstractModel) {

                /**
                 * @class User
                 * @property {number} id
                 */
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

                User.prototype = angular.extend(new AbstractModel(), User.prototype);
                return User;
            }]);
});