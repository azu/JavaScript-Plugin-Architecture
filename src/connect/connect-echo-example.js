"use strict";
import connect from "connect";
import http from "http";
import fetch from "node-fetch";
import assert from "assert";
var app = connect();
// add Error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
    next();
});
// request to response
app.use(function (req, res) {
    req.pipe(res);
});
//create node.js http server and listen on port
var server = http.createServer(app).listen(3000, request);

var closeServer = server.close.bind(server);
// request => response
function request() {
    var requestBody = {
        "key": "value"
    };
    fetch("http://localhost:3000", {
        method: "POST",
        body: JSON.stringify(requestBody)
    })
        .then(res => res.text())
        .then(text => {
            assert.deepEqual(text, requestBody);
        }).then(closeServer, closeServer);
}
