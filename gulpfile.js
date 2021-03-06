var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    jest = require('gulp-jest'),
    react = require('gulp-react'),
    del = require('del'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    envify = require('envify'),
    jsxhint = require('jsxhint'),
    source = require('vinyl-source-stream'),
    runSequence = require('run-sequence'),
    stylish = require('jshint-stylish');

var paths = {
    styles: ['app/src/scss/**/*.scss'],
    scripts: ['app/src/js/**/*.js'],
    assets: ['app/src/assets/**/*'],
    sprites: ['app/src/scss/sprites/**/*']
};

// https://gist.github.com/Sigmus/9253068
function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Error',
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end');
}

function lint() {
    gulp.src([
        'app/src/js/**/*.js',
        '!app/src/js/branches/**/*.js'
    ])
    .pipe(react()
    .on('error', handleErrors))
    .pipe(jshint({
        browser: true,
        devel: false,
        globalstrict: true,
        es3: true,
        globals: {
            jest: true,
            describe: true,
            require: true,
            module: true,
            Promise: true,
            React: true
        } 
    }))
    .pipe(jshint.reporter(stylish));
}

function bundleJS(watch) {
    var bundler = browserify({
        entries: './app/src/js/app.js',
        debug: true,
        transform: [reactify, envify],
        cache: {},
        packageCache: {},
        fullPaths: true,
        paths: [
            './node_modules',
            './app/src/js'
        ]
    });

    bundler = watch ? watchify(bundler) : bundler; 
     
    function rebundle() {
        var stream = bundler.bundle();
        return stream.on('error', handleErrors)
        .pipe(source('app.js'))
        .pipe(gulp.dest('./app/public/js/'));
    }

    bundler.on('update', function() {
        lint();
        var startTime = Date.now();
        gutil.log('Rebundling...');
        rebundle();
        gutil.log('Rebundled in ' + (Date.now() - startTime) + 'ms');
    });
    
    return rebundle();
}

gulp.task('bundle-watch', function() {
    return bundleJS(true); 
});

gulp.task('bundle-nowatch', function() {
    return bundleJS(false);
});

gulp.task('css', function() {
    return gulp.src('./app/src/scss/main.scss')
    .pipe(sass({
        sourcemap: true, 
        sourcemapPath: '../../src/scss/',
        compass: true,
        require: ['susy', 'breakpoint'],
        bundleExec: true 
    })).on('error', handleErrors).pipe(gulp.dest('app/public/css'));
});

gulp.task('copy-assets', function() {
    return gulp.src(paths.assets)
    .pipe(gulp.dest('app/public/assets/'));
});

gulp.task('copy-sprites', function() {
    return gulp.src(paths.sprites)
    .pipe(gulp.dest('app/public/css/'));
});

gulp.task('nodemon', function() {
    return nodemon({
        script: 'bin/www',
        ext: 'js html',
        ignore: ['app/**/*.js']
    }).on('change', ['lint-server']);
});

gulp.task('lint-app', function() {
    return lint();
});

gulp.task('lint-server', function() {
    return gulp.src([
        'server/**/*.js', 
        'gulpfile.js'
    ])
    .pipe(jshint({
        expr: true,
        node: true,
        sub: true,
        es3: true,
        globals: {
            Promise: true
        }
    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('uglify', function() {
    return gulp.src('app/public/js/app.js')
    .pipe(uglify({
        mangle: true
    }))
    .pipe(gulp.dest('app/dist/js/'));
});

gulp.task('minify', function() {
    return gulp.src('app/public/css/main.css')
    .pipe(minify({
    
    }))
    .pipe(gulp.dest('app/dist/css/'));
});

gulp.task('clean', function() {
    return del('app/dist/**/*', function(err) {
        if (err) { console.log(err); }
        else { console.log('Dist removed'); }
    });
});

gulp.task('test', function() {
    return gulp.src('app/src/js/')
    .pipe(jest({
        unmockedModulePathPatterns: [
            'node_modules/react'
        ],
        testDirectoryName: '__tests__',
        rootDir: './app/src/js'
    }));
});

gulp.task('watch', function() {
    gulp.watch(paths.styles, ['css']);
    gulp.watch(paths.scripts, ['test']);
    gulp.watch(paths.assets, ['copy-assets']);
    gulp.watch(paths.sprites, ['copy-sprites']);
});

gulp.task('release', ['clean'], function(callback) {
    runSequence(
        'lint-app',
        ['css', 'bundle-nowatch'],
        ['uglify', 'minify'],
        callback
    );
});

gulp.task('build', ['bundle-watch', 'css']);

gulp.task('default', ['build'], function(callback) {
    runSequence('watch', 'nodemon', 'lint-app', callback);
});
