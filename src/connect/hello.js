// LICENSE : MIT
"use strict";
export default function (text) {
    return function (req, res, next) {
        res.end(text + "\n");
    };
}