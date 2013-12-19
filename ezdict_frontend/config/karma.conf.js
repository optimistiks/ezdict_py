module.exports = function (config) {
    config.set({
        basePath: '../',

        files: [
            'app/js/vendor/jquery-1.9.0.min.js',

            {pattern: 'app/lib/**/*.js', included: false},
            {pattern: 'app/js/**/*.js', included: false},
            {pattern: 'test/lib/**/*.js', included: false},
            {pattern: 'test/unit/controllersSpec.js', included: false},

            'test/unit/test-main.js'
        ],

        exclude: [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/^angular*.min.js',
            'test/lib/angular/angular-scenario.js',
            'app/js/main.js',
            'app/js/dashboard-main.js',
        ],

        autoWatch: true,

        frameworks: ['jasmine', 'requirejs'],

        browsers: ['Chrome'],

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-requirejs',
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    })
}
