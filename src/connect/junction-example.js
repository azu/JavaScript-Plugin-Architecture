import Junction from "./junction";
import assert from "assert";
const junction = new Junction();
junction.use(function toUpperCase(res, next) {
    res.value = res.value.toUpperCase();
    next();
});
junction.use(function exclamationMark(res, next) {
    res.value = res.value + "!";
    next();
});
junction.use(function errorHandling(error, res, next) {
    console.error(error.stack);
    next();
});

const text = "hello world";
junction.process(text, function (error, result) {
    if (error) {
        console.error(error);
    }
    const value = result.value;
    assert.equal(value, "HELLO WORLD!");
});
