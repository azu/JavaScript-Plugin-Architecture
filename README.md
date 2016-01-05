# JavaScript Plugin Architecture [![Build Status](https://travis-ci.org/azu/JavaScript-Plugin-Architecture.svg?branch=master)](https://travis-ci.org/azu/JavaScript-Plugin-Architecture)

この書籍はJavaScriptのライブラリやツールにおけるプラグインアーキテクチャについて見ていく事を目的としたものです。

## Introduction

JavaScriptの世界では1つの大きなライブラリよりも小さいなものを組み合わせていくようなスタイルが多く見られます。

小さなものを組み合わせて使えるようなエコシステムの土台となるものを書く際には、プラグインアーキテクチャが重要になると言えます。

> ソフトウェアの構造に「プラグイン機構」を設け、ユーザコミュニティから開発者コミュニティへの質的な転換を図るのは、ソフトウェア設計からエコシステム設計へとつながる
> -- [OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ](http://t-wada.hatenablog.jp/entry/active-oss-development-vs-simplicity "OSS開発の活発さの維持と良いソフトウェア設計の間には緊張関係があるのだろうか? - t-wadaのブログ")

この書籍では、そのプラグインアーキテクチャ、そのエコシステムを形成してるライブラリやツールなどの実装を学ぶことが目的となっています。

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

### 文章カバレッジ

[textlint](https://github.com/textlint/textlint "textlint")と[textlint-formatter-codecov](https://github.com/azu/textlint-formatter-codecov "textlint-formatter-codecov")を使って出してる文章に対するカバレッジ

[![codecov.io](https://codecov.io/github/azu/JavaScript-Plugin-Architecture/coverage.svg?branch=master)](https://codecov.io/github/azu/JavaScript-Plugin-Architecture?branch=master)

![coverage graph](https://codecov.io/github/azu/JavaScript-Plugin-Architecture/branch.svg?branch=master)

## Contributing

[CONTRIBUTING.md](./CONTRIBUTING.md)に、書籍で扱うべきプラグインアーキテクチャのProposalの書き方や
Pull Request、コミットのやりかたなどが書かれています。

## License

© azu

コードはMITライセンスで利用できます。
文章は[CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/ "CC BY-NC 4.0")で利用できます。
