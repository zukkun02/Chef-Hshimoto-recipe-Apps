# Handoff: 橋本先生レシピサイト（和モダン）

## Overview

スマホ向けレシピサイトの3画面プロトタイプ。橋本先生（料理家）の家庭向けレシピ集。情報量の多い1レシピ（材料24品、下ごしらえ5項目、調理7工程、付け合わせ、雑穀ごはん、盛り付け、冷凍販売の案内）をスマホ画面で快適に閲覧・調理できるようにしたデザイン。

3画面構成：
1. **一覧** — 季節の特集 + カテゴリ + 横並びレシピリスト
2. **詳細** — 大型ヒーロー画像 + タブ切替（材料／下ごしらえ／調理／盛り付け）
3. **料理中モード** — 暗背景・大文字・1工程ずつ表示、チェックリスト付き

## About the Design Files

このフォルダの `.html` / `.jsx` / `.css` / `.js` ファイルは **デザインリファレンス** です。HTMLで作られたプロトタイプで、見た目と挙動を示すためのものであり、そのまま本番コードとしてコピーするものではありません。

タスクは、これらのHTMLデザインを **対象コードベースの既存環境**（React・Vue・SwiftUI・ネイティブなど）で、そのコードベースの確立されたパターンとライブラリを使って **再現** することです。まだ環境が決まっていない場合は、プロジェクトに最も適したフレームワークを選んで実装してください。

JSX で書かれていますが、これは Babel standalone でブラウザ上で直接実行するためのものなので、本番では適切なビルドパイプライン（Vite/Next.js等）に置き換えてください。

## Fidelity

**High-fidelity (hifi)** — 色・タイポグラフィ・余白・インタラクションは確定値です。ピクセル単位で忠実に再現してください。ただし、画像はプレースホルダー（image-slot）になっているので、実際のレシピ完成写真と差し替えが必要です。

## Design Tokens

### Colors

和モダン — 生成り（kinari、unbleached cream）＋墨（sumi、ink）＋朱（shu、vermillion）。

```
/* Base */
--washi:       #faf6ec   /* 最も明るい紙色（背景） */
--kinari:      #f3ecdb   /* クリーム — カードや薄い面 */
--kinari-deep: #e8dfc8   /* 深めクリーム — 仕切り */
--line:        #ddd2b8   /* 罫線色 */

/* Inks */
--sumi:        #1d1a16   /* 主文字色／墨 */
--sumi-2:      #3a342d   /* 副文字色 */
--sumi-3:      #6b6353   /* 三次文字色／キャプション */
--muted:       #9a917e   /* ヒント・薄い文字 */

/* Accents */
--shu:         #b8442a   /* 朱 — プライマリアクセント */
--shu-deep:    #8d3220   /* 朱（深） */
--shu-soft:    #f0d4c9   /* 朱（淡） */
--tea:         #7a6643   /* 茶 — セカンダリ（タグなど） */
--moss:        #5e6b3b   /* 苔 — ターシャリ（タグなど） */
```

### Typography

```
--font-serif: 'Noto Serif JP', 'Shippori Mincho', 'Hiragino Mincho ProN', serif;
--font-sans:  'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif;
```

使い分けの原則：
- **本文・見出し・タイトル**: セリフ（Noto Serif JP）
- **メタ情報・数値ラベル・英字・カテゴリ**: サンセリフ（Noto Sans JP）— 大文字・広めのletter-spacing
- 数値は `font-variant-numeric: tabular-nums` で等幅に

文字サイズ（モバイル基準）：
- ヒーロー見出し（レシピ名）: 30px / 700 / line-height 1.2 / letter-spacing 0.04em
- セクション見出し: 22px / 600
- カード見出し: 14-16px / 600
- 本文: 12.5-13px / line-height 1.7-1.85 / letter-spacing 0.02em
- メタ（英字）: 9-11px / letter-spacing 0.15-0.2em / UPPERCASE
- 注釈・キャプション: 10-11px

### Spacing

- 画面横padding: 18px（外側）
- セクション間: 22-32px
- カード内padding: 14-18px
- アイテム間隔: 6-12px

### Radii

