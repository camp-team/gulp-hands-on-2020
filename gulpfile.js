// パッケージパッケージの読み込み
const { src, dest } = require('gulp');

const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const flexBugsFixes = require('postcss-flexbugs-fixes');
const declarationSorter = require('css-declaration-sorter');
const cssWring = require('csswring');

// オプション設定
const paths = {
  scss: './src/scss/**/*.scss',
};

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
const css = () => {
  return src(paths.scss, { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss(postcssOption))
    .pipe(dest('dist/assets/css/', { sourcemaps: '.' }));
};

// Gulpタスク エクスポート
exports.css = css;
