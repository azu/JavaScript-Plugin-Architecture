// LICENSE : MIT
"use strict";
import assert from "power-assert";
import connect from "connect"
import hello from "../../src/connect/hello";
import http from "http";
import fetch from "node-fetch";
describe("hello", function () {
    var responseText = "test";
    var server;
    before(function (done) {
        var app = connect();
        app.use(hello(responseText));
        server = http.createServer(app).listen(3000, done);
    });
    after(function () {
        server.close();
    });
    it("should return response text", function () {
        return fetch("http://localhost:3000")
            .then(res => res.text())
            .then(text => {
                assert.equal(text, responseText);
            });
    });
});