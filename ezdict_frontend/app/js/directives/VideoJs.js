/*global angular*/
define(['./module', 'videojs'], function (directives, videojs) {
    'use strict';
    directives
        .directive('videoJs', [
            function () {
                return {
                    scope: {
                        movieId: '@'
                    },
                    templateUrl: '/partials/dashboard/video-js.html',
                    replace: true,
                    link: function ($scope, element, attrs) {
                        $scope.videoEl = element.find('source').get(0);

                        $scope.getMovieUrl = function() {
                            return '/tvideo/' + $scope.movieId;
                        };

                        $scope.$watch('videoEl.src', function() {
                            videojs("example_video_1", {}, function(){
                                // Player (this) is initialized and ready.
                            });
                        });
                    }
                }
            }
        ]);
});