ほぼ角丸を使わない（和モダンの矩形感）：
- カード・矩形要素: **0-4px**（基本フラット）
- ピル状ボタン・タグ: 99px（完全な角丸）
- アバター・アイコンボタン: 99px

### Shadows

基本的に影は使わない。ヒエラルキーは色と罫線（hairline）で表現する。
ただし、フローティング要素（料理開始ボタンのstickyバーなど）には `0 0 0 1px var(--line)` + 薄いblur backdropのみ。

### Iconography

`stroke="1.6"` の細線スタイル、丸キャップ。ストロークは現在のテキスト色（`currentColor`）か`var(--sumi)` を使用。

---

## Screens / Views

### Screen 1: List（一覧）

**Purpose**: ユーザーが今日作る献立を探す。トップページ。

**Layout**:
- iPhone標準（402×874）想定。`overflow-y: scroll`。
- 上から:
  1. ステータスバー領域（54px）— iOS safe-area
  2. AppHeader（高さ約56px）
  3. 挨拶セクション（padding: 18px 18px 8px）
  4. 検索バー（padding: 8px 18px 14px）
  5. カテゴリチップ横スクロール（padding: 4px 18px 16px）
  6. 「今月の一品」フィーチャーカード（padding: 0 18px 24px）
  7. セクション見出し「あたらしい献立」
  8. レシピリスト（横並び、画像100×100px + テキスト）— padding: 0 18px、gap: 14px
  9. 末尾装飾「— 続きはまた、明日 —」（letter-spacing: 0.3em）
  10. 固定TabBar（高さ約62px、下部）

**Components**:

#### AppHeader
- 高さ: ~56px / 背景: var(--washi) / 下罫線: 1px solid var(--line)
- 左: 印章風のシール「帖」(seal class, 28×28, 朱背景白文字, font-size 14, 角丸4)
- 中央: タイトル「つくる帖」(serif, 15px, weight 600, letter-spacing 0.18em) + サブ「TSUKURU—CHO」(sans, 10px, letter-spacing 0.15em, color var(--sumi-3))
- 右: 検索アイコン or アクションボタン

#### 挨拶セクション
- 「今日も、丁寧に。」（serif, 22px, weight 600, letter-spacing 0.04em）— 「丁寧に」だけ var(--shu) で着色
- 「2026年 2月 · 立春の頃合いの献立」（sans, 11px, color var(--sumi-3), margin-top 4px）

#### 検索バー
- 背景 var(--kinari), 罫線 1px solid var(--line), 角丸 999px（pill）
- padding: 10px 14px, gap: 8px
- 中身: 虫眼鏡SVG + 「料理名・食材で探す」プレースホルダ（12px, color var(--muted)）+ 右端に「絞り込み」バッジ

#### カテゴリチップ（横スクロール）
- 各チップ: padding 6px 14px, border-radius 99px, serif 12px / weight 500, letter-spacing 0.1em
- アクティブ: 背景 var(--sumi)、文字 var(--washi)
- 非アクティブ: 透明背景、罫線 1px var(--line)、文字 var(--sumi-2)
- カテゴリ: 「すべて／メイン／副菜／汁物／主食／常備菜／おやつ」

#### Featured Card（今月の一品）
矩形カード（border-radius 4px, border 1px solid var(--line)）。
- 上半分（高さ220px）: 画像領域（image-slotで差し替え可能）
  - 左上: 朱の「今月の一品」リボン（背景 var(--shu)、文字 var(--washi)、serif 11px, weight 600, letter-spacing 0.15em、padding 4px 10px）
  - 右上: ブックマークボタン（34×34, 角丸99, 背景 rgba(washi, 0.92)）
  - 右上の左隣: 日付スタンプ「2026.2」（10px serif, letter-spacing 0.2em, 半透明背景）
- 下半分（背景 var(--washi)、padding 14px 16px 16px）:
  - タグ行: 「スパイス」（朱filled, 10px）+ 「メイン」（茶outline, 10px）+ 右端に「5人分 · 90分＋一晩」
  - タイトル「スープカレー」（serif 22px / 600 / letter-spacing 0.04em）
  - サブ「骨付き鶏もも肉でじっくり煮込む」（serif 12px / var(--sumi-3) / line-height 1.6）
  - 区切り罫線（1px var(--line), padding 10px 0）
  - 評価★4.8 + 「127件の評価」+ 右端に「つくる →」（朱、letter-spacing 0.1em）

