# Android版の作り方

Android用のプロジェクト（`android/` フォルダ）は作成済みです。ここから先は、Android Studio を入れれば進められます。

## 準備済みのもの
- Capacitor 7（Webアプリをスマホアプリに包む道具）
- アプリID：`com.pitchnoteapp.renshuquest`（`capacitor.config.json`）
  - **ストアに出すと二度と変えられない**ので、出す前に確定させる（例：独自ドメインがあれば `jp.ドメイン名.renshuquest`）
- アプリ名「れんしゅうクエスト」、縦向き固定
- アプリアイコン（丸・角丸・アダプティブ）、起動画面（スプラッシュ）：`python tools/make_android_icons.py` で作り直せる

## 1. Android Studio を入れる（無料・初回だけ）
1. https://developer.android.com/studio からダウンロードしてインストール
2. 最初の起動で「Standard」を選ぶ（Android SDK などが自動で入る）

## 2. アプリをスマホで動かす
```
npm run android:sync     # Webアプリを作り直して android/ に取りこむ
npm run android:open     # Android Studio でプロジェクトを開く
```
- Android スマホをUSBでつなぎ、「開発者向けオプション」→「USBデバッグ」をオンにする
- Android Studio の ▶（Run）ボタンで、スマホにアプリが入る

## 3. Google Play に出す
1. Google Play Console に登録（25ドル・1回のみ）：https://play.google.com/console
2. Android Studio の「Build → Generate Signed App Bundle」で `.aab` ファイルを作る
   - このとき作る「署名鍵（キーストア）」は**絶対になくさない**（なくすとアップデートが出せなくなる）
3. Play Console で、アプリ名・説明（`docs/ストア掲載文（案）.md`）・スクリーンショット・プライバシーポリシーのURL（`https://pitchnote-app.github.io/renshu-quest/privacy.html`）を入力
4. 「ターゲット ユーザーとコンテンツ」で対象年齢を選ぶ → ファミリー向けポリシーの質問に答える
5. 「データ セーフティ」：**データを収集しない・共有しない**
6. まず「内部テスト」で家族のスマホに配信 → 問題なければ本番公開

## アプリを更新するとき
1. Webアプリ（`app.js` など）を直す
2. `npm run android:sync`
3. `android/app/build.gradle` の `versionCode` を1つ上げ、`versionName` を新しいバージョンにする
4. 署名付きの `.aab` を作って Play Console にアップロード

## 今後アプリ版で追加したいもの
- 練習リマインダー通知（`@capacitor/local-notifications`）
- 端末への保存の強化（`@capacitor/preferences`）
- 振動の強化（`@capacitor/haptics`）
