const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const minifyCSS = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const php = require('gulp-connect-php');
const browserSync = require('browser-sync').create();

const jsFiles = [
  'node_modules/vue/dist/vue.min.js',
  'node_modules/vuex/dist/vuex.js',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/jquery-ui-dist/jquery-ui.js',
  'node_modules/nprogress/nprogress.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/bootstrap-switch/dist/js/bootstrap-switch.min.js',
  'node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.js',
  'node_modules/alertify/src/alertify.js',
  'node_modules/select2/dist/js/select2.full.min.js',
  'node_modules/toastr/build/toastr.min.js',
  'node_modules/select2/dist/js/i18n/pt-BR.js',
  'node_modules/inputmask/dist/jquery.inputmask.bundle.js',
  'node_modules/chart.js/dist/Chart.min.js',
  'node_modules/jquery.redirect/jquery.redirect.js',
  'vendor/thupan/pmm/resources/js/app.js',
  'vendor/thupan/pmm/resources/js/generator.js',
  'resources/js/app.js',
  'app/Http/Views/**/vue/*.vue.js'
];

const cssFiles = [
  'node_modules/open-sans-fontface/open-sans.css',
  'node_modules/normalize-css/normalize.css',
  'node_modules/bootstrap/dist/css/bootstrap.css',
  'node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
  'node_modules/alertify/themes/alertify.core.css',
  'node_modules/alertify/themes/alertify.bootstrap.css',
  'node_modules/jquery-ui-dist/jquery-ui.css',
  'node_modules/jquery-ui-bootstrap/jquery.ui.theme.css',
  'node_modules/select2/dist/css/select2.css',
  'node_modules/nprogress/nprogress.css',
  'node_modules/font-awesome/css/font-awesome.css',
  'vendor/thupan/pmm/resources/css/app.css',
  'vendor/thupan/pmm/resources/css/themes/pmm.css',
  'resources/css/app.css',
];

const fontsFiles = [
  'node_modules/open-sans-fontface/fonts/**/*'
];

const fonts = [
  'node_modules/bootstrap/fonts/**/*',
  'node_modules/font-awesome/fonts/**/*',
  'resources/fonts/**/*'
];

const images = [];

const imagesRsrc = [
  'vendor/thupan/pmm/resources/images/*',
  'resources/images/*'
];

const toDelete = [
  'public/assets/dist/fonts/*',
  'public/assets/dist/*',
  'public/assets/fonts/*',
  'public/assets/*',
  'public/assets'
];

function clean() {
  return del(toDelete);
}

function prepareJs() {
  return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('plugins.js'))
    .pipe(minify({
      ext: {
        min: '.js'
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/dist'));
}

function prepareCss() {
  return gulp.src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('plugins.css'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(minifyCSS({
      restructure: false,
      sourceMap: true,
      debug: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/dist'));
}

function prepareSass() {
  return gulp.src(['./resources/scss/*.scss', './app/Http/Views/**/scss/*.scss'])
    .pipe(concat('plugins-scss.css'))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('public/assets/dist'));
}

function prepareFonts() {
  return gulp.src(fontsFiles)
    .pipe(gulp.dest('public/assets/dist/fonts/'));
}

function prepareFiles() {
  return gulp.src(fonts)
    .pipe(gulp.dest('public/assets/fonts/'));
}

function prepareImages() {
  return gulp.src(imagesRsrc)
    .pipe(gulp.dest('public/images/pmm/'));
}

gulp.task('clean', clean);
gulp.task('prepareJs', prepareJs);
gulp.task('prepareCss', prepareCss);
gulp.task('prepareSass', prepareSass);
gulp.task('prepareFonts', prepareFonts);
gulp.task('prepareFiles', prepareFiles);
gulp.task('prepareImages', prepareImages);

gulp.task('php', function () {
  php.server({
    base: './',
    port: 3000,
    keepalive: true
  });
});

gulp.task('browserSync', gulp.series('php', function () {
  browserSync.init({
    proxy: "localhost:3000",
    baseDir: "./",
    open: true,
    notify: false

  });
}));

gulp.task('dev', gulp.series('browserSync', function () {
  gulp.watch('./public/*.php', browserSync.reload);
}));

gulp.task('serve',
  gulp.series('clean',
    gulp.series(
      'prepareJs',
      'prepareCss',
      'prepareSass',
      'prepareFonts',
      'prepareFiles',
      'prepareImages',
    )
  )
);

gulp.task('default', gulp.series('serve', 'browserSync'));

gulp.watch([
  './gulpfile.js',
  './resources/js/*.js',
  './resources/css/*.css',
  './resources/scss/*.scss',
  './vendor/thupan/pmm/resources/js/*.js',
  './vendor/thupan/pmm/resources/css/*.css',
  './vendor/thupan/pmm/resources/scss/*.scss',
  './app/Http/Views/**/scss/*.scss'
], gulp.parallel('serve'));
