// LICENSE : MIT
"use strict";
// core -
// next - next function
// action - action object
const applyMiddlewares = (...middlewares) => {
    return middlewareAPI => {
        const originalDispatch = middlewareAPI.dispatch.bind(middlewareAPI);
        const wrapMiddleware = middlewares.map(middleware => {
            return middleware(middlewareAPI);
        });
        // apply middleware order by first
        const last = wrapMiddleware[wrapMiddleware.length - 1];
        const rest = wrapMiddleware.slice(0, -1);
        const roundDispatch = rest.reduceRight((oneMiddle, middleware) => {
            return middleware(oneMiddle);
        }, last);
        return roundDispatch(originalDispatch);
    };
};

export default applyMiddlewares;