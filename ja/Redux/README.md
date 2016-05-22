# Redux

> この文章は[Redux][] [3.5.2](https://github.com/reactjs/redux/releases/tag/v3.5.2 "3.5.2")を元に書かれています。

[Redux][]はJavaScriptアプリケーションのStateを管理するライブラリで、
[React](https://github.com/facebook/react "React")などと組み合わせアプリケーションを作成するために利用されています。

Reduxは[Flux](https://facebook.github.io/flux/ "Flux")アーキテクチャに類似する仕組みです。
そのため、事前にFluxについて学習していると良いです。

Reduxには[Three Principles](http://redux.js.org/docs/introduction/ThreePrinciples.html "Three Principles | Redux")(以下、三原則)と呼ばれる3つの制約の上で成立しています。

- Single source of truth
    - アプリケーション全体のStateは1つのStateツリーとして保存される
- State is read-only
    - StateはActionを経由しないと書き換えることができない
- Changes are made with pure functions
    - Actionを受け取りStateを書き換えるReducerと呼ばれるpure functionを作る

この三原則についての詳細はドキュメントなどを参照してください。

- [Read Me | Redux](http://redux.js.org/)
- [Getting Started with Redux - Course by @dan_abramov @eggheadio](https://egghead.io/series/getting-started-with-redux)

Reduxの使い方についてはここでは解説しませんが、Reduxの拡張機能となる _Middleware_ も、この三原則に基づいた仕組みとなっています。

_Middleware_ という名前からも分かるように、[connect](../connect/README.md)の仕組みと類似点があります。
[connect](../connect/README.md)の違いを意識しながら、Reduxの _Middleware_ の仕組みを見ていきましょう。

## どう書ける?

簡潔にReduxの仕組みを書くと以下のようになります。

- 操作を表現するオブジェクトをActionと呼ぶ
    - 一般的なコマンドパターンのコマンドと同様のもの
- Actionを受け取りStateを書き換える関数を _Reducer_ と呼ぶ
    - ReducerはStoreへ事前に登録する
- ActionをDispatch(`store.dispatch(action)`)することで、ActionをReducerへ通知する

Reduxの例として次のようなコードを見てみます。

[import, redux-example.js](../../src/Redux/redux-example.js)

1. `logger`と`crashReporter`のmiddlewareを適応した`createStore`関数を作る
2. Reducerを登録したStoreを作成
3. (Storeの変更をする)Actionをdispatch
4. Actionを受け取り新しいStateを返すReducer関数
5. Stateが変更されたら呼ばれる

というような流れで動作します。

上記の処理のうち、 3から4の間が _Middleware_ が処理する場所となっています。

```
dispatch(action) -> (_Middleware_ の処理) -> reducerにより新しいStateの作成 -> (Stateが変わったら) -> subscribeで登録したコールバックを呼ぶ
```

- [ ] 図にしたほうがいい

次は _Middleware_ によりどのような拡張ができるのかを見ていきます。

## Middleware

Reduxでは第三者が拡張できる仕組みを _Middleware_ と呼んでいます。

- [Middleware | Redux](http://redux.js.org/docs/advanced/Middleware.html "Middleware | Redux")

どのような拡張を _Middleware_ で書けるのか、実際の例を見てみます。
次の _Middleware_ はStoreがdispatchしたActionと、その前後でStateにどういう変更があったのかを出力するロガーです。

[import, logger.js](../../src/Redux/logger.js)

この _Middleware_ は次のようにReduxに対して適用できます。

```js
import {createStore, applyMiddleware} from "redux";
const createStoreWithMiddleware = applyMiddleware(createLogger())(createStore);
```

この時、見た目上は `store` に対して _Middleware_ が適用されているように見えますが、
実際には`store.dispatch`に対して適用され、拡張された`dispatch`メソッドが作成されています。

これにより、`dispatch`を実行する際に _Middleware_ の処理を挟む事ができます。
これがReduxの _Middleware_ による拡張ポイントになっています。

```js
store.dispatch({
    type: "AddTodo",
    title: "Todo title"
});
```

先ほどの`logger.js`をもう一度見てみます。

```js
export default function createLogger(options = defaultOptions) {
    const logger = options.logger || defaultOptions.logger;
    return store => next => action => {
        logger.log(action);
        const value = next(action);
        logger.log(store.getState());
        return value;
    };
}
```

`createLogger`は、loggerにオプションを渡すためのものなので置いておき、
`return`している高階関数の連なりが _Middleware_ の本体となります。

```js
const middleware = store => next => action => {};
```

上記のArrowFunctionの連なりが一見すると何をしているのかが分かりにくいですが、
これは下記のように展開することができます。

```js
const middleware = (store) => {
    return (next) => {
        return (action) => {
            // Middlewareの処理
        };
    };
};
```

ただ単に関数を返す関数(高階関数)を作っているだけだと分かります。

これを踏まえて`logger.js`をもう一度見てみると、`next(action)` の前後にログ表示を挟んでいることが分かります。

[import, logger.js](../../src/Redux/logger.js)

- [ ] ログを挟んでいる図

この場合の `next` は `dispatch` と言い換えても問題ありませんが、複数の _Middleware_ を適応した場合は、
**次の** _Middleware_ を呼び出すという事を表現しています。

Reduxの _Middleware_ の仕組みは単純ですが、見慣れないデザインなので複雑に見えます。
実際に同じ仕組みを実装しながら、Reduxの _Middleware_ について学んでいきましょう。

## どういう仕組み?

_Middleware_ は`dispatch`をラップする処理ですが、そもそも`dispatch`とはどういう事をしているのでしょうか?

簡潔に書くと、Reduxの`store.dispatch(action)`は`store.subscribe(callback)`で登録した`callback`に`actionを渡し呼び出すだけです。

これよくみるPub/Subのパターンですが、今回はこのPub/Subパターンの実装からみていきましょう。

### Dispatcher

[ESLint](../ESLint/README.md)と同様でEventEmitterを使い、`dispatch`と`subscribe`を持つ`Dispatcher`を実装すると以下のようになります。

[import, Dispatcher.js](../../src/Redux/Dispatcher.js)

`Dispatcher`はActionオブジェクトを`dispatch`すると、`subscribe`で登録されていたコールバック関数を呼び出すという単純なものです。

また、この`Dispatcher`の実装はReduxのものとは異なるので、あくまで理解のための参考実装です。

> Unlike Flux, Redux does not have the concept of a Dispatcher
> This is because it relies on pure functions instead of event emitters
> -- [Prior Art | Redux](http://redux.js.org/docs/introduction/PriorArt.html "Prior Art | Redux")

### applyMiddleware

次に、 _Middleware_ を適応する処理となる `applyMiddleware`を実装していきます。
先ほども書いたように、 _Middleware_ は `dispatch` を拡張する仕組みです。

`applyMiddleware`は`dispatch`と _Middleware_ を受け取り、 _Middleware_ で拡張した `dispatch` を返す関数です。

[import, apply-middleware.js](../../src/Redux/apply-middleware.js)

この`applyMiddleware`はReduxのものと同じなので、
次のように _Middleware_ を適応した `dispatch` 関数を作成できます。

[import, apply-middleware-example.js](../../src/Redux/apply-middleware-example.js)

`applyMiddleware`で`timestamp`をActionに付加する _Middleware_ を適用しています。
これにより`dispatchWithMiddleware(action)`した`action`には自動的に`timestamp`プロパティが追加されています。

```js
const dispatchWithMiddleware = applyMiddleware(createLogger(), timestamp)(middlewareAPI);
dispatchWithMiddleware({type: "FOO"});
```

ここで _Middleware_ には`middlewareAPI`として定義した2つのメソッドを持つオブジェクトが渡されています。
しかし、`getState`は読み込みのみで、_Middleware_にはStateを直接書き換える手段が用意されていません。
また、もう1つの`dispatch`もActionオブジェクトを書き換えられますが、結局できることは`dispatch`するだけです。

この事から _Middleware_ にも三原則が適用されている事が分かります。

- State is read-only
    - StateはActionを経由しないと書き換えることができない

_Middleware_ という仕組み自体は[Connect](../connect/README.md)と似ています。
しかし、 _Middleware_ が直接的に結果(State)を直接書き換える事はできません。

Connectの _Middleware_ は最終的な結果(`response`)を書き換えできます。
一方、Reduxの _Middleware_ は扱える範囲が`dispatch`からReducerまでと線引されている違いと言えます。

## どういう事に向いてる?

- アスペクト的に前後に処理を挟むことができる
    - ログへの利用
- 値自体は直接操作できない
- 受取るデータは変換できる

## どういう事に向いていない?

- [ ] TODO
- 変換の仕組み上、書き換え等を行うプラグインを扱いにくい

## この仕組みを使っているもの

- Connectに似ている
- _Middleware_もStateそのものを直接書き換える事はできません
- この部分が類似の仕組みを持つ[connect](../connect/README.md)との違いになっています



[Redux]: https://github.com/reactjs/redux  "reactjs/redux: Predictable state container for JavaScript apps"
