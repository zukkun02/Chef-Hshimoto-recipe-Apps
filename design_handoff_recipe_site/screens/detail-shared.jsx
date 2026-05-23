// Shared detail-page header (hero image + title + meta strip) used by all 3 detail variants.

function DetailHero({ scrollMini = false, onBack }) {
  const r = window.RECIPE_SOUP_CURRY;
  return (
    <div style={{ position: 'relative', background: C.washi }}>
      {/* Hero image */}
      <div style={{ height: 360, position: 'relative', overflow: 'hidden' }}>
        <HeroImage id="detail-hero" label="スープカレー · 完成写真" height={360} />

        {/* Floating header overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '54px 16px 14px',
          }}>
            <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(250,246,236,0.92)', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sumi} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(250,246,236,0.92)', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.sumi} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
              </button>
              <button style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(250,246,236,0.92)', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.sumi} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Date tategaki */}
        <div style={{
          position: 'absolute', right: 14, bottom: 14, zIndex: 5,
          background: 'rgba(29,26,22,0.7)', backdropFilter: 'blur(8px)',
          padding: '6px 10px',
          color: C.washi, fontFamily: SERIF, fontSize: 10, letterSpacing: '0.2em',
        }}>
          2026 . 2 ／ 5人分
        </div>
      </div>

      {/* Title block */}
      <div style={{ padding: '20px 18px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Tag accent="shu" sm filled>スパイス</Tag>
          <Tag accent="tea" sm>メイン</Tag>
          <Tag accent="moss" sm>作り置き</Tag>
        </div>
        <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 30, color: C.sumi, letterSpacing: '0.04em', lineHeight: 1.2 }}>
          {r.title}
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 13, color: C.sumi3, marginTop: 6, lineHeight: 1.7, letterSpacing: '0.02em' }}>
          {r.subtitle}
        </div>

        {/* Author + rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 99, background: C.kinariDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 11, color: C.tea, fontWeight: 600 }}>橋</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SERIF, fontSize: 12, fontWeight: 600, color: C.sumi, letterSpacing: '0.05em' }}>{r.author}</div>
            <div style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 1 }}>料理家 · 127品のレシピ</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
              <Stars value={r.rating} size={11} />
              <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: C.sumi }}>{r.rating}</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 9, color: C.muted, marginTop: 1 }}>{r.reviews}件</div>
          </div>
        </div>

        {/* Meta strip */}
        <div style={{
          display: 'flex', marginTop: 14, padding: '12px 0',
          borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
        }}>
          {[
            { label: '人数',   value: '5', unit: '人分' },
            { label: '調理',   value: '90', unit: '分＋一晩' },
            { label: '難易度', value: '★★★', unit: '' },
            { label: '材料',   value: '24', unit: '品' },
          ].map((m, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', borderLeft: i ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ fontFamily: SANS, fontSize: 9, color: C.muted, letterSpacing: '0.2em', marginBottom: 3 }}>{m.label}</div>
              <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 600, color: C.sumi }}>
                {m.value}<span style={{ fontSize: 9, color: C.sumi3, marginLeft: 1 }}>{m.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Author's note — pull quote */}
        <div style={{ marginTop: 16, padding: '12px 14px', background: C.kinari, borderLeft: `2px solid ${C.shu}` }}>
          <div style={{ fontFamily: SANS, fontSize: 9, color: C.shu, letterSpacing: '0.2em', marginBottom: 4 }}>作り手のコツ</div>
          <div style={{ fontFamily: SERIF, fontSize: 12, color: C.sumi2, lineHeight: 1.7, letterSpacing: '0.02em' }}>
            {r.note}
          </div>
        </div>
      </div>
    </div>
  );
}
window.DetailHero = DetailHero;


// ─────────────────────────────────────────────────────────────
// Detail content blocks — shared by all 3 variants
// ─────────────────────────────────────────────────────────────

