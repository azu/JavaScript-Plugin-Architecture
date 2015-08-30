# jQueryのPlugin

jQueryでは`$.fn`を拡張する事で、`$()`の返り値であるjQueryオブジェクトにメソッドを追加することが出来ます。

次の`greenify`プラグインでは、`$(document.body).greenify();`というメソッド呼び出しが可能になります。

[import, greenify.js](../../src/jQuery/greenify.js)

実際に利用するためには、`jquery.js`を読み込んだ後に`greenify.js`を読み込ませる必要があります。

```html
<script src="jquery.js"></script>
<script src="greenify.js"></script>
```

## どういう仕組み?

## 実装してみよう

`calculator`という拡張可能な計算機をjQuery Pluginと同じ方法で作ってみたいと思います。

`calculator` は以下のような形となります。

[import, calculator.js](../../src/jQuery/calculator.js)

`$.fn`と同様に`prototype`へのaliasを貼っているだけのただのコンストラクタ関数です。

```
calculator.fn = calculator.prototype;
```

`calculator(初期値)`と書けるようにしているため、少し特殊なコンストラクタとなっていますが、この拡張の仕組みとは関係ないのでとりあえず置いておきましょう。

[calculator.js](#calculator.js)には何も実装が入ってないので、プラグインで四則演算の実装を追加してみます。

[import, calculator-plugin.js](../../src/jQuery/calculator-plugin.js)

[calculator-plugin.js](#calculator-plugin.js)では、`calculator.fn.add`というように`add`というメソッドを追加しています。

また、モジュールで依存関係を示していますがやっていることはjQueryと同じで、[calculator.js](#calculator.js)を読み込んでから[calculator-plugin.js](#calculator-plugin.js)を読み込んでいるだけですね。

```html
<script src="jquery.js"></script>
<script src="greenify.js"></script>
```

これを使うと`calculator#add`といったメソッドが利用できるようになるので、以下のように書くことが出来ます。

[import, calculator-example.js](../../src/jQuery/calculator-example.js)

