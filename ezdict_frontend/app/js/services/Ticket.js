/*global angular*/
define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('Ticket', ['$resource', 'constants', 'AbstractTicket', '$q', 'AbstractModel',
            function ($resource, constants, AbstractTicket, $q, AbstractModel) {
                var Ticket = $resource(
                    [constants.API_URL, '/tickets/:id/:action', constants.API_FORMAT, '?word=:word'].join(''),
                    {
                        id: '@id'
                    },
                    {
                        'update': { method: 'PUT' }
                    }
                );

                Ticket.findTicket = function (word) {
                    var data = {word: word};
                    return Ticket.query(data).$promise.
                        then(function (tickets) {
                            var ownTicket = null,
                                bestTicket = null,
                                i;

                            if (tickets.length > 0) {
                                for (i = 0; i < tickets.length; i++) {
/*                                    if (tickets[i].user === $scope.user.id) {
                                        ownTicket = tickets[i];
                                    }*/
                                    if (bestTicket === null || bestTicket.rating < tickets[i].rating) {
                                        bestTicket = tickets[i];
                                    }
                                }
                            }

                            return (ownTicket || bestTicket || tickets[0]) || $q.reject(tickets);
                        });
                };

                AbstractTicket.prototype = angular.extend(new AbstractModel(), AbstractTicket.prototype);
                Ticket.prototype = angular.extend(new AbstractTicket(), Ticket.prototype);

                return Ticket;
            }]);
});
