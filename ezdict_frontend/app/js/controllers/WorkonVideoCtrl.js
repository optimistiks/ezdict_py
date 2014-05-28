define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('WorkonVideoCtrl', [
            '$scope', '$stateParams', '$rootScope', '$http', '$window', '$interval', '$timeout', 'YouTubePlayer',
            function ($scope, $stateParams, $rootScope, $http, $window, $interval, $timeout, YouTubePlayer) {
                var urlForCaptions = 'https://www.youtube.com/api/timedtext',
                    isPlaying = function () {
                        return $scope.player && $scope.player.getPlayerState() === 1;
                    },
                    txt,
                    decodeHtml = function (html) {
                        txt = txt || document.createElement("textarea");
                        txt.innerHTML = html;
                        return txt.value;
                    },
                    interval;

                $scope.videoId = $stateParams.id;
                $scope.captions = [];
                $scope.player = null;
                $scope.currentCaptions = [];
                $scope.noCaptions = false;
                $scope.caption = null;

                $scope.sToMin = function (s) {
                    var min, sec;
                    s = Math.floor(s);
                    min = Math.floor(s / 60);
                    sec = s - 60 * min;
                    sec = sec < 10 ? '0' + sec : sec;
                    sec = sec || '00';
                    return min + ':' + sec;
                };

                $scope.$watchCollection('currentCaptions', function (newCaptions) {
                    if (newCaptions && newCaptions.length > 5) {
                        $scope.currentCaptions.shift();
                    }
                });

                $scope.$on('$destroy', function () {
                        $interval.cancel(interval);
                    }
                );

                $http.get(urlForCaptions, {params: {lang: 'en', v: $scope.videoId}})
                    .then(function (response) {
                        var x2js = new $window.X2JS(),
                            captions = x2js.xml_str2json(response.data), i;

                        if (captions) {
                            $scope.captions = captions.transcript.text;

                            for (i = 0; i < $scope.captions.length; i++) {
                                //todo: check for crossing captions
                            }
                        } else {
                            $scope.noCaptions = true;
                        }
                    });

                $scope.showNextCaption = function(previousCaption) {
                    debugger;
                    var caption, timeMs, cStartMs, cDurMs;
                    caption = $scope.getNextCaption(previousCaption);
                    if (caption)
                    {
                        cStartMs = parseFloat(caption._start) * 1000;
                        cDurMs = parseFloat(caption._dur) * 1000;
                        timeMs = $scope.player.instance.getCurrentTime() * 1000;

                        $timeout(function() {
                            $scope.caption = caption;

                            $timeout(function() {
                                $scope.showNextCaption($scope.caption);
                                $scope.caption = null;
                            }, cDurMs);

                        }, cStartMs - timeMs);

                    }
                };

                $scope.getNextCaption = function(previousCaption) {
                    var caption;

                    if (!previousCaption) {
                        caption = angular.extend({index: 0}, $scope.captions[0]);
                    } else {
                        caption = angular.extend({index: previousCaption.index + 1}, $scope.captions[previousCaption.index + 1]);
                    }

                    return caption;
                };

                $rootScope.$on('youTubePlayerIsReady', function (evt, player) {
                    $scope.player = new YouTubePlayer(player);

                    $window.onPlayerStateChange = function(newState) {
                        if (newState === YouTubePlayer.STATE_PLAYING)
                        {
                            $scope.showNextCaption();
                        }
                        //todo: pause somehow
                    };

                    $scope.player.instance.addEventListener("onStateChange", "onPlayerStateChange");
                });
            }
        ])
    ;
});
