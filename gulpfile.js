const { src, dest, parallel, series, watch } = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pug = require('gulp-pug');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const flexBugsFixes = require('postcss-flexbugs-fixes');
const declarationSorter = require('css-declaration-sorter');
const cssWring = require('csswring');
const browserSync = require('browser-sync').create();

const paths = {
  pug: './src/pug/**/*.pug',
  scss: './src/scss/**/*.scss',
};

const html = () => {
  return src([
      paths.pug,
      '!**/*_*'
    ])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug( {
      basedir: './src/pug',
      pretty: true
    }))
    .pipe(dest('dist/'))
};

const css = () => {
  return src(paths.scss, { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([
      flexBugsFixes,
      autoprefixer({
        grid: true
      }),
      declarationSorter({
        order: 'smacss'
      }),
      cssWring
    ]))
    .pipe(dest('dist/assets/css/', { sourcemaps: '.' }))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  watch(paths.pug, function(cb) {
    html();
    cb();
  });
  watch(paths.scss, function(cb) {
    css();
    cb();
  });
  watch('./dist/**/*.html', function(cb) {
    browserSync.reload()
    cb();
  });
}

const server = () => {
  browserSync.init({
    server: './dist'
  });
};

const build = parallel(html, css);

exports.html = html;
exports.css = css;
exports.watchFiles = watchFiles;
exports.build = build;
exports.default = series(
  build,
  parallel(server, watchFiles)
);
