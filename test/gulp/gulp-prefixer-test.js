// LICENSE : MIT
"use strict";
import assert from "power-assert";
import {createReadStream} from "fs";
import {prefixBuffer, prefixStream} from "../../src/gulp/gulp-prefixer";
describe("gulp-prefixer-test", function () {
    describe("#prefixBuffer", function () {
        it("should add prefix text to buffer", function () {
            let result = prefixBuffer(Buffer("text"), "prefix");
            assert.equal(result.toString(), "prefixtext");
        });
    });
    describe("#prefixStream", function () {
        it("should add prefix text to stream", function (done) {
            let buffer = "";
            let stream = createReadStream(__dirname + "/fixtures/text.txt");
            stream.pipe(prefixStream("prefix"))
                .on("data", function (chunk) {
                    buffer += chunk;
                })
                .on("end", function () {
                    assert.equal(buffer.toString(), "prefixtext");
                    done();
                });
        });
    });

});