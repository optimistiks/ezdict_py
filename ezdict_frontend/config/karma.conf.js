module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/js/vendor/jquery-1.9.0.min.js',
      'app/lib/require/require.js',
      'app/js/main.js',
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
