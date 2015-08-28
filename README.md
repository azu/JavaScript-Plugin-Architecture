# JavaScript-Plugin-Architecture

この書籍はJavaScriptのライブラリやツールにおけるプラグインのパターンについて見ていく事を目的としたものです。

## Introduction

JavaScriptの世界では一つの大きなライブラリよりも小さいなものを組み合わせていくようなスタイルが多く見られます。

小さものを組み合わせて使えるようなエコシステムの土台となるものを書こうとした際に、プラグイン機構が重要となると言えます。

> ソフトウェアの構造に「プラグイン機構」を設け、ユーザコミュニティから開発者コミュニティへの質的な転換を図るのは、ソフトウェア設計からエコシステム設計へとつながる
> -- [OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ](http://t-wada.hatenablog.jp/entry/active-oss-development-vs-simplicity "OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ")

この書籍では、そのプラグイン機構の仕組みそのものを、既にエコシステムを形成してるライブラリやツールなどの実装から学ぶことを目的にしています。

## Installation

    npm install

## Usage

この書籍は[GitBook](https://github.com/GitbookIO/gitbook "GitBook")を使い書かれています。

### 表示の確認

`npm start`でGitBookのローカルサーバを立ち上げて表示を確認出来ます。

    npm start

### テスト

`npm test`でコードや文章の単語チェックを行えます

    npm test

## Contributing

[CONTRIBUTING.md](./CONTRIBUTING.md)に、書籍で扱うべきプラグイン機構のProposalの書き方や
Pull Request、コミットのやりかたなどが書かれています。

## License

MIT