"use strict";
import errorHandler from "./errorHandler";
import hello from "./hello";
import nosniff from "./nosniff";
import assert from "assert";
import connect from "connect";
import http from "http";
import fetch from "node-fetch";
const responseText = "response text";
let app = connect();
// add Error handling
app.use(errorHandler());
// add "X-Content-Type-Options" to response
app.use(nosniff());
// respond to all requests
app.use(hello(responseText));
//create node.js http server and listen on port
let server = http.createServer(app).listen(3000, request);

function request() {
    let closeServer = server.close.bind(server);
    fetch("http://localhost:3000")
        .then(res => res.text())
        .then(text => {
            assert.equal(text, responseText);
            server.close();
        })
        .catch(console.error.bind(console))
        .then(closeServer, closeServer);
}