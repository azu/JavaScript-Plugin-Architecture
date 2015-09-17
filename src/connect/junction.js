"use strict";
function isErrorHandingMiddleware(middleware) {
    // middleware(error, text, next)
    let arity = middleware.length;
    return arity === 3;
}
function applyMiddleware(error, data, middleware, next) {
    let errorOnMiddleware = null;
    try {
        if (error && isErrorHandingMiddleware(middleware)) {
            middleware(error, data, next);
        } else {
            middleware(data, next);
        }
        return;
    } catch (error) {
        errorOnMiddleware = error;
    }
    // skip the middleware or Error on the middleware
    next(errorOnMiddleware, data);
}

export default class Junction {
    constructor() {
        this.stack = [];
    }

    use(middleware) {
        this.stack.push(middleware);
    }

    process(initialData, callback) {
        let next = (error, data) => {
            let middleware = this.stack.shift();
            if (!middleware) {
                return callback(error, data);
            }
            applyMiddleware(error, data, middleware, next);
        };
        next(null, initialData);
    }
}