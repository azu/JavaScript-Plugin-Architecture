# Connect

> この文章はConnect 3.4.0を元に書かれています。

[Connect](https://github.com/senchalabs/connect "Connect")はNode.jsで動くHTTPサーバフレームワークです。
_middleware_という拡張する仕組みを持っていて、Connectが持つ機能自体はとても少ないです。

この章ではConnectの_middleware_の仕組みについて見て行きましょう。

## どう書ける?

Connectを使った簡単なEchoサーバを書いてみましょう。
Echoサーバとは、送られてきたリクエストの内容をそのままレスポンスとして返すサーバのことです。

[import, connect-echo-example.js](../../src/connect/connect-echo-example.js)

このEchoサーバに対して、以下のようなリクエストBodyを送信すると、レスポンスとして同じ値が返ってきます。

```json
{
    "key": "value"
}
```

`app.use(middleware)` という形で、_middleware_と呼ばれる関数には`request`や`response`といったオブジェクトが渡されます。
そのため、リクエストをフィルタリングしたり、ログを取ったり、任意のレスポンスを返したり出来るようになっています。

Echoサーバでは `req.pipe(res);` という形でリクエストをそのままレスポンスとして流す事で実現されています。

### middlewareをモジュールとして実装

もう少し_middleware_をプラグインらしくモジュールとして実装したものを見てみます。

次の[connect-example.js](#connect-example.js)は、あらゆるリクエストに対して、
`"response text"`というレスポンスを`"X-Content-Type-Options"`ヘッダを付けて返すだけのものです。

それぞれの処理を_middleware_としてファイルを分けて実装し、`app.use(middleware)`で処理を追加しています。

[import errorHandler.js](../../src/connect/errorHandler.js)

[import nosniff.js](../../src/connect/nosniff.js)

[import hello.js](../../src/connect/hello.js)

[import connect-example.js](../../src/connect/connect-example.js)

基本的にどの_middleware_も`app.use(middleware)`という形で拡張でき、
モジュールとして実装すれば再利用もしやすい形となっています。

> **Note** _middleware_となる関数の引数が4つであると、それはエラーハンドリングの_middleware_とするという、Connect独自のルールがあります。

