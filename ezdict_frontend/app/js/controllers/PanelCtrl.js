define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('PanelCtrl', ['$scope', 'TextMessages', '$q', 'Ticket', 'EzTicket', 'EventManager',

            /**
             * @param $scope
             * @param messages
             * @param $q
             * @param Ticket
             * @param EzTicket
             * @param EventManager
             */
                function ($scope, messages, $q, Ticket, EzTicket, EventManager) {
                $scope.text = null;
                $scope.ticket = null;
                $scope.dictTicket = null;
                $scope.translateTicket = null;

                $scope.resetTicket = function () {
                    $scope.ticket = null;
                    $scope.dictTicket = null;
                    $scope.translateTicket = null;
                };

                $scope.loadTicket = function () {
                    $scope.resetTicket();
                    return $scope.findTicket().then(function (ticket) {
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

                EventManager.onTextSelect(function (e, text) {
                    if (text.length > 2) {
                        $scope.text = text;
                        $scope.loadTicket();
                    }
                });
            }]);
});