/*eslint-disable*/
'use strict';

// -----------------------------------------------
// Add requires
// -----------------------------------------------
var gulp          = require('gulp');
var pug           = require('gulp-pug');
var sass          = require('gulp-sass');
var rename        = require('gulp-rename');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync').create();
var manifest      = require('./manifest.json');

// --------------------------------------
// Browser Sync Task ----------
// --------------------------------------

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
});

// -----------------------------------------------
// JS Task
// -----------------------------------------------
gulp.task('js', function () {
  return gulp
    .src(manifest.src.scripts)
    .pipe(gulp.dest(manifest.dist.js))
    .pipe(browserSync.stream());
});

// --------------------------------------
// Pug Task
// --------------------------------------
gulp.task('pug', function () {
  return gulp.src(manifest.src.pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(manifest.dist.html))
    .pipe(browserSync.stream());
});

// -----------------------------------------------
// SASS Task
// -----------------------------------------------
gulp.task('sass', function () {
  return gulp.src(manifest.src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('main.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(manifest.dist.css))
    .pipe(browserSync.stream());
});

// --------------------------------------
// Watch Task
// --------------------------------------
gulp.task('watch', function () {
  gulp.watch(manifest.src.styles, ['sass']);
  gulp.watch(manifest.src.pugs, ['pug']);
  gulp.watch(manifest.src.scripts, ['js']);
});

gulp.task('build', ['sass', 'pug']);

gulp.task('default', ['watch', 'build', 'browser-sync']);