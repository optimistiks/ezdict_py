define(['./module'], function (factory) {
    'use strict';
    factory.

        factory('YouTubePlayer', [
            function () {

                /**
                 * @param player
                 * @class YouTubePlayer
                 */
                var YouTubePlayer = function(player) {
                    this.instance = player;
                };

                YouTubePlayer.STATE_UNSTARTED = -1;
                YouTubePlayer.STATE_ENDED = 0;
                YouTubePlayer.STATE_PLAYING = 1;
                YouTubePlayer.STATE_PAUSED = 2;
                YouTubePlayer.STATE_BUFFERING = 3;
                YouTubePlayer.STATE_CUED = 5;

                YouTubePlayer.prototype = {};

                return YouTubePlayer;
            }
      ]);
});