"use strict";
import Dispatcher from "./Dispatcher";
const dispatcher = new Dispatcher();
dispatcher.subscribe(action => {
    console.log(action);
    /*
    {
        type: "ActionType"
    }
    */
});
dispatcher.dispatch({
    type: "ActionType"
});