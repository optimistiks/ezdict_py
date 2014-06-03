/*global angular*/
define(['./module'], function (directives) {
    'use strict';
    directives
        .directive('youtubePlayer', [
            '$window', '$q', '$rootScope',
            function ($window, $q, $rootScope) {
                var
                    ELEMENT_ID = 'ytapiplayer';

                return {
                    scope: {
                        videoId: '@'
                    },
                    templateUrl: '/partials/dashboard/youtube-player.html',
                    replace: true,
                    link: function ($scope, element, attrs) {
                        var ytScriptTag,
                            firstScriptTag;

                        $scope.createPlayer = function () {
                            var player = new $window.YT.Player(ELEMENT_ID, {
                                height: '200',
                                width: '100%',
                                videoId: $scope.videoId,
                                playerVars: {
                                    wmode: 'opaque'
                                }
                            });

                            $rootScope.$broadcast('youTubePlayerIsReady', player);
                        };

                        if (!$window.YT) {
                            $window.onYouTubeIframeAPIReady = function () {
                                $scope.createPlayer();
                            };

                            ytScriptTag = document.createElement('script');
                            ytScriptTag.src = "https://www.youtube.com/iframe_api";
                            firstScriptTag = document.getElementsByTagName('script')[0];
                            firstScriptTag.parentNode.insertBefore(ytScriptTag, firstScriptTag);
                        } else {
                            $scope.createPlayer();
                        }
                    }
                };
            }
        ]);
});
