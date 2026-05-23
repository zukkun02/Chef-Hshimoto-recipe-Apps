# Phase 3 — Notion ボタン → GAS Webhook → Vercel 公開 連携設計書

> **目的**: シェフが Notion でレシピの「公開ステータス」を「公開」に変更すると、自動で GitHub にデータが反映され、Vercel でホストされた HTML サイトに新レシピが現れる仕組みを構築する。
> **GitHub リポジトリ**: [zukkun02/Chef-Hshimoto-recipe-Apps](https://github.com/zukkun02/Chef-Hshimoto-recipe-Apps)
> **設計バージョン**: v1.0 / 2026-05-23

---

## 1. アーキテクチャ全体図

```
┌──────────────────────────────────────────────────────────────────────┐
│  Notion (CMS)                                                          │
│                                                                        │
│  シェフが「公開ステータス」を「下書き」→「公開」に変更                │
│                            │                                           │
│  ┌─────────────────────────▼──────────────────────────┐                │
│  │ Notion Automation                                  │                │
│  │  Trigger: 公開ステータス = 公開                    │                │
│  │  Action : Webhook POST → GAS Web App URL          │                │
│  │           payload: { page_id, secret }            │                │
│  └─────────────────────────┬──────────────────────────┘                │
└────────────────────────────┼───────────────────────────────────────────┘
                             ↓ HTTPS POST
┌────────────────────────────┼───────────────────────────────────────────┐
│  Google Apps Script (GAS)                                              │
│                                                                        │
│  doPost(e):                                                            │
│   1. シグネチャ検証 (Authorization ヘッダ)                              │
│   2. Notion API で page を取得                                         │
│   3. プロパティを整形 → recipe.json                                    │
│   4. メイン画像を Notion からダウンロード → GitHub に commit          │
│   5. data/recipes/{slug}.json を commit                                │
│   6. data/index.json を再生成して commit                               │
│   7. Notion 側に「公開日時」をタイムスタンプ書き戻し                   │
└────────────────────────────┬───────────────────────────────────────────┘
                             ↓ GitHub Contents API
┌────────────────────────────┼───────────────────────────────────────────┐
│  GitHub (zukkun02/Chef-Hshimoto-recipe-Apps)                           │
│                                                                        │
│  /data/index.json            ← 一覧用                                  │
│  /data/recipes/<slug>.json   ← 個別レシピ                              │
│  /public/images/<slug>/      ← ミラーされた画像                        │
│                            │                                           │
│  main ブランチに push                                                  │
└────────────────────────────┼───────────────────────────────────────────┘
                             ↓ GitHub Webhook (自動連携)
┌────────────────────────────┼───────────────────────────────────────────┐
│  Vercel                                                                │
│                                                                        │
│  push を検知 → 静的サイトをデプロイ（ビルド不要）                      │
│  └ https://<vercel-domain>/                                            │
└────────────────────────────┬───────────────────────────────────────────┘
                             ↓ HTTP GET
┌────────────────────────────┼───────────────────────────────────────────┐
│  ブラウザ（ユーザー）                                                  │
│                                                                        │
│  1. index.html 読み込み                                                │
│  2. fetch('/data/index.json') → レシピ一覧表示                         │
│  3. レシピをタップ → fetch('/data/recipes/<slug>.json') → 詳細表示    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. リポジトリ構成（最終形）

```
Chef-Hshimoto-recipe-Apps/
├── index.html                    # メイン HTML（既存デザインを fetch ベースに改修）
├── theme.css                     # 既存：テーマ
├── design-canvas.jsx             # 既存：開発用キャンバス
├── ios-frame.jsx                 # 既存
├── tweaks-panel.jsx              # 既存
├── shared.jsx                    # 既存
├── image-slot.js                 # 既存
├── screens/                      # 既存：画面コンポーネント
│   ├── list.jsx
│   ├── detail-shared.jsx
│   ├── detail-tabs.jsx
│   ├── detail-accordion.jsx
│   ├── detail-scroll.jsx
│   └── cooking-mode.jsx
├── variants/                     # 既存：スタイルバリエーション
├── data/                         # ★Phase 3 新規（GAS が書き込む）
│   ├── index.json               # 全レシピ一覧（軽量）
│   └── recipes/
│       ├── ebi-mayo.json        # 個別レシピ（全情報）
│       ├── hoikoro.json
│       ├── mabo-dofu.json
│       └── yurinchi.json
├── public/
│   └── images/                   # ★Phase 3 新規（GAS がミラー）
│       └── <slug>/
│           ├── main.jpg          # メイン画像
│           └── steps/            # 工程画像（将来）
├── docs/                         # 既存：設計書群
├── gas/                          # ★Phase 3 新規
│   ├── Code.gs                   # GAS スクリプト本体
│   ├── notion.gs                 # Notion API クライアント
│   ├── github.gs                 # GitHub API クライアント
│   └── appsscript.json           # GAS 設定（実体は GAS 側）
├── vercel.json                   # ★Phase 3 新規（Vercel 設定）
├── README.md                     # ★更新
├── やりたいこと.md
├── 要件定義.md
└── index_old.html                # MVP モックのバックアップ
```

---

## 3. JSON スキーマ設計

### 3.1 `data/index.json`（一覧用・軽量）

```json
{
  "updated_at": "2026-05-23T12:34:56.000Z",
  "count": 4,
  "recipes": [
    {
      "slug": "ebi-mayo",
      "title": "海老マヨ",
      "subtitle": "サーリーシャーチュウ／沙律蝦球／海老のマヨネーズ和え",
      "summary": "香港・広東で生まれた海老の揚げ物にマヨネーズベースの甘酸っぱいソースを絡める一品です。",
      "category": "メイン",
      "region": ["広東料理"],
      "image": "/public/images/ebi-mayo/main.jpg",
      "cooking_time": 15,
      "servings": 4,
      "plan": "normal",
      "published_at": "2026-05-23T12:34:56.000Z"
    }
  ]
}
```

### 3.2 `data/recipes/<slug>.json`（個別・全情報）

```json
{
  "slug": "ebi-mayo",
  "notion_page_id": "6dac3b6e-82b8-4144-8cdc-244faa1e5347",
  "title": "海老マヨ",
  "subtitle": "サーリーシャーチュウ／沙律蝦球／海老のマヨネーズ和え",
  "summary": "香港・広東で生まれた海老の揚げ物に...",
  "category": "メイン",
  "region": ["広東料理"],
  "image": "/public/images/ebi-mayo/main.jpg",
  "video_url": null,
  "ingredients_md": "【主材料】\n・海老（大きめ）12 尾...\n\n【マヨネーズソース】\n・マヨネーズ 大さじ4...",
  "preparation_md": "・エビは殻をはずして背開きし...\n・塩・片栗粉でもみ洗いし...",
  "steps_md": "1. エビに卵白をからめ、片栗粉をはたく\n2. 高温180〜190℃に熱した揚げ油で...",
  "tips_md": "・揚げ油の温度は 180〜190℃ の高温\n・からりと揚げてからソースを絡める...",
  "cooking_time": 15,
  "servings": 4,
  "chef_comment_md": null,
  "origin_column_md": "沙律というのはサラダの中国語（広東語）の音を漢字に当てたもので...",
  "source_year_month": "2012-06",
  "plan": "normal",
  "published_at": "2026-05-23T12:34:56.000Z"
}
```

**ポイント**:
- `image` は GitHub にミラーされた永続 URL（Vercel の root からの絶対パス）
- リッチテキスト系は `_md` サフィックスで Markdown 互換の文字列として保存（改行・箇条書きそのまま）
- `notion_page_id` は再同期や削除のために保持
- `plan` は将来のアクセス制御用（現状は `normal` 固定）

### 3.3 削除・非公開時の挙動

| 操作 | GAS の対応 |
|---|---|
| 公開ステータス → 非公開 | `data/recipes/<slug>.json` を **削除**、`data/index.json` から除外、画像はそのまま残す |
| Notion DB から行削除 | Notion Automation で trigger できないので別途、定期同期ジョブ（後述 §11）で検知 |

---

## 4. GAS スクリプト設計

### 4.1 ファイル分割

| ファイル | 役割 |
|---|---|
| `Code.gs` | エントリポイント（`doPost`）、メインフロー制御 |
| `notion.gs` | Notion API クライアント（ページ取得、プロパティ整形、画像 URL 取得、公開日時書き戻し） |
| `github.gs` | GitHub API クライアント（Contents API で commit、Tree API でバッチ commit） |
| `utils.gs` | 共通ユーティリティ（slug 検証、エラー通知 etc） |

### 4.2 `Code.gs`（エントリポイント）

```javascript
const PROPS = PropertiesService.getScriptProperties();

function doPost(e) {
  try {
    // 1. 認証
    const auth = e.parameter.secret || JSON.parse(e.postData.contents).secret;
    if (auth !== PROPS.getProperty('WEBHOOK_SECRET')) {
      return jsonResponse({ ok: false, error: 'unauthorized' }, 401);
    }

    // 2. ペイロード取得
    const payload = JSON.parse(e.postData.contents);
    const pageId = payload.page_id || payload.data?.id;
    if (!pageId) throw new Error('page_id missing');

    // 3. メインフロー
    const result = publishRecipe(pageId);

    // 4. Notion に公開日時を書き戻し
    notionWritePublishedAt(pageId, new Date().toISOString());

    return jsonResponse({ ok: true, slug: result.slug });
  } catch (err) {
    notifyError(err);
    return jsonResponse({ ok: false, error: err.message }, 500);
  }
}

function publishRecipe(pageId) {
  // a. Notion ページ取得
  const page = notionGetPage(pageId);
  const recipe = parseRecipe(page);

  // b. ステータス分岐
  if (recipe.status === '公開') {
    // 画像ミラー → JSON commit → index 再生成
    const imagePath = mirrorImage(recipe);
    recipe.image = imagePath;
    githubUpsertJSON(`data/recipes/${recipe.slug}.json`, recipe);
    regenerateIndex();
    return { slug: recipe.slug, action: 'published' };
  } else if (recipe.status === '非公開') {
    githubDeleteFile(`data/recipes/${recipe.slug}.json`);
    regenerateIndex();
    return { slug: recipe.slug, action: 'unpublished' };
  }
  return { slug: recipe.slug, action: 'noop' };
}

function jsonResponse(obj, code) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 4.3 `notion.gs`（Notion API クライアント）

```javascript
function notionGetPage(pageId) {
  const r = UrlFetchApp.fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    headers: {
      'Authorization': `Bearer ${PROPS.getProperty('NOTION_TOKEN')}`,
      'Notion-Version': '2025-09-03'
    }
  });
  return JSON.parse(r.getContentText());
}

function parseRecipe(page) {
  const p = page.properties;
  const getRT = (name) => (p[name]?.rich_text || []).map(x => x.plain_text).join('');
  const getTitle = (name) => (p[name]?.title || []).map(x => x.plain_text).join('');
  const getSelect = (name) => p[name]?.select?.name || null;
  const getMSelect = (name) => (p[name]?.multi_select || []).map(x => x.name);
  const getNum = (name) => p[name]?.number ?? null;
  const getDate = (name) => p[name]?.date?.start || null;
  const getURL = (name) => p[name]?.url || null;
  const getFiles = (name) => (p[name]?.files || []).map(f => f.file?.url || f.external?.url).filter(Boolean);

  return {
    notion_page_id: page.id,
    slug: getRT('slug'),
    title: getTitle('タイトル'),
    subtitle: getRT('サブタイトル・読み仮名'),
    summary: getRT('概要'),
    category: getSelect('カテゴリ'),
    region: getMSelect('地方・流派'),
    image_urls: getFiles('メイン画像'),
    video_url: getURL('動画URL'),
    ingredients_md: getRT('材料'),
    preparation_md: getRT('下ごしらえ'),
    steps_md: getRT('調理手順'),
    tips_md: getRT('コツ・ポイント'),
    cooking_time: getNum('調理時間（分）'),
    servings: getNum('人数分'),
    chef_comment_md: getRT('シェフコメント'),
    origin_column_md: getRT('料理の由来・コラム'),
    source_year_month: getDate('原典作成年月')?.slice(0, 7) || null,
    plan: getSelect('公開プラン') || 'normal',
    status: getSelect('公開ステータス'),
    published_at: new Date().toISOString()
  };
}

function notionWritePublishedAt(pageId, isoTimestamp) {
  UrlFetchApp.fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'patch',
    contentType: 'application/json',
    headers: {
      'Authorization': `Bearer ${PROPS.getProperty('NOTION_TOKEN')}`,
      'Notion-Version': '2025-09-03'
    },
    payload: JSON.stringify({
      properties: {
        '公開日時': { date: { start: isoTimestamp } }
      }
    })
  });
}
```

### 4.4 `github.gs`（GitHub API クライアント）

```javascript
const GH_REPO = 'zukkun02/Chef-Hshimoto-recipe-Apps';
const GH_BRANCH = 'main';

function githubUpsertJSON(path, obj) {
  const content = Utilities.base64Encode(
    Utilities.newBlob(JSON.stringify(obj, null, 2)).getBytes()
  );
  return githubPutFile(path, content, `chore(notion): publish ${obj.slug}`);
}

function githubUpsertImage(path, blob) {
  const content = Utilities.base64Encode(blob.getBytes());
  return githubPutFile(path, content, `chore(notion): mirror image for ${path}`);
}

function githubPutFile(path, base64content, message) {
  const url = `https://api.github.com/repos/${GH_REPO}/contents/${path}`;

  // 既存 SHA を取得
  let sha = null;
  try {
    const head = UrlFetchApp.fetch(`${url}?ref=${GH_BRANCH}`, {
      headers: githubHeaders(),
      muteHttpExceptions: true
    });
    if (head.getResponseCode() === 200) sha = JSON.parse(head.getContentText()).sha;
  } catch (_) {}

  const body = {
    message: message,
    content: base64content,
    branch: GH_BRANCH
  };
  if (sha) body.sha = sha;

  return UrlFetchApp.fetch(url, {
    method: 'put',
    contentType: 'application/json',
    headers: githubHeaders(),
    payload: JSON.stringify(body),
    muteHttpExceptions: true
  });
}

