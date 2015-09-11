// LICENSE : MIT
"use strict";
import assert from "power-assert";
import connect from "connect";
import nosniff from "../../src/connect/nosniff";
import hello from "../../src/connect/hello";
import http from "http";
import fetch from "node-fetch";
describe("connect", function () {
    var responseText = "test";
    var server;
    before(function (done) {
        var app = connect();
        app.use(nosniff());
        app.use(hello(responseText));
        server = http.createServer(app).listen(3000, done);
    });
    after(function () {
        server.close();
    });
    describe("hello", function () {
        it("should return response text", function () {
            return fetch("http://localhost:3000")
                .then(res => res.text())
                .then(text => {
                    assert.equal(text, responseText);
                });
        });
    });
    describe("sniff", function () {
        it("should return response has `X-Content-Type-Options` header", function () {
            return fetch("http://localhost:3000")
                .then(res => {
                    assert.equal(res.headers.get("x-content-type-options"), "nosniff");
                });
        });
    });
});