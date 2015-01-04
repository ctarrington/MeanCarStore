var gulp = require('gulp');
var pkg = require('./package.json');

/* Auto load all gulp plugins */
var plugins = require('gulp-load-plugins')({
    rename: {
        'gulp-concat-css': 'concatcss',
        'gulp-angular-templatecache': 'templatecache'
    }
});

gulp.task('cleanDev', function(){
    return gulp.src([pkg.paths.dev])
        .pipe(plugins.clean({force: true}));
});

gulp.task('cleanProd', function(){
    return gulp.src([pkg.paths.prod])
        .pipe(plugins.clean({force: true}));
});

gulp.task('clean', ['cleanDev', 'cleanProd']);


gulp.task('jshint', function () {
    return gulp.src(pkg.paths.source+'*.js')
        .pipe(plugins.jshint('jshintrc.json'))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('bundlejs', ['jshint', 'clean'], function () {
    return gulp.src(pkg.paths.source+'*.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('consolidated.js'))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(pkg.paths.prod))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(pkg.paths.dev))
        .pipe(plugins.size({showFiles: false}));
});

gulp.task('bundlestyles', ['jshint', 'clean'], function () {
    return gulp.src(pkg.paths.source+'*.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concatcss('consolidated.css'))
        .pipe(gulp.dest(pkg.paths.prod))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(pkg.paths.dev));
});

gulp.task('bundletemplates',  ['jshint', 'clean'], function () {
    return gulp.src(pkg.paths.source+'*.html')
        .pipe(plugins.templatecache({module: 'mcsapp'}))
        .pipe(gulp.dest(pkg.paths.dev))
        .pipe(gulp.dest(pkg.paths.prod));
});

gulp.task('default', ['bundlejs', 'bundletemplates', 'bundlestyles']);

gulp.task('watch', function() {
    var jsWatcher = gulp.watch([pkg.paths.source+'*.js', pkg.paths.source+'*.html', pkg.paths.source+'*.scss'], ['default']);

    jsWatcher.on('change', function(event) {
        console.log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

