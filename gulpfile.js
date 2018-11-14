const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const babelify = require("babelify");

gulp.task("clean-styl", () =>
  gulp.src("dist/css", { read: false }).pipe($.clean())
);
gulp.task("clean-scripts", () =>
  gulp.src("dist/js", { read: false }).pipe($.clean())
);
// Создаем задачу для Stylus
gulp.task("compile_stylus", ["clean-styl"], function() {
  gulp
    .src("static/style.styl")
    .pipe($.sourcemaps.init())
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe($.stylus())
    .pipe(
      $.cleanCss({
        advanced: false
      })
    )
    .pipe(
      $.rename({
        basename: "styles",
        suffix: ".min"
      })
    )
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("eslint", () =>
  gulp
    .src("js/**/*.js")
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
);

gulp.task("scripts", ["eslint", "clean-scripts"], () =>
  gulp
    .src("js/script.js")
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe($.sourcemaps.init())
    .pipe(
      $.bro({
        transform: [
          babelify.configure({
            presets: [
              "babel-preset-es2015",
              "babel-preset-es2016",
              "babel-preset-es2017"
            ].map(require.resolve)
          }),
          ["uglifyify", { global: true }]
        ]
      })
    )
    .pipe(
      $.rename({
        basename: "script",
        suffix: ".min"
      })
    )
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest("dist/js"))
);

gulp.task("watch", function() {
  gulp.watch("static/**/*.styl", ["compile_stylus"]);
  gulp.watch("js/**/*.js", ["scripts"]);
});

gulp.task("default", ["watch"]);
gulp.task("build", ["compile_stylus", "scripts"]);
