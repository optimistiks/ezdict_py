define(['./module'], function (factory) {
    'use strict';
    factory.

        factory('AbstractTicket', [function () {

            /**
             * @class AbstractTicket
             */
            var AbstractTicket = function () {
            };

            AbstractTicket.prototype = {};

            /**
             * @param {User} user
             */
            AbstractTicket.prototype.belongsTo = function (user) {
                return this.user === user.id;
            };

            return AbstractTicket;
        }]);
});