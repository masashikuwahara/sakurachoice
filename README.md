# 比較アプリ

このプロジェクトは、Vue.jsを使用して作成された「比較アプリ」です。ユーザーはランダムに提示される2つのアイテムを比較し、選択することでランキングが作成されます。スイス式トーナメント方式を採用しており、進行中に現在の進捗率も表示されます。

## 機能

- アイテムの画像と名前を使って、ユーザーに対して比較を提示します。
- ユーザーは1つのアイテムを選択するか、引き分けにすることができます。
- 選択が終わると、最終的にランキングが表示されます。
- 進行中に現在の進捗をパーセンテージで表示します。
- スタイリッシュでレスポンシブなデザイン。

## 使用技術

- **Vue.js**: フロントエンドフレームワーク
- **Tailwind CSS**: デザイン用CSSフレームワーク
- **Vitest**: テストツール
- **Pinia**: 状態管理ライブラリ

## インストール

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/yourusername/your-repository-name.git
   cd your-repository-name

2. 依存パッケージをインストールします。

   ```bash
   npm install

3. 開発サーバーを起動します。

   ```bash
   npm run dev

## 使用方法

1. アプリを起動すると、最初に「スタート」ボタンが表示されます。
2. 「スタート」ボタンをクリックすると、ランダムに選ばれた2つのアイテムが比較として表示されます。
3. ユーザーは1つのアイテムを選択するか、引き分けボタンをクリックして比較を進めます。
4. 比較が進むと、最終的なランキングが表示され、ユーザーは再度比較を行うことができます。

## テスト

- このプロジェクトでは、Vitest を使用してユニットテストを行っています。テストを実行するには以下のコマンドを使用します。

   ```bash
   npm install

- テストは自動で実行され、テスト結果が表示されます。
  
##  コードの概要
### App.vue
 App.vue では、アプリ全体のレイアウトと基本的なフローを制御しています。ユーザーが比較を始めるボタンや、進捗バーを表示するためのロジックが含まれています。

### itemStore.js
 itemStore.js では、アイテムの管理とトーナメントのロジックを管理しています。アイテムのペアをランダムに生成し、ユーザーが選んだアイテムに基づいてスコアを更新します。

### テストファイル
 テストファイルでは、主にアクションや結果に関するロジックの検証を行っています。Vitest を使用して、状態管理や進行中の比較に関するロジックが正しく動作するかを確認しています。

### ライセンス
 このプロジェクトはMITライセンスのもとで公開されています。