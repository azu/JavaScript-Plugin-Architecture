"use strict";
function isErrorHandingMiddleware(middleware) {
    // middleware(error, text, next)
    var arity = middleware.length;
    return arity === 3;
}
function applyMiddleware(error, text, middleware, next) {
    let errorOnMiddleware = null;
    try {
        if (error && isErrorHandingMiddleware(middleware)) {
            middleware(error, text, next);
        } else {
            middleware(text, next);
        }
        return;
    } catch (error) {
        errorOnMiddleware = error;
    }
    // skip the middleware or Error on the middleware
    next(errorOnMiddleware, text);
}

export default class Junction {
    constructor() {
        this.stack = [];
    }

    use(middleware) {
        this.stack.push(middleware);
    }

    process(text, callback) {
        let next = (error, data) => {
            let middleware = this.stack.shift();
            if (!middleware) {
                return callback(error, data);
            }
            applyMiddleware(error, data, middleware, next);
        };
        next(null, text);
    }
}