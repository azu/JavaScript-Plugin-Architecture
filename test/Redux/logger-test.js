// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {createStore, applyMiddleware} from "redux";
import createLogger from "../../src/Redux/logger";
const initialState = {};
const reducer = (state = initialState, action) => state;

describe("logger-test", function () {
    let store, dispatch, logs;
    beforeEach(() => {
        logs = [];
        const con = {
            log(message){
                logs.push(message);
            }
        };
        const middleware = createLogger({
            logger: con
        });
        store = applyMiddleware(middleware)(createStore)(reducer);
        dispatch = store.dispatch;
    });
    afterEach(() => {
        logs.length = 0;
    });
    it("should output log", function () {
        const action = {type: "FOO"};
        dispatch(action);
        assert.deepEqual(logs, [action, initialState]);
    });
});