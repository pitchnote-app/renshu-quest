# れんしゅうクエスト — Claude 向けの作業ルール

このリポジトリは、子ども向けサッカー練習育成アプリ「れんしゅうクエスト」（PWA）です。
夫婦2人がそれぞれの Claude で編集します。**どちらの Claude もこのルールに従ってください。**

## 会話・説明
- 説明は**日本語**で、エンジニアでない人にも分かる言葉で。専門用語は避けるか、ひとこと説明を添える。
- アプリ内の文言は「低学年すぎず、難しすぎない」漢字まじり（例：「練習を記録する」「自己ベスト」）。

## 最初に必ずやること
- 作業を始める前に `git pull`（相手の変更を取りこむ）。
- 作業は**ブランチを切って**行い、終わったら Pull Request を作る（main に直接 push しない）。
  - main にマージされると、GitHub Actions が自動で テスト → ビルド → GitHub Pages に公開する。
  - 公開URL：https://pitchnote-app.github.io/renshu-quest/

## ファイル構成
- `index.html` 骨組み／`app.css` デザイン（ネイビー×ゴールド）／`app.js` アプリ本体（すべてのロジック）
- `sw.js` オフライン用（`VERSION`）／`manifest.webmanifest`／`privacy.html`
- `img/chars/` キャラのイラスト（`idea-1`〜`idea-11`、ステージ別は `idea-番号_ステージ.webp`）
- `img/items/` ショップのアイテム（`ball-N` `boot-N` `kit-N`）／`img/bolt/` 相棒ボルトの表情（`bolt-1`〜`10`）
- `img/sheets/` AIで作った元のシート画像（公開ビルドには含めない）
- `fonts/` 同梱フォント（SIL OFL）／`android/` Android版（Capacitor）
- `tools/` 各種スクリプト／`docs/` 資料（リリース手順・プロンプト集・調査など）

## 変更したら必ずやること
1. `node tools/test_logic.js` → すべて成功を確認（ロジックを変えたらテストも追加）
2. ブラウザで実際に動かして確認（`python -m http.server 8000` → http://localhost:8000 、スマホ幅で）
3. 目に見える変更のときは `app.js` の `APP_VERSION`・`sw.js` の `VERSION`・`package.json` の `version` を上げる
4. コミットメッセージは日本語で、何を変えたかを箇条書き

## AIイラスト（ChatGPTなどで作った画像）の取りこみ方
- 画像は `docs/AIシート用プロンプト.md` のプロンプトで「1枚に格子状に複数」作ってもらう（背景は単色グレー）。
- 受け取ったシートは `img/sheets/` に保存し、`tools/slice_sheet.py` で切り出す（背景透明化・ふちの色戻し・はみ出し除去・WebP出力）。
  - 例：`python tools/slice_sheet.py img/sheets/xxx.webp 5 2 img/items ball-1,ball-2,... --size 320 --tol 30`
  - 1人だけの画像は列数・行数を `1 1` に。腕のすき間の背景は `--holes "x,y;x,y"`、足元の影は `--shadow 0.92`、輪郭の内側が欠けるときは `--band 1`
  - 例：`python tools/slice_sheet.py img/sheets/chara-11.webp 1 1 img/chars idea-11 --size 512 --tol 30 --holes "640,560;378,544;379,268;380,278;467,27" --shadow 0.92 --band 1`
  - 小さな記号（Zzz など）を残したいときは `--keep 0.008`
  - キャラ8段階シート（4列×2行）の例：`python tools/slice_sheet.py img/sheets/idea-3-stages.webp 4 2 img/chars idea-3_1,...,idea-3_8 --size 512 --tol 30 --auto-holes 6 --hole-area 150 --xs 0,390,880,1215,1774`
    - `--auto-holes`：足の間など囲まれた背景（完全な単色）だけを自動で消す。足元の影や白い服は残る
    - `--xs`：エフェクトがとなりのマスにはみ出すとき、列の区切り位置を手で指定（すき間の位置を調べて決める）
- 切り出した後は、暗い背景に置いて拡大し、白いフチ・かけらが残っていないか必ず確認する。
- 実在のチーム名・ロゴ・既存キャラクターの絵は使わない。

## 決まっている方針（変えるときはオーナーに確認）
- **子ども向けの安全**：課金なし・広告なし・外部への通信なし（フォントも同梱）・個人情報を集めない。データは端末内（localStorage）のみ。
- データ削除・バックアップ・保護者レポートなど大事な操作の前は**保護者確認（かけ算）**を出す。
- 報酬は「練習した分だけ報われる」形にする。お金と結びつくガチャ、開くだけでもらえるログインボーナス、焦らせるカウントダウンは入れない。
- **やらないと決めたもの**：保護者の「確認スタンプ」（練習の承認）、ピッチノートとの連携（今は考えない）、ランキング（サーバーと個人情報の問題）。
- 練習メニューの図解・ショップのアイコン以外の大きな絵（キャラ・背景・ボルト・アイテム）はAIイラストを使う方針。
- 他社作品（ドラクエ・ブルーロック・ワンピースカードなど）は雰囲気の参考のみ。名前・キャラ・ロゴは使わない。

## 主な仕組み（app.js）
- 能力9種 `SPORT.stats`／練習メニュー57種 `MENUS`（図解 `diag()`）／職業 `JOBS`／称号 `TITLES`／スキル `SKILLS`
- 階級 `RANKS`（ステージと同じレベルで昇格）／能力ランクS〜G `grade()`／メダル `MEDALS`（ビギナー→ダイヤ）／練習の熟練度 `mastery()`
- 二つ名 `NICKS`（14分野×8段階。能力の分野は能力ランク、練習の分野は回数で上がる）／階級の色 `RANK_COL`
- 個人技スキル `SKILLS`（金・技・心がまえの札。`name` は保存のキーなので変えない）／つよさ画面 `statusView()`
- 練習場所8段階 `STAGES`（家の庭→近所の公園→大きな公園→河川敷→小学校のグラウンド→フットサルコート→天然芝のピッチ→満員のスタジアム）。練習画面の上 `stageScene()`、絵は `img/stages/stage-N.webp`
- 部屋（マイページ）8段階 `ROOMS`・`roomView()`：階級と同時に引っこし、広く豪華に。飾り（トロフィー・メダル・ボール・くつ・ポスター）が増える。絵は `img/room/room-N.webp`
- クエスト `QPOOL`／ライバル `BOSSES`／宝箱 `openChest()`／月間ロード `roadReward()`／お守り・ふりかえり `dailyCheck()`
- ショップ `BALLS` `BOOTS` `KITS` `BGS`（`price:-1` は非売品）／相棒ボルト `buddyLines()`・`BOLT`
- イラストのキャラ `AVATARS`・`avatarView()`

## やってはいけないこと
- 秘密情報（パスワード・APIキーなど）をコミットしない。
- `main` に直接 push しない、force push しない。
- アカウント作成・課金・ストア公開などは、オーナーの指示なしに行わない。
