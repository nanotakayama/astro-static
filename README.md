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
CSS設計は「FLOCSS」を採用した管理。  
スタイリングはAstroに直接書く記述でも問題ないが、Sassファイルにまとめることで開発をスムーズにすることを可能に（Javascirptも同様）


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