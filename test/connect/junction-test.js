// LICENSE : MIT
"use strict";
import assert from "power-assert";
import Junction from "../../src/connect/junction";
describe("junction", function () {
    describe("when", function () {
        it("should", function (done) {
            var junction = new Junction();
            junction.use(function errorHandling(error, text, next) {
                next(error);
            });
            junction.use(function toUpper(text, next) {
                next(null, text.toLocaleUpperCase());
            });
            junction.use(function addDesu(text, next) {
                next(null, text + " suffix");
            });
            junction.process("text", (error, result) => {
                if (error) {
                    return done(error);
                }
                assert.equal(result, "TEXT suffix");
                done();
            });
        });
    });
});