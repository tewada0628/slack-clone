# Pusher への移行計画 (Pusher Migration Plan)

Vercel のサーバーレス環境で Slack クローンを完全に動作させるため、Socket.io から Pusher への移行を行います。

## 1. 事前準備 (明日最初に行うこと)

Pusher のアカウント作成と API キーの取得が必要です。

1. [Pusher公式サイト](https://pusher.com/) でアカウントを作成。
2. **Channels** (Sandboxプラン) を作成。
3. **App Keys** から以下の情報を取得して、`.env` ファイルに追加してください。
   ```env
   PUSHER_APP_ID="your-app-id"
   NEXT_PUBLIC_PUSHER_APP_KEY="your-app-key"
   PUSHER_APP_SECRET="your-app-secret"
   NEXT_PUBLIC_PUSHER_CLUSTER="your-cluster" (例: ap3)
   ```

## 2. 実装のステップ

### A. ライブラリのインストール
```bash
npm install pusher pusher-js
```

### B. サーバーサイド (API Routes) の変更
- `pages/api/socket/messages/index.ts` などの Socket.io を使っている箇所を Pusher に書き換えます。
- `pusher` SDK を使って、メッセージ作成直後に `pusher.trigger()` を実行します。

### C. クライアントサイド (Hooks) の変更
- `socker-provider.tsx` を `pusher-provider.tsx` に置き換える、あるいは Pusher を初期化するコードに変更。
- `use-chat-socket.ts` を `use-chat-pusher.ts` に変更し、Pusher のチャンネル（`subscribe`）を監視してデータを更新するように修正。

### D. クリーンアップ
- 既存の不要になった Socket.io 関連 babysitter コード、Providerを削除します。

## 3. 明日の進め方

PCを立ち上げたら、私に「昨日の続き、Pusher への移行をお願いします」と声をかけてください。
準備していただいた API キーを元に、実装を開始します。

お疲れ様でした！また明日お待ちしております。
