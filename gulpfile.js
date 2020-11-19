// パッケージパッケージの読み込み
const { src, dest, parallel } = require('gulp');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const pug = require('gulp-pug');

const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const flexBugsFixes = require('postcss-flexbugs-fixes');
const declarationSorter = require('css-declaration-sorter');
const cssWring = require('csswring');

// オプション設定
const paths = {
  pug: './src/pug/**/*.pug',
  scss: './src/scss/**/*.scss',
};

const pugOption = {
  basedir: './src/pug',
  pretty: true // みやすいコードでの出力
}

const autoprefixerOption = {
  grid: true
};
const declarationSorterOption = {
  order: 'smacss'
};
const postcssOption = [
  flexBugsFixes,
  autoprefixer(autoprefixerOption),
  declarationSorter(declarationSorterOption),
  cssWring
];

// Gulpタスク 定義
const html = () => {
  return src([paths.pug, '!**/*_*'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug(pugOption))
    .pipe(dest('dist/'))
};

const css = () => {
  return src(paths.scss, { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss(postcssOption))
    .pipe(dest('dist/assets/css/', { sourcemaps: '.' }));
};

const build = parallel(html, css);

// Gulpタスク エクスポート
exports.html = html;
exports.css = css;

exports.build = build;
