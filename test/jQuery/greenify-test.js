// LICENSE : MIT
import jsdom from "jsdom";
import assert from "power-assert";
import fs from "fs";
const testbed = fs.readFileSync(__dirname + "/fixtures/testbed.html", "utf-8");
const jquery = fs.readFileSync(__dirname + "/../../node_modules/jquery/dist/jquery.js", "utf-8");
const greenify = fs.readFileSync(__dirname + "/../../src/jQuery/greenify.js", "utf-8");
describe("greenify", function () {
    let $, document;
    before(done => {
        jsdom.env({
            html: testbed,
            src: [jquery, greenify],
            done: function (err, window) {
                document = window.document;
                $ = window.$;
                done();
            }
        });
    });
    it("should extend $.prototype with greenify", function () {
        assert(typeof $ !== "undefined");
        assert($.fn.greenify != null);
        assert($(document.body).greenify != null);
        assert($(document.body).greenify() instanceof $);
    });
});
