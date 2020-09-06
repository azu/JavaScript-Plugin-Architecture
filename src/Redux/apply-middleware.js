/*
   => api - middleware api
       => next - next/dispatch function
          => action - action object

 */
const applyMiddleware = (...middlewares) => {
    return middlewareAPI => {
        const originalDispatch = (action) => {
            middlewareAPI.dispatch(action);
        };
        // `api` is middlewareAPI
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

export default applyMiddleware;
