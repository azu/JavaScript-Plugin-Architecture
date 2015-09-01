# ESLint

[ESLint](http://eslint.org/ "ESLint")はJavaScriptのコードをJavaScriptで書かれたルールによって検証するLintツールです。

大まかな動作としては、検証したいJavaScriptのコードをパースしてできたAST(抽象構文木)を、ルールで検証し、エラーや警告を出力します。

このルールがプラグインとして書けるようになっていて、ESLintの全てのルールがプラグインとして実装されています。

> The pluggable linting utility for JavaScript and JSX

ESLintサイト上には、上記のように書かれていることからもわかりますが、プラグインに重きを置いた設計となっているので、
今回はESLintのプラグインアーキテクチャについてを見て行きましょう

## どう書ける?

[import, no-console.js](../../src/ESLint/no-console.js)

## どういう仕組み?
## どういう用途に向いている?
## どういう用途に向いていない?
## この仕組みを使ってるもの
## 実装してみよう

今回は、ESLintのルールを解釈できるシンプルなLintの処理を書いてみます。

利用するルールは先ほども出てきた[no-console.js](#no-console.js)をそのまま使い、
このルールを使って同じようにJavaScriptのコードを検証できる`MyLinter`を書いてみます。

### MyLinter

MyLinterは単純な2つのメソッドを持つクラスとして実装しました。

- `MyLinter#loadRule(rule): void`
    - 利用するルールを登録する処理
    - `rule`は[no-console.js](#no-console.js)がexportしたもの
- `MyLinter#lint(code): string[]`
    - `code`を受け取りルールによってLintした結果を返す
    - Lint結果はエラーメッセージの配列とする

実装したものが以下のようになっています。

[import, src/ESLint/MyLinter.js](../../src/ESLint/MyLinter.js)

このMyLinterを使って、`MyLinter#load`で[no-console.js](#no-console.js)を読み込ませて、

```js
function add(x, y){
    console.log(x, y);
    return x + y;
}
add(1, 3);
```

というコードをLintしてみます。

[import, src/ESLint/MyLinter-example.js](../../src/ESLint/MyLinter-example.js)

コードには`console`という名前のオブジェクトが含まれているので、 _"Unexpected console statement."_ というエラーメッセージが取得出来ました。   

### RuleContext

もう一度、[MyLinter.js](#MyLinter.js)を見てみると、`RuleContext`というシンプルなクラスがあることに気づくと思います。

この`RuleContext`はルールから使えるユーティリティメソッドをまとめたもので、
今回は`RuleContext#report`というエラーメッセージをルールからMyLinterへ通知するものだけを実装しています。

ルールの実装の方を見てみると、直接オブジェクトをexportしてる訳ではなく、
`context` つまり`RuleContext`のインスタンスを受け取っていることが分かると思います。

[import, no-console.js](../../src/ESLint/no-console.js)

このようにして、ルールは `context` という与えられたものだけを使うので、ルールができることを制御しやすくなり、
ルールがMyLinter本体の実装の詳細を知らなくても良くなります。

## エコシステム