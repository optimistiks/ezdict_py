define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('EventManager', ['$rootScope', function ($rootScope) {

            /**
             * @class EventManager
             */
            var EventManager = function () {
                this.TICKET_FOUND = 'ticketFound';
                this.DICT_TICKET_FOUND = 'dictTicketFound';
                this.TRANSLATE_TICKET_FOUND = 'translateTicketFound';
                this.TEXT_SELECT = 'textSelect';
            };

            EventManager.prototype = {};

            EventManager.prototype.onTicketFound = function (listener) {
                this.on(this.TICKET_FOUND, listener);
            };

            EventManager.prototype.onEzDictTicketFound = function (listener) {
                this.on(this.DICT_TICKET_FOUND, listener);
            };

            EventManager.prototype.onEzTranslateTicketFound = function (listener) {
                this.on(this.TRANSLATE_TICKET_FOUND, listener);
            };

            EventManager.prototype.broadcastTicketFound = function (ticket) {
                this.broadcast(this.TICKET_FOUND, ticket);
            };

            EventManager.prototype.broadcastEzDictTicketFound = function (ticket) {
                this.broadcast(this.DICT_TICKET_FOUND, ticket);
            };

            EventManager.prototype.broadcastEzTranslateTicketFound = function (ticket) {
                this.broadcast(this.TRANSLATE_TICKET_FOUND, ticket);
            };

            EventManager.prototype.onTextSelect = function (listener) {
                this.on(this.TEXT_SELECT, listener);
            };

            EventManager.prototype.broadcastTextSelect = function (text) {
                this.broadcast(this.TEXT_SELECT, text);
            };

            EventManager.prototype.on = function (name, listener) {
                $rootScope.$on(name, listener);
            };

            EventManager.prototype.broadcast = function (name, data) {
                $rootScope.$broadcast(name, data);
            };

            return new EventManager();
        }
        ]);
});