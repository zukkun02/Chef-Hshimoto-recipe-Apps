/**
 * Notion API クライアント
 * - ページ取得
 * - レシピプロパティ整形
 * - 公開日時の書き戻し
 */
const NOTION_API_VERSION = '2025-09-03';

function notionGetPage(pageId) {
  const r = UrlFetchApp.fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    headers: {
      'Authorization': `Bearer ${PROPS.getProperty('NOTION_TOKEN')}`,
      'Notion-Version': NOTION_API_VERSION
    },
    muteHttpExceptions: true
  });
  if (r.getResponseCode() !== 200) {
    throw new Error(`notionGetPage failed: ${r.getResponseCode()} ${r.getContentText().slice(0, 200)}`);
  }
  return JSON.parse(r.getContentText());
}

/**
 * Notion page → recipe object 変換
 * プロパティ名は Phase 1 で確定した 21 プロパティに対応
 */
function parseRecipe(page) {
  const p = page.properties;
  const getRT = (name) => (p[name]?.rich_text || []).map(x => x.plain_text).join('');
  const getTitle = (name) => (p[name]?.title || []).map(x => x.plain_text).join('');
  const getSelect = (name) => p[name]?.select?.name || null;
  const getMSelect = (name) => (p[name]?.multi_select || []).map(x => x.name);
  const getNum = (name) => p[name]?.number ?? null;
  const getDate = (name) => p[name]?.date?.start || null;
  const getURL = (name) => p[name]?.url || null;
  const getFiles = (name) => (p[name]?.files || [])
    .map(f => f.file?.url || f.external?.url)
    .filter(Boolean);

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
    source_year_month: (getDate('原典作成年月') || '').slice(0, 7) || null,
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
      'Notion-Version': NOTION_API_VERSION
    },
    payload: JSON.stringify({
      properties: {
        '公開日時': { date: { start: isoTimestamp } }
      }
    }),
    muteHttpExceptions: true
  });
}
