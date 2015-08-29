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