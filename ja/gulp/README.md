# gulp

> この文章は[gulp](http://gulpjs.com/ "gulp") 3.9.0を元に書かれています。

[gulp](http://gulpjs.com/ "gulp")はNode.jsを使ったタスク自動化ツールです。
ビルドやテストなどといったタスクを実行するためのツールで、
それぞれのタスクをJavaScriptで書くことができるようになっています。

タスクは複数の処理の実行順序を定義したものとなっていて、APIとしては`gulp.task`が用意されています。
また、それぞれの処理はNode.jsの[Stream](https://nodejs.org/api/stream.html "Stream")として実装することで、
処理をStreamでつなげる(`pipe`)することができ、複数の処理を一時ファイルなしでできるようになっています。

それぞれの処理はgulpのプラグインという形でモジュール化されているため、
利用者はモジュールを読み込み、`pipe()`で繋ぐだけでタスクの定義ができるツールです。

## どう書ける?

例えば、[Sass](http://sass-lang.com/ "Sass")で書いたファイルを次のように処理したいとします。

1. `sass/*.scss`のファイルを読み込む
2. 読み込んだsassファイルを`sass`でコンパイル
3. CSSとなったファイルに`autoprefixture`で接頭辞をつける
4. CSSファイルをそれぞれ`minify`で圧縮する
5. 圧縮したCSSファイルをそれぞれ`css`ディレクトリに出力する

この一連の処理は以下のようなタスクとして定義することができます。

```js
import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-minify-css";

gulp.task('sass', function() {
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(gulp.dest('css'));
});
```

ここでは、gulpプラグインの仕組みについて扱うので、gulpの使い方については詳しくは以下を参照して下さい。

- [gulp/docs at master · gulpjs/gulp](https://github.com/gulpjs/gulp/tree/master/docs)
- [現場で使えるgulp入門 - gulpとは何か | CodeGrid](https://app.codegrid.net/entry/gulp-1)
- [gulp入門 (全12回) - プログラミングならドットインストール](http://dotinstall.com/lessons/basic_gulp)

## どういう仕組み?

実際にgulpプラグインを書きながら、どのような仕組みで処理同士が連携を取って動作しているのかを見ていきましょう。

先ほどのgulpのタスクの例では、既にモジュール化された処理を`pipe`で繋げただけであるため、
それぞれの処理がどのように実装されているかはよく分かりませんでした。

ここでは`gulp-prefixer`という、それぞれのファイルに対して先頭に特定の文字列を追加するgulpプラグインを書いていきます。

同様の名前のプラグインが公式のドキュメントで「プラグインの書き方」の例として紹介されているので合わせてみると良いでしょう。

- [gulp/docs/writing-a-plugin at master · gulpjs/gulp](https://github.com/gulpjs/gulp/tree/master/docs/writing-a-plugin "gulp/docs/writing-a-plugin at master · gulpjs/gulp")
- [gulp/dealing-with-streams.md at master · gulpjs/gulp](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md "gulp/dealing-with-streams.md at master · gulpjs/gulp")

gulpプラグインは一般的にオプションを受け取り、NodeのStreamを返す関数として実装されます。

[import gulp-prefixer.js](../../src/gulp/gulp-prefixer.js)

ここで実装した`gulp-prefixer`は、gulpのタスクで次のように書くことで利用できます。

[import gulpfile.babel.js](../../src/gulp/gulpfile.babel.js)

この`default`タスクが実行されると次のような処理が行われます。

1. `./*.*`にマッチするファイルを取得(全てのファイル)
2. 取得したファイルの先頭に"prefix text"という文字列を追加する
3. 変更したされたファイルを`build/`ディレクトリに出力する


- [ ] どういう用途に向いている?
- [ ] どういう用途に向いていない?
- [ ] この仕組みを使っているもの
- [ ] 実装してみよう
- [ ] エコシステム