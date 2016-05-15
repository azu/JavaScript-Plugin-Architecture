// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import applyMiddleware from "../../src/redux/apply-middleware";
import Dispatcher from "../../src/redux/Dispatcher";
import timestamp from "../../src/redux/timestamp";
describe("middleware", function () {
    it("should apply middleware", function (done) {
        const dispatcher = new Dispatcher();
        const dispatchWithMiddleware = applyMiddleware(timestamp)(dispatcher);
        const action = {type: "FOO"};
        // then
        dispatcher.onDispatch(payload => {
            assert(typeof payload.timeStamp === "number");
            done();
        });
        // when
        dispatchWithMiddleware(action);
    });
});