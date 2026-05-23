# GAS Web App セットアップ手順

このディレクトリのスクリプトは Google Apps Script（GAS）にデプロイして、Notion Automation の Webhook 受け口として動作します。

## デプロイ手順

### 1. GAS プロジェクトを作成

1. https://script.google.com にアクセス
2. `新しいプロジェクト` をクリック
3. プロジェクト名を `happy-food-recipe-publisher` に変更

### 2. ファイルをコピー

GAS エディタで以下のファイルを作成し、このディレクトリの同名ファイルから中身を貼り付け：

- `Code.gs` （ファイル → 新規 → スクリプト）
- `notion.gs` （同上）
- `github.gs` （同上）
- `appsscript.json` （プロジェクトの設定 → 「`appsscript.json`」マニフェストファイルを表示）

### 3. スクリプト プロパティを設定

`プロジェクトの設定` → `スクリプト プロパティ` で以下を追加：

| キー | 値 |
|---|---|
| `NOTION_TOKEN` | `secret_xxx...` （Notion Integration トークン） |
| `GITHUB_TOKEN` | `github_pat_xxx...` （Fine-grained PAT、Contents: Read and write） |
| `WEBHOOK_SECRET` | 任意のランダム文字列（`openssl rand -hex 32` で生成） |
| `NOTIFY_EMAIL` | エラー通知先メールアドレス（任意） |

### 4. Web App としてデプロイ

1. 右上の `デプロイ` → `新しいデプロイ`
2. 種類: `ウェブアプリ`
3. 説明: `v1`
4. 次のユーザーとして実行: `自分`
5. アクセスできるユーザー: `全員`
6. `デプロイ` → Web App URL をコピー

### 5. Notion Automation を設定

1. レシピ DB を開く → `⚙` → `Automations`
2. 新規 automation 作成
3. Trigger: `Property edited` → `公開ステータス`
4. Condition: `公開ステータス` `is` `公開`
5. Action: `Send webhook`
   - URL: `<手順 4 でコピーした GAS URL>`
   - Body:
     ```json
     {
       "page_id": "{{page.id}}",
       "status": "{{page.公開ステータス}}",
       "secret": "<手順 3 で設定した WEBHOOK_SECRET>"
     }
     ```
6. 非公開トリガも別途作成（同じ URL、Condition は `is 非公開`）

### 6. 動作確認

GAS エディタで `testPublishRecipe` を実行 → ログに `published` と表示され、GitHub にコミットが入れば成功。

## トラブルシューティング

| 症状 | 原因 | 対処 |
|---|---|---|
| `unauthorized` レスポンス | `WEBHOOK_SECRET` の不一致 | Notion Body と Script Properties の値を突き合わせ |
| `notionGetPage failed: 401` | `NOTION_TOKEN` 期限切れまたは Integration が DB に未接続 | Integration を Recipe DB に Connections で追加 |
| `githubPutFile failed: 404` | リポジトリ名違いまたは PAT 権限不足 | `GH_REPO` 定数を確認、PAT の Contents 権限を再確認 |
| 画像が表示されない | Notion 画像 URL の expire（1時間） | GAS で即座に処理されているか確認、re-publish |
