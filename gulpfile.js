/*
const gulpif = require('gulp-if');
let isProd = false; // dev by default

.pipe(gulpif(!isProd, sourcemaps.init()))
.pipe(gulpif(!isProd, sourcemaps.write('.')))
*/

const {src, dest, watch, parallel, series} = require('gulp'),

	// Пакеты
	scss = require('gulp-sass')(require('sass')),
	sourcemaps = require('gulp-sourcemaps'),
	fileinclude = require('gulp-file-include'),
	browserSync = require('browser-sync').create(),

	// Пути
	path = {
		build: {
			html: './',
			css: './static/'
		},
		src: {
			html: './src/html/*.html',
			styles: './src/styles/*.scss',
		},
		watch: {
			html: './src/html/**/*.html',
			styles: './src/styles/**/*.scss',
		},
		// source: 'src',
		dest: './'

};

// 
function html() {
	return src(path.src.html)
		.pipe(fileinclude({
			prefix: '@@',
      		basepath: '@file'
		}))
		.pipe(dest(path.build.html));
}

//
function styles() {
	return src(path.src.styles)
		.pipe(sourcemaps.init())
		.pipe(scss())
		.pipe(sourcemaps.write())
		.pipe(dest(path.build.css))
		.pipe(browserSync.stream());
}

//
function watcher() {
	browserSync.init({
        server: {
            baseDir: path.dest
        }
    });
    watch(path.watch.html, html)
	watch(path.watch.styles, styles)
	.on('change', browserSync.reload);
}

// 



// Вывод
exports.html = html;
exports.styles = styles;
exports.watcher = watcher;

exports.default = parallel(html, styles, watcher);