#### Recipe List Row（採用案：横並びリスト）
- 高さ100pxの画像（width 100, height 100, border-radius 2px）+ flex: 1 のテキスト領域
- gap: 12px、行間 14px
- テキスト領域:
  - メタ「{タグ} · {季節}」（sans 9px, color アクセント色, letter-spacing 0.15em, UPPERCASE）
  - タイトル（serif 16px, weight 600, color var(--sumi)）
  - サブ（serif 11px, color var(--sumi-3), line-height 1.5）
  - 下部: 評価★ + 数値 + 時間（sans 10px, color var(--muted)）

#### TabBar（固定下部）
- 4タブ: 「さがす／カテゴリ／お気に入り／マイページ」
- 背景 rgba(washi, 0.96) + backdrop-filter blur(20px)
- 上罫線 1px var(--line)
- padding-bottom 22px（safe-area対応）
- アイコン20×20 + ラベル10px sans, letter-spacing 0.05em
- アクティブ色: var(--shu) / 非アクティブ: var(--muted)

---

### Screen 2: Detail（詳細・タブ切替）

**Purpose**: レシピの全情報を、料理中に確認しやすい形で表示。

**Layout**:
- フルブリードヒーロー画像（高さ360px）
- タイトルブロック（padding 20px 18px 14px）
- メタストリップ（4列: 人数／調理／難易度／材料）
- 「作り手のコツ」プルクオート（朱の左罫線2px、kinari背景）
- **stickyタブバー**（top: 0、4タブ）
- タブ内容（padding 22px 18px 110px）
- **stickyボトムCTA**「料理を はじめる」

**Components**:

#### Hero
- 高さ360px、image-slotで実画像をホスト
- フローティングヘッダーオーバーレイ:
  - 左: 戻るボタン（36×36, 角丸99, 背景 rgba(washi, 0.92)）
  - 右: シェア + ブックマーク（同じスタイル）
- 右下: 日付tategaki「2026 . 2 ／ 5人分」（背景 rgba(sumi, 0.7) + backdrop-blur, color var(--washi), serif 10px, letter-spacing 0.2em）

#### Title Block
- タグ行: 「スパイス」filled朱 + 「メイン」outline茶 + 「作り置き」outline苔
- タイトル「スープカレー」（serif 30px / 700 / letter-spacing 0.04em）
- サブ（serif 13px / var(--sumi-3) / line-height 1.7）
- Author行: アバター（28×28 角丸99 var(--kinari-deep) 中央に「橋」）+ 「橋本先生」+ 右端に評価
- メタストリップ（4列、罫線 1px var(--line) top + bottom）:
  - 「人数 5人分」「調理 90分＋一晩」「難易度 ★★★」「材料 24品」
  - 数値: serif 16px / weight 600 / var(--sumi)
  - ラベル: sans 9px / letter-spacing 0.2em / var(--muted) / UPPERCASE
- 作り手のコツ: padding 12px 14px, 背景 var(--kinari), border-left 2px solid var(--shu)
  - ラベル「作り手のコツ」(sans 9px, letter-spacing 0.2em, var(--shu))
  - 本文（serif 12px, line-height 1.7, var(--sumi-2)）

#### Sticky Tab Bar
- `position: sticky; top: 0; z-index: 10`
- 背景 var(--washi)、上下罫線 1px var(--line)
- 4タブを `flex: 1` で均等配置
- タブボタン: padding 14px 0 12px, serif 13px
  - アクティブ: weight 600, color var(--sumi), 下に高さ2pxの朱バー（左右に25%マージン）
  - 非アクティブ: weight 500, color var(--muted)
- 各タブのラベル + 件数バッジ（sans 9px, アクティブ時 var(--shu)）
- タブ: 「材料 24」「下ごしらえ 5」「調理 7」「盛り付け 4」

