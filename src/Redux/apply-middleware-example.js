import Dispatcher from "./Dispatcher";
import applyMiddleware from "./apply-middleware";
import timestamp from "./timestamp";
import createLogger from "./logger";
const dispatcher = new Dispatcher();
dispatcher.subscribe(action => {
    console.log(action);
    /*
    { timeStamp: 1463742440479, type: 'FOO' }
     */
});
// Redux compatible middleware API
const state = {};
const middlewareAPI = {
    getState(){
        // shallow-copy state
        return Object.assign({}, state);
    },
    dispatch(action){
        dispatcher.dispatch(action);
    }
};
// create `dispatch` function that wrapped with middleware
const dispatchWithMiddleware = applyMiddleware(createLogger(), timestamp)(middlewareAPI);
dispatchWithMiddleware({type: "FOO"});
