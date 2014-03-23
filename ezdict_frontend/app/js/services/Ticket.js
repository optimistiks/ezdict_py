define(['./module', './ErrorsHandlerMixin'], function (factory, ErrorsHandlerMixin) {
    'use strict';
    factory.
        factory('Ticket', ['$resource', 'constants', '$window', '$q',
            function ($resource, constants, $window, $q) {
                var Ticket = $resource(
                    [constants.API_URL, '/tickets/:id/:action', constants.API_FORMAT, '?word=:word'].join(''),
                    {
                        id: '@id'
                    },
                    {
                        'update': { method: 'PUT' }
                    }
                );

                //todo: tests
                Ticket.findTicket = function (word) {
                    var data = {word: word};
                    return Ticket.query(data).$promise.
                        then(function (tickets) {
                            var ownTicket = null,
                                bestTicket = null,
                                i;

                            if (tickets.length > 0) {
                                for (i = 0; i < tickets.length; i++) {
                                    if (tickets[i].user === $scope.user.id) {
                                        ownTicket = tickets[i];
                                    }
                                    if (bestTicket === null || bestTicket.rating < tickets[i].rating) {
                                        bestTicket = tickets[i];
                                    }
                                }
                            }

                            return (ownTicket || bestTicket) || $q.reject(tickets);
                        });
                };

                Ticket.prototype = $window.angular.extend(Ticket.prototype, ErrorsHandlerMixin);

                return Ticket;
            }]);
});