#### Tab Content — 材料
- 上部: 「5人分 / SERVINGS」（sans 11px, letter-spacing 0.2em, var(--muted)）+ 右端に「-/+」増減コントロール
  - 「-」: 22×22 透明背景, serif color var(--sumi-3)
  - 「+」: 22×22 var(--shu) 背景、var(--washi)文字
- 材料グループ（5グループ）: 「主材料／ホールスパイス／パウダースパイス／香味野菜／煮込み調味料」
  - グループ見出し: 「〈グループ名〉」(serif 11px / 600 / var(--shu) / letter-spacing 0.15em) + flex罫線
  - アイテム行: チェックボックス（accent var(--shu), 13×13）+ 名前（serif 13px）+ 分量（sans 12px, weight 500, tabular-nums）
  - サブアイテム（「└」プレフィックス）はpadding-left 14px、color var(--sumi-3)
  - 行間: 7px / 行下罫線: 1px dotted var(--line)

#### Tab Content — 下ごしらえ
- 5項目、ナンバリング付き
- 各項目: 番号バッジ（24×24, 1px朱罫線, color var(--shu), serif 11px, weight 600）+ 本文（serif 13px, line-height 1.7）
- 行下罫線 1px var(--line)

#### Tab Content — 調理
- 上部: 「7工程 / COOKING」 + 右端「料理中モード」ボタン（var(--sumi)背景, var(--washi)文字, pill, padding 6px 14px, serif 11px, letter-spacing 0.15em + 再生アイコン）
- タイムラインリスト（左に32pxインデント）:
  - 各ステップ: 円形ナンバー（22×22, var(--shu)背景, var(--washi), serif 11px, 600）
  - ステップ間に縦罫線（位置 left: 10.5px, 1px var(--line)）でタイムライン感
  - タイトル（serif 14px / 600）
  - メタ「⌛ 時間」「🔥 火加減」（sans 10px, 朱 / 茶）
  - 本文（serif 12.5px, line-height 1.75）

#### Tab Content — 盛り付け
- 「〈付け合わせのお野菜〉」: 茹で卵行 + 素揚げ野菜のチップ（kinari背景、line罫線、serif 12px）
- 「〈雑穀ごはん〉」: 材料リスト + 調理法（kinari背景, border-left 2px var(--tea), serif 11.5px）
- 「〈盛り付け〉」: kinari背景の表形式、行頭に「01〜04」朱ナンバリング
- 「〈冷凍販売〉」: **var(--sumi)背景、var(--washi)文字** — トーン反転で目立たせる。「* オンラインショップでもお求めいただけます」注釈

#### Sticky Bottom CTA
- `position: absolute; bottom: 0`
- 背景 rgba(washi, 0.97) + backdrop-blur 20px、上罫線 1px var(--line)
- padding: 12px 16px 32px（下はsafe-area）
- 左: ブックマークボタン（44×44 円, var(--washi)背景, 1px var(--line)）
- 右: メインCTA「料理を はじめる」（flex: 1, height 44, pill, var(--shu)背景, var(--washi)文字, serif 14px / 600 / letter-spacing 0.2em, 左に再生三角アイコン）

---

### Screen 3: Cooking Mode（料理中モード）

**Purpose**: 料理中、手が汚れた状態でもチラ見できるよう、1工程に集中して大きく表示。タイマー機能は **無し**（情報として目安時間と火加減のみ表示）。

**Layout**:
- 画面全体 var(--sumi) 背景、var(--washi) テキスト
- 上部: ヘッダー（×ボタン + タイトル + 情報ボタン）
- プログレスドット（7セグメント）
- 大きなステップ番号「03」 + ラベル「/07」 + 火加減バッジ
- ステップタイトル（serif 28px / 700）
- ステップ本文（serif 16px / line-height 1.85）
- **目安時間 + 火加減カード（タイマーなし）**
- 「この工程で使うもの」チェックリスト
- 下部: 戻る/次の工程ボタン

**Components**:

