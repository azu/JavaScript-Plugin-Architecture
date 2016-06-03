# JavaScript Plugin Architecture [![Build Status](https://travis-ci.org/azu/JavaScript-Plugin-Architecture.svg?branch=master)](https://travis-ci.org/azu/JavaScript-Plugin-Architecture)

この書籍はJavaScriptのライブラリやツールにおけるプラグインアーキテクチャについて見ていく事を目的としたものです。

## はじめに

JavaScriptの世界では1つの大きなライブラリよりも小さいなものを組み合わせていくようなスタイルが多く見られます。
小さなものを組み合わせて作るためには、プラグインと呼ばれる拡張の仕組みが必要となります。
またそのようなプラグインがたくさんあるエコシステムの土台を作るには、プラグインアーキテクチャが重要になると言えます。

> ソフトウェアの構造に「プラグイン機構」を設け、ユーザコミュニティから開発者コミュニティへの質的な転換を図るのは、ソフトウェア設計からエコシステム設計へとつながる  
> -- [OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ](http://t-wada.hatenablog.jp/entry/active-oss-development-vs-simplicity "OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ")

この書籍では、JavaScriptにおけるプラグインアーキテクチャやそのエコシステムを形成してるライブラリやツールなどの実装を学ぶことが目的となっています。

## この書籍の内容について

### [jQuery](ja/jQuery/README.md)

jQueryのプラグインについて解説しています。
`<script>`タグをベースとしたプラグインアーキテクチャについて解説しています。

### [ESLint](ja/ESLint/README.md)

ESLintのルールを拡張する仕組みについて解説しています。
ESLintではJavaScriptのコードをパースして作成されたASTを元にコードのLintを行います。
実際にESLintのルールを解釈できる小さな実装を作りながらプラグインの仕組みについて学びます。

### [Connect](ja/connect/README.md)

Connectの **middleware** と呼ばれるプラグインアーキテクチャについて解説しています。
Node.js以外においても_Rack_などHTTPサーバーでよく見られるプラグインを使った階層構造について学びます。

### [gulp](ja/gulp/README.md)

**タスク自動化ツール**として知られるgulpのプラグインアーキテクチャについて解説しています。
gulpではデータの流れとして既存のNode.js Streamを使い、そこで流すデータとしてvinylオブジェクトを利用します。
実際にgulpプラグインを書きながら、gulpのプラグインの仕組みについて学びます。

### [Redux](ja/Redux/README.md)

アプリケーションのStateを管理ライブラリのReduxのプラグインアーキテクチャについて解説しています。
Reduxでは **Middleware** と呼ばれる拡張の仕組みを持っていますが、Connectとの類似点や相違点があります。
小さなReduxの実装を作りながら **Middleware** の仕組みについて学びます。

## Contributing

この書籍は無料で読みことができ、同時に修正や新しいページを書く権利があります。

[CONTRIBUTING.md](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md)に、書籍で扱うべきプラグインアーキテクチャのProposalの書き方や
Pull Request、コミットのやりかたなどが書かれています。

間違いやライブラリのアップデートへの追従など何かあれば、IssueやPull Requestをよろしくお願いします。

ソースコードは全てGitHubに公開されています。

- [azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture)

## License

MIT/CC BY-NC © azu

- コードはMITライセンスで利用できます
- 文章は[CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/ "CC BY-NC 4.0")で利用できます
