# ESLint

[ESLint](http://eslint.org/ "ESLint")はJavaScriptのコードをJavaScriptで書かれたルールによって検証するLintツールです。

大まかな動作としては、検証したいJavaScriptのコードをパースしてできたAST(抽象構文木)をルールで検証し、エラーや警告を出力します。

このルールがプラグインとして書けるようになっていて、ESLintの全てのルールがプラグインとして実装されています。

> The pluggable linting utility for JavaScript and JSX

ESLintサイト上には、上記のように書かれていることからもわかりますが、プラグインに重きを置いた設計となっているので、
今回はESLintのプラグインアーキテクチャについてを見て行きましょう

## どう書ける?

ESLintでは`.eslintrc`という設定ファイルに利用するルールの設定をして使うため、
実行方法についてはドキュメントを参照して下さい。

- [Documentation - ESLint - Pluggable JavaScript linter](http://eslint.org/docs/user-guide/configuring "Documentation - ESLint - Pluggable JavaScript linter")

ESLintにおけるルールとは、以下のような一つのオブジェクトを返す関数をexportしたモジュールのことを言います。

[import, no-console.js](../../src/ESLint/no-console.js)

ESLintではコードを文字列ではなくASTを元にしてチェックしていきます。
ASTについてはここでは詳細を省きますが、コードをJavaScriptのオブジェクトで表現した木構造のデータだと思えば問題ないと思います。

例えば、

```js
console.log("Hello!");
```

というコードをパースしてASTにすると以下のようなオブジェクトとして取得できます。

```json
{
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Identifier",
                        "name": "console"
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "log"
                    }
                },
                "arguments": [
                    {
                        "type": "Literal",
                        "value": "Hello!",
                        "raw": "\"Hello!\""
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}
```

- [JavaScript AST explorer](http://felix-kling.de/esprima_ast_explorer/#/FNrLHi8ngW "JavaScript AST explorer")

ESLintではこのASTを使って、変数が未使用であるとか[no-console.js](#no-console.js)のように`console.log`などがコードに残ってないか
といったことをルールを元にチェックすることができます。

ルールをどう書けるかという話に戻すと、`context`というオブジェクトはただのユーティリティ関数と思ってもらって問題なくて、
returnしてるメソッドをもったオブジェクトがルールの本体と言えます。

ESLintではルールをどうやって使っているかというと、ASTは木構造のとなってるので、
そのASTを深さ優先で探索していきながらそれぞれ登録したルールに対して、
「今`"MemberExpression"` typeのNodeに到達した」といったことを通知することを繰り返しています。

先ほどの`console.log`のASTにおける`MemberExpression` typeのNodeとは以下のオブジェクトをことを言います。

```json
{
    "type": "MemberExpression",
    "computed": false,
    "object": {
        "type": "Identifier",
        "name": "console"
    },
    "property": {
        "type": "Identifier",
        "name": "log"
    }
}
```

[no-console.js](#no-console.js)のルールを見ると`MemberExpression` typeのNodeが `node.object.name === "console"` であるなら
`console`が残ってると判断してエラーレポートすると読めてくると思います。

ASTの探索がイメージしにくい場合は以下のルールで探索の動作を見てみると分かりやすいかもしれません。

- [azu.github.io/visualize_estraverse/](http://azu.github.io/visualize_estraverse/ "visualize estraverse step")

```js
function debug(string){
    console.log(string);
}
debug("Hello");
```

<video controls>
<source src='./movie/traverse.webm' type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
<source src='./movie/traverse.mp4' type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
<p>動画を再生するには、mp4をサポートしたブラウザが必要です。</p>
</video> 

その他、ESLintのルールの書き方についてはドキュメントや以下の記事を見てみるといいでしょう。

- [Documentation - ESLint - Pluggable JavaScript linter](http://eslint.org/docs/developer-guide/working-with-rules "Documentation - ESLint - Pluggable JavaScript linter")
- [コードのバグはコードで見つけよう！｜サイバーエージェント 公式エンジニアブログ](http://ameblo.jp/principia-ca/entry-11837554210.html "コードのバグはコードで見つけよう！｜サイバーエージェント 公式エンジニアブログ")

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