function githubDeleteFile(path) {
  const url = `https://api.github.com/repos/${GH_REPO}/contents/${path}`;
  const head = UrlFetchApp.fetch(`${url}?ref=${GH_BRANCH}`, {
    headers: githubHeaders(), muteHttpExceptions: true
  });
  if (head.getResponseCode() !== 200) return;
  const sha = JSON.parse(head.getContentText()).sha;
  return UrlFetchApp.fetch(url, {
    method: 'delete',
    contentType: 'application/json',
    headers: githubHeaders(),
    payload: JSON.stringify({
      message: `chore(notion): unpublish ${path}`,
      sha: sha,
      branch: GH_BRANCH
    }),
    muteHttpExceptions: true
  });
}

function githubListJSON(prefix) {
  const url = `https://api.github.com/repos/${GH_REPO}/contents/${prefix}?ref=${GH_BRANCH}`;
  const r = UrlFetchApp.fetch(url, { headers: githubHeaders(), muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return [];
  return JSON.parse(r.getContentText())
    .filter(f => f.name.endsWith('.json'))
    .map(f => f.name);
}

function githubHeaders() {
  return {
    'Authorization': `Bearer ${PROPS.getProperty('GITHUB_TOKEN')}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'happy-food-recipes-gas'
  };
}
```

### 4.5 画像ミラー処理（`Code.gs` 内）

```javascript
function mirrorImage(recipe) {
  if (!recipe.image_urls || recipe.image_urls.length === 0) {
    return null;
  }
  const url = recipe.image_urls[0]; // 1枚目をメイン画像とする
  const blob = UrlFetchApp.fetch(url).getBlob();
  const ext = blob.getContentType().split('/')[1] || 'jpg';
  const path = `public/images/${recipe.slug}/main.${ext}`;
  githubUpsertImage(path, blob);
  return `/public/images/${recipe.slug}/main.${ext}`;
}

function regenerateIndex() {
  const files = githubListJSON('data/recipes');
  const recipes = [];
  for (const fn of files) {
    const r = UrlFetchApp.fetch(
      `https://raw.githubusercontent.com/${GH_REPO}/${GH_BRANCH}/data/recipes/${fn}`,
      { muteHttpExceptions: true }
    );
    if (r.getResponseCode() === 200) {
      const recipe = JSON.parse(r.getContentText());
      recipes.push({
        slug: recipe.slug,
        title: recipe.title,
        subtitle: recipe.subtitle,
        summary: recipe.summary,
        category: recipe.category,
        region: recipe.region,
        image: recipe.image,
        cooking_time: recipe.cooking_time,
        servings: recipe.servings,
        plan: recipe.plan,
        published_at: recipe.published_at
      });
    }
  }
  recipes.sort((a, b) => b.published_at.localeCompare(a.published_at));
  githubUpsertJSON('data/index.json', {
    updated_at: new Date().toISOString(),
    count: recipes.length,
    recipes: recipes
  });
}
```

---

## 5. Notion Automation 設定手順

1. レシピ DB を開く → 右上 `⚙ → Automations`
2. `+ New automation` をクリック
3. 設定：

| 項目 | 値 |
|---|---|
| Name | `公開トリガー → GAS` |
| Trigger | `Property edited` → `公開ステータス` |
| Condition | `公開ステータス` `is` `公開` （または `is` `非公開` ） |
| Action | `Send webhook` |
| URL | `https://script.google.com/macros/s/<GAS_DEPLOY_ID>/exec` |
| Body | JSON テンプレート（下記） |

4. Body の JSON テンプレート：

```json
{
  "page_id": "{{page.id}}",
  "status": "{{page.公開ステータス}}",
  "secret": "<事前共有シークレット文字列>"
}
```

> **注意**: Notion Automation のテンプレ変数は `{{page.id}}` 形式。`{{page.公開ステータス}}` のような日本語プロパティ名も Notion 側で解決される（UI で選択可能）。

5. `Save` で自動化を有効化

### 5.1 「公開ボタン」プロパティの追加（任意）

Notion API では作成できないため、UI で手動追加：

1. DB の列ヘッダ `+` → タイプ `ボタン`
2. 名前: `公開する`
3. アクション: `Edit properties` → `公開ステータス` = `公開`
4. このボタンを押す → ステータス変更 → Automation 発火、というワンクリック導線が完成

---

## 6. Vercel プロジェクト設定

### 6.1 初期セットアップ

1. https://vercel.com にログイン
2. `Add New... → Project`
3. `Import Git Repository` → `zukkun02/Chef-Hshimoto-recipe-Apps` を選択
4. プロジェクト設定：

| 項目 | 値 |
|---|---|
| Framework Preset | `Other` |
| Root Directory | `./` |
| Build Command | （空欄） |
| Output Directory | `./` |
| Install Command | （空欄） |

5. `Deploy` を実行

### 6.2 `vercel.json`（リポジトリ直下）

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/data/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=60, s-maxage=300" }
      ]
    },
    {
      "source": "/public/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=86400, immutable" }
      ]
    }
  ]
}
```

- データ JSON は短い CDN キャッシュ（5 分）→ 公開してすぐ反映されるように
- 画像は 1 日キャッシュ（slug が同じなら別ファイルにならない）

### 6.3 デプロイトリガ

GitHub の main ブランチへ push があると、Vercel が自動でデプロイ（GAS が commit するたびにビルド再走）

### 6.4 カスタムドメイン（任意）

- 例: `recipes.happyfood.example.com` を Vercel の DNS 設定に追加
- 当面は `<project>.vercel.app` の自動付与ドメインで OK

---

## 7. 環境変数・シークレット管理

### 7.1 GAS Script Properties

`プロジェクトの設定 → スクリプト プロパティ`

| キー | 値 | 取得元 |
|---|---|---|
| `NOTION_TOKEN` | `secret_xxx...` | Notion → Settings → Integrations → 既存の integration をコピー（ntn と同じ token） |
| `GITHUB_TOKEN` | `github_pat_xxx...` | GitHub → Settings → Developer settings → Fine-grained PAT → `Chef-Hshimoto-recipe-Apps` リポジトリに `Contents: Read and write` 権限 |
| `WEBHOOK_SECRET` | 任意のランダム文字列 32 桁以上 | `openssl rand -hex 32` で生成 |
| `NOTIFY_EMAIL` | `mizuyoshi0210@gmail.com` | エラー通知先（任意） |

### 7.2 Notion Automation の Body にも `WEBHOOK_SECRET` を埋め込む

GAS 側で照合し、不正なリクエストを 401 で拒否する。

### 7.3 GitHub PAT スコープ

Fine-grained PAT を推奨：

- **Repository access**: `zukkun02/Chef-Hshimoto-recipe-Apps` のみ
- **Permissions → Repository permissions**:
  - `Contents`: `Read and write`
  - `Metadata`: `Read-only`（必須）
- **有効期限**: 1 年（更新リマインダーをカレンダーに）

---

## 8. デプロイ手順（初回）

```bash
# 1. ローカル: data ディレクトリと空 index.json を作成
cd /Users/mizuki0210/cursor/アプリ-レシピ紹介
mkdir -p data/recipes public/images
echo '{"updated_at":"","count":0,"recipes":[]}' > data/index.json

