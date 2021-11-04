
const { src, dest } = require('gulp');
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const browsersync = require("browser-sync").create();
const uglify = require('gulp-uglify');

const source_folder = 'source';
const project_folder = 'build';
const path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/',
  },
  source: {
    html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
    scss: source_folder + '/scss/main.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg}',
    fonts: source_folder + '/fonts/*.{woff,woff2}',
  },
  watch: {
    html: source_folder + '/**/*.html',
    scss: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg}'
  },
  clean: './' + project_folder + '/'
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false,
    open: true,
    cors: true,
    ui: false
  })
}
function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.scss], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], image);
  gulp.watch([source_folder + "/projects/*/**"], projects);
}

function clean() {
  return del(path.clean);
}

function html() {
  return src(path.source.html)
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.source.scss)
  .pipe(plumber())
  .pipe(
    sass({
      outputStyle: 'expanded'
    })
  )
  .pipe(postcss([ autoprefixer() ]))
  .pipe(dest(path.build.css))
  .pipe(clean_css())
  .pipe(
    rename({
      extname: ".min.css"
    })
  )
  .pipe(dest(path.build.css))
  .pipe(browsersync.stream())
}

function js() {
  return src(path.source.js)
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function image() {
  return src(path.source.img)
  .pipe(webp({
    quality: 90
  }))
  .pipe(dest(path.build.img))
  .pipe(src(path.source.img))
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
  ]))
  .pipe(dest(path.build.img))
  .pipe(browsersync.stream())
}

function projects() {
  return src(source_folder + "/projects/*/**")
  .pipe(dest(project_folder + "/projects/"))
}

const build = gulp.series(clean, gulp.parallel(html, css, js, image, projects))
const watch = gulp.parallel(build, browserSync, watchFiles);
exports.default = watch;