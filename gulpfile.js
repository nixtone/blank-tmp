// Подключения
const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const include = require('gulp-include');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();

// Пути
const path = {
	build: {
		html: 'build/',
		js: 'build/static',
		css: 'build/static',
		img: 'build/images',
		fonts: 'build/static/fonts'
	},
	src: {
		html: 'src/html/*.html',
		js: 'src/js/*.js',
		styles: 'src/styles/custom.scss',
		img: 'src/images/**/*.*',
		fonts: 'src/fonts/*.*'
	},
	watch: {
		html: 'src/html/**/*.html',
		js: 'src/js/**/*.js',
		styles: 'src/styles/**/*.scss',
		img: 'src/images/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	source: 'src',
	dest: 'build'
}

// 
function html() {
	return src(path.src.html)
		.pipe(include())
		.pipe(dest(path.build.html))
		.pipe(browserSync.stream())
}

// 
function scripts() {
	return src(path.src.js)

		.pipe(dest(path.build.js))
		.pipe(browserSync.stream())
}

// 
function styles() {
	return src(path.src.styles)
		.pipe(scss())
		.pipe(dest(path.build.css))
		.pipe(browserSync.stream())
}

// 
function watcher() {
	browserSync.init({
        server: {
            baseDir: path.dest
        }
    });
	watch(path.watch.styles, styles)
	watch(path.watch.js, scripts)
	watch(path.watch.html, html).on('change', browserSync.reload);
}

// 
function cleanBuild() {
	return src(path.dest)
		.pipe(clean())
}

// TODO: Доработать... 
function builder() {
	return src(Object.values(path.watch)) // ", {base: path.source}"
		.pipe(dest(path.dest))
}

// Вывод
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.cleanBuild = cleanBuild;
exports.watcher = watcher;
exports.builder = builder;

exports.build = series(cleanBuild, builder); // TODO: Проверить