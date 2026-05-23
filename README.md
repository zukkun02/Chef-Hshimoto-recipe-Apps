# Chef Hashimoto Recipe Apps

シェフ・橋本先生のレシピサロン向けの静的レシピサイト。Notion を CMS として、AI で構造化されたレシピデータを GAS 経由で GitHub に push し、Vercel で配信する仕組み。

## アーキテクチャ

```
Notion DB (レシピ管理)
   ↓ シェフが「公開ステータス」を「公開」に変更
Notion Automation (Webhook)
   ↓
GAS Web App (Notion → JSON 整形 → GitHub commit)
   ↓
GitHub (このリポジトリ)
   ↓ push トリガ
Vercel (静的サイト配信)
   ↓
ユーザーのブラウザ
```

## ディレクトリ構成

| パス | 内容 |
|---|---|
| `index.html` | デザインキャンバス（開発用：5案を横並び比較） |
| `index_old.html` | 初代 MVP モック（バックアップ） |
| `screens/` | 画面コンポーネント（list / detail-* / cooking-mode） |
| `variants/` | スタイルバリエーション（bold / dark-gourmet / editorial） |
| `theme.css` | 和モダンテーマ |
| `data/index.json` | 全レシピ一覧（GAS が自動生成） |
| `data/recipes/<slug>.json` | 個別レシピ全データ（GAS が自動生成） |
| `public/images/<slug>/` | Notion からミラーされた画像 |
| `gas/` | GAS Web App ソース（バージョン管理用） |
| `docs/` | Phase 別の設計書 |
| `vercel.json` | Vercel デプロイ設定 |

## 設計書

- [Phase 2: Notion AI カスタムエージェント設計書](docs/Phase2_NotionAIエージェント設計書.md)
- [Phase 3: GAS-Vercel 連携設計書](docs/Phase3_GAS-Vercel連携設計書.md)
- [やりたいこと](やりたいこと.md)
- [要件定義](要件定義.md)

## 主要 ID

| 項目 | 値 |
|---|---|
| Notion レシピ DB | [`7c10d3b1-b478-450f-bece-a5eeb6a05f88`](https://www.notion.so/7c10d3b1b478450fbecea5eeb6a05f88) |
| データソース ID | `e264a80b-12cf-4ce7-8475-e7a91dfa23b1` |

## ローカル動作確認

```bash
cd /Users/mizuki0210/cursor/アプリ-レシピ紹介
python3 -m http.server 8000
# → http://localhost:8000/ をブラウザで開く
```

`<script type="text/babel" src="*.jsx">` を読むため、`file://` 直開きではなく HTTP サーバ経由で開く必要があります。
