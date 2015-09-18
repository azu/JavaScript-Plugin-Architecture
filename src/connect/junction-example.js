"use strict";
import Junction from "./junction";
import assert from "power-assert";
let junction = new Junction();
junction.use(function toUpperCase(res, next) {
    res.value = res.value.toUpperCase();
    next();
});
junction.use(function exclamationMark(res, next) {
    res.value = res.value + "!";
    next();
});
junction.use(function (error, res, next) {
    console.error(error.stack);
    next();
});

let text = "hello world";
junction.process(text, function (error, result) {
    if (error) {
        console.error(error);
    }
    let value = result.value;
    assert.equal(value, "HELLO WORLD!");
});