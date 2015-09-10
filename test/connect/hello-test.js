// LICENSE : MIT
"use strict";
var assert = require("power-assert");
import connect from "connect"
import hello from "../../src/connect/hello";

describe("hello", function () {
    before(function () {
        var connect = require('connect');
        var http = require('http');
        var app = connect();
        app.use(hello("test"));
        http.createServer(app).listen(3000, done);
    });
    after(function (done) {
    });
    it("should return test", function ()
    );
});