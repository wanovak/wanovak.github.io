'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const run = require('gulp-run-command').default;

gulp.task('sass', async function() {
  const sassSrc = gulp.src('./assets/css/app.scss').pipe(
    sass({ includePaths: ['node_modules/foundation-sites/scss', 'node_modules/@fortawesome/fontawesome-free/scss', 'node_modules/tocbot/src/scss'] }).on('error', sass.logError)
  ).pipe(
    autoprefixer()
  );

  const cssSrc = gulp.src('./assets/css/highlight.css');

  merge(cssSrc, sassSrc)
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./assets/css/app.scss', gulp.series('sass'));
});

gulp.task('js', function () {
  return gulp.src(['node_modules/tocbot/dist/tocbot.js', 'node_modules/sticky-js/dist/sticky.min.js', './assets/js/highlight.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('fonts', function() {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('./assets/webfonts/'))
});

gulp.task('build', run('gssg --url https://wanovak.com --dest ../../../../'));
