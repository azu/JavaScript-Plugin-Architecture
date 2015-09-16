"use strict";
export default function () {
    return function errorHandling(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send(err.message);
        next();
    };
}