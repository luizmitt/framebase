var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

// Transforma o javascript em formato ilegível para humanos
var uglify = require("gulp-uglify");
var uglifycss = require("gulp-uglifycss");

var files = "./resources/";

gulp.task('clean-all', function() {
    return gulp.src([
            'public/assets/dist/fonts/*',
            'public/assets/dist/*',
            'public/assets/fonts/*',
            'public/assets/*',
            'public/assets'
        ], { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('js-minify', ['clean-all'], function() {
    return gulp.src([
            'bower_components/nprogress/nprogress.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery-ui/jquery-ui.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
            'bower_components/twitter-bootstrap-wizard/jquery.bootstrap.wizard.js',
            'bower_components/alertify/alertify.min.js',
            'bower_components/select2/dist/js/select2.full.min.js',
            'bower_components/jquery.inputmask/dist/inputmask/inputmask.js',
            'bower_components/jquery.inputmask/dist/inputmask/jquery.inputmask.js',
            'bower_components/jquery.inputmask/dist/inputmask/inputmask.extensions.js',
            'bower_components/jquery.inputmask/dist/inputmask/inputmask.regex.extensions.js',
            'bower_components/jquery.inputmask/dist/inputmask/inputmask.date.extensions.js',
            'bower_components/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions.js',
            'bower_components/jquery.inputmask/dist/inputmask/inputmask.phone.extensions.js',
            'bower_components/Chart.js/Chart.js',
            'bower_components/jquery.redirect/jquery.redirect.js',

            'node_modules/simple-module/lib/module.js',
            'node_modules/simple-hotkeys/lib/hotkeys.js',
            // 'node_modules/simple-uploader/lib/uploader.js', // não usado ainda
            'node_modules/simditor/lib/simditor.js',

            'resources/js/app.js',
            'vendor/thupan/pmm/resources/ext/debug/debugbar.js',
            'vendor/thupan/pmm/resources/ext/debug/openhandler.js',
            'vendor/thupan/pmm/resources/ext/debug/widgets.js',
            'vendor/thupan/pmm/resources/ext/debug/widgets/mails/widget.js',
            'vendor/thupan/pmm/resources/ext/debug/widgets/sqlqueries/widget.js',
            'vendor/thupan/pmm/resources/ext/debug/widgets/templates/widget.js',
            'vendor/thupan/pmm/resources/js/generator.js',
            'vendor/thupan/pmm/resources/js/app.js',
        ])
        .pipe(concat('plugins.js'))
        //.pipe(uglify())  // Transforma para formato ilegível
        .pipe(gulp.dest('public/assets/dist'));
});

gulp.task('css-minify', ['clean-all'], function() {
    return gulp.src([
            'bower_components/open-sans-fontface/open-sans.css',
            'bower_components/normalize-css/normalize.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
            'bower_components/alertify/themes/alertify.core.css',
            'bower_components/alertify/themes/alertify.bootstrap.css',
            'bower_components/jquery-ui/themes/base/jquery-ui.css',
            'bower_components/jquery-ui-bootstrap/jquery.ui.theme.css',
            'bower_components/jquery-ui-bootstrap/jquery.ui.theme.font-awesome.css',
            'bower_components/select2/dist/css/select2.css',
            'bower_components/nprogress/nprogress.css',
            'bower_components/font-awesome/css/font-awesome.css',

            'node_modules/simditor/styles/simditor.css',

            'resources/css/app.css',
            'vendor/thupan/pmm/resources/ext/debug/debugbar.css',
            'vendor/thupan/pmm/resources/ext/debug/openhandler.css',
            'vendor/thupan/pmm/resources/ext/debug/widgets.css',
            'vendor/thupan/pmm/resources/ext/debug/widgets/mails/widget.css',
            'vendor/thupan/pmm/resources/ext/debug/widgets/sqlqueries/widget.css',
            'vendor/thupan/pmm/resources/ext/debug/widgets/templates/widget.css',
            'vendor/thupan/pmm/resources/css/app.css',
            'vendor/thupan/pmm/resources/css/themes/pmm.css',
        ])
        .pipe(concat('plugins.css'))
        .pipe(uglifycss({ "uglyComments": true }))
        .pipe(gulp.dest('public/assets/dist'));
});

gulp.task('copy-fonts', ['clean-all'], function() {
    return gulp.src([
            'bower_components/open-sans-fontface/fonts/**/*'
        ])
        .pipe(gulp.dest('public/assets/dist/fonts/'));
});

gulp.task('copy-files', ['clean-all'], function() {
    return gulp.src([
            'bower_components/bootstrap/fonts/**/*',
            'bower_components/font-awesome/fonts/**/*',
            'resources/fonts/**/*'
        ])
        .pipe(gulp.dest('public/assets/fonts/'));
});

gulp.task('copy-images', ['clean-all'], function() {
    return gulp.src([
            'vendor/thupan/pmm/resources/ext/debug/thupan.png'
        ])
        .pipe(gulp.dest('public/assets/dist/'));
});

gulp.task('copy-images-rsrc', ['clean-all'], function() {
    return gulp.src([
            'vendor/thupan/pmm/resources/images/*',
            'resources/images/*'
        ])
        .pipe(gulp.dest('public/images/pmm/'));
});

gulp.task('default', ['js-minify', 'css-minify', 'copy-fonts', 'copy-files', 'copy-images', 'copy-images-rsrc']);

// Tarefa de monitoração caso algum arquivo seja modificado, deve ser executado e deixado aberto, comando "gulp watch".
// gulp.task('watch', function() {
//     gulp.watch(js, ['minify-js']);
// });