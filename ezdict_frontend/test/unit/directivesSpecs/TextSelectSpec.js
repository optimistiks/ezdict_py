define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('textSelect', function () {
        var $compile,
            $rootScope,
            $window,
            $scope,
            EventManager,
            element;

        beforeEach(module('ezdict'));

        beforeEach(inject(['$compile', '$rootScope', '$window', 'EventManager',
            function (_$compile_, _$rootScope_, _$window_, _EventManager_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $window = _$window_;
                EventManager = _EventManager_;

                element = $compile("<div text-select></div>")($rootScope);
                $scope = element.scope();
            }]));

        it('should get selected text', function () {
            $window.getSelection = function () {
                return {
                    toString: function () {
                        return 'selected text';
                    }
                };
            };
            var text = $scope.getSelectedText();
            expect(text).toEqual('selected text')
        });

        it('should declare a mouseup handler which broadcasts selected text', function () {
            spyOn(EventManager, 'broadcastTextSelect');
            spyOn($scope, 'getSelectedText').andReturn('test');
            $scope.mouseupHandler();
            expect($scope.getSelectedText).toHaveBeenCalled();
            expect(EventManager.broadcastTextSelect).toHaveBeenCalledWith('test');
        });

        it('should trim a string before broadcasting', function () {
            spyOn(EventManager, 'broadcastTextSelect');
            spyOn($scope, 'getSelectedText').andReturn(' test ');
            $scope.mouseupHandler();
            expect($scope.getSelectedText).toHaveBeenCalled();
            expect(EventManager.broadcastTextSelect).toHaveBeenCalledWith('test');
        });
    });
});
