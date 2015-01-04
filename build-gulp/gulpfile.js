var gulp = require('gulp');
var pkg = require('./package.json');

/* Auto load all gulp plugins */
var plugins = require('gulp-load-plugins')({
    rename: {
        'gulp-concat-css': 'concatcss',
        'gulp-angular-templatecache': 'templatecache'
    }
});
var gutil = plugins.loadUtils(['colors', 'env', 'log', 'date']);

var type = gutil.env.production ? 'production' : 'development';
gutil.log( 'Building for', gutil.colors.magenta(type) );


gulp.task('cleanOutput', function(){
    return gulp.src([pkg.paths.dest])
        .pipe(plugins.clean({force: true}));
});


gulp.task('jshint', function () {
    return gulp.src(pkg.paths.source+'*.js')
        .pipe(plugins.jshint('jshintrc.json'))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('bundlejs', ['jshint', 'cleanOutput'], function () {
    return gulp.src(pkg.paths.source+'*.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('consolidated.js'))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(pkg.paths.dest))
        .pipe(plugins.size({showFiles: false}));
});

gulp.task('bundlestyles', ['jshint', 'cleanOutput'], function () {
    return gulp.src(pkg.paths.source+'*.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concatcss('consolidated.css'))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(pkg.paths.dest));
});

gulp.task('bundletemplates',  ['jshint', 'cleanOutput'], function () {
    return gulp.src(pkg.paths.source+'*.html')
        .pipe(plugins.templatecache({module: 'mcsapp'}))
        .pipe(gulp.dest(pkg.paths.dest));
});

gulp.task('default', ['bundlejs', 'bundletemplates', 'bundlestyles']);

gulp.task('build-watcher', function() {
    var jsWatcher = gulp.watch([pkg.paths.source.js, pkg.paths.source.templates, pkg.paths.source.styles], ['default']);

    jsWatcher.on('change', function(event) {
        console.log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