# 2. vercel.json を追加（§6.2 の内容で）

# 3. 既存 GitHub リポジトリと総入れ替え
git add -A
git commit -m "Phase 3: setup Vercel hosting + data/ structure"
git push origin main --force  # 既存内容と総入れ替え

# 4. Vercel 連携（§6.1 の通り）
# 5. GAS プロジェクトを作成して §4 のコードを貼り付け
# 6. Script Properties に §7.1 の値を設定
# 7. GAS をデプロイ → Web App URL を取得
# 8. Notion Automation を §5 の通り設定（URL をペースト）
```

---

## 9. 動作確認手順

### 9.1 GAS 単体テスト

GAS エディタで以下のテスト関数を実行：

```javascript
function testPublishRecipe() {
  const result = publishRecipe('6dac3b6e-82b8-4144-8cdc-244faa1e5347'); // 海老マヨ
  Logger.log(result);
}
```

- GitHub に `data/recipes/ebi-mayo.json` と `public/images/ebi-mayo/main.jpg` が出現すれば成功
- Notion 側の「公開日時」に現在時刻が入っていれば成功

### 9.2 Notion → GAS の Webhook テスト

1. Notion DB で海老マヨ行の「公開ステータス」を `下書き` → `公開` に変更
2. Notion Automation のログを確認（Webhook が発火したか）
3. GAS の `実行 → 実行履歴` を確認（POST が来ているか）
4. GitHub のコミット履歴を確認（新コミットが入っているか）
5. Vercel のデプロイ履歴を確認（自動デプロイされたか）
6. Vercel のサイトを開いて、JSON が配信されているか確認：
   - `https://<vercel-domain>/data/index.json`
   - `https://<vercel-domain>/data/recipes/ebi-mayo.json`

