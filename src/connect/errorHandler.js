"use strict";
export default function errorHandler() {
    return function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send(err.message);
        next();
    };
}