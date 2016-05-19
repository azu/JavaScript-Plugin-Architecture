"use strict";
const EventEmitter = require("events");
export const ON_DISPATCH = "__ON_DISPATCH__";
/**
 * The action object that must have `type` property.
 * @typedef {Object} Action
 * @property {String} type The event type to dispatch.
 * @public
 */
export default class Dispatcher extends EventEmitter {
    /**
     * subscribe `dispatch` and call handler. it return release function
     * @param {function(Action)} actionHandler
     * @returns {Function} call the function and release handler
     */
    subscribe(actionHandler) {
        this.on(ON_DISPATCH, actionHandler);
        return this.removeListener.bind(this, ON_DISPATCH, actionHandler);
    }

    /**
     * dispatch action object.
     * @param {Action} action
     */
    dispatch(action) {
        this.emit(ON_DISPATCH, action);
    }
}