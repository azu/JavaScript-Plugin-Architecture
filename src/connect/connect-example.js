"use strict";
import hello from "./hello";
import nosniff from "./nosniff";
import assert from "assert";
import connect from "connect";
import http from "http";
import fetch from "node-fetch";
const responseText = "response text";
var app = connect();
app.use(nosniff());
app.use(hello(responseText));

var server = http.createServer(app).listen(3000, () => {
    fetch("http://localhost:3000")
        .then(res => res.text())
        .then(text => {
            assert.equal(text, responseText);
            server.close();
        }).catch(console.error.bind(console));
});


