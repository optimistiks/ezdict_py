/*global angular*/
define(['./module', 'videojs'], function (directives, videojs) {
    'use strict';
    directives
        .directive('videoJs', [
            '$sce',
            function ($sce) {
                return {
                    scope: {
                        streamUrl: '&'
                    },
                    templateUrl: '/partials/dashboard/video-js.html',
                    replace: true,
                    link: function ($scope, element, attrs) {
                        $scope.videoEl = element.find('source').get(0);
                        $scope.player = null;

                        var
                            dispose = function () {
                                if ($scope.player) {
                                    $scope.player.dispose();
                                }
                            };

                        $scope.getTrustedStreamUrl = function () {
                            return $sce.trustAsResourceUrl($scope.streamUrl());
                        };

                        $scope.$watch('videoEl.src', function (newSrc, oldSrc) {
                            if (newSrc) {
                                $scope.player = videojs("example_video_1", {}, function () {
                                });
                            }
                        });

                        $scope.$on('$destroy', function () {
                            dispose();
                        });
                    }
                };
            }
        ]);
});
