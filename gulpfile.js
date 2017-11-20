var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var bs = require('browser-sync').create();
var reload          = bs.reload;

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        notify: false,
        server: {
            baseDir: "./",
        }
    });
});

var srcDir = './';
var input = './scss/**/*.scss';
var output = './css';

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
gulp.task('sass', function () {
    return gulp
      .src(input)
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest(output))
      .pipe(bs.reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("./scss/**/*.scss", ['sass']).on('change', bs.reload);
    gulp.watch("./css/*.css").on('change', bs.reload);
    gulp.watch("./js/**/*.js").on('change', bs.reload);
    gulp.watch("*.html").on('change', bs.reload);
});

gulp.task('default', ['sass', 'watch']);