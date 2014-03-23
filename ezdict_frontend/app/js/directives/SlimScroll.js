define(['./module'], function (directives) {
    directives
        .directive('slimscroll', ['EventManager', '$log', function (EventManager, $log) {
            return function ($scope, element, attrs) {
                var applySlimScroll = function () {
                    if (element.parent('.slimScrollDiv').size() > 0) {
                        element.parent().replaceWith(element);
                    }
                    element.slimScroll($scope.$eval(attrs.slimscroll));
                };
                applySlimScroll();

                $scope.$watch('activeTicket + activeEzDictTicket + activeEzTranslateTicket', function (newVal, oldVal) {
                    applySlimScroll();
                })
            }
        }]);
});
