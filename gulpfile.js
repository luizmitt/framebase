var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');
var del = require('del'); // rm -rf
//var cleanCSS = require('gulp-clean-css');
//var browser = require('browser-sync').create();
//var historyApiFallback = require('connect-history-api-fallback');

// personally written JS
var jsFiles = [
    'bower_components/nprogress/nprogress.js',
    'bower_components/jquery/dist/jquery.min.js',
    //'node_modules/jquery/dist/jquery.js',
    'bower_components/jquery-ui/jquery-ui.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
    'bower_components/twitter-bootstrap-wizard/jquery.bootstrap.wizard.js',
    'bower_components/alertify/alertify.min.js',
    'bower_components/select2/dist/js/select2.full.min.js',
    'bower_components/toastr/toastr.min.js',
    'bower_components/select2/dist/js/i18n/pt-BR.js',
    'bower_components/jquery.inputmask/dist/inputmask/inputmask.js',
    'bower_components/jquery.inputmask/dist/inputmask/jquery.inputmask.js',
    'bower_components/jquery.inputmask/dist/inputmask/inputmask.extensions.js',
    'bower_components/jquery.inputmask/dist/inputmask/inputmask.regex.extensions.js',
    'bower_components/jquery.inputmask/dist/inputmask/inputmask.date.extensions.js',
    'bower_components/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions.js',
    'bower_components/jquery.inputmask/dist/inputmask/inputmask.phone.extensions.js',
    'bower_components/Chart.js/Chart.js',
    'bower_components/jquery.redirect/jquery.redirect.js',
    //'node_modules/simple-module/dist/simple-module.js',
    //'node_modules/simple-hotkeys/lib/hotkeys.js',
    //'node_modules/simditor/lib/simditor.js',
    'node_modules/vue/dist/vue.min.js',
    'vendor/thupan/pmm/resources/js/toastr.js',
    'resources/js/app.js',
    'vendor/thupan/pmm/resources/ext/debug/debugbar.js',
    'vendor/thupan/pmm/resources/ext/debug/openhandler.js',
    'vendor/thupan/pmm/resources/ext/debug/widgets.js',
    'vendor/thupan/pmm/resources/ext/debug/widgets/mails/widget.js',
    'vendor/thupan/pmm/resources/ext/debug/widgets/sqlqueries/widget.js',
    'vendor/thupan/pmm/resources/ext/debug/widgets/templates/widget.js',
    'vendor/thupan/pmm/resources/js/app.js',
    'vendor/thupan/pmm/resources/js/generator.js'
]

// personally written CSS
var cssFiles = [
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
    'bower_components/toastr/toastr.min.css',
    'bower_components/nprogress/nprogress.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'node_modules/simditor/styles/simditor.css',
    'vendor/thupan/pmm/resources/css/toastr.css',
    'resources/css/app.css',
    'vendor/thupan/pmm/resources/ext/debug/debugbar.css',
    'vendor/thupan/pmm/resources/ext/debug/openhandler.css',
    'vendor/thupan/pmm/resources/ext/debug/widgets.css',
    'vendor/thupan/pmm/resources/ext/debug/widgets/mails/widget.css',
    'vendor/thupan/pmm/resources/ext/debug/widgets/sqlqueries/widget.css',
    'vendor/thupan/pmm/resources/ext/debug/widgets/templates/widget.css',
    'vendor/thupan/pmm/resources/css/app.css',
    'vendor/thupan/pmm/resources/css/themes/pmm.css'
]

var fontsFiles = [
    'bower_components/open-sans-fontface/fonts/**/*'
]

var fonts = [
    'bower_components/bootstrap/fonts/**/*',
    'bower_components/font-awesome/fonts/**/*',
    'resources/fonts/**/*'
]

var images = [
    'vendor/thupan/pmm/resources/ext/debug/thupan.png'
]

var imagesRsrc = [
    'vendor/thupan/pmm/resources/images/*',
    'resources/images/*'
]

var toDelete = [
    'public/assets/dist/fonts/*',
    'public/assets/dist/*',
    'public/assets/fonts/*',
    'public/assets/*',
    'public/assets'
]

// TASKS BEGIN

// deletes files
gulp.task('clean', function () {
    return del(toDelete); // rm -rf
});


gulp.task('js-minify', function(){
    var stream = gulp.src(jsFiles)
               .pipe(concat('plugins.js'))
               .pipe(gulp.dest('public/assets/dist'));               
    return stream;

})

gulp.task('css-minify', function () {
    var stream = gulp.src(cssFiles)
        .pipe(concat('plugins.css'))
        //.pipe(uglify())
        .pipe(gulp.dest('public/assets/dist'));
    return stream;
})

gulp.task('copy-fonts', function() {
    return gulp.src(fontsFiles)
        .pipe(gulp.dest('public/assets/dist/fonts/'));
});

gulp.task('copy-files', function() {
    return gulp.src(fonts)
        .pipe(gulp.dest('public/assets/fonts/'));
});

gulp.task('copy-images', function() {
    return gulp.src(images)
        .pipe(gulp.dest('public/assets/dist/'));
});

gulp.task('copy-images-rsrc', function() {
    return gulp.src(imagesRsrc)
        .pipe(gulp.dest('public/images/pmm/'));
});



// Clean is forced to run *FIRST* using gulp.series
// Then subsequent tasks can be asynchronous in executing
gulp.task('serve', gulp.series('clean',
    gulp.parallel(
        'js-minify',
        'css-minify',
        'copy-fonts',
        'copy-files',
        'copy-images',
        'copy-images-rsrc')));

// attach a default task, so when when just <code>gulp</code> the thing runs
gulp.task('default', gulp.series('serve'));