### 9.3 エンドツーエンドテスト

1. ブラウザで `https://<vercel-domain>/` を開く
2. 一覧ページに海老マヨが表示される（※ §10 のフロント改修後）
3. タップ → 詳細ページで全情報が表示される

---

## 10. フロントエンド改修（既存 React+Babel コードの拡張）

### 10.1 改修ポイント

既存の `data.js`（モックデータ）を、`fetch` ベースに置き換える。

`index.html` 末尾の `<script type="text/babel">` 内、`TWEAK_DEFAULTS` の直後にデータローダーを追加：

```jsx
function useRecipes() {
  const [recipes, setRecipes] = React.useState(null);
  React.useEffect(() => {
    fetch('/data/index.json')
      .then(r => r.json())
      .then(d => setRecipes(d.recipes));
  }, []);
  return recipes;
}

function useRecipe(slug) {
  const [recipe, setRecipe] = React.useState(null);
  React.useEffect(() => {
    if (!slug) return;
    fetch(`/data/recipes/${slug}.json`)
      .then(r => r.json())
      .then(setRecipe);
  }, [slug]);
  return recipe;
}
```

### 10.2 `screens/list.jsx` の改修

既存はモック配列でマップしているはず。`useRecipes()` から取得した配列でマップに置き換え：

```jsx
function ListScreen({ layout }) {
  const recipes = useRecipes();
  if (!recipes) return <Loading />;
  // 既存のレンダリングロジックに recipes を流す
}
```

