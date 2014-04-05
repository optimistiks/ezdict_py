define(['./module'], function (directives) {
    directives
        .directive('togglePanelAnimated', [function () {
            return function ($scope, element, attrs) {
                element.on('click', function () {
                    if ($scope.ticketPresent()) {
                        $scope.logSearch()['finally'](function () {
                            var $ = angular.element;
                            if ($('#footer').height() == '70') {
                                $.when(
                                        $(this).toggleClass('edit-sticker-active'),
                                        $('#footer').animate({'height': '50%', 'min-height': '460px'}, 400).css('overflow', 'visible')
                                    ).done(function () {
                                        //$('.desk-wrapper').fadeIn('slow');
                                    });
                            } else {
                                $.when(
                                        // $('.desk-wrapper').fadeOut('fast')
                                    ).done(function () {
                                        $('#footer').animate({'height': '70px', 'min-height': '0'}, 400).css('overflow', 'visible');
                                        $('.edit-sticker').toggleClass('edit-sticker-active');
                                    });

                            }
                        });
                    }
                });
            };

        }]);
});
