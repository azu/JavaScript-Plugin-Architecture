// LICENSE : MIT
"use strict";
import assert from "power-assert";
import Junction from "../../src/connect/junction";
describe("junction", function () {
    context("when register middlewares", function () {
        it("should connect middleware, the order is register", function (done) {
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
    context("when occur error in middleware", function () {
        it("should call errorHandling middleware", function (done) {
            var junction = new Junction();
            junction.use(function toUpper(text, next) {
                throw new Error("ROL");
            });
            // TODO: 順番に依存してる
            junction.use(function errorHandling(error, text, next) {
                assert(error instanceof Error);
                done();
            });
            junction.process("text", (error, result) => {
                if (error) {
                    return done(error);
                }
                done();
            });
        });
    })
});