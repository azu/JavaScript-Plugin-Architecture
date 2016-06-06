# JavaScript Plugin Architecture [![Build Status](https://travis-ci.org/azu/JavaScript-Plugin-Architecture.svg?branch=master)](https://travis-ci.org/azu/JavaScript-Plugin-Architecture)

この書籍はJavaScriptのライブラリやツールにおけるプラグインアーキテクチャについて見ていく事を目的としたものです。

以下の形式で読むことができます。

- [Web版](https://azu.gitbooks.io/javascript-plugin-architecture/content/)
- [PDF形式](https://www.gitbook.com/download/pdf/book/azu/javascript-plugin-architecture)
- [ePub形式](https://www.gitbook.com/download/epub/book/azu/javascript-plugin-architecture)
- [Mobi形式](https://www.gitbook.com/download/mobi/book/azu/javascript-plugin-architecture)

[GitHub](https://github.com/azu/JavaScript-Plugin-Architecture)上で直接Markdownファイルを読むこともできますが、
その場合は[Web版](https://azu.gitbooks.io/javascript-plugin-architecture/content/)で読むことをオススメします。

Twitterのハッシュタグは[#js_plugin_book](https://twitter.com/search?f=tweets&q=%23js_plugin_book&src=typd "Twitter #js_plugin_book")

更新情報は[RSS](https://github.com/azu/JavaScript-Plugin-Architecture/releases.atom)や[リリースノート](https://github.com/azu/JavaScript-Plugin-Architecture/releases)から見ることができます。

<!-- textlint-disable -->

<a href="https://twitter.com/share" class="twitter-share-button" data-text="JavaScript Plugin Architecture" data-size="large" data-hashtags="js_plugin_book" data-dnt="true">Tweet</a> <a href="http://b.hatena.ne.jp/entry/https://github.com/azu/JavaScript-Plugin-Architecture" class="hatena-bookmark-button" data-hatena-bookmark-title="JavaScript Plugin Architecture" data-hatena-bookmark-layout="standard-balloon" data-hatena-bookmark-lang="ja" title="はてなブックマークに追加"><img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="はてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

<!-- textlint-enable -->


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

この書籍は無料で読むことができ、同時に修正や新しいページを書く権利があります。

[CONTRIBUTING.md](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md)に、書籍で扱うべきプラグインアーキテクチャのProposalの書き方や
Pull Request、コミットのやりかたなどが書かれています。

間違いやライブラリのアップデートへの追従など何かあれば、IssueやPull Requestをよろしくお願いします。

ソースコードは全てGitHubに公開されています。

- [azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture)

## License

MIT/CC BY-NC © azu

- コードはMITライセンスで利用できます
- 文章は[CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/ "CC BY-NC 4.0")で利用できます
