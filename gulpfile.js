///////////////////////////////////////////////////
// 
// Требуемые плагины
// 
///////////////////////////////////////////////////

var gulp = require("gulp"),
	plugins = require('gulp-load-plugins')(),
	browserSync = require("browser-sync"),
	reload = browserSync.reload,
	rimraf = require("rimraf");

///////////////////////////////////////////////////
// 
// Создание переменных конфигурации
//
///////////////////////////////////////////////////

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/scripts.js',
		style: 'src/style/styles.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build'
};

///////////////////////////////////////////////////
//
// Задачи для HTML
//
///////////////////////////////////////////////////

gulp.task("html:build", function() {
	gulp.src(path.src.html)
	.pipe(plugins.rigger())
	.pipe(gulp.dest(path.build.html))
	.pipe(reload({stream: true}));
});

///////////////////////////////////////////////////
//
// Задачи для стилей
//
//////////////////////////////////////////////////

gulp.task("style:build", function() {
	gulp.src(path.src.style)
	.pipe(plugins.sass())
	.pipe(plugins.uncss({
		html: ["src/templates/*.html"]
	}))
	//.pipe(plugins.minifyCss())
	.pipe(plugins.rename({suffix: '.min'}))
	.pipe(gulp.dest(path.build.css))
	.pipe(reload({stream: true}));
});

///////////////////////////////////////////////////
//
// Задачи для скриптов
//
//////////////////////////////////////////////////

gulp.task("js:build", function() {
	gulp.src(path.src.js)
	.pipe(plugins.rigger())
	.pipe(plugins.uglify())
	.pipe(plugins.rename({suffix: '.min'}))
	.pipe(gulp.dest(path.build.js))
	.pipe(reload({stream: true}));
});

///////////////////////////////////////////////////
//
// Задачи для изображений
//
///////////////////////////////////////////////////

gulp.task("image:build", function() {
	gulp.src(path.src.img)
	.pipe(plugins.imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [plugins.pngmin()],
		interlaced: true
	}))
	.pipe(gulp.dest(path.build.img))
	.pipe(reload({stream: true}));
});

///////////////////////////////////////////////////
//
// Задачи для шрифтов
//
///////////////////////////////////////////////////

gulp.task("fonts:build", function() {
	gulp.src(path.src.fonts)
	.pipe(gulp.dest(path.build.fonts));
});

///////////////////////////////////////////////////
//
// Задачи Browser-Sync
//
///////////////////////////////////////////////////

gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "./build"
		},
		port: 8080,
		open: true,
		notify: false
	});
});

///////////////////////////////////////////////////
//
// Задачи для очистки
//
///////////////////////////////////////////////////

gulp.task("clean", function(cb) {
	rimraf(path.clean, cb);
});

///////////////////////////////////////////////////
//
// Задачи сборки
//
///////////////////////////////////////////////////

gulp.task("build", ["clean"], function() {
	gulp.start("html:build");
	gulp.start("style:build");
	gulp.start("js:build");
	gulp.start("image:build");
	gulp.start("fonts:build");
});

///////////////////////////////////////////////////
//
// Задача watch
//
///////////////////////////////////////////////////

gulp.task("watch", function() {
	gulp.watch([path.watch.html], function() {
		gulp.start("html:build");
	});
	gulp.watch([path.watch.style], function() {
		gulp.start("style:build");
	});
	gulp.watch([path.watch.js], function() {
		gulp.start("js:build");
	});
	gulp.watch([path.watch.img], function() {
		gulp.start("image:build");
	});
	gulp.watch([path.watch.fonts], function() {
		gulp.start("fonts:build");
	});
});

///////////////////////////////////////////////////
//
// Задача по умолчанию
//
///////////////////////////////////////////////////

gulp.task("default", ["build", "browserSync", "watch"]);