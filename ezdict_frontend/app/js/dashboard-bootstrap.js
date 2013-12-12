 /**
  * bootstraps angular onto the window.document node
  */
 define([
     'require',
     'angular',
     'app',
     'dashboard-routes',
     'constants',
     'config',
 ], function (require, ng) {
     'use strict';

     require(['domReady!'], function (document) {
         ng.bootstrap(document, ['ezdict']);
     });
});