define(['./module'], function (directives) {
    'use strict';
    directives
        .directive('textSelect', ['$window', 'EventManager', '$log',
            function ($window, EventManager, $log) {
                return {
                    link: function ($scope, element) {

                        /**
                         * get currently selected text on page
                         * See {@link http://www.quirksmode.org/dom/range_intro.html#link2}
                         * @returns {String}
                         */
                        $scope.getSelectedText = function () {
                            var userSelection;

                            if ($window.getSelection) {
                                userSelection = $window.getSelection();
                            }
                            else if ($window.document.selection) { // should come last; Opera!
                                userSelection = $window.document.selection.createRange();
                            }

                            if (userSelection.text) {
                                userSelection = userSelection.text;
                            }

                            return userSelection.toString();
                        };

                        $scope.mouseupHandler = function () {
                            var selectedText = $scope.getSelectedText().replace(/^\s+|\s+$/g, '');
                            $log.log('findTicket.mouseup', selectedText);
                            EventManager.broadcastTextSelect(selectedText);
                        };

                        element.on('mouseup', $scope.mouseupHandler);
                    }
                };
            }]);
});
