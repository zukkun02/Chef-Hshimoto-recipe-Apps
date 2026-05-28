/**
 * GitHub Contents API クライアント
 * - PUT (create/update)
 * - DELETE
 * - LIST
 */
const GH_REPO = 'zukkun02/Chef-Hshimoto-recipe-Apps';
const GH_BRANCH = 'main';

function githubHeaders() {
  return {
    'Authorization': `Bearer ${PROPS.getProperty('GITHUB_TOKEN')}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'happy-food-recipes-gas',
    'X-GitHub-Api-Version': '2022-11-28'
  };
}

function githubUpsertJSON(path, obj) {
  const content = Utilities.base64Encode(
    Utilities.newBlob(JSON.stringify(obj, null, 2)).getBytes()
  );
  return githubPutFile(path, content, `chore(notion): publish ${obj.slug || path}`);
}

function githubUpsertImage(path, blob) {
  const content = Utilities.base64Encode(blob.getBytes());
  return githubPutFile(path, content, `chore(notion): mirror image ${path}`);
}

function githubPutFile(path, base64content, message) {
  const url = `https://api.github.com/repos/${GH_REPO}/contents/${path}`;

  // 既存ファイルの SHA を取得（無ければ新規）
  let sha = null;
  try {
    const head = UrlFetchApp.fetch(`${url}?ref=${GH_BRANCH}`, {
      headers: githubHeaders(),
      muteHttpExceptions: true
    });
    if (head.getResponseCode() === 200) {
      sha = JSON.parse(head.getContentText()).sha;
    }
  } catch (_) {}

  const body = {
    message: message,
    content: base64content,
    branch: GH_BRANCH
  };
  if (sha) body.sha = sha;

  const r = UrlFetchApp.fetch(url, {
    method: 'put',
    contentType: 'application/json',
    headers: githubHeaders(),
    payload: JSON.stringify(body),
    muteHttpExceptions: true
  });

  if (r.getResponseCode() >= 300) {
    throw new Error(`githubPutFile ${path} failed: ${r.getResponseCode()} ${r.getContentText().slice(0, 300)}`);
  }
  return r;
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
    .filter(f => f.type === 'file' && f.name.endsWith('.json'))
    .map(f => f.name);
}

/**
 * Fetch a JSON file via GitHub Contents API (always fresh, no CDN cache).
 * Returns parsed JSON or null on failure.
 */
function githubGetJSON(path) {
  const url = `https://api.github.com/repos/${GH_REPO}/contents/${path}?ref=${GH_BRANCH}`;
  const r = UrlFetchApp.fetch(url, { headers: githubHeaders(), muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return null;
  const meta = JSON.parse(r.getContentText());
  if (meta.encoding !== 'base64' || !meta.content) return null;
  // base64 decode → JSON
  const decoded = Utilities.newBlob(Utilities.base64Decode(meta.content)).getDataAsString('UTF-8');
  return JSON.parse(decoded);
}
