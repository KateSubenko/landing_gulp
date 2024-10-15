import gulp from "gulp";

import gulpSass from "gulp-sass";
import * as sass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleancss from "gulp-clean-css";
import concat from "gulp-concat";
import jsmin from "gulp-jsmin";
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";

const scss = gulpSass(sass);

const styles = () => {
  return gulp
    .src("src/scss/main.scss")
    .pipe(scss().on("error", scss.logError))
    .pipe(concat("styles.min.css"))
    .pipe(cleancss())
    .pipe(
      autoprefixer({
        overrideBrowserslist: "last 2 versions",
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
};

const js = async () => {
  await gulp
    .src("src/js/main.js")
    .pipe(jsmin())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
};

const img = async () => {
  return gulp
    .src("src/img/**/*")
    .pipe(browserSync.stream())
    .pipe(gulp.dest("dist/img"));
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("index.html").on("change", browserSync.reload);
  gulp.watch("src/js/main.js", js);
  gulp.watch("src/img/**/*", img);
};

export { watch, img, js, styles };
