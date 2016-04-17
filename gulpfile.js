var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin');

gulp.task('sass', function(){
	return gulp.src('./client/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./client/'));
});

gulp.task('sass:w', function(){
	gulp.watch('./client/**/*.scss', ['sass'])
});

