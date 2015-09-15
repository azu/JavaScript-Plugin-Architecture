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
この`request`や`response`を_middleware_で処理することでログを取ったり、任意のレスポンスを返したり出来るようになっています。

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

## どういう仕組み

Connectの_middleware_がどのような仕組みで動いているのかを見ていきます。

`app`に登録した_middleware_は、リクエスト時に呼び出されているので、
`app`のどこかに利用する_middleware_を保持していることは推測できると思います。

Connectでは`app.stack`にまだに_middleware_が保持されています。
次のような`app.stack`の中身を表示見ることで、_middleware_が登録順で保持されていることがわかります。

[import connect-trace-example.js](../../src/connect/connect-trace-example.js)

後は、サーバへリクエストがやってきた時に、それぞれの_middleware_を順番に呼び出しています。

上記の例だと以下の順番で_middleware_が呼び出されることになります。

- errorHandler
- nosniff
- hello

エラーハンドリングの_middleware_はエラー時のみ呼ばれるため例外なので、
[nosniff.js](#nosniff.js) -> [hello.js](#hello.js) と呼び出されます。

[import nosniff.js](../../src/connect/nosniff.js)

`nosniff.js`は、処理が終わったら`next()`を呼び出していて、
この`next()`が次の_middleware_へ行くという意味になります。

次に、`hello.js`を見てみると、`next()`がないことがわかります。

[import hello.js](../../src/connect/hello.js)

`next()`がないということは`hello.js`がこの連続する_middleware_の最後となっていることがわかります。
仮に、これより先に_middleware_が登録されていたとしても無視されます。

つまり、処理的には以下のようにstackを先頭から一個づつ取り出して、処理していくという方法が取られています。

```js
let req = "...",
    res = "...";
function next(){
    let middleware = app.stack.shift();
    // nextが呼ばれれば次のmiddleware
    middleware(req, res, next);
}
next();// 初回
```


このような_middleware_を繋げた形を_middleware stack_と呼ぶことがあります。

HTTPサーバではこのような_middleware stack_を作って使うものは既にあり、
PythonのWSGI MiddlewareやRubyのRackなどが該当します。

Connectは`use`というメソッドで_middleware_を使うことからも分かりますが、
Rackを参考にして実装されています。

- [Ruby - Rack解説 - Rackの構造とRack DSL - Qiita](http://qiita.com/higuma/items/838f4f58bc4a0645950a#2-5 "Ruby - Rack解説 - Rackの構造とRack DSL - Qiita")

次に、この_middleware stack_をどう処理しているのかを、
具体的な実装を書きながら見て行きましょう。

## 実装してみよう