define(['./module'], function (factory) {
    'use strict';
    factory.

        factory('AbstractModel', [function () {

            /**
             * @class AbstractModel
             */
            var AbstractModel = function () {
                this.errors = {};
            };

            AbstractModel.prototype = {};

            AbstractModel.prototype.hasErrors = function (field) {
                return this.errors[field] && this.errors[field].length > 0;
            };

            AbstractModel.prototype.getErrors = function (field) {
                var errors = [];
                if (this.errors[field] && this.errors[field].length > 0) {
                    errors = this.errors[field];
                }
                return errors;
            };

            AbstractModel.prototype.getErrorString = function (field, glue) {
                glue = glue || '<br>';
                var errors = this.getErrors(field);
                return errors.join(glue);
            };

            return AbstractModel;
        }]);
});