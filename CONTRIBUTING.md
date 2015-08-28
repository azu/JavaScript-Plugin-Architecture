# Contributeのやりかた

この書籍ではJavaScriptにおけるプラグインのアーキテクチャを色々なライブラリやツールを元に紹介する形をとっています。

Contributeは大きく分けて、既存の文章の修正や執筆 と Proposalの提案などがあります。

Proposalとは、このライブラリはこういうプラグインのアーキテクチャを持っているというのをIssueを立てる形の事を言います。

## Proposalの書き方

例えば、XXXというライブラリ/ツールのアーキテクチャについてのIssueを立てる場合、
以下のような事が1行とかでもいいので書かれていれば参考になります。

仕組みについて調べるのが大変な場合は飛ばしてもらっても問題ありません。
JavaScriptはとにかく柔軟な言語なので、こういうプラグインの形式を取ってるというのを知らせるだけでも有用だと思います。

```
# XXXのアーキテクチャ

## どう書ける?

- 実際のコード例

## どういう仕組み?

- prototypeを拡張しているなど具体的な仕組み
- その機構のコードへのリンク
- その仕組みやプラグインについてドキュメントへのリンク

## どういう事に向いてる?

- どういう用途で使われてる(ユースケース)
- 変換する毎にファイルとして吐き出さないので、高速に複数の変換をするのに向いている 等

## この仕組みを使ってるもの

- XXX以外にも同様の仕組みを使ってるものがあるなら
```

以下からこのテンプレートを使ったIssueを立てることが出来ます。

- [新しいProposalを書く](https://github.com/azu/JavaScript-Plugin-Architecture/issues/new?title=XXX&body=%23+XXX%E3%81%AE%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%0D%0AURL%3A+%0D%0A%0D%0A%23%23+%E3%81%A9%E3%81%86%E6%9B%B8%E3%81%91%E3%82%8B%3F%0D%0A%0D%0A%23%23+%E3%81%A9%E3%81%86%E3%81%84%E3%81%86%E4%BB%95%E7%B5%84%E3%81%BF%3F%0D%0A%0D%0A%23%23+%E3%81%A9%E3%81%86%E3%81%84%E3%81%86%E4%BA%8B%E3%81%AB%E5%90%91%E3%81%84%E3%81%A6%E3%82%8B%3F%0D%0A%0D%0A%23%23+%E3%81%93%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%82%8B%E3%82%82%E3%81%AE%0D%0A)

### Proposalの具体例

現在ある[Proposal一覧](https://github.com/azu/JavaScript-Plugin-Architecture/labels/proposal)を参考にしてみると良いかもしれません。

- [jQuery Plugin · Issue #8 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/8 "jQuery Plugin · Issue #8 · azu/JavaScript-Plugin-Architecture")

## テスト

`$ npm test` を実行するとコードや文章に対するテストが実行されます。

```sh
npm test
```

文章は[textlint](https://github.com/azu/textlint "textlint")による単語のチェックが行われます。

## コミットメッセージ

Angular.jsのGit Commit Guidelinesをベースとしています。

- [conventional-changelog/angular.md at master · ajoslin/conventional-changelog](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md "conventional-changelog/angular.md at master · ajoslin/conventional-changelog")

以下のような形で1行目に概要、3行目から本文、最後に関連するIssue(任意)を書きます。

```
feat(ngInclude): add template url parameter to events

The `src` (i.e. the url of the template to load) is now provided to the
`$includeContentRequested`, `$includeContentLoaded` and `$includeContentError`
events.

Closes #8453
Closes #8454
```

1行の`feat`や`fix`といったcommit typeは、迷ったらとりあえず`chore`と書けば問題ありません。

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

`scope`も省略して問題ないので、最低限では以下のような形でも問題ありません。

```
chore: コミットメッセージ
```

このコミットメッセージの規約は[conventional-changelog](https://github.com/ajoslin/conventional-changelog "conventional-changelog")による自動生成のためでもありますが、
無視してもらっても問題はありません。

以下を見てみると良いかもしれません。

- [良いChangeLog、良くないChangeLog | Web Scratch](http://efcl.info/2015/06/18/good-changelog/ "良いChangeLog、良くないChangeLog | Web Scratch")
- [われわれは、いかにして変更点を追うか](http://azu.github.io/slide/cto/changelog.html "われわれは、いかにして変更点を追うか")