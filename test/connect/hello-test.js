// LICENSE : MIT
"use strict";
import assert from "power-assert";
import connect from "connect";
import errorHandler from "../../src/connect/errorHandler";
import nosniff from "../../src/connect/nosniff";
import hello from "../../src/connect/hello";
import echo from "../../src/connect/echo";
import http from "http";
import fetch from "node-fetch";
describe("connect", function () {
    const responseText = "test";
    let server;
    describe("errorHandler", function () {
        beforeEach(function (done) {
            let app = connect();
            app.use(errorHandler());
            app.use((req, res, next) => {
                next(new Error("wrong"));
            });
            server = http.createServer(app).listen(3000, done);
        });
        afterEach(function () {
            server && server.close();
        });
        it("should return 500 status response", function () {
            return fetch("http://localhost:3000")
                .then(res => res.status)
                .then(status => {
                    assert(status, 500);
                });
        });

    });
    describe("hello", function () {
        beforeEach(function (done) {
            let app = connect();
            app.use(errorHandler());
            app.use(hello(responseText));
            server = http.createServer(app).listen(3000, done);
        });
        afterEach(function () {
            server && server.close();
        });
        it("should return response text", function () {
            return fetch("http://localhost:3000")
                .then(res => res.text())
                .then(text => {
                    assert.equal(text, responseText);
                });
        });
    });
    describe("sniff", function () {
        beforeEach(function (done) {
            let app = connect();
            app.use(nosniff());
            app.use(hello(responseText));
            server = http.createServer(app).listen(3000, done);
        });
        afterEach(function () {
            server && server.close();
        });
        it("should return response has `X-Content-Type-Options` header", function () {
            return fetch("http://localhost:3000")
                .then(res => {
                    assert.equal(res.headers.get("x-content-type-options"), "nosniff");
                });
        });
    });
    describe("echo", function () {
        beforeEach(function (done) {
            let app = connect();
            app.use(echo());
            server = http.createServer(app).listen(3000, done);
        });
        afterEach(function () {
            server && server.close();
        });
        it("should return request as response", function () {
            const requestBody = Object.freeze({
                key: "value"
            });
            return fetch("http://localhost:3000", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            }).then(res => {
                return res.json();
            }).then(json => {
                assert.deepEqual(json, requestBody);
            });
        });
    });
});