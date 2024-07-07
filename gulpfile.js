const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");

function css1() {
    return gulp.src("./mf_drawer/scss/**/*.scss").pipe(sourcemaps.init()).pipe(sass().on("error", sass.logError)).pipe(sourcemaps.write("./")).pipe(gulp.dest("./mf_drawer/css"));
}

function css2() {
    return gulp.src("./mf_videos/scss/**/*.scss").pipe(sourcemaps.init()).pipe(sass().on("error", sass.logError)).pipe(sourcemaps.write("./")).pipe(gulp.dest("./mf_videos/css"));
}

function css3() {
    return gulp.src("./front-end/scss/**/*.scss").pipe(sourcemaps.init()).pipe(sass().on("error", sass.logError)).pipe(sourcemaps.write("./")).pipe(gulp.dest("./front-end/css"));
}

function watch() {
    gulp.watch("./mf_drawer/scss/**/*.scss", gulp.series(css1, css2, css3));
    gulp.watch("./mf_videos/scss/**/*.scss", gulp.series(css1, css2, css3));
    gulp.watch("./front-end/scss/**/*.scss", gulp.series(css1, css2, css3));
}

exports.css1 = css1;
exports.css2 = css2;
exports.css3 = css3;

exports.default = watch;