### 10.3 詳細画面の改修

`screens/detail-*.jsx` も同様に `useRecipe(slug)` を使う形に。

### 10.4 開発キャンバスとの併存

`design-canvas.jsx` の表示は将来も「開発者向け」として残す（`/?dev=1` で表示モード切替など）

---

## 11. 既知の制約と将来課題

### 11.1 制約

| 項目 | 内容 | 影響度 |
|---|---|---|
| Notion 画像 URL の有効期限 | 1 時間で expire。GAS で即座にミラーする必要あり | ★ 解決済（§4.5） |
| Notion Automation の遅延 | 数秒〜数十秒の遅延あり | 軽微 |
| GitHub Contents API のレート制限 | 5000 リクエスト/時（PAT） | 軽微（数百レシピでも余裕） |
| GAS の同時実行制限 | 同時 30 実行 | 軽微 |
| Vercel 無料枠 | 100 GB 帯域/月、無制限デプロイ | 当面問題なし |
| Notion DB 行削除トリガ | Notion Automation は削除をトリガできない | △ §11.2 で対策 |

### 11.2 将来改善案

1. **削除検知**: GAS に時間トリガで日次の「Notion DB と GitHub の差分チェック」を仕込み、Notion から消えた slug を GitHub からも削除
2. **プラン別アクセス制御**: HTML 側でログインユーザのプランを判定し、`vip` 限定レシピを非表示にする（Phase 4 候補）
3. **工程画像のミラー**: 現在は `メイン画像` 1 枚のみ。複数画像対応は schema を `images: []` に拡張
4. **CMS プレビュー**: Notion 画面の右ペインに iframe で Vercel プレビュー URL を出す（`?slug=xxx&preview=1`）
5. **Slack 通知**: 公開成功・失敗を Slack に通知（GAS の `UrlFetchApp` で Incoming Webhook）

