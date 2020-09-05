# Contribute

## Installation

インストールにはNode.jsが必要です

    git clone https://github.com/azu/JavaScript-Plugin-Architecture.git
    cd JavaScript-Plugin-Architecture
    npm install

## Usage

この書籍は[HonKit](https://github.com/honkit/honkit)を使い書かれています。

### 表示の確認

`npm start`で[HonKit](https://github.com/honkit/honkit)のローカルサーバを立ち上げて表示を確認できます。

    npm start

### テスト

`npm test`でコードや文章の単語チェックを行えます

    npm test

### 文章カバレッジ

[textlint](https://github.com/textlint/textlint "textlint")と[textlint-formatter-codecov](https://github.com/azu/textlint-formatter-codecov "textlint-formatter-codecov")を使って出してる文章に対するカバレッジ

100％を理想的目標として、それに対する現実的な値をカバレッジの％として表現しています。

[![codecov.io](https://codecov.io/github/azu/JavaScript-Plugin-Architecture/coverage.svg?branch=master)](https://codecov.io/github/azu/JavaScript-Plugin-Architecture?branch=master)

![coverage graph](https://codecov.io/github/azu/JavaScript-Plugin-Architecture/branch.svg?branch=master)

現在の文章カバレッジは次のコマンドでも確認できます。

```
npm run textlint:coverage
```

## Contributeのやりかた

この書籍ではJavaScriptにおけるプラグインアーキテクチャを色々なライブラリやツールを元に紹介する形をとっています。

Contributeは大きく分けて、既存の文章の修正や執筆とProposalの提案などがあります。


## 文章の修正

typoなどを見つけた場合は、1文字の修正からでも問題無いので、Pull Requestを送っていただけると助かります。

表記揺れを発見した場合は単純にIssueを立ててもらうか、Pull Requestでの修正をいただけると嬉しいです。

また、この書籍では[test/prh-rule.yaml](test/prh-rule.yaml)で定義した辞書を使い表記揺れを辞書でテストできるようにしています。
辞書による表記揺れの検知が可能なら、そちらも合わせてご指摘いただけるとありがたいです。

- [textlint + prhで表記ゆれを検出する | Web Scratch](http://efcl.info/2015/09/14/textlint-rule-prh/ "textlint + prhで表記ゆれを検出する | Web Scratch")

```
## Proposalの書き方

Proposalとは、書籍に載せたいプラグインアーキテクチャについてのIssueを立てることを言います。

たとえば、XXXというライブラリ/ツールのアーキテクチャについてのIssueを立てる場合、
次のようなことが1行とかでもいいので書かれていれば参考になります。

仕組みについて調べるのが大変な場合は飛ばしても問題ありません。
JavaScriptはとにかく柔軟な言語なので、こういうプラグインの形式を取ってるというのを知らせるだけでも有用だと思います。

# XXXのアーキテクチャ

## どう書ける?

- 実際のコード例

## どういう仕組み?

- prototypeを拡張しているなど具体的な仕組み
- その機構のコードへのリンク
- その仕組みやプラグインについてドキュメントへのリンク

## どういうことに向いている?

- どういう用途で使われてる(ユースケース)
- 変換する毎にファイルとして吐き出さないので、高速に複数の変換をするのに向いている等

## どういうことに向いていない?

- 変換の仕組み上書き換え等を行うプラグインを扱いにくい等

## この仕組みを使っているもの

- XXX以外にも同様の仕組みを使っているものがあるなら

----

## チェックリスト

- [ ] どう書ける?
- [ ] どういう仕組み?
- [ ] どういうことに向いている?
- [ ] どういうことに向いていない?
- [ ] この仕組みを使っているもの
- [ ] 実装してみよう
- [ ] エコシステム
```

以下からこのテンプレートで使ったIssueを立てることができます。

- [新しいProposalを書く](https://github.com/azu/JavaScript-Plugin-Architecture/issues/new?title=Proposal:XXX&body=%23+XXXのアーキテクチャ%0D%0AURL%3A)

### Proposalの具体例

現在ある[Proposal一覧](https://github.com/azu/JavaScript-Plugin-Architecture/labels/proposal)を参考にしてみるとよいかもしれません。

- [jQuery Plugin · Issue #8 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/8 "jQuery Plugin · Issue #8 · azu/JavaScript-Plugin-Architecture")

## テスト

`$ npm test` を実行するとコードや文章に対するテストが実行されます。

```sh
npm test
```

文章は[textlint](https://github.com/azu/textlint "textlint")による単語のチェックが行われます。

## コミットメッセージ

AngularJSのGit Commit Guidelinesをベースとしています。

- [conventional-changelog/angular.md at master · ajoslin/conventional-changelog](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md "conventional-changelog/angular.md at master · ajoslin/conventional-changelog")

次のような形で1行目に概要、3行目から本文、最後に関連するIssue(任意)を書きます。

```
feat(ngInclude): add template url parameter to events

The `src` (i.e. the url of the template to load) is now provided to the
`$includeContentRequested`, `$includeContentLoaded` and `$includeContentError`
events.

Closes #8453
Closes #8454
```


```
                         scope        commit title

        commit type       /                /      
                \        |                |
                 feat(ngInclude): add template url parameter to events

        body ->  The 'src` (i.e. the url of the template to load) is now provided to the
                 `$includeContentRequested`, `$includeContentLoaded` and `$includeContentError`
                 events.

 referenced  ->  Closes #8453
 issues          Closes #8454
```

1行の`feat`や`fix`といったcommit typeは、迷ったらとりあえず`chore`と書いて、`scope`も省略して問題ないので次のような形でも問題ありません。

```
chore: コミットメッセージ
```

このコミットメッセージの規約は[conventional-changelog](https://github.com/ajoslin/conventional-changelog "conventional-changelog")による自動生成のためでもありますが、
取り込むときに調整できるので無視してもらっても問題はありません。

以下を見てみるとよいかもしれません。

- [良いChangeLog、良くないChangeLog | Web Scratch](http://efcl.info/2015/06/18/good-changelog/ "良いChangeLog、良くないChangeLog | Web Scratch")
- [われわれは、いかにして変更点を追うか](http://azu.github.io/slide/cto/changelog.html "われわれは、いかにして変更点を追うか")
