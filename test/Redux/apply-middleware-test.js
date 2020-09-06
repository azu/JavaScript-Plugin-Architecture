// LICENSE : MIT
const assert = require("power-assert");
import applyMiddleware from "../../src/Redux/apply-middleware";
import Dispatcher from "../../src/Redux/Dispatcher";
import timestamp from "../../src/Redux/timestamp";
import createLogger from "../../src/Redux/logger";
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
        dispatcher.subscribe(payload => {
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
        dispatcher.subscribe(payload => {
            assert(typeof payload.timeStamp === "number");
            done();
        });
        // when
        dispatchWithMiddleware(action);
    });
});
