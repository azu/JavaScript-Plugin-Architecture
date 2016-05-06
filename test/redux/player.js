// LICENSE : MIT
"use strict";
const middleware = core => next => action => {
    return next(action);
};

class Player {
    constructor() {
        this.dispatch = () => {

        }
    }

    applyMiddlewares(...middlewares) {
        const coreAPI = {
            getState(){
                return 1;
            }
        };
        const _dispatch = () => {
        };
        const wrapMiddleware = middlewares.map(middleware => {
            return middleware(coreAPI);
        });

        // apply middleware order by fist
        const last = wrapMiddleware[wrapMiddleware.length - 1];
        const rest = wrapMiddleware.slice(0, -1);
        const oneMiddle = rest.reduceRight((oneMiddle, middleware) => {
            return middleware(oneMiddle);
        }, last);
        return oneMiddle(_dispatch);
    }
}
