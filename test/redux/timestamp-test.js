// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {createStore, applyMiddleware} from "redux";
import timestamp from "../../src/redux/timestamp";
const initialState = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FOO":
            return {FOO: action.timeStamp};
        default:
            return state;
    }
};

describe("logger-test", function () {
    let store, dispatch;
    beforeEach(() => {
        store = applyMiddleware(timestamp)(createStore)(reducer);
        dispatch = store.dispatch;
    });
    it("should output log", function () {
        const action = {type: "FOO"};
        dispatch(action);
        const state = store.getState();
        assert(typeof state.FOO === "number");
    });
});