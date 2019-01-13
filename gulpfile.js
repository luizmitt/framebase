var gulp   = require('gulp');
var concat = require('gulp-concat');
var del    = require('del'); // rm -rf

var jsFiles = [
    'node_modules/vue/dist/vue.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/nprogress/nprogress.js',
    'resources/js/jquery-ui-1.11.4/jquery-ui.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/bootstrap-switch/dist/js/bootstrap-switch.js',
    'node_modules/alertify/src/alertify.js',
    'node_modules/select2/dist/js/select2.full.js',
    'node_modules/select2/dist/js/i18n/pt-BR.js',
    'node_modules/jquery.inputmask/dist/inputmask/inputmask.js',
    'node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask.js',
    'node_modules/jquery.inputmask/dist/inputmask/inputmask.extensions.js',
    'node_modules/jquery.inputmask/dist/inputmask/inputmask.regex.extensions.js',
    'node_modules/jquery.inputmask/dist/inputmask/inputmask.date.extensions.js',
    'node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions.js',
    'node_modules/jquery.inputmask/dist/inputmask/inputmask.phone.extensions.js',
    'node_modules/chartjs/chart.js',
    'node_modules/jquery.redirect/jquery.redirect.js',
    'node_modules/toastr/build/toastr.min.js',
    'resources/js/app.js',
    'vendor/thupan/pmm/resources/js/config.js',
   // 'vendor/thupan/pmm/resources/js/app.js'
]

// personally written CSS
var cssFiles = [
    'node_modules/open-sans-fontface/open-sans.css',
    'node_modules/normalize-css/normalize.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
    'node_modules/alertify/themes/alertify.core.css',
    'node_modules/alertify/themes/alertify.bootstrap.css',
    'resources/js/jquery-ui-1.11.4/jquery-ui.css',
    'node_modules/jquery-ui-bootstrap/jquery.ui.theme.css',
    'node_modules/jquery-ui-bootstrap/jquery.ui.theme.font-awesome.css',
    'node_modules/select2/dist/css/select2.css',
    'node_modules/toastr/build/toastr.css',
    'node_modules/nprogress/nprogress.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'resources/css/app.css',
    'vendor/thupan/pmm/resources/css/app.css',
    'vendor/thupan/pmm/resources/css/themes/pmm.css'
]

var fontsFiles = [
    'node_modules/open-sans-fontface/fonts/**/*'
]

var fonts = [
    'node_modules/bootstrap/fonts/**/*',
    'node_modules/font-awesome/fonts/**/*',
    'resources/fonts/**/*'
]

var images = [
    'vendor/thupan/pmm/resources/images/favicon.ico'
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
    'public/assets',
    'public/favicon.ico'
]

// TASKS BEGIN
// deletes files
gulp.task('clean', function () {
    return del(toDelete); // rm -rf
});


gulp.task('js-minify', function(){
    var stream = gulp.src(jsFiles)
               .pipe(concat('plugins.js'))
               //.pipe(uglify())
               .pipe(gulp.dest('public/assets/dist'));               
    return stream;

})

gulp.task('css-minify', function () {
    var stream = gulp.src(cssFiles)
        .pipe(concat('plugins.css'))
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
        .pipe(gulp.dest('public/'));
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
        'copy-images-rsrc'
    )));

// attach a default task, so when when just <code>gulp</code> the thing runs
gulp.task('default', gulp.series('serve'));