define([], function () {
    'use strict';
    var ErrorsHandlerMixin = function () {
        this.errors = {};

        this.hasErrors = function (field) {
            return this.errors[field] && this.errors[field].length > 0;
        };

        this.getErrors = function (field) {
            var errors = [];
            if (this.errors[field] && this.errors[field].length > 0) {
                errors = this.errors[field]
            }
            return errors;
        };

        this.getErrorString = function (field, glue) {
            glue = glue || '<br>';
            var errors = this.getErrors(field);
            return errors.join(glue);
        };
    };

    return ErrorsHandlerMixin
});