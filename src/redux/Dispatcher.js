// LICENSE : MIT
"use strict";
const assert = require("assert");
const EventEmitter = require("events");
export const ON_DISPATCH = "__ON_DISPATCH__";
/**
 * payload The payload object that must have `type` property.
 * @typedef {Object} DispatcherPayload
 * @property {String} type The event type to dispatch.
 * @public
 */
export default class Dispatcher extends EventEmitter {
    /**
     * add onAction handler and return unbind function
     * @param {function(DispatcherPayload)} payloadHandler
     * @returns {Function} call the function and release handler
     * @public
     */
    onDispatch(payloadHandler) {
        this.on(ON_DISPATCH, payloadHandler);
        return this.removeListener.bind(this, ON_DISPATCH, payloadHandler);
    }

    /**
     * dispatch action object.
     * StoreGroups receive this action and reduce state.
     * @param {DispatcherPayload} payload
     * @public
     */
    dispatch(payload) {
        assert(payload !== undefined && payload !== null, "payload should not null or undefined");
        assert(typeof payload.type === "string", "payload's type should be string");
        this.emit(ON_DISPATCH, payload);
    }

}