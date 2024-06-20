// Подключения
const {src, dest, watch, parallel, series} = require('gulp'),

	// Пакеты
	scss = require('gulp-sass')(require('sass')),
	include = require('gulp-include'),
	clean = require('gulp-clean'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	browserSync = require('browser-sync').create(),

	// Пути
	path = {
		build: {
			html: 'build/',
			js: 'build/static',
			css: 'build/static',
			img: 'build/static/images',
			fonts: 'build/static/fonts'
		},
		src: {
			html: 'src/*.html',
			js: 'src/js/*.js',
			styles: 'src/styles/*.scss',
			img: 'src/images/**/*.*',
			fonts: 'src/fonts/*.*'
		},
		watch: {
			html: 'src/**/*.html',
			js: 'src/js/**/*.js',
			styles: 'src/styles/**/*.scss',
			img: 'src/images/**/*.*',
			fonts: 'src/fonts/**/*.*'
		},
		source: 'src',
		dest: 'build'
	};


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

// Не работает (пустые картинки)
function images() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
}

// 
function fonts() {
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
}


// 
function watcher() {
	browserSync.init({
        server: {
            baseDir: path.dest
        }
    });
    watch(path.watch.html, html)
    watch(path.watch.js, scripts)
	watch(path.watch.styles, styles)
	watch(path.watch.img, images)
	watch(path.watch.fonts, fonts)
	.on('change', browserSync.reload);
}

// 
function cleanBuild() {
	return src(path.dest + "/*")
		.pipe(clean())
}

// TODO: Доработать (сваливает в кучу весь ассет)
function builder() {
	return src(Object.values(path.src)) // ", {base: path.source}"
		.pipe(dest(path.dest))
}


// Вывод
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.fonts = fonts;

exports.cleanBuild = cleanBuild;
exports.watcher = watcher;
exports.builder = builder;

exports.build = series(cleanBuild, builder);
exports.default = parallel(html, scripts, styles, images, fonts, watcher)