/**
 * Happy Food レシピ公開エージェント
 * Notion Webhook を受けて → Notion ページ取得 → JSON 整形 → GitHub commit
 *
 * Web App としてデプロイし、Notion Automation の Webhook URL に設定する。
 */
const PROPS = PropertiesService.getScriptProperties();

function doPost(e) {
  try {
    const body = e.postData ? JSON.parse(e.postData.contents) : {};

    // 1. シグネチャ検証（URL query > body の優先で受け取る）
    const providedSecret = (e.parameter && e.parameter.secret) || body.secret;
    if (providedSecret !== PROPS.getProperty('WEBHOOK_SECRET')) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    // 2. ページID取得（Notion Automation の body.data.id を含む複数形式に対応）
    const pageId = (e.parameter && e.parameter.page_id)
      || body.page_id
      || (body.data && body.data.id)
      || body.id;
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
 *
 * Notion の files プロパティは upload 完了まで非同期で反映が遅れるため、
 * GAS が読みに行く前に少し待ち、画像が見えるまで最大 3 回までリトライする。
 * これで「ボタン押下時の最新画像」がほぼ確実に取得できる。
 */
function publishRecipe(pageId) {
  // ① 初回待機（Notion の file upload が API に反映される時間）
  Utilities.sleep(6000);

  let page = notionGetPage(pageId);
  let recipe = parseRecipe(page);

  if (!recipe.slug) {
    throw new Error('slug is empty — cannot publish without slug');
  }

  // ② 公開判定だけは最初の取得で確定（status は file upload とは独立して即時反映される）
  if (recipe.status === '非公開') {
    githubDeleteFile(`data/recipes/${recipe.slug}.json`);
    regenerateIndex();
    return { slug: recipe.slug, action: 'unpublished' };
  }

  if (recipe.status !== '公開') {
    return { slug: recipe.slug, action: 'noop' };
  }

  // ③ 画像が見えるまでポーリング（最大 +12 秒）。最終的に見えなくても続行
  for (let i = 0; i < 3 && (!recipe.image_urls || recipe.image_urls.length === 0); i++) {
    Logger.log(`image not yet visible (try ${i + 1}), retrying after 4s`);
    Utilities.sleep(4000);
    page = notionGetPage(pageId);
    recipe = parseRecipe(page);
  }

  const imagePath = mirrorImage(recipe);
  if (imagePath) recipe.image = imagePath;
  delete recipe.image_urls;
  delete recipe.status;
  githubUpsertJSON(`data/recipes/${recipe.slug}.json`, recipe);
  regenerateIndex();
  return { slug: recipe.slug, action: 'published', image: imagePath };
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
      // GitHub Contents API（raw.github は CDN キャッシュで stale データになるため使わない）
      const recipe = githubGetJSON(`data/recipes/${fn}`);
      if (!recipe) continue;
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
