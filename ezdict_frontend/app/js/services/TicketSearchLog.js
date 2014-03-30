define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('TicketSearchLog', ['$resource', 'constants', function ($resource, constants) {
            var TicketSearchLog = $resource(
                [constants.API_URL, '/ticket_search_logs', constants.API_FORMAT, '?word=:word'].join(''),
                {
                    word: '@word'
                },
                {
                    log: {
                        method: 'POST'
                    }
                }
            );

            return TicketSearchLog;
        }]);
});
