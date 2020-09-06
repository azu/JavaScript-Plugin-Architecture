// LICENSE : MIT
export default (/*store*/) => next => action => {
    const timestampedAction = Object.assign({}, {
        timeStamp: Date.now()
    }, action);
    return next(timestampedAction);
};
