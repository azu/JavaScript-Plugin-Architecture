"use strict";
function applyMiddleware(text, middleware, next) {
    middleware(text, next);
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
            applyMiddleware(data, middleware, next);
        };
        next(null, text);
    }
}