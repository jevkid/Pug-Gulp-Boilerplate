var gulp = require('gulp'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    less = require('gulp-less');

gulp.task('serve', function() {
    connect.server();
    gulp.src('./public')
        .pipe(webserver({
            port:'9090',
            open: true
        }));
});
gulp.task('build-boot', function() {
    return gulp.src(['./source/bootstrap/*'])
        .pipe(concat('bootstrap.css'))
        .pipe(gulp.dest('./public/assets/stylesheets'));
});
gulp.task('build-less', function(){
    return gulp.src('./source/less/*')
        .pipe(concat('main.css'))
        .pipe(less())
        .pipe(gulp.dest('./public/assets/stylesheets'));
});

gulp.task('build-jade', function(){
    return gulp.src('./source/templates/*')
        .pipe(jade())
        .pipe(gulp.dest('./public'));
});

gulp.task('default', ['build-less', 'build-jade', 'build-boot', 'serve']);

gulp.task('dev', ['default', 'watch']);

gulp.task('watch', function() {
    gulp.watch('./source/less/main.less', ['build-less']);
    gulp.watch('./public/assets/stylesheets/bootstrap.css');
    gulp.watch('./public/assets/stylesheets/font-awesome.css');
    gulp.watch('./source/templates/**', ['build-jade']);
});
