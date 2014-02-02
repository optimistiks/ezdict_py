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

                        if (!$stateParams.type) {
                            $state.transitionTo($state.current, {type: $scope.TYPE_TEXT}, {
                                inherit: true
                            });
                        }

                        $scope.changeType = function (type) {
                            $state.transitionTo($state.current, {type: type}, {
                                inherit: true
                            });
                        };

                        $scope.getIsActive = function (type) {
                            return type === $stateParams.type;
                        }
                    }
                }
            }]);
});
