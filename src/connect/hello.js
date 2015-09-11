// LICENSE : MIT
"use strict";
export default function (text) {
    return function (req, res) {
        res.end(text);
    };
}