/*global angular*/
define(['./module'], function(directives) {
  'use strict';
  directives
    .directive('youtubePlayer', [
      '$window', '$q', '$rootScope',
      function($window, $q, $rootScope) {
        var
          ELEMENT_ID = 'ytapiplayer';

        return {
          scope: {
            videoId: '@'
          },
          templateUrl: '/partials/dashboard/youtube-player.html',
          replace: true,
          link: function($scope, element, attrs) {
            var ytScriptTag,
              firstScriptTag;

            $window.onYouTubeIframeAPIReady = function() {
              var player = new YT.Player(ELEMENT_ID, {
                height: '390',
                width: '640',
                videoId: $scope.videoId
              });

              $rootScope.$broadcast('youTubePlayerIsReady', player);
            };

            ytScriptTag = document.createElement('script');
            ytScriptTag.src = "https://www.youtube.com/iframe_api";
            firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(ytScriptTag, firstScriptTag);
          }
        };
      }
    ]);
});
