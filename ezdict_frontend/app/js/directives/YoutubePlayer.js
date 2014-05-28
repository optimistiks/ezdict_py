/*global angular*/
define(['./module'], function(directives) {
  'use strict';
  directives
    .directive('youtubePlayer', [
      '$window', '$q', '$rootScope',
      function($window, $q, $rootScope) {
        var PLAYER_ID = 'myytplayer',
          ELEMENT_ID = 'ytapiplayer',
          API_ID = 'ytplayer';

        return {
          scope: {
            videoId: '@'
          },
          templateUrl: '/partials/dashboard/youtube-player.html',
          replace: true,
          link: function($scope, element, attrs) {
            var
              playerParams = {allowScriptAccess: "always", allowFullScreen: "true"},
              playerAttrs = {id: PLAYER_ID},
              playerUrl = "http://www.youtube.com/v/" + $scope.videoId + "?enablejsapi=1&playerapiid=" + API_ID;

            $window.onYouTubePlayerReady = function() {
              var player = document.getElementById(PLAYER_ID);
              $rootScope.$broadcast('youTubePlayerIsReady', player);
            };

            $window.swfobject.embedSWF(playerUrl, ELEMENT_ID, "425", "356", "8", null, null, playerParams, playerAttrs);
          }
        };
      }
    ]);
});
