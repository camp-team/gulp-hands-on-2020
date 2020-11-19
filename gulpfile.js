const { src, dest } = require('gulp');
const sass = require('gulp-dart-sass');

const paths = {
  scss: './src/scss/**/*.scss',
};

const css = () => {
  return src(paths.scss, { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(dest('dist/assets/css/', { sourcemaps: '.' }));
};

exports.css = css;
