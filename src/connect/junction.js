function isErrorHandingMiddleware(middleware) {
    // middleware(error, text, next)
    const arity = middleware.length;
    return arity === 3;
}
function applyMiddleware(error, response, middleware, next) {
    let errorOnMiddleware = null;
    try {
        if (error && isErrorHandingMiddleware(middleware)) {
            middleware(error, response, next);
        } else {
            middleware(response, next);
        }
        return;
    } catch (error) {
        errorOnMiddleware = error;
    }
    // skip the middleware or Error on the middleware
    next(errorOnMiddleware, response);
}

export default class Junction {
    constructor() {
        this.stack = [];
    }

    use(middleware) {
        this.stack.push(middleware);
    }

    process(initialValue, callback) {
        const response = {value: initialValue};
        const next = (error) => {
            const middleware = this.stack.shift();
            if (!middleware) {
                return callback(error, response);
            }
            applyMiddleware(error, response, middleware, next);
        };
        next();
    }
}
