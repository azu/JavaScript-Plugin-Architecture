"use strict";
import connect from "connect";
import http from "http";
var app = connect();
// add Error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
    next();
});
// add "X-Content-Type-Options" to response
app.use(function (req, res, next) {
    res.setHeader("X-Content-Type-Options", "nosniff");
    next(); // => next middleware
});
// respond to all requests
app.use(function (req, res) {
    res.end("response text");
});
//create node.js http server and listen on port
http.createServer(app).listen(3000);


