// List screen — recipe browse / search
// Layout: hero feature card → category chips → grid of recipes

function ListScreen({ layout = 'grid', onOpenRecipe }) {
  const recipes = window.RECIPE_LIST;
  const featured = recipes.find(r => r.featured);
  const rest = recipes.filter(r => !r.featured);

  return (
    <div className="screen paper" style={{ height: '100%', overflow: 'auto', paddingBottom: 80 }}>
      <div style={{ height: 54 }} aria-hidden="true" />
      <AppHeader title="つくる帖" sub="TSUKURU—CHO" />

      {/* Greeting strip */}
      <div style={{ padding: '18px 18px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 22, color: C.sumi, letterSpacing: '0.04em', textWrap: 'pretty' }}>
            今日も、<span style={{ color: C.shu }}>丁寧に</span>。
          </div>
        </div>
        <div style={{ fontFamily: SANS, fontSize: 11, color: C.sumi3, marginTop: 4, letterSpacing: '0.05em' }}>
          2026年 2月 · 立春の頃合いの献立
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '8px 18px 14px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: C.kinari, border: `1px solid ${C.line}`,
          padding: '10px 14px', borderRadius: 999,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.sumi3} strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>
          <span style={{ fontFamily: SANS, fontSize: 12, color: C.muted }}>料理名・食材で探す</span>
          <span style={{ marginLeft: 'auto', fontFamily: SANS, fontSize: 10, color: C.muted, padding: '2px 6px', border: `1px solid ${C.line}`, borderRadius: 4 }}>絞り込み</span>
        </div>
      </div>

      {/* Category chips */}
      <div className="no-bar" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 18px 16px' }}>
        {[
          { label: 'すべて', active: true },
          { label: 'メイン' }, { label: '副菜' }, { label: '汁物' },
          { label: '主食' }, { label: '常備菜' }, { label: 'おやつ' },
        ].map((c, i) => (
          <span key={i} style={{
            flexShrink: 0,
            fontFamily: SERIF, fontSize: 12, fontWeight: 500,
            padding: '6px 14px', borderRadius: 99,
            background: c.active ? C.sumi : 'transparent',
            color: c.active ? C.washi : C.sumi2,
            border: `1px solid ${c.active ? C.sumi : C.line}`,
            letterSpacing: '0.1em',
          }}>{c.label}</span>
        ))}
      </div>

      {/* Featured card */}
      <div style={{ padding: '0 18px 24px' }} onClick={onOpenRecipe} role="button">
        <FeaturedCard r={featured} />
      </div>

      {/* Section heading */}
      <SectionTitle kanji="新" label="あたらしい献立" count={rest.length} />

      {/* Grid or list */}
      {layout === 'list' ? (
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {rest.map(r => <div key={r.id} onClick={onOpenRecipe} style={{ cursor: 'pointer' }}><ListRow r={r} /></div>)}
        </div>
      ) : (
        <div style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {rest.map(r => <GridCard key={r.id} r={r} />)}
        </div>
      )}

      {/* Footer line */}
      <div style={{ padding: '32px 18px 24px', textAlign: 'center', fontFamily: SERIF, fontSize: 10, color: C.muted, letterSpacing: '0.3em' }}>
        — 続きはまた、明日 —
      </div>

      <TabBar active={0} />
    </div>
  );
}

// Featured hero card — large image + title + meta
function FeaturedCard({ r }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 4, overflow: 'hidden',
      background: C.kinari, border: `1px solid ${C.line}`,
    }}>
      {/* Image — full bleed image-slot */}
      <div style={{ height: 220, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <HeroImage id="list-hero" label="soup_curry · main_photo" height={220} />
        </div>

        {/* Top-left ribbon */}
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 2,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{
            background: C.shu, color: C.washi,
            fontFamily: SERIF, fontSize: 11, fontWeight: 600,
            padding: '4px 10px', letterSpacing: '0.15em',
          }}>今月の一品</span>
        </div>

        {/* Bookmark */}
        <button style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          width: 34, height: 34, borderRadius: 99,
          background: 'rgba(250,246,236,0.92)', border: 'none', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.sumi} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>

        {/* Date stamp */}
        <div style={{
          position: 'absolute', top: 14, right: 56, zIndex: 2,
          fontFamily: SERIF, fontSize: 10, color: 'rgba(29,26,22,0.55)',
          background: 'rgba(250,246,236,0.85)', padding: '2px 8px', letterSpacing: '0.15em',
        }}>2026.2</div>
      </div>

      {/* Card body */}
      <div style={{ padding: '14px 16px 16px', background: C.washi }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Tag accent="shu" sm>スパイス</Tag>
          <Tag accent="tea" sm>メイン</Tag>
          <span style={{ marginLeft: 'auto', fontFamily: SANS, fontSize: 10, color: C.muted }}>5人分 · 90分＋一晩</span>
        </div>
        <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 22, color: C.sumi, letterSpacing: '0.04em', marginBottom: 2 }}>
          {r.title}
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 12, color: C.sumi3, lineHeight: 1.6 }}>
          {r.sub}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.line}` }}>
          <Stars value={r.rating} size={11} />
          <span style={{ fontFamily: SANS, fontSize: 11, color: C.sumi2, fontWeight: 600 }}>{r.rating}</span>
          <span style={{ fontFamily: SANS, fontSize: 10, color: C.muted }}>· {127}件の評価</span>
          <span style={{ marginLeft: 'auto', fontFamily: SERIF, fontSize: 11, color: C.shu, fontWeight: 600, letterSpacing: '0.1em' }}>
            つくる →
          </span>
        </div>
      </div>
    </div>
  );
}

// 2-col grid card (layout 0)
function GridCard({ r }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: 2, background: C.kinariDeep }}>
        <PhotoPlaceholder label={r.id} tone={r.accent} />
        {r.isNew && (
          <div style={{ position: 'absolute', top: 8, left: 8, background: C.washi, padding: '2px 6px', fontFamily: SERIF, fontSize: 9, color: C.shu, fontWeight: 600, letterSpacing: '0.15em' }}>新</div>
        )}
        <button style={{
          position: 'absolute', bottom: 6, right: 6,
          width: 26, height: 26, borderRadius: 99,
          background: 'rgba(250,246,236,0.92)', border: 'none', padding: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.sumi3} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: 'auto' }}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
      </div>
      <div style={{ paddingTop: 8 }}>
        <div style={{ fontFamily: SANS, fontSize: 9, color: accentColor(r.accent), letterSpacing: '0.15em', marginBottom: 2 }}>
          {r.tag.toUpperCase()} · {r.season}
        </div>
        <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 14, color: C.sumi, lineHeight: 1.35, letterSpacing: '0.02em' }}>
          {r.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <Stars value={r.rating} size={9} />
          <span style={{ fontFamily: SANS, fontSize: 10, color: C.sumi3 }}>{r.rating}</span>
          <span style={{ marginLeft: 'auto', fontFamily: SANS, fontSize: 9, color: C.muted }}>{r.time}</span>
        </div>
      </div>
    </div>
  );
}

// Horizontal row card (layout 1)
function ListRow({ r }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
      <div style={{ width: 100, height: 100, flexShrink: 0, overflow: 'hidden', borderRadius: 2 }}>
        <PhotoPlaceholder label={r.id} tone={r.accent} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 4 }}>
        <div>
          <div style={{ fontFamily: SANS, fontSize: 9, color: accentColor(r.accent), letterSpacing: '0.15em', marginBottom: 2 }}>
            {r.tag.toUpperCase()} · {r.season}
          </div>
          <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 16, color: C.sumi, lineHeight: 1.3, letterSpacing: '0.02em' }}>
            {r.title}
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 11, color: C.sumi3, marginTop: 3, lineHeight: 1.5 }}>
            {r.sub}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <Stars value={r.rating} size={10} />
          <span style={{ fontFamily: SANS, fontSize: 10, color: C.sumi3 }}>{r.rating}</span>
          <span style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginLeft: 4 }}>· {r.time}</span>
        </div>
      </div>
    </div>
  );
}

window.ListScreen = ListScreen;
