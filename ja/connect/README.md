# Connect

> この文章は[Connect](https://github.com/senchalabs/connect "Connect") 3.4.0を元に書かれています。

[Connect](https://github.com/senchalabs/connect "Connect")はNode.jsで動くHTTPサーバーフレームワークです。
 _middleware_ という拡張する仕組みを持ち、Connectがもつ機能自体はとても少ないです。

この章ではConnectの _middleware_ の仕組みについて見て行きましょう。

## どう書ける?

Connectを使い簡単なEchoサーバを書いてみましょう。
Echoサーバとは、送られてきたリクエストの内容をそのままレスポンスとして返すサーバのことです。

[import, connect-echo-example.js](../../src/connect/connect-echo-example.js)

このEchoサーバに対して、次のようなリクエストBodyを送信すると、レスポンスとして同じ値が返ってきます。

```json
{
    "key": "value"
}
```

`app.use(middleware)` という形で、 _middleware_ と呼ばれる関数には`request`や`response`といったオブジェクトが渡されます。
この`request`や`response`を _middleware_ で処理することで、ログを取ったり、任意のレスポンスを返すことができます。

Echoサーバでは `req.pipe(res);` という形でリクエストをそのままレスポンスとして流すことで実現されています。

### middlewareをモジュールとして実装

もう少し _middleware_ をプラグインらしくモジュールとして実装したものを見てみます。

次の[connect-example.js](#connect-example.js)は、あらゆるリクエストに対して、
`"response text"`というレスポンスを`"X-Content-Type-Options"`ヘッダを付けて返すだけのサーバです。

それぞれの処理を _middleware_ としてファイルを分けて実装し、`app.use(middleware)`で処理を追加しています。


[import nosniff.js](../../src/connect/nosniff.js)

[import hello.js](../../src/connect/hello.js)

[import errorHandler.js](../../src/connect/errorHandler.js)

[import connect-example.js](../../src/connect/connect-example.js)

基本的にどの _middleware_ も`app.use(middleware)`という形で拡張でき、
モジュールとして実装すれば再利用もしやすい形となっています。

> **Note** _middleware_ となる関数の引数が4つであると、それはエラーハンドリングの _middleware_ とするという、Connect独自のルールがあります。

## どのような仕組み?

Connectの _middleware_ がどのような仕組みで動いているのかを見ていきます。

`app`に登録した _middleware_ は、リクエスト時に呼び出されています。
そのため、`app`のどこかに利用する _middleware_ を保持していることは推測できると思います。

Connectでは`app.stack`に _middleware_ を配列として保持しています。
次のようにして`app.stack`の中身を表示してみると、 _middleware_ が登録順で保持されていることがわかります。

[import connect-trace-example.js](../../src/connect/connect-trace-example.js)

Connectは登録された _middleware_ を、サーバがリクエストを受け取りそれぞれ順番に呼び出しています。

上記の例だと次の順番で _middleware_ が呼び出されることになります。

- nosniff
- hello
- errorHandler

エラーハンドリングの _middleware_ は処理中にエラーが起きた時のみ呼ばれます。

そのため、通常は [nosniff.js](#nosniff.js) → [hello.js](#hello.js) の順で呼び出されます。

[import nosniff.js](../../src/connect/nosniff.js)

`nosniff.js`は、HTTPヘッダを設定し終わったら`next()`を呼び出し、
この`next()`が次の _middleware_ へ行くという意味になります。

次に、`hello.js`を見てみると、`next()`がありません。

[import hello.js](../../src/connect/hello.js)

`next()`がないということは`hello.js`がこの連続する _middleware_ の最後となっていることがわかります。
仮に、これより先に _middleware_ が登録されていたとしても無視されます。

つまり、処理的には次のようにstackを先頭から一個づつ取り出し、処理していくという方法が取られています。

Connectの行っている処理を抽象的なコードで書くと次のような形になっています。

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


このような _middleware_ を繋げたものを_middleware stack_と呼ぶことがあります。

_middleware stack_ で構成されるHTTPサーバとして、PythonのWSGI middlewareやRubyのRackなどがあります。
ConnectはRackと同じく`use`で _middleware_ を指定することからも分かりますが、
Rackを参考にした実装となっています。

- [Ruby - Rack解説 - Rackの構造とRack DSL - Qiita](http://qiita.com/higuma/items/838f4f58bc4a0645950a#2-5 "Ruby - Rack解説 - Rackの構造とRack DSL - Qiita")

次は、先ほど抽象的なコードとなっていたものを具体的な実装にしながら見ていきます。

## 実装してみよう

Connectライクな _middleware_ をサポートしたJunctionというクラスを作成してみます。

Junctionは、`use(middleware)` と `process(value, (error, result) => { });`を持っているシンプルなクラスです。

[import junction.js](../../src/connect/junction.js)

実装を見てみると、`use`で _middleware_ を登録して、`process`で登録した _middleware_ を順番に実行していきます。
そのため、`Junction`自体は渡されたデータの処理をせずに、 _middleware_ の中継のみをしています。

登録する _middleware_ はConnectと同じもので、処理をしたら`next`を呼んで、次の _middleware_ が処理するというのを繰り返しています。

使い方はConnectと引数の違いはありますが、ほぼ同じような形で利用できます。

[import junction-example.js](../../src/connect/junction-example.js)


## どのような用途に向いている?

ConnectやJunctionの実装を見てみると分かりますが、このアーキテクチャでは機能の詳細を _middleware_ で実装できます。
そのため、本体の実装は _middleware_ に提供するインタフェースの決定、エラーハンドリングの手段を提供するだけでとても小さいものとなっています。

今回は紹介していませんが、Connectにはルーティングに関する機能があります。
しかし、この機能も「与えられたパスにマッチした場合のみに反応する _middleware_ を登録する」という単純なものです。

```js
app.use("/foo", function fooMiddleware(req, res, next) {
    // req.url starts with "/foo"
    next();
});
```

このアーキテクチャは、入力と出力がある場合にコアとなる部分は小さく実装できることが分かります。

そのため、ConnectやRackなどのHTTPサーバでは「リクエストに対してレスポンスを返す」というのが決まっているので、
このアーキテクチャは適しています。

## どのような用途に向いていない?

このアーキテクチャでは機能の詳細が _middleware_ で実装できます。
しかし、多くの機能を _middleware_ で実装していくと、 _middleware_ 間に依存関係を作ってしまうことがあります。

この場合、`use(middleware)` で登録する順番により挙動が変わるため、
利用者が _middleware_ 間の依存関係を解決する必要があります。

そのため、プラグイン同士の強い独立性や明確な依存関係を扱いたい場合には不向きといえるでしょう。

これらを解消するためにコアはそのままにして、最初から幾つかの_middleware stack_を作ったものが提供されるケースもあります。

## エコシステム

Connect自体の機能は少ないですが、その分 _middleware_ の種類が多くあります。

- [github.com/senchalabs/connect#middleware](https://github.com/senchalabs/connect#middleware)
- [Express middleware](http://expressjs.com/resources/middleware.html "Express middleware")

また、それぞれの _middleware_ が小さな単機能となっていて、それを組み合わせて使うように作られているケースが多いです。

これは、 _middleware_ が層として重なっている作り、つまり _middleware stack_ の形を取ることが多いためだといえます。

![pylons_as_onion](img/pylons_as_onion.png)

> ミドルウェアでラップするプロセスは、概念的にたまねぎの中の層と同様の構造をもたらします。
> [WSGI ミドルウェア](http://docs.pylonsproject.org/projects/pylons-webframework/en/v1.0.1rc1/concepts.html#wsgi-middleware "WSGI ミドルウェア")より引用


## この仕組みを使っているもの

- [Express](http://expressjs.com/ "Express")
    - Connectと _middleware_ の互換性がある
    - 元々はConnectを利用していたが[4.0.0](https://github.com/strongloop/express/blob/4.0.0/History.md "4.0.0")で自前の実装に変更
- [wooorm/retext](https://github.com/wooorm/retext "wooorm/retext")
    - `use`でプラグイン登録していくテキスト処理ライブラリ
- [r7kamura/stackable-fetcher](https://github.com/r7kamura/stackable-fetcher "r7kamura/stackable-fetcher")
    - `use`でプラグイン登録して処理を追加できるHTTPクライアントライブラリ

## まとめ

ここではConnectのプラグインアーキテクチャについて学びました。

- Connectは _middleware_ を使ったHTTPサーバーライブラリである
- Connect自体の機能は少ない
- 複数の _middleware_ を組み合わせることでHTTPサーバを作ることができる

## 参考資料

- [Ruby - Rack解説 - Rackの構造とRack DSL - Qiita](http://qiita.com/higuma/items/838f4f58bc4a0645950a#2-5)
- [Pylons のコンセプト — Pylons 0.9.7 documentation](http://docs.pylonsproject.org/projects/pylons-webframework/en/v1.0.1rc1/concepts.html)
