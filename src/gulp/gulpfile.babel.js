// LICENSE : MIT
"use strict";
import gulp from "gulp";
import {Transform} from "stream";
let transformStream = new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform: function (chunk, encoding, next) {
        let str = Buffer.concat([Buffer("prefix"), chunk]);
        this.push(str);
        next();
    }
});

let gulpTransform = new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform: function (file, encoding, next) {
        if (file.isStream()) {
            file.contents = file.contents.pipe(transformStream);
        }
        this.push(file);
        next();
    }
});
gulp.task("default", function () {
    return gulp.src("./*.js", {buffer: false})
        .pipe(gulpTransform)
        .pipe(gulp.dest("modified-files"))
        .on("error", (error) => {
            console.error(error);
        });
});
