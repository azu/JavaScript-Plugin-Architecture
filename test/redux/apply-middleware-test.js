// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import applyMiddleware from "../../src/redux/apply-middleware";
import Dispatcher from "../../src/redux/Dispatcher";
import timestamp from "../../src/redux/timestamp";
import createLogger from "../../src/redux/logger";
describe("middleware", function () {
    it("could apply logger middleware", function () {
        const dispatcher = new Dispatcher();
        const logs = [];
        const con = {
            log(message){
                logs.push(message);
            }
        };
        const middleware = createLogger({
            logger: con
        });
        // state
        const state = {};
        const middlewareAPI = {
            getState(){
                return state;
            },
            dispatch(action){
                dispatcher.dispatch(action);
            }
        };
        const dispatchWithMiddleware = applyMiddleware(middleware)(middlewareAPI);
        const action = {type: "FOO"};
        // then
        dispatcher.onDispatch(payload => {
            if(payload.type === "FOO"){
                state.isUpdated = true;
            }
        });
        // when
        dispatchWithMiddleware(action);
        assert.deepEqual(logs, [action, state]);
    });
    it("could apply timestamp middleware", function (done) {
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