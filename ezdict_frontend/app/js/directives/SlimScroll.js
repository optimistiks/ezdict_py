define(['./module'], function (directives) {
    directives
        .directive('slimscroll', function () {
            return function ($scope, element, attrs) {
                element.slimScroll($scope.$eval(attrs.slimscroll));
            }
        });
});
