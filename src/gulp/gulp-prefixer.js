"use strict";
import {Transform} from "stream";
let prefixBuffer = function (buffer, prefix) {
    return Buffer.concat([Buffer(prefix), buffer]);
};

let prefixStream = function (prefix) {
    return new Transform({
        transform: function (chunk, encoding, next) {
            let buffer = prefixBuffer(chunk, prefix);
            this.push(buffer);
            next();
        }
    });
};

let gulpTransform = function (prefix) {
    // enable `objectMode` of the stream for vinyl File objects.
    return new Transform({
        // Takes in vinyl File objects
        writableObjectMode: true,
        // Outputs vinyl File objects
        readableObjectMode: true,
        transform: function (file, encoding, next) {
            if (file.isBuffer()) {
                file.contents = prefixBuffer(file.contents, prefix);
            }

            if (file.isStream()) {
                file.contents = file.contents.pipe(prefixStream(prefix));
            }
            this.push(file);
            next();
        }
    });
};

export default gulpTransform;
