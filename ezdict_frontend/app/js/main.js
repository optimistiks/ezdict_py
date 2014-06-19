require.config({
    baseUrl: '/js',
    urlArgs: 'v=' + Date.now(),
    // alias libraries paths
    paths: {
        'domReady': '../lib/require/domReady',
        'angular': '../lib/angular/angular',
        'angular-animate': '../lib/angular/angular-animate',
        'angular-ui-router': '../lib/angularUi/angular-ui-router',
        'angular-resource': '../lib/angular/angular-resource',
        'ngProgress': '../lib/ngProgress/ngProgress.min',
        'toaster': '../lib/toastr/toaster',
        'ngCkeditor': '../lib/ngCkeditor/ng-ckeditor',
        'ckeditor': '../lib/ngCkeditor/libs/ckeditor/ckeditor',
        'videojs': '//vjs.zencdn.net/4.6/video'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'ngProgress': {
            deps: ['angular']
        },
        'toaster': {
            deps: ['angular']
        },
        'ckeditor': {
            exports: 'CKEDITOR'
        },
        'ngCkeditor': {
            deps: ['angular', 'ckeditor']
        },
        'videojs': {
            exports: 'videojs'
        }
    },

    // kick start application
    deps: ['bootstrap']
});