// LICENSE : MIT
"use strict";
const defaultOptions = {
    // default: logger use console API
    logger: console
};
/**
 * create logger middleware
 * @param {{logger: *}} options
 * @returns {Function} middleware function
 */
export default function createLogger(options = defaultOptions) {
    const logger = options.logger || defaultOptions.logger;
    return store => next => action => {
        logger.log(action);
        const value = next(action);
        logger.log(store.getState());
        return value;
    };
}