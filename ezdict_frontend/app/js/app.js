define([
    'angular',
    'angular-animate',
    'angular-ui-router',
    'angular-resource',
    'controllers/index',
    'directives/index',
    'filters/index',
    'services/index'
], function (ng) {
    'use strict';

    return ng.module('ezdict', [
            'ezdict.services',
            'ezdict.controllers',
            'ezdict.filters',
            'ezdict.directives',
            'ui.router'
        ]);
});
