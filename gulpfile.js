var gulp    = require('gulp');
var gulpTypeScript    = require('gulp-typescript');
var gulpJade    = require('gulp-jade');
var gulpPostCss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// JADE=>HTML
gulp.task(
	'jade',
	function () {
		var YOUR_LOCALS = {};

		gulp.src('./src/jade/*.jade')
			.pipe(gulpJade({locals: YOUR_LOCALS}))
			.pipe(gulp.dest('./dist/'))
			.pipe(reload({ stream:true }));
	}
);

// PostCSS=>CSS
gulp.task(
	'css',
	function(){
		return gulp.src('./src/postcss/*.css')
			.pipe(
				gulpPostCss(
					[
						autoprefixer({browsers:['last 1 version']}),
						cssnano()
					]
				)
			)
			.pipe(gulp.dest('./dist/css'))
			.pipe(reload({ stream:true }));
	}
);

// TYPESCRIPT=>JAVASCRIPT
gulp.task(
	'script',
	function(){
		"use strict";
		return gulp.src('./src/typescript/*.ts')
			.pipe(
				gulpTypeScript(
					{
						noImplicitAny: true,
						out: 'script.js'
					}
				)
			)
			.pipe((gulp.dest('./dist')))
			.pipe(reload({ stream:true }));
	}
);

// LIVE-RELOAD-SERVER
// watch files for changes and reload
gulp.task(
	'serve',
	['jade', 'css'],
	function(){
		browserSync(
			{
				server: {
					baseDir:'dist'
				}
			}
		);
		gulp.watch('./src/postcss/*.css', ['css']);
		gulp.watch('./src/jade/*.jade', ['jade']);
	}
);
