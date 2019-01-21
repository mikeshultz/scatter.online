const { src, dest, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');

function index() {
  return src(['src/header.html', 'src/index.html', 'src/footer.html'])
    .pipe(concat('index.html'))
    .pipe(dest("dist"))
    .pipe(livereload());
}

function compile_sass() {
  return src('src/sass/main.scss')
    .pipe(sass())
    .pipe(dest('src/css'))
    .pipe(livereload());
}

function css() {
  return src('src/css/*')
    .pipe(concat('scatter.css'))
    .pipe(dest('dist'))
    .pipe(livereload());
}

function fonts() {
  return src('src/fonts/*')
    .pipe(dest('dist/fonts/'));
}

exports.index = index;
exports.css = series(compile_sass, css);
exports.fonts = fonts;
exports.default = parallel(index, series(compile_sass, css), fonts);
