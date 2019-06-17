'use strict';

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
function test() {
    return gulp.src('tests/**/*-spec.js')
        .pipe(jasmine());
}

exports.test = gulp.series(test);