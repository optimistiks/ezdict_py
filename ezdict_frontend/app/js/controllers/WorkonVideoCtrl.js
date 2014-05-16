define(['./module'], function (controllers) {
    'use strict';
    controllers.

        controller('WorkonVideoCtrl', [
            '$scope', '$stateParams', '$rootScope', '$http', '$window', '$interval', '$timeout',
            function ($scope, $stateParams, $rootScope, $http, $window, $interval, $timeout) {
                var urlForCaptions = 'https://www.youtube.com/api/timedtext',
                    isPlaying = function () {
                        return $scope.player && $scope.player.getPlayerState() === 1;
                    },
                    shownCaptionsStartTimes = [],
                    CAPTIONS_REFRESH_TIME = 100,
                    TO_FIXED = 1,
                    txt,
                    decodeHtml = function (html) {
                        txt = txt || document.createElement("textarea");
                        txt.innerHTML = html;
                        return txt.value;
                    },
                    previousTime,
                    interval;

                $scope.videoId = $stateParams.id;
                $scope.captions = [];
                $scope.player = null;
                $scope.currentCaptions = [];
                $scope.noCaptions = false;

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

                interval = $interval(function () {
                    if (isPlaying()) {
                        var
                            curTime = $scope.player.getCurrentTime().toFixed(TO_FIXED),
                            caption;

                        if (previousTime === curTime) {
                            curTime = (parseFloat(curTime) - 0.1).toFixed(TO_FIXED);
                        }

                        previousTime = curTime;

                        caption = $scope.captions[curTime];

                        if (caption && shownCaptionsStartTimes.indexOf(caption._start) === -1) {
                            shownCaptionsStartTimes.push(caption._start);
                            $scope.currentCaptions.push(caption);
                        }
                    }
                }, CAPTIONS_REFRESH_TIME);

                $scope.$on('$destroy', function () {
                        $interval.cancel(interval);
                    }
                );

                $http.get(urlForCaptions, {params: {lang: 'en', v: $scope.videoId}})
                    .then(function (response) {
                        var x2js = new $window.X2JS(),
                            captions = x2js.xml_str2json(response.data),
                            captionsByStartTime = {},
                            i,
                            index;

                        if (captions) {
                            captions = captions.transcript.text;
                            for (i = 0; i < captions.length; i++) {
                                index = parseFloat(captions[i]._start).toFixed(TO_FIXED);
                                captions[i].__text = decodeHtml(captions[i].__text);
                                captionsByStartTime[index] = captions[i];
                            }
                            $scope.captions = captionsByStartTime;
                        } else {
                            $scope.noCaptions = true;
                        }
                    });

                $rootScope.$on('youTubePlayerIsReady', function (evt, player) {
                    $scope.player = player;
                });
            }
        ])
    ;
});
