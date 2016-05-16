# この書籍の内容について

## [Introduction](ja/introduction/README.md)

この書籍の目的について書かれています。
なぜプラグインアーキテクチャを学ぶ必要があるのか、どのようにして学ぶことができるのかについて書かれています。

## [jQuery](ja/jQuery/README.md)

jQueryのプラグインについて解説しています。
`<script>`タグをベースとしたプラグインアーキテクチャについて解説しています。

## [ESLint](ja/ESLint/README.md)

ESLintのルールを拡張する仕組みについて解説しています。
ESLintではJavaScriptのコードをパースして作成されたASTを元にコードのLintを行います。
実際にESLintのルールを解釈できる小さな実装を作りながらプラグインの仕組みについて学びます。

## [Connect](ja/connect/README.md)

Connectの **middleware** と呼ばれるプラグインアーキテクチャについて解説しています。
Node.js以外においても_Rack_などHTTPサーバーでよく見られるプラグインを使った階層構造について学びます。

## [gulp](ja/gulp/README.md)

**タスク自動化ツール** であるgulpのプラグインアーキテクチャについて解説しています。
gulpではデータの流れとして既存のNode.js Streamを使い、そこで流すデータとしてvinylオブジェクトを利用します。
実際にgulpプラグインを書きながら、gulpのプラグインの仕組みについて学びます。