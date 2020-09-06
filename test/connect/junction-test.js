// LICENSE : MIT
import assert from "power-assert";
import Junction from "../../src/connect/junction";
describe("junction", function () {
    context("when register middlewares", function () {
        it("should connect middleware, the order is register", function (done) {
            let junction = new Junction();
            junction.use(function errorHandling(error, text, next) {
                next(error);
            });
            junction.use(function toUpper(res, next) {
                res.value = res.value.toLocaleUpperCase();
                next();
            });
            junction.use(function addDesu(res, next) {
                res.value += " suffix";
                next();
            });
            junction.process("text", (error, result) => {
                if (error) {
                    return done(error);
                }
                assert.equal(result.value, "TEXT suffix");
                done();
            });
        });
    });
    context("when occur error in middleware", function () {
        it("should call errorHandling middleware", function (done) {
            let junction = new Junction();
            junction.use(function toUpper(res) {
                throw new Error("error on " + res);
            });
            junction.use(function errorHandling(error, res, next) {
                assert(error instanceof Error);
                assert.equal(res.value, "text");
                next();
            });
            junction.process("text", (error, res) => {
                if (error) {
                    return done(error);
                }
                assert.equal(res.value, "text");
                done();
            });
        });
    });
});
