var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');
var gutil = require('gulp-util');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
var path = require('path');
var wrap = require('gulp-wrap');


gulp.task('autoprefixer', function() {
    gulp.src([
        'public/style/components/*.css',
        'public/style/pages/*.css',
        'public/style/vendor/*.css'
    ])
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
        .pipe(gulp.dest('prefixed'));
});



gulp.task('css', function() {
    gulp.src([
        'prefixed/*.css'
    ])
        .pipe(concat('main.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('public'));
});



gulp.task('wrap', function() {  
    gulp.src([
    ])
        .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
        .pipe(gulp.dest('wrapped'))
        .on('error', gutil.log);
});


gulp.task('compress', function() {

     gulp.src([
        'public/js/vendor/ng.min.js',
        'public/js/vendor/*.js',
        'public/app.js',
        // 'public/js/config/*.js',
        // 'public/js/main/*.js',
        // 'public/js/admin/*.js',
        // 'public/js/auth/*.js',
        // 'public/js/company/*.js',  
        // 'public/js/jobs/*.js',
        // 'public/js/settings/*.js',
        'public/js/controllers/*.js',
        'public/js/directives/*.js',
        // 'public/js/site/controller.filter.js',
        // 'public/js/site/controller.people-questionary.js',
        // 'public/js/site/controller.questionary.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public'))
        .on('error', gutil.log);

});

gulp.task('templates', function() {
    gulp.src(['public/views/*.html'])
        .pipe(templateCache({ root: 'views', module: 'ppp' }))
        .pipe(gulp.dest('public'));
});

 gulp.task('default', ['templates']);
//gulp.task('default', ['css',  'wrap', 'compress', 'templates']);