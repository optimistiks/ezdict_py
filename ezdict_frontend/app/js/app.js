define([
     'angular',
     'angular-animate',
     'angular-route',
     'angular-resource',
     './controllers/index',
     './directives/index',
     './filters/index',
     './services/index'
 ], function (ng) {
     'use strict';

     return ng.module('ezdict', [
         'ezdict.services',
         'ezdict.controllers',
         'ezdict.filters',
         'ezdict.directives',
         'ngRoute'
     ]);
});
