"use strict";
export default function () {
    return function (req, res) {
        req.pipe(res);
    };
}