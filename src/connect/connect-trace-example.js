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

// print middleware list
app.stack.map(({handle}) => console.log(handle));
/* =>
 [Function: errorHandling]
 [Function: nosniff]
 [Function: hello]
*/