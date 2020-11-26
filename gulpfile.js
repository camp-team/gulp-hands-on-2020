// オブジェクトの読み込み
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
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const browserSync = require('browser-sync').create();

// パスの設定
const paths = {
  pug: './src/pug/**/*.pug',
  scss: './src/scss/**/*.scss',
  js: './src/js/**/*.js',
};

// タスクの登録
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
    .pipe(dest('dist/'));
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

const js = () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(dest('./dist/assets/js/'));
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
  watch(paths.js, function(cb) {
    js();
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

const build = parallel(html, css, js);

// タスクの宣言
exports.html = html;
exports.css = css;
exports.js = js;
exports.watchFiles = watchFiles;
exports.build = build;
exports.default = series(
  build,
  parallel(server, watchFiles)
);
