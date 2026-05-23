/**
 * Happy Food レシピ公開エージェント
 * Notion Webhook を受けて → Notion ページ取得 → JSON 整形 → GitHub commit
 *
 * Web App としてデプロイし、Notion Automation の Webhook URL に設定する。
 */
const PROPS = PropertiesService.getScriptProperties();

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    // 1. シグネチャ検証
    if (body.secret !== PROPS.getProperty('WEBHOOK_SECRET')) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    const pageId = body.page_id || body.data?.id;
    if (!pageId) throw new Error('page_id missing');

    // 2. メインフロー
    const result = publishRecipe(pageId);

    // 3. Notion に公開日時を書き戻し（公開時のみ）
    if (result.action === 'published') {
      notionWritePublishedAt(pageId, new Date().toISOString());
    }

    return jsonResponse({ ok: true, slug: result.slug, action: result.action });
  } catch (err) {
    notifyError(err);
    return jsonResponse({ ok: false, error: err.message });
  }
}

/**
 * メイン処理：Notion ページからレシピを構築し、ステータスに応じて公開/非公開
 */
function publishRecipe(pageId) {
  const page = notionGetPage(pageId);
  const recipe = parseRecipe(page);

  if (!recipe.slug) {
    throw new Error('slug is empty — cannot publish without slug');
  }

  if (recipe.status === '公開') {
    const imagePath = mirrorImage(recipe);
    if (imagePath) recipe.image = imagePath;
    delete recipe.image_urls;
    delete recipe.status;
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

/**
 * 画像ミラー処理：Notion の signed URL から GitHub にコピー
 */
function mirrorImage(recipe) {
  if (!recipe.image_urls || recipe.image_urls.length === 0) return null;
  const url = recipe.image_urls[0];
  try {
    const blob = UrlFetchApp.fetch(url).getBlob();
    const ct = blob.getContentType() || '';
    const ext = (ct.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
    const path = `public/images/${recipe.slug}/main.${ext}`;
    githubUpsertImage(path, blob);
    return `/public/images/${recipe.slug}/main.${ext}`;
  } catch (err) {
    Logger.log(`mirrorImage failed: ${err.message}`);
    return null;
  }
}

/**
 * 個別レシピ JSON を全部読んで index.json を再生成
 */
function regenerateIndex() {
  const files = githubListJSON('data/recipes');
  const recipes = [];
  for (const fn of files) {
    if (fn === '.gitkeep' || !fn.endsWith('.json')) continue;
    try {
      const url = `https://raw.githubusercontent.com/${GH_REPO}/${GH_BRANCH}/data/recipes/${fn}`;
      const r = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      if (r.getResponseCode() !== 200) continue;
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
    } catch (err) {
      Logger.log(`regenerateIndex: skip ${fn} (${err.message})`);
    }
  }
  recipes.sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''));
  githubUpsertJSON('data/index.json', {
    updated_at: new Date().toISOString(),
    count: recipes.length,
    recipes: recipes
  });
}

/**
 * GAS エディタで手動テスト用
 */
function testPublishRecipe() {
  const result = publishRecipe('6dac3b6e-82b8-4144-8cdc-244faa1e5347'); // 海老マヨ
  Logger.log(JSON.stringify(result, null, 2));
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function notifyError(err) {
  const email = PROPS.getProperty('NOTIFY_EMAIL');
  if (email) {
    try {
      MailApp.sendEmail({
        to: email,
        subject: '[Happy Food] 公開処理エラー',
        body: `${err.message}\n\n${err.stack || ''}`
      });
    } catch (_) {}
  }
  Logger.log(err);
}
