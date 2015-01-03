/*
 * Create references
 */
var gulp = require('gulp');
var pkg = require('./package.json');

/*
 * Auto load all gulp plugins
 */
var plugins = require('gulp-load-plugins')();

/*
 * Load common utilities for gulp
 */
var gutil = plugins.loadUtils(['colors', 'env', 'log', 'date']);

var templateCache = require('gulp-angular-templatecache');

/*
 * Could use a product/development switch.
 * Run `gulp --production`
 */
var type = gutil.env.production ? 'production' : 'development';
gutil.log( 'Building for', gutil.colors.magenta(type) );
gutil.beep();

/*
 * Lint the code
 */
gulp.task('jshint', function () {
    return gulp.src(pkg.paths.source.js)
        .pipe(plugins.jshint('jshintrc.json'))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

/*
 * Minify and bundle the JavaScript
 */
gulp.task('bundlejs', ['jshint', 'cleanOutput'], function () {

    return gulp.src(pkg.paths.source.js)
        .pipe(plugins.size({showFiles: true}))
        .pipe(plugins.concat('consolidated.js'))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(pkg.paths.dest))
        .pipe(plugins.size({showFiles: true}));
});

gulp.task('bundletemplates',  ['jshint', 'cleanOutput'], function () {
    gulp.src(pkg.paths.source.templates)
        .pipe(templateCache({module: 'mcsapp'}))
        .pipe(gulp.dest(pkg.paths.dest));
});

/*
 * Remove all files from the output folder
 */
gulp.task('cleanOutput', function(){
    return gulp.src([
        pkg.paths.dest,
        ])
        .pipe(plugins.clean({force: true}))
});

gulp.task('default', ['bundlejs', 'bundletemplates']);


/*
 * Watch file and re-run the linter
 */
gulp.task('build-watcher', function() {
    var jsWatcher = gulp.watch(pkg.paths.source.js, ['default']);

    jsWatcher.on('change', function(event) {
        console.log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

