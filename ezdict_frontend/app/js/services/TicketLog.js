define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('TicketSearchLog', ['$resource', 'constants', function ($resource, constants) {
            var TicketSearchLog = $resource(
                [constants.API_URL, '/ticket_search_log/:word', constants.API_FORMAT].join(''),
                {
                    word: '@word'
                },
                {

                }
            );

            return TicketSearchLog;
        }]);
});
