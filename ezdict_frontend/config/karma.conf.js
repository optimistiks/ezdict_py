module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/js/vendor/jquery-1.9.0.min.js',
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/lib/toastr/toaster.js',
      'app/lib/angular/ngProgress.min.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/^angular*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
