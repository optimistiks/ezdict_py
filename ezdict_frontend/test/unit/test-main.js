var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    baseUrl: '/base/app/js',
    // alias libraries paths
    paths: {
        'domReady': '../lib/require/domReady',
        'angular': '../lib/angular/angular',
        'angular-animate': '../lib/angular/angular-animate',
        'angular-ui-router': '../lib/angularUi/angular-ui-router',
        'angular-resource': '../lib/angular/angular-resource',
        'angular-mock': '../../test/lib/angular/angular-mocks',
        'ngProgress': '../lib/ngProgress/ngProgress.min',
        'toaster': '../lib/toastr/toaster',
        'ngCkeditor': '../lib/ngCkeditor/ng-ckeditor',
        'ckeditor': '../lib/ngCkeditor/libs/ckeditor/ckeditor',
        'videojs': '../lib/videojs/video'
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
        'angular-mock': {
            deps: ['angular']
        },
        'ngProgress': {
            deps: ['angular']
        },
        'ckeditor': {
            exports: 'CKEDITOR'
        },
        'ngCkeditor': {
            deps: ['angular', 'ckeditor']
        }
    },

    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});