---

## 12. エラー対応・ロールバック

### 12.1 GAS でエラー発生時

```javascript
function notifyError(err) {
  const email = PROPS.getProperty('NOTIFY_EMAIL');
  if (email) {
    MailApp.sendEmail({
      to: email,
      subject: '[Happy Food] 公開処理エラー',
      body: `${err.message}\n\n${err.stack}`
    });
  }
  Logger.log(err);
}
```

GAS の「実行履歴」と Gmail に通知が届くので、原因調査ができる。

### 12.2 GitHub commit が間違っていた場合

```bash
git revert <commit-sha>
git push origin main
# → Vercel が再デプロイで前の状態に戻る
```

### 12.3 Vercel 側でロールバック

Vercel UI → Project → Deployments → 過去のデプロイを `Promote to Production`

---

## 13. 改訂履歴

| バージョン | 日付 | 変更内容 |
|---|---|---|
| v1.0 | 2026-05-23 | 初版作成 |

---

## 14. 次フェーズ予告（Phase 4）

Phase 4 候補：

1. フロントエンド改修（§10）を実装し、Vercel 上で実際に閲覧可能な状態にする
2. シェフ用の運用手順書（PDF → 公開ボタンまで）の動画キャプチャ
3. プラン別アクセス制御（vip 限定レシピなど）

Phase 3 の動作確認後に Phase 4 設計書として別途まとめます。
