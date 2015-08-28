# Contributeの仕方

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

### Proposalの具体例

- [jQuery Plugin · Issue #8 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/8 "jQuery Plugin · Issue #8 · azu/JavaScript-Plugin-Architecture")

## テスト

`$ npm test` を実行するとコードや文章に対するテストが実行されます。

```sh
npm test
```

文章は[textlint](https://github.com/azu/textlint "textlint")による単語のチェックが行われます。