require.config({
    baseUrl: '/js',
    // alias libraries paths
    paths: {
        'domReady': '../lib/require/domReady',
        'angular': '../lib/angular/angular',
        'angular-animate': '../lib/angular/angular-animate',
        'angular-route': '../lib/angular/angular-route',
        'angular-resource': '../lib/angular/angular-resource',
        'ngProgress': '../lib/angular/ngProgress.min',
        'toaster': '../lib/toastr/toaster',
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'ngProgress': {
            deps: ['angular']
        },
    },

    // kick start application
    deps: ['./bootstrap']
});