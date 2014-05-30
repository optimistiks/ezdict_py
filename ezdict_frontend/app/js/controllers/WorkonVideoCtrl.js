define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('WorkonVideoCtrl', [
            '$scope', '$stateParams', '$rootScope', '$http', '$window', '$interval', '$timeout', 'YouTubePlayer', '$sce',
            function ($scope, $stateParams, $rootScope, $http, $window, $interval, $timeout, YouTubePlayer, $sce) {
                var urlForCaptions = 'https://www.youtube.com/api/timedtext',
                    isPlaying = function () {
                        return $scope.player && $scope.player.instance.getPlayerState() === YouTubePlayer.STATE_PLAYING;
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
                            captions = captions.transcript.text;

                            for (i = 0; i < captions.length; i++) {
                                captions[i].__text = $sce.trustAsHtml(decodeHtml(captions[i].__text));
                            }

                            $scope.captions = captions;
                        } else {
                            $scope.noCaptions = true;
                        }
                    });

                $scope.showNextCaption = function() {
                    debugger;
                    var caption, timeMs, cStartMs, cDurMs;
                    caption = $scope.getNextCaption();
                    if (caption && isPlaying())
                    {
                        cStartMs = parseFloat(caption._start) * 1000;
                        cDurMs = parseFloat(caption._dur) * 1000;
                        timeMs = $scope.player.instance.getCurrentTime() * 1000;

                        $timeout(function() {
                            $scope.currentCaptions.push(caption);

                            $timeout(function() {
                                $scope.showNextCaption();
                            }, cDurMs);

                        }, cStartMs - timeMs);

                    }
                };

                $scope.getNextCaption = function() {
                    var nextCaption, lastCaption;

                    lastCaption = $scope.currentCaptions[$scope.currentCaptions.length - 1];

                    if (!lastCaption) {
                        nextCaption = angular.extend({index: 0}, $scope.captions[0]);
                    } else {
                        nextCaption = angular.extend({index: lastCaption.index + 1}, $scope.captions[lastCaption.index + 1]);
                    }

                    return nextCaption;
                };

                $rootScope.$on('youTubePlayerIsReady', function (evt, player) {
                    $scope.player = new YouTubePlayer(player);

                    $window.onPlayerStateChange = function(event) {
                        if (event.data === YouTubePlayer.STATE_PLAYING)
                        {
                            $scope.showNextCaption();
                        }
                    };

                    $scope.player.instance.addEventListener("onStateChange", "onPlayerStateChange");
                });
            }
        ])
    ;
});
