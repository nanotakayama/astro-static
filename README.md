# Astro 4.0 Static
AstroとはWebサイトを作成するためのWebフレームワーク  
JavaScriptをビルド時に排除することで高速なWebサイトを作成可能  
使い方・作成の手順は一通り下記を参照し、拡張する場合は公式ドキュメントを参照（https://docs.astro.build/en/getting-started/）


## 使用用途
静的HTMLの構築に適したStartKit（LP,コーポレートサイト 等）  
HTML,Sass,Javascriptの知見のある人向け


## 開発仕様
Astroで構築したものをHTMLへ変換しWebへ表示。  
SassとJavascriptは複数の記述を1つのファイルにまとめる。  
CSS設計は「FLOCSS」を採用。  
スタイリングはAstroに直接書く記述でも問題ないが、Sassファイルにまとめることで開発をスムーズに管理もしやすくなる（Javascirptも同様）

Vscodeを使用している人は以下のプラグインのインストールを推奨
```
・Astro（https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode）
言語モードにAstroを追加

・Astro Snippets（https://marketplace.visualstudio.com/items?itemName=SheltonLouis.astro-snippets）
Astro構築が快適になるスニペットセットを追加
```


## 動作環境
```
node: 22.3.0
npm: 9.6.7
(asdfでバージョン管理)
```


## 使用方法
1. gitよりclone,もしくはzipfileで保存
2. フォルダをコピーし、用途に併せフォルダ名を変更
3. 開発準備の手順を進める


## 開発準備
- Node.js バージョン
  ```sh
  node -v
  ```

  ```sh
  v22.3.0
  ```

- npm バージョン
  ```sh
  node -v
  ```

  ```sh
  v9.6.7
  ```

- npm パッケージインストール
  ```sh
  node i
  ```

- npm ビルド (publicを生成するために必要)
  ```sh
  node run build
  ```

- npm 環境起動
  ```sh
  node run dev
  ```


## ディレクトリ構成
```
.
├── assets
│   ├── images
│   ├── scripts
│   │   ├── components
│   │   └── structure
│   └── styles
│       ├── foundation
│       │   ├── function
│       │   ├── keyframe
│       │   ├── mixin
│       │   ├── variable
│       │   └── vendor
│       └── object
│           ├── component
│           ├── project
│           └── utility
├── components
├── pages
└── templates
```
- styles/faundation  
  Sassを使用するにあたる初期設定や変数をそれぞれ格納。  
  開発する内容に併せて変更する箇所がいくつかあるため、必読

- styles/object  
  構築したものをスタイリングしたものをそれぞれ格納  
  component → パーツ類（button,card 等）  
  project → レイアウト類  
  utility → 有用類

- components  
  パーツ類のAstroを格納

- pages  
  ページ単位のAstroを格納。初期はindex.astro

- templates  
  ページに必要なテンプレート類のAstroを格納


## その他
- Gitプッシュ時のプレフィックス
```
fix：バグ修正
hotfix：クリティカルなバグ修正
add：新規（ファイル）機能追加
update：機能修正（バグではない）
change：仕様変更
clean：整理（リファクタリング等）
disable：無効化（コメントアウト等）
remove：削除（ファイル）
upgrade：バージョンアップ
revert：変更取り消し
```

- FLOCSSの命名規則
```
Layout：l-*
Component：c-*
Project：p-*
Utility：u-*
JS関連: js-*,is-*
```

- 画像命名ルール(参考程度)
```
bg-main_section（背景 bg-）
hero-top_slide（メインビジュアル hero-）
logo-brand_name （ロゴ logo-）
title-about （タイトル title-）
txt-about_desc （文章 txt-）
icon-open （アイコン icon-）
chart-access （グラフ・リスト chart-）
bnr-campaign （バナー bnr-）
thm-single（サムネイル・アイキャッチ thm-）
img-project（一般的な画像 img-）
img-project_0001 （連番2桁か4桁をよく使う）
img-project_off （on・off）
img-project_sp （sp）
img-project_2x （2x）
```