function IngredientsBlock() {
  const r = window.RECIPE_SOUP_CURRY;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ fontFamily: SERIF, fontSize: 11, color: C.muted, letterSpacing: '0.2em' }}>5人分 / SERVINGS</div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', background: C.kinari, borderRadius: 99, padding: '2px 4px', border: `1px solid ${C.line}` }}>
          <button style={{ width: 22, height: 22, borderRadius: 99, background: 'transparent', border: 'none', fontFamily: SERIF, color: C.sumi3, fontSize: 14 }}>−</button>
          <span style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 600, color: C.sumi, padding: '0 8px' }}>5人</span>
          <button style={{ width: 22, height: 22, borderRadius: 99, background: C.shu, border: 'none', color: C.washi, fontSize: 14 }}>＋</button>
        </div>
      </div>

      {r.ingredients.map((grp, gi) => (
        <div key={gi} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
            <span style={{ fontFamily: SERIF, fontSize: 11, color: C.shu, fontWeight: 600, letterSpacing: '0.15em' }}>〈{grp.group}〉</span>
            <div style={{ flex: 1, height: 1, background: C.line }} />
          </div>
          {grp.items.map((it, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'baseline',
              padding: '7px 0', borderBottom: i < grp.items.length - 1 ? `1px dotted ${C.line}` : 'none',
              paddingLeft: it.sub ? 14 : 0,
            }}>
              {!it.sub && <input type="checkbox" style={{ marginRight: 8, accentColor: C.shu, width: 13, height: 13 }} />}
              <span style={{
                fontFamily: SERIF, fontSize: 13, color: it.sub ? C.sumi3 : C.sumi,
                letterSpacing: '0.02em', flex: 1,
              }}>{it.name}</span>
              <span className="tnum" style={{ fontFamily: SANS, fontSize: 12, color: C.sumi2, fontWeight: 500 }}>{it.amount}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
window.IngredientsBlock = IngredientsBlock;

function PrepBlock() {
  const r = window.RECIPE_SOUP_CURRY;
  return (
    <div>
      <div style={{ fontFamily: SERIF, fontSize: 11, color: C.muted, letterSpacing: '0.2em', marginBottom: 14 }}>5項目 / PREPARATION</div>
      {r.prep.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < r.prep.length - 1 ? `1px solid ${C.line}` : 'none' }}>
          <div style={{
            width: 24, height: 24, flexShrink: 0,
            border: `1px solid ${C.shu}`, color: C.shu,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: SERIF, fontSize: 11, fontWeight: 600,
          }}>{i+1}</div>
          <div style={{ flex: 1, fontFamily: SERIF, fontSize: 13, color: C.sumi, lineHeight: 1.7, letterSpacing: '0.02em', paddingTop: 2 }}>
            {p}
          </div>
        </div>
      ))}
    </div>
  );
}
window.PrepBlock = PrepBlock;

function StepsBlock({ compact = false }) {
  const r = window.RECIPE_SOUP_CURRY;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ fontFamily: SERIF, fontSize: 11, color: C.muted, letterSpacing: '0.2em' }}>7工程 / COOKING</div>
        <button style={{ marginLeft: 'auto', background: C.sumi, color: C.washi, border: 'none', borderRadius: 99, padding: '6px 14px', fontFamily: SERIF, fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          料理中モード
        </button>
      </div>
      {r.steps.map((s, i) => (
        <div key={i} style={{ position: 'relative', paddingLeft: 32, paddingBottom: i < r.steps.length - 1 ? 16 : 0, marginBottom: i < r.steps.length - 1 ? 16 : 0, borderBottom: i < r.steps.length - 1 ? `1px solid ${C.line}` : 'none' }}>
          {/* timeline marker */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: 22, height: 22, borderRadius: 99,
            background: C.shu, color: C.washi,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: SERIF, fontSize: 11, fontWeight: 600,
          }}>{i+1}</div>
          {i < r.steps.length - 1 && <div style={{ position: 'absolute', left: 10.5, top: 26, bottom: -16, width: 1, background: C.line }} />}

          <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 14, color: C.sumi, letterSpacing: '0.03em', marginBottom: 4 }}>
            {s.title}
          </div>
          {!compact && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: SANS, fontSize: 10, color: C.shu, letterSpacing: '0.1em' }}>⌛ {s.time}</span>
              <span style={{ fontFamily: SANS, fontSize: 10, color: C.tea, letterSpacing: '0.1em' }}>🔥 {s.heat}</span>
            </div>
          )}
          <div style={{ fontFamily: SERIF, fontSize: 12.5, color: C.sumi2, lineHeight: 1.75, letterSpacing: '0.02em' }}>
            {s.body}
          </div>
        </div>
      ))}
    </div>
  );
}
window.StepsBlock = StepsBlock;

