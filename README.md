# れんしゅうクエスト

子どもが自分から練習したくなる、サッカー育成アプリ（Webアプリ／PWA）。
練習を記録すると経験値がたまり、自分の選手がレベルアップ・カードが進化していく。

## ファイル構成
| ファイル | 役割 |
|---|---|
| `index.html` | 画面の骨組み |
| `app.css` | デザイン（ネイビー×ゴールド） |
| `app.js` | アプリ本体（能力・練習メニュー・職業・クエスト・ショップなど） |
| `sw.js` | オフライン起動用の Service Worker（更新時は `VERSION` を上げる） |
| `manifest.webmanifest` | ホーム画面に追加したときのアプリ情報 |
| `icons/` | アプリアイコン（`python tools/make_icons.py` で再生成） |
| `img/` | AIで作ったキャラ・背景画像を置く場所（`キャラ画像の作り方.md` 参照） |
| `docs/` | リリース手順・プライバシーポリシー案・ストア掲載文案・Android版の作り方 |
| `fonts/` | 同梱フォント（Noto Sans JP・Dela Gothic One、SIL OFL） |
| `android/` | Android アプリのプロジェクト（Capacitor） |

## 動かし方（PC）
```
python -m http.server 8000
```
ブラウザで http://localhost:8000 を開く。
同じWi-Fiのスマホからは `http://（PCのIPアドレス）:8000` で開ける。

## 公開用ファイルの作成とテスト
```
python tools/build.py      # dist/ に公開用ファイルをまとめる（これをアップロード）
node tools/test_logic.js   # 計算ロジックの自動テスト
```

## 中身を変えたいとき（app.js の主な場所）
- 能力：`SPORT.stats`
- 練習メニュー：`MENUS`（図解は `diag()`）
- 職業：`JOBS`／称号：`TITLES`／スキル：`SKILLS`
- 成長ステージ：`STAGES`
- クエスト：`QPOOL`／ライバル：`BOSSES`
- ショップのアイテム：`BALLS`・`BOOTS`・`KITS`・`BGS`（`price:-1` は非売品。宝箱・月間ロード限定）
- 宝箱：`openChest()`／月間チャレンジロード：`ROAD_STEP`・`roadReward()`・`MONTH_BG`
- 相棒ボルトのセリフ：`buddyLines()`
- お守り・週のふりかえり：`dailyCheck()`

## データ
記録はブラウザの localStorage（キー `renshu-quest-v1`）に保存。外部送信なし。
「せってい」からバックアップ（JSON）の保存・読みこみができる。