#### Top Bar
- padding: 54px 16px 8px（54pxはステータスバー領域）
- 左×ボタン: 32×32 円, rgba(washi, 0.1)背景
- 中央: タイトル「スープカレー」(serif 13px / 500 / letter-spacing 0.1em) + 「料理中モード · 画面常時オン」(sans 9px / 0.5透明度 / letter-spacing 0.15em)
- 右: 情報ボタン（時計アイコンではなく「i」アイコン）— **タイマー機能を示唆するUIは置かない**

#### Progress Dots
- padding 4px 16px 18px、gap 4px
- 各セグメント: flex 1, height 3px, border-radius 2px
- 完了済み: var(--shu) / 現在: var(--washi) / 未完了: rgba(washi, 0.15)

#### Step Indicator (Big number)
- ステップ番号: serif 76px / 700 / var(--shu) / line-height 0.9
- 「/ 07」: serif 14px / 0.5透明度
- 右端: 火加減バッジ（罫線 1px var(--shu), color var(--shu), padding 3px 10px, sans 10px, letter-spacing 0.2em）

#### Step Title & Body
- タイトル: serif 28px / 700 / letter-spacing 0.04em / line-height 1.3
- 本文: serif 16px / line-height 1.85 / letter-spacing 0.04em / text-wrap pretty / 0.92透明度

#### Reference Card (タイマーなし)
- 背景 rgba(washi, 0.05), 罫線 1px rgba(washi, 0.12), padding 14px 18px
- 横並び2項目（中央に縦罫線）:
  - 「目安時間」(sans 9px, letter-spacing 0.2em, 0.5透明度) + 値（serif 22px / 600）
  - 「火加減」(同じラベル形式) + 値（serif 16px / 600）
- **タイマーボタンは無し**

#### Checklist「この工程で使うもの」
- ラベル: sans 9px, letter-spacing 0.2em, 0.5透明度
- 各行: チェックボックス（20×20, 1.5px罫線, 完了時は var(--shu) 塗りつぶし）+ 名前（serif 14px, 完了時は line-through + 0.5透明度）+ 分量（sans 11px, 0.55透明度, 右寄せ）
- 行下罫線 1px rgba(washi, 0.08)

#### Bottom Navigation
- padding 14px 16px 26px、background gradient (top transparent → bottom var(--sumi))
- 戻る: 48×48 円, rgba(washi, 0.08)背景, 1px rgba(washi, 0.12)罫線
- 次へ: flex 1, height 48, pill, var(--shu)背景, var(--washi)文字, serif 14px / 600 / letter-spacing 0.25em
  - 最終工程の場合は「できあがり」表示

---

## Interactions & Behavior

### Navigation Flow
- 一覧 → 詳細: レシピカード or リスト行のタップで遷移
- 詳細 → 一覧: ヘッダー左の戻るボタン
- 詳細 → 料理中モード: stickyボトムの「料理を はじめる」ボタン、または「調理」タブ内のボタン
- 料理中 → 詳細: ×ボタン

### Detail Page Tabs
- タップで `activeTab` state を切り替え
- アクティブインジケータ（下の朱バー）が切り替わる
- 各タブ内容はin-place切替（タブ位置は sticky なので画面上に残る）

### Cooking Mode
- 「次の工程へ」: `stepIdx` を1進める、最終で「できあがり」表示
- 「戻る」: `stepIdx` を1戻す
- 画面常時オン: `screen.wakeLock` API を使う（実装時要対応）
- ステップ間遷移は瞬時切替でOK（フェードアニメは要件外）

### Animations
- スクリーン遷移: 0.25s ease-out フェードイン（軽め）
- タブ切替: 不要（瞬時切替）
- ボタンタップ: なし or 軽いopacity変化

### Loading & Empty States
- 今回のプロトタイプ範囲外。実装時に検討。

### Responsive Behavior
- **iPhone専用**（402×874 が基準）。タブレット・デスクトップ未対応。
- 横画面はサポート対象外でOK（レシピアプリは縦専用が一般的）。
- iOS Safe Area:
  - 上: ステータスバー領域 54px
  - 下: ホームインジケータ 22-32px

---

## State Management

