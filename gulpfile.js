var gulp = require('gulp'),
runSequence = require('run-sequence'),
jshint = require('gulp-jshint');

gulp.task('default', function(){
    console.log('Running default task of Gulp');
});

gulp.task('verify-js', function(){
    console.log('Running verify-js task of Gulp');
    return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('build', function(){
    console.log('Running build task of Gulp');
    runSequence(
        'verify-js'
    );
});