function PlatingBlock() {
  const r = window.RECIPE_SOUP_CURRY;
  return (
    <div>
      {/* Side veggies */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
          <span style={{ fontFamily: SERIF, fontSize: 12, color: C.shu, fontWeight: 600, letterSpacing: '0.15em' }}>〈付け合わせのお野菜〉</span>
          <div style={{ flex: 1, height: 1, background: C.line }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', padding: '6px 0', borderBottom: `1px dotted ${C.line}` }}>
          <span style={{ fontFamily: SERIF, fontSize: 13, color: C.sumi, flex: 1 }}>茹で卵</span>
          <span style={{ fontFamily: SANS, fontSize: 11, color: C.sumi3 }}>沸騰後 6〜7分</span>
        </div>
        <div style={{ padding: '8px 0' }}>
          <div style={{ fontFamily: SANS, fontSize: 10, color: C.muted, letterSpacing: '0.15em', marginBottom: 6 }}>素揚げ</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {r.sides.fried.map((v, i) => (
              <span key={i} style={{
                fontFamily: SERIF, fontSize: 12, color: C.sumi,
                background: C.kinari, padding: '4px 10px', border: `1px solid ${C.line}`,
                letterSpacing: '0.05em',
              }}>{v}</span>
            ))}
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 11, color: C.sumi3, marginTop: 8, lineHeight: 1.6 }}>
            → それぞれ下ごしらえし、素揚げする
          </div>
        </div>
      </div>

      {/* Rice */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
          <span style={{ fontFamily: SERIF, fontSize: 12, color: C.shu, fontWeight: 600, letterSpacing: '0.15em' }}>〈雑穀ごはん〉</span>
          <div style={{ flex: 1, height: 1, background: C.line }} />
        </div>
        {r.rice.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', padding: '6px 0', borderBottom: i < r.rice.items.length-1 ? `1px dotted ${C.line}` : 'none' }}>
            <span style={{ fontFamily: SERIF, fontSize: 13, color: C.sumi, flex: 1 }}>{it.name}</span>
            <span className="tnum" style={{ fontFamily: SANS, fontSize: 12, color: C.sumi2, fontWeight: 500 }}>{it.amount}</span>
          </div>
        ))}
        <div style={{ fontFamily: SERIF, fontSize: 11.5, color: C.sumi2, marginTop: 8, lineHeight: 1.75, padding: '8px 10px', background: C.kinari, borderLeft: `2px solid ${C.tea}` }}>
          {r.rice.method}
        </div>
      </div>

      {/* Plating */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
          <span style={{ fontFamily: SERIF, fontSize: 12, color: C.shu, fontWeight: 600, letterSpacing: '0.15em' }}>〈盛り付け〉</span>
          <div style={{ flex: 1, height: 1, background: C.line }} />
        </div>
        <div style={{
          background: C.kinari, padding: '14px 16px',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {r.plating.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ width: 16, color: C.shu, fontFamily: SERIF, fontSize: 10, fontWeight: 600 }}>{String(i+1).padStart(2,'0')}</span>
              <span style={{ flex: 1, fontFamily: SERIF, fontSize: 12.5, color: C.sumi }}>{it.name}</span>
              <span className="tnum" style={{ fontFamily: SANS, fontSize: 11, color: C.sumi3 }}>{it.amount}</span>
            </div>
          ))}
          <div style={{ marginTop: 6, paddingTop: 8, borderTop: `1px dotted ${C.line}`, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {r.plating.extras.map((e, i) => (
              <span key={i} style={{ fontFamily: SANS, fontSize: 10, color: C.sumi3, letterSpacing: '0.1em' }}>{e}{i < r.plating.extras.length-1 ? ' ／' : ''}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Freezer */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
          <span style={{ fontFamily: SERIF, fontSize: 12, color: C.shu, fontWeight: 600, letterSpacing: '0.15em' }}>〈冷凍販売〉</span>
          <div style={{ flex: 1, height: 1, background: C.line }} />
        </div>
        <div style={{ background: C.sumi, color: C.washi, padding: '14px 16px' }}>
          {r.freezer.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', padding: '4px 0', borderBottom: i < r.freezer.items.length-1 ? '1px dotted rgba(250,246,236,0.2)' : 'none' }}>
              <span style={{ fontFamily: SERIF, fontSize: 12.5, color: C.washi, flex: 1 }}>{it.name}</span>
              <span className="tnum" style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(250,246,236,0.7)' }}>{it.amount}</span>
            </div>
          ))}
          <div style={{ fontFamily: SANS, fontSize: 10, color: 'rgba(250,246,236,0.6)', marginTop: 8, letterSpacing: '0.1em' }}>
            * オンラインショップでもお求めいただけます
          </div>
        </div>
      </div>
    </div>
  );
}
window.PlatingBlock = PlatingBlock;
