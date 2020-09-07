# JavaScript Plugin Architecture [![Actions Status: test](https://github.com/azu/JavaScript-Plugin-Architecture/workflows/test/badge.svg)](https://github.com/azu/JavaScript-Plugin-Architecture/actions?query=workflow%3A"test")

この書籍はJavaScriptのライブラリやツールにおけるプラグインアーキテクチャについて見ていくことを目的としたものです。

次の形式で読むことができます。

- [Web版](https://azu.github.io/JavaScript-Plugin-Architecture/)
- [PDF形式](https://azu.github.io/JavaScript-Plugin-Architecture/JavaScript-Plugin-Architecture.pdf)
- [ePub形式](https://azu.github.io/JavaScript-Plugin-Architecture/JavaScript-Plugin-Architecture.epub)
- [Mobi形式](https://azu.github.io/JavaScript-Plugin-Architecture/JavaScript-Plugin-Architecture.mobi)

この書籍のソースコードは、次のGitHubリポジトリに公開されています。

- [azu/JavaScript-Plugin-Architecture: JavaScriptプラグインアーキテクチャの本](https://github.com/azu/JavaScript-Plugin-Architecture)

Twitterのハッシュタグは[#js_plugin_book](https://twitter.com/search?f=tweets&q=%23js_plugin_book&src=typd "Twitter #js_plugin_book")

更新情報は[RSS](https://github.com/azu/JavaScript-Plugin-Architecture/releases.atom)や[リリースノート](https://github.com/azu/JavaScript-Plugin-Architecture/releases)から見ることができます。


<!-- textlint-disable -->

{% if output.name != "ebook" %}

<a aria-label="Star azu/JavaScript-Plugin-Architecture on GitHub" href="https://github.com/azu/JavaScript-Plugin-Architecture" class="github-button"><img src="https://monosnap.com/file/MZsfLjZNkSNwTJ33apkwpBjlBZLbSh.png" alt="GitHub"></a> <a href="http://b.hatena.ne.jp/entry/https://github.com/azu/JavaScript-Plugin-Architecture" class="hatena-bookmark-button" data-hatena-bookmark-title="JavaScript Plugin Architecture" data-hatena-bookmark-layout="standard-balloon" data-hatena-bookmark-lang="ja" title="はてなブックマークに追加"><img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="はてなブックマークに追加" width="20" height="20" style="border: none;" /></a>

{% endif %}

<!-- textlint-enable -->


## はじめに

JavaScriptの世界では1つの大きなライブラリよりも小さなライブラリを組み合わせていくようなスタイルが多く見られます。
小さなものを組み合わせて作るためには、プラグインと呼ばれる拡張の仕組みが必要となります。
またそのようなプラグインがたくさんあるエコシステムの土台を作るには、プラグインアーキテクチャが重要になるといえます。

> ソフトウェアの構造に「プラグイン機構」を設け、ユーザコミュニティから開発者コミュニティへの質的な転換を図るのは、ソフトウェア設計からエコシステム設計へとつながる  
> -- [OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ](http://t-wada.hatenablog.jp/entry/active-oss-development-vs-simplicity "OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ")

この書籍では、JavaScriptにおけるプラグインアーキテクチャやそのエコシステムを形成してるライブラリやツールなどの実装を学ぶことが目的となっています。

JavaScriptの基本的な文法などについては解説していないため、次の書籍を参照してください。

- [JavaScript Primer - 迷わないための入門書 #jsprimer](https://jsprimer.net/)

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
Reduxでは **middleware** と呼ばれる拡張の仕組みを持っていますが、Connectとの類似点や相違点があります。
小さなReduxの実装を作りながら **middleware** の仕組みについて学びます。

## Contributing

この書籍は無料で読むことができ、同時に修正や新しいページを書く権利があります。

[CONTRIBUTING.md](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md)に、書籍で扱うべきプラグインアーキテクチャのProposalの書き方や
Pull Request、コミットのやりかたなどが書かれています。

間違いやライブラリのアップデートへの追従など何かあれば、IssueやPull Requestをよろしくお願いします。

ソースコードはすべてGitHubに公開されています。

- [azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture)

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT/CC BY-NC © azu

- コードはMITライセンスで利用できます
- 文章は[CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/ "CC BY-NC 4.0")で利用できます
