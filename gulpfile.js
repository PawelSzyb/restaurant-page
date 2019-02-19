const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const lineec = require("gulp-line-ending-corrector");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
browserSync = require("browser-sync").create();
reload = browserSync.reload;
function html() {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
}

function css() {
  return gulp
    .src("sass/style.scss")
    .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest("src/css"));
}

function concatCss() {
  return gulp
    .src("src/css/*.css")
    .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
    .pipe(concat("style.min.css"))
    .pipe(sourcemaps.write())
    .pipe(cleanCss())
    .pipe(lineec())
    .pipe(gulp.dest("dist/css"));
}

function javascript() {
  return gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest("dist/js"));
}

function minImage() {
  return gulp
    .src("src/images/**/*.*")
    .pipe(changed("dist/images"))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 })
      ])
    )
    .pipe(gulp.dest("dist/images"));
}
function watch() {
  // browserSync.init({
  //   open: "external",
  //   proxy: "http://localhost",
  //   port: 3000

  browserSync.init({
    server: {
      baseDir: "src/"
    }
  });
  gulp.watch("sass/*.scss", gulp.series([css, concatCss]));
  gulp
    .watch(["src/*.html", "src/js/**.*js", "sass/**/*.scss"])
    .on("change", browserSync.reload);
}

const build = gulp.parallel(watch);
gulp.task("default", build);

exports.css = css;
exports.concatCss = concatCss;
exports.html = html;
exports.javascript = javascript;
exports.minImage = minImage;
