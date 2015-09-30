"use strict";
import gulp from "gulp";
import gulpPrefixer from "./gulp-prefixer";
gulp.task("default", function () {
    return gulp.src("./*.*")
        .pipe(gulpPrefixer("prefix text"))
        .pipe(gulp.dest("build"))
        .on("error", (error) => {
            console.error(error);
        });
});
