define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('PanelCtrl', ['$scope', 'TextMessages', '$q', 'Ticket', 'EzTicket', 'EventManager',
            'TicketSearchLog',

            /**
             * @param $scope
             * @param messages
             * @param $q
             * @param Ticket
             * @param EzTicket
             * @param EventManager
             * @param TicketSearchLog
             */
                function ($scope, messages, $q, Ticket, EzTicket, EventManager, TicketSearchLog) {
                $scope.text = null;
                $scope.ticket = null;
                $scope.dictTicket = null;
                $scope.translateTicket = null;
                $scope.log = null;

                $scope.ticketIsVisible = false;

                $scope.resetTicket = function () {
                    $scope.log = null;
                    $scope.ticket = null;
                    $scope.dictTicket = null;
                    $scope.translateTicket = null;
                    $scope.ticketIsVisible = false;
                };

                $scope.ticketPresent = function () {
                    return ($scope.ticket || $scope.dictTicket || $scope.translateTicket);
                };

                $scope.loadTicket = function () {
                    $scope.resetTicket();
                    var promise = $scope.findTicket().then(function (ticket) {
                        $scope.ticket = ticket;
                    }, function () {
                        return $scope.findDictTicket().then(function (ticket) {
                            $scope.dictTicket = ticket;
                        }, function () {
                            return $scope.findTranslateTicket().then(function (ticket) {
                                $scope.translateTicket = ticket;
                            });
                        });
                    });

                    return promise;
                };

                $scope.findTicket = function () {
                    return Ticket.findTicket($scope.text);
                };

                $scope.findDictTicket = function () {
                    return EzTicket.findDictTicket($scope.text);
                };

                $scope.findTranslateTicket = function () {
                    return EzTicket.translate({word: $scope.text}).$promise;
                };

                $scope.deleteTicket = function () {
                    if (confirm(messages.TICKET_DELETE_PROMPT)) {
                        $scope.ticket.$delete(function () {
                            $scope.loadTicket();
                        });
                    }
                };

                $scope.toggleTicket = function () {
                    if ($scope.ticketIsVisible === false && $scope.ticketPresent()) {
                        TicketSearchLog.log({word: $scope.text}, function (log) {
                            $scope.log = log;
                            $scope.ticketIsVisible = true;
                        });
                    } else {
                        $scope.ticketIsVisible = false;
                    }
                };

                EventManager.onTextSelect(function (e, text) {
                    if (text.length > 2) {
                        $scope.text = text;
                        $scope.loadTicket();
                    }
                });
            }]);
});