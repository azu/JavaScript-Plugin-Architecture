# jQuery

> この文章は[jQuery](http://jquery.com/ "jQuery") 2.1.4を元に書かれています。

jQueryでは`$.fn`を拡張することで、`$()`の返り値となるjQueryオブジェクトにメソッドを追加することができます。

次の`greenify`プラグインでは、`$(document.body).greenify();`というメソッド呼び出しが可能になります。

[import, greenify.js](../../src/jQuery/greenify.js)

実際に利用するため際は、`jquery.js`を読み込んだ後に`greenify.js`を読み込ませる必要があります。

```html
<script src="jquery.js"></script>
<script src="greenify.js"></script>
```

## どのような仕組み?

このjQueryプラグインがどのような仕組みで動いているのかを見てみましょう。

jQueryプラグインはprototype拡張のように `$.fn.greenify = function (){}` と拡張するルールでした。

`jQuery.fn`の実装を見てみると、実態は`jQuery.prototype`なので、prototype拡張していることがわかります。

```js
// https://github.com/jquery/jquery/blob/2.1.4/src/core.js#L39
jQuery.fn = jQuery.prototype = {
    // prototypeの実装
};
```


`$()`は内部的に`new`をしてjQueryオブジェクトを返すので、このjQueryオブジェクトではprototypeに拡張したメソッドが利用できます。

```js
$(document.body); // 返り値はjQueryのインスタンス
```

つまり、jQueryプラグインはJavaScriptのprototypeをそのまま利用しているだけに過ぎないということがわかります。

## どのような用途に向いている?

jQueryプラグインの仕組みがわかったのでどのような用途に有効な仕組みなのか考えてみましょう。

単純なprototype拡張なので、利点はJavaScriptのprototypeと同様です。
動的にメソッドを追加するだけではなく、既存の実装を上書きするmonkey patchのようなものもプラグインとして追加することができます。

## どのような用途に向いていない?

これもJavaScriptのprototypeと同様で、prototypeによる拡張は柔軟すぎるため、
jQuery自体がプラグインのコントロールをすることは難しいです。

また、プラグインが拡張するjQueryの実装に依存しやすいため、
jQueryのバージョンによって動かなくなるプラグインが発生しやすいです。

jQueryではドキュメント化されてないAPIを触っていけないというルールを設けていますが、
これは必ずしも守られているわけではありません。

## 実装してみよう

`calculator`という拡張可能な計算機をjQuery Pluginと同じ方法で作ってみたいと思います。

`calculator` は次のような形となります。

[import, calculator.js](../../src/jQuery/calculator.js)

`$.fn`と同様に`prototype`へのaliasを貼っているだけのただのコンストラクタ関数です。

```js
calculator.fn = calculator.prototype;
```

`calculator(初期値)`と書けるようにしているため、少し特殊なコンストラクタとなっていますが、この拡張の仕組みとは関係ないのでとりあえず置いておきましょう。

[calculator.js](#calculator.js)には何も実装が入ってないので、プラグインで四則演算の実装を追加してみます。

[import, calculator-plugin.js](../../src/jQuery/calculator-plugin.js)

[calculator-plugin.js](#calculator-plugin.js)では、`calculator.fn.add`というように`add`というメソッドを追加しています。

また、モジュールで依存関係を示していますがやっていることはjQueryと同じで、[calculator.js](#calculator.js)を読み込んでから[calculator-plugin.js](#calculator-plugin.js)を読み込んでいるだけですね。

```html
<script src="calculator.js"></script>
<script src="calculator-plugin.js"></script>
```

これを使うと`calculator#add`といったメソッドが利用できるようになるので、次のように書くことができます。

[import, calculator-example.js](../../src/jQuery/calculator-example.js)

実装をみてもらうと分かりますが、JavaScriptの`prototype`の仕組みをそのまま利用しています。
そのため、特別な実装は必要なく
「拡張する時は`calculator.prototype`の代わりに`calculator.fn`を拡張してください」
というルールがあるだけともいえます。

## エコシステム

このプラグインの仕組みはあるグローバルオブジェクトに依存しており、
これはスクリプトを`<script>`要素で読み込むだけで拡張することを前提とした作りです。

```html
<script src="jquery.js"></script>
<script src="greenify.js"></script>
```

Node.jsで使われているCommonJSやES6 Modulesなどがなかった時代に作られた仕組みなので、
それらと組み合わせる際には少し不向きな拡張の仕組みといえるかもしれません。

## まとめ

ここではjQueryのプラグインアーキテクチャについて学びました。

- jQueryプラグインは `jQuery.fn` を拡張する
- `jQuery.fn` は `jQuery.prototype` と同じである
- jQueryプラグインとは`jQuery.prototype`を拡張したものといえる
- 何でもできるためプラグインが行うことを制御することのは難しい

## 参考資料

- [Plugins | jQuery Learning Center](https://learn.jquery.com/plugins/ "Plugins | jQuery Learning Center")
- [jQuery拡張の仕組み 〜 JSおくのほそ道 #013 - Qiita](http://qiita.com/hosomichi/items/29b19ed3ebd0df9361ae)
- [The npm Blog — Using jQuery plugins with npm](http://blog.npmjs.org/post/112064849860/using-jquery-plugins-with-npm "The npm Blog — Using jQuery plugins with npm")
