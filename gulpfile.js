'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('sass', function(){
    return gulp.src('./sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function(){
    gulp.watch('./sass/**/*.sass',['sass']);
});

gulp.task('browserify', function(){
    return browserify('./js/index.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
});

gulp.task('moveJson', function(){
    gulp.src('./js/menu.json')
    .pipe(gulp.dest('./public'))
});

gulp.task('default', ['sass', 'browserify', 'moveJson']);
