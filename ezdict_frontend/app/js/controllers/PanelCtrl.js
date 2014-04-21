define(['./module'], function (controllers) {
    'use strict';
    controllers.
        controller('PanelCtrl', ['$scope', 'TextMessages', '$q', 'Ticket', 'EzTicket', 'EventManager',
            'TicketSearchLog', '$sce', 'toaster',

            /**
             * @param $scope
             * @param messages
             * @param $q
             * @param Ticket
             * @param EzTicket
             * @param EventManager
             * @param TicketSearchLog
             */
                function ($scope, messages, $q, Ticket, EzTicket, EventManager, TicketSearchLog, $sce, toaster) {

                /**
                 * слово, для которого в данный момент загружен или загружается тикет
                 * @type {string}
                 */
                $scope.activeWord = '';

                /**
                 * текст, введеный в поле для поиска (на панели тикетов)
                 * @type {string}
                 */
                $scope.inputText = '';

                $scope.ticket = null;
                $scope.dictTicket = null;
                $scope.translateTicket = null;

                $scope.deskDictTicket = null;
                $scope.deskTranslateTicket = null;

                $scope.log = null;

                /**
                 * @type {string}
                 */
                $scope.userTicketContent = '';

                $scope.ticketToSave = new Ticket();

                /**
                 * последнее залоггированое слово
                 * @type {string}
                 */
                $scope.previousWord = '';

                /**
                 * будет ли тикет закрыт, чтобы по нему был засчитан просмотр, или же отображен сразу
                 * @type {boolean}
                 */
                $scope.protection = false;

                /**
                 * опции ckeditor редактирование тикетов
                 * @type {Object}
                 */
                $scope.ckEditorOptions = {
                    height: '200px',
                    width: 'auto'
                };

                /**
                 * обработка клика по кнопке найти в панели тикетов
                 */
                $scope.searchFromField = function () {
                    if (($scope.previousWord !== $scope.inputText) || $scope.protection) {
                        $scope.activeWord = $scope.inputText;
                        $scope.previousWord = $scope.inputText;
                        $scope.protection = false;
                        $scope.loadTicket();
                    }

                }
                ;

                /**
                 * обработка выделения слова в тексте
                 */
                $scope.searchFromText = function () {
                    if ($scope.previousWord !== $scope.activeWord) {
                        $scope.previousWord = $scope.activeWord;
                        $scope.protection = true;
                        $scope.loadTicket();
                    }
                };

                /**
                 * загрузка одного из трех видов тикета в $scope
                 * @returns {promise}
                 */
                $scope.loadTicket = function () {
                    var deferred = $q.defer(),
                        promise = deferred.promise;

                    $scope.resetTicket();
                    $scope.findTicket().then(function (ticket) {
                        $scope.userTicketContent = $sce.trustAsHtml(ticket.text);
                        $scope.ticket = ticket;
                        deferred.resolve(ticket);
                    }, function () {
                        $scope.findDictTicket().then(function (ticket) {
                            $scope.dictTicket = ticket;
                            deferred.resolve(ticket);
                        }, function () {
                            $scope.findTranslateTicket().then(function (ticket) {
                                $scope.translateTicket = ticket;
                                deferred.resolve(ticket);
                            });
                        });
                    });

                    return promise;
                };

                /**
                 * возвращает загруженый тикет
                 * @returns {AbstractTicket}
                 */
                $scope.activeTicket = function () {
                    return $scope.ticket || $scope.dictTicket || $scope.translateTicket;
                };

                /**
                 * засчитывает просмотр слова и снимает защиту
                 */
                $scope.removeProtection = function () {
                    $scope.logSearch().then(function () {
                        $scope.protection = false;
                    });
                };

                $scope.resetTicket = function () {
                    $scope.log = null;
                    $scope.ticket = null;
                    $scope.dictTicket = null;
                    $scope.translateTicket = null;
                };

                /**
                 * @returns {promise}
                 */
                $scope.findTicket = function () {
                    return Ticket.findTicket($scope.activeWord);
                };

                /**
                 * @returns {promise}
                 */
                $scope.findDictTicket = function () {
                    return EzTicket.findDictTicket($scope.activeWord);
                };

                $scope.findTranslateTicket = function () {
                    return EzTicket.translate({word: $scope.activeWord}).$promise;
                };

                $scope.deleteTicket = function () {
                    if (confirm(messages.TICKET_DELETE_PROMPT)) {
                        $scope.ticket.$delete(function () {
                            $scope.resetTicket();
                        });
                    }
                };

                $scope.logSearch = function () {
                    return TicketSearchLog.log({word: $scope.activeWord},function (log) {
                        $scope.log = log;
                    }).$promise;
                };

                $scope.ticketIsOwn = function () {
                    return $scope.activeTicket() && $scope.activeTicket().belongsTo($scope.user);
                };

                $scope.editTicket = function () {
                    $scope.ticketToSave = $scope.ticket || $scope.ticketToSave;
                    $scope.editVisible = true;
                };

                $scope.cancelEdit = function () {
                    $scope.editVisible = false;
                };

                $scope.saveTicket = function () {
                    var errorCallback = function () {
                            toaster.pop('error', 'Ошибка');
                        },
                        successCallback = function () {
                            toaster.pop('success', 'Сохранено');
                            $scope.userTicketContent = $sce.trustAsHtml($scope.ticketToSave.text);
                            $scope.editVisible = false;
                            if (!$scope.ticket) {
                                $scope.ticket = $scope.ticketToSave;
                            }
                        };

                    if ($scope.ticketToSave.id) {
                        $scope.ticketToSave.$update(successCallback, errorCallback);
                    } else {
                        $scope.ticketToSave.word = $scope.activeWord;
                        $scope.ticketToSave.$save(successCallback, errorCallback);
                    }
                };

                $scope.loadPanel = function () {
                    $scope.findDictTicket().then(function (dictTicket) {
                        $scope.deskDictTicket = dictTicket;
                    }, function () {
                        $scope.findTranslateTicket().then(function(translateTicket){
                            $scope.deskTranslateTicket = translateTicket;
                        });
                    });
                };

                EventManager.onTextSelect(function (e, text) {
                    if (text.length > 2) {
                        $scope.activeWord = text;
                        $scope.searchFromText();
                    }
                });
            }
        ])
    ;
});