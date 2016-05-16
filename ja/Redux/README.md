# Redux

> この文章は[Redux][] [3.5.2](https://github.com/reactjs/redux/releases/tag/v3.5.2 "3.5.2")を元に書かれています。

[Redux][]はJavaScriptアプリケーションのStateを管理するライブラリで、
[React](https://github.com/facebook/react "React")などと組み合わせアプリケーションを作成するために利用されています。

Reduxは[Flux](https://facebook.github.io/flux/ "Flux")アーキテクチャに類似する仕組みであるため、事前にFluxについて学習していると良いです。

Reduxには[Three Principles](http://redux.js.org/docs/introduction/ThreePrinciples.html "Three Principles | Redux")と呼ばれる3つの制約の上で成立しています。

- Single source of truth
    - アプリケーション全体のStateは一つのStateツリーとして保存される
- State is read-only
    - StateはActionを経由しないと書き換えることができない
- Changes are made with pure functions
    - Actionを受け取りStateを書き換えるReducerと呼ばれるpure functionを作る
    
この[Three Principles](http://redux.js.org/docs/introduction/ThreePrinciples.html "Three Principles | Redux")についての詳細はドキュメントなどを参照してください。

- [Read Me | Redux](http://redux.js.org/)
- [Getting Started with Redux - Course by @dan_abramov @eggheadio](https://egghead.io/series/getting-started-with-redux)

Reduxの使い方についてはここでは解説しませんが、Reduxの拡張である _Middleware_ も、このThree Principlesに基づいた仕組みとなっています。

3行でReduxの仕組みを書くと以下のようになります。

- 操作を表現するオブジェクトをActionと呼ぶ - 一般にコマンドパターンのコマンドと同様のもの
- Actionを受け取りStateを書き換える関数を _Reducer_ と呼ぶ - ReducerはStoreに事前に登録する
- ActionをDispatch(`store.dispatch(action)`)することで、ActionをReducerへ通知する

つまり、_Middleware_もStateそのものを直接書き換える事はできません。
この部分が類似の仕組みを持つ[connect](../connect/README.md)との違いになっています。

## どう書ける?

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';

// applyMiddleware takes createStore() and returns
// a function with a compatible API.
let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore);

// Use it like you would use createStore()
let todoApp = combineReducers(reducers);
let store = createStoreWithMiddleware(todoApp);
```

## どういう仕組み?

- 高階関数をapplyしている
- http://rackt.github.io/redux/docs/advanced/Middleware.html
- その機構のコードへのリンク
- その仕組みやプラグインについてドキュメントへのリンク

## 実装してみよう

- [ ] TODO
- [ ] DispatcherベースのMiddleware

## どういう事に向いてる?

- [ ] TODO
- アスペクト的に前後に処理を挟むことができる
    - ログへの利用
- 値自体は直接操作するわけではないが、受取るデータは変換できる

## どういう事に向いていない?

- [ ] TODO
- 変換の仕組み上、書き換え等を行うプラグインを扱いにくい

## この仕組みを使ってるもの

- Connectに似ている


[Redux]: https://github.com/reactjs/redux  "reactjs/redux: Predictable state container for JavaScript apps"