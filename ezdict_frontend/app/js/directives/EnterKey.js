define(['./module'], function (directives) {
    directives
        .directive('enterKey', ['constants', '$log', function (constants, $log) {
            return function ($scope, element, attrs) {
                element.on('keyup', function ($event) {
                    if ($event.keyCode === constants.ENTER_KEYCODE) {
                        $scope.$eval(attrs.enterKey);
                    }
                });
            }
        }]);
});
