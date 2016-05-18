import {createStore, applyMiddleware} from "redux";
import createLogger from "./logger";
import timestamp from "./timestamp";
// 4. Actionを受け取り新しいStateを返すReducer関数
const reducer = (state = {}, action) => {
    switch (action.type) {
    case "AddTodo":
        return Object.assign({}, state, {title: action.title});
    default:
        return state;
    }
};
// 1. `logger`と`crashReporter`のmiddlewareを適応した`createStore`関数を作る
const createStoreWithMiddleware = applyMiddleware(createLogger(), timestamp)(createStore);

// 2. Reducerを登録したStoreを作成
const store = createStoreWithMiddleware(reducer);

store.subscribe(() => {
    // 5. Stateが変更されたら呼ばれる
    const state = store.getState();
    // 現在のStateを取得
    console.log(state);
});
// 3. Storeの変更をするActionをdispatch
store.dispatch({
    type: "AddTodo",
    title: "Todo title"
});