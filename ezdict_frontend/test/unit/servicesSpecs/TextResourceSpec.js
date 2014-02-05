define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('Text', function () {

        var text;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            inject(['Text', function (Text) {
                text = new Text();
            }])
        });

        it('should test Text interface', function () {
            expect(text.$update).toBeDefined();
        });

    })
});
