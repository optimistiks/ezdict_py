define(['./module'], function (directives) {
    directives
        .directive('ezcontentswitch', ['$state', '$stateParams', 'constants',
            function ($state, $stateParams, constants) {
                return {
                    scope: {},
                    templateUrl: '/partials/dashboard/ez-content-switch.html',
                    replace: true,
                    link: function ($scope, element, attrs) {
                        $scope.TYPE_TEXT = constants.TYPE_TEXT;
                        $scope.TYPE_VIDEO = constants.TYPE_VIDEO;
                        $scope.TYPE_MUSIC = constants.TYPE_MUSIC;

                        $scope.changeType = function (typeOfContent) {
                            $state.transitionTo($state.current, {typeOfContent: typeOfContent}, {
                                inherit: true
                            });
                        };

                        $scope.getIsActive = function (typeOfContent) {
                            return typeOfContent === $stateParams.typeOfContent;
                        }
                    }
                }
            }]);
});
