# Connect

> この文章はConnect 3.4.0を元に書かれています。

[Connect](https://github.com/senchalabs/connect "Connect")はNode.jsで動くHTTPサーバフレームワークです。
_middleware_という拡張する仕組みを持っていて、connectが持つ機能自体はとても少ないです。

この章ではconnectの_middleware_の仕組みついて見て行きましょう。

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