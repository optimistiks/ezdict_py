/*global angular*/
define(['./module'], function (directives) {
    'use strict';
    directives
        .directive('youtubeCaption', [
            function () {
                return {
                    scope: {
                        caption: '&',
                        player: '&'
                    },
                    templateUrl: '/partials/dashboard/youtube-caption.html',
                    replace: true,
                    link: function ($scope, element, attrs) {
                        element.on('mouseenter', function() {
                            $scope.player().pauseVideo();
                        });

                        element.on('mouseout', function() {
                            $scope.player().playVideo();
                        });
                    }
                };
            }
        ]);
});