```ts
// アプリ全体
type Screen = 'list' | 'detail' | 'cooking';

// 詳細画面
type DetailTab = 'ingredients' | 'prep' | 'cooking' | 'plating';

// 料理中モード
interface CookingState {
  recipeId: string;
  stepIdx: number;             // 現在の工程
  completedItems: string[];    // チェック済みアイテム
}

// レシピデータ（data.js 参照）
interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  servings: number;
  time: { prep: string; cook: string };
  difficulty: string;
  tags: string[];
  rating: number;
  reviews: number;
  note: string;
  ingredients: IngredientGroup[];
  prep: string[];
  steps: CookingStep[];
  sides: { fried: string[]; egg: { name: string; detail: string } };
  rice: { items: Item[]; method: string };
  plating: { items: Item[]; extras: string[] };
  freezer: { items: Item[] };
}
```

### Data Fetching
今回はクライアントサイド静的データ。本番ではAPIから取得する想定:
- `GET /api/recipes` — 一覧
- `GET /api/recipes/:id` — 詳細
- `POST /api/recipes/:id/bookmark` — お気に入り

---

## Assets

### 画像
- ヒーロー画像はすべて **image-slot** プレースホルダ。ユーザーがドラッグ&ドロップで差し替えする想定（プロトタイプ機能、本番では通常の `<img>` に置換）。
- リファレンス画像: `reference/original-recipe-image.jpg` — ユーザーが提供したスープカレーのレシピ原稿（情報量の参考）。

### Icons
- すべてインライン SVG（stroke-based、現在テキスト色）。実装時には `lucide-react` 等のアイコンライブラリで置換可。
- 使用アイコン: ChevronLeft, Search, Bookmark, Share, Heart, Play, Check, X, Info, ChevronUp/Down, Grid, User

### Fonts
Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;600;700&family=Shippori+Mincho:wght@500;600;700&display=swap" rel="stylesheet" />
```
- Noto Serif JP: 400, 500, 600, 700
- Noto Sans JP: 400, 500, 600, 700
- Shippori Mincho: 500, 600, 700（オプション、見出し用代替）

---

## Files

このフォルダ内のファイル:

| ファイル | 役割 |
|---|---|
| `prototype.html` | エントリーポイント（採用版プロトタイプ） |
| `theme.css` | 和モダンのデザイントークン（CSS Custom Properties） |
| `data.js` | レシピデータ（スープカレー + 一覧用8品） |
| `shared.jsx` | 共通UIコンポーネント（AppHeader, Tag, Stars, PhotoPlaceholder, HeroImage, SectionTitle, TabBar） |
| `screens/list.jsx` | 一覧画面（横並びリスト採用） |
| `screens/detail-shared.jsx` | 詳細画面の共通部（Hero + 各タブ内容ブロック） |
| `screens/detail-tabs.jsx` | 詳細画面（タブUI採用） |
| `screens/cooking-mode.jsx` | 料理中モード（タイマーなし版） |
| `ios-frame.jsx` | iPhone デバイスフレーム（ステータスバー、ホームインジケータ。本番では不要） |
| `image-slot.js` | 画像差し替え用カスタム要素（本番では通常のimg要素に置換） |
| `reference/original-recipe-image.jpg` | 元のレシピ原稿画像（参考用） |

### Notes for the developer

- このプロトタイプは Babel standalone でブラウザ上で直接実行する形式。本番では適切なバンドラ（Vite, Next.js等）を使ってビルドしてください。
- 採用案は **「横並びリスト一覧 + タブ詳細 + タイマーなし料理中モード」** です。`variations.html` には他デザイン方向（Editorial / Bold / Dark Gourmet）の探索版もありますが、和モダン採用です。
- 「料理を はじめる」CTAから料理中モードへの遷移は実装済み（state遷移のみ）。実機ではここに `screen.wakeLock` API を組み込んでください。
- 一覧画面のタブバー（さがす／カテゴリ／お気に入り／マイページ）は表示のみで、他画面への遷移は未実装。実装時に各タブのルーティングを追加してください。
- 検索バーは表示のみ。実装時に入力フィールドと検索ロジックを追加してください。
- 評価★・件数は静的データ。実装時にAPIからの取得＋投稿機能を追加。
- `image-slot.js` は不要（本番では `<img src=...>` で置き換え）。
