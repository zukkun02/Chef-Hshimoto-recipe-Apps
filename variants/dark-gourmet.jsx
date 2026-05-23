// Direction 3 — Dark Gourmet
// Inspired by Bon Appétit / Saveur / Eater / dark food blogs.
// Near-black BG, warm gold accent, large food photography, magazine-y headers.
// Playfair Display (serif) + DM Sans (sans).

const DG = {
  bg:    '#0e0d0c',
  bg2:   '#1a1815',
  panel: '#161412',
  ink:   '#f4ede0',
  ink2:  '#c9c1b1',
  mute:  '#827c70',
  rule:  '#2a2622',
  gold:  '#c9a961',
  goldDeep: '#8a7038',
  rose:  '#d4756e',
};
const DG_DISPLAY = "'Playfair Display', 'Times New Roman', serif";
const DG_BODY    = "'DM Sans', system-ui, sans-serif";

function DGPlaceholder({ label, tone = 'warm' }) {
  const tones = {
    warm: '#3a2a20', deep: '#2a1a14', moss: '#27302a', ember: '#3a1f17', amber: '#3d2a17',
  };
  const bg = tones[tone] || '#2a1f18';
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      backgroundImage: `radial-gradient(ellipse at 35% 30%, rgba(201,169,97,0.18) 0, transparent 55%),
                        radial-gradient(ellipse at 75% 75%, rgba(212,117,110,0.12) 0, transparent 55%),
                        repeating-linear-gradient(50deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 14px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      <span style={{
        fontFamily: 'ui-monospace, monospace', fontSize: 9, letterSpacing: '0.3em',
        color: 'rgba(244,237,224,0.45)', padding: '3px 10px',
        background: 'rgba(14,13,12,0.55)', textTransform: 'uppercase',
      }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LIST
// ─────────────────────────────────────────────────────────────
function GourmetList() {
  const recipes = window.RECIPE_LIST;
  const featured = recipes.find(r => r.featured);
  const rest = recipes.filter(r => !r.featured);

  return (
    <div className="screen" style={{ height: '100%', overflow: 'auto', background: DG.bg, fontFamily: DG_BODY, color: DG.ink, paddingBottom: 80 }}>
      <div style={{ height: 54 }} aria-hidden />

      {/* Masthead — magazine */}
      <header style={{ padding: '12px 22px 16px', borderBottom: `1px solid ${DG.rule}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: DG_BODY, fontSize: 9, fontWeight: 600, letterSpacing: '0.4em', color: DG.gold, textTransform: 'uppercase' }}>
              The Hashimoto Table
            </div>
            <div style={{ fontFamily: DG_DISPLAY, fontWeight: 700, fontSize: 38, color: DG.ink, letterSpacing: '-0.01em', lineHeight: 0.95, marginTop: 4, fontStyle: 'italic' }}>
              Appetit
            </div>
            <div style={{ fontFamily: DG_BODY, fontSize: 9, letterSpacing: '0.3em', color: DG.mute, textTransform: 'uppercase', marginTop: 4 }}>
              Vol. 14 · Feb 2026 · ¥0
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, paddingTop: 6 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DG.ink} strokeWidth="1.4" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DG.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1"/></svg>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <div style={{ background: DG.gold, color: DG.bg, padding: '6px 22px', fontFamily: DG_BODY, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <span style={{ flexShrink: 0 }}>● 立春の献立</span>
        <span style={{ opacity: 0.6 }}>—</span>
        <span style={{ flexShrink: 0 }}>新作 8品</span>
        <span style={{ opacity: 0.6 }}>—</span>
        <span style={{ flexShrink: 0 }}>橋本先生コラム公開中</span>
      </div>

      {/* Cover story — large image, title overlaid */}
      <article style={{ position: 'relative' }}>
        <div style={{ aspectRatio: '3 / 4', position: 'relative', overflow: 'hidden' }}>
          <DGPlaceholder label="cover · soup curry" tone="ember" />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(14,13,12,0.5) 75%, rgba(14,13,12,0.95) 100%)',
          }} />
          {/* Issue tag — vertical */}
          <div style={{
            position: 'absolute', top: 20, right: 16,
            writingMode: 'vertical-rl', textOrientation: 'mixed',
            fontFamily: DG_BODY, fontSize: 9, fontWeight: 600, letterSpacing: '0.4em',
            color: DG.gold, textTransform: 'uppercase',
            background: 'rgba(14,13,12,0.4)', padding: '8px 4px',
            backdropFilter: 'blur(8px)',
          }}>
            Cover Story №01
          </div>
          {/* Title block bottom */}
          <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22 }}>
            <div style={{ fontFamily: DG_BODY, fontSize: 10, letterSpacing: '0.35em', color: DG.gold, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>
              The recipe of the month
            </div>
            <h1 style={{
              fontFamily: DG_DISPLAY, fontWeight: 700, fontSize: 42, lineHeight: 0.95,
              letterSpacing: '-0.01em', color: DG.ink, margin: 0, textWrap: 'balance', fontStyle: 'italic',
            }}>
              {featured.title}
            </h1>
            <div style={{ fontFamily: DG_DISPLAY, fontSize: 16, fontStyle: 'italic', color: DG.ink2, marginTop: 6, letterSpacing: 0 }}>
              {featured.sub}
            </div>
          </div>
        </div>

        {/* Dek + byline */}
        <div style={{ padding: '20px 22px 24px', background: DG.bg }}>
          <p style={{ fontFamily: DG_DISPLAY, fontSize: 14, fontStyle: 'italic', color: DG.ink2, lineHeight: 1.65, margin: 0, letterSpacing: '0.005em' }}>
            "ホールスパイスから立ち上げる、芯まで温まる一皿。一晩寝かせて深まる、橋本先生の代表作。"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, paddingTop: 16, borderTop: `1px solid ${DG.rule}` }}>
            <div style={{ fontFamily: DG_BODY, fontSize: 9, letterSpacing: '0.3em', color: DG.mute, textTransform: 'uppercase', fontWeight: 600 }}>
              Recipe by
            </div>
            <div style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontWeight: 500, fontSize: 16, color: DG.ink }}>
              Hashimoto<span style={{ color: DG.gold }}>—</span>Sensei
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontFamily: DG_BODY, fontSize: 11, color: DG.gold, fontWeight: 600 }}>
              <span>★ {featured.rating}</span>
            </div>
          </div>
          <button style={{
            marginTop: 18, padding: '14px 20px', width: '100%',
            background: 'transparent', border: `1px solid ${DG.gold}`, color: DG.gold,
            fontFamily: DG_BODY, fontWeight: 600, fontSize: 11,
            letterSpacing: '0.35em', textTransform: 'uppercase', cursor: 'pointer',
          }}>
            Open the recipe →
          </button>
        </div>
      </article>

      {/* Section title */}
      <div style={{ padding: '32px 22px 18px' }}>
        <div style={{ fontFamily: DG_BODY, fontSize: 9, letterSpacing: '0.4em', color: DG.gold, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>
          In this issue
        </div>
        <h2 style={{ fontFamily: DG_DISPLAY, fontWeight: 700, fontStyle: 'italic', fontSize: 28, color: DG.ink, margin: 0, letterSpacing: '-0.005em' }}>
          The Archive.
        </h2>
        <div style={{ height: 1, background: `linear-gradient(to right, ${DG.gold}, transparent)`, marginTop: 14 }} />
      </div>

      {/* Articles — magazine row style */}
      <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {rest.map((r, i) => (
          <article key={r.id} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16 }}>
            <div style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}>
              <DGPlaceholder label={r.id.slice(0,5)} tone={['warm','ember','moss','amber','deep'][i % 5]} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 4 }}>
              <div>
                <div style={{ fontFamily: DG_BODY, fontSize: 9, letterSpacing: '0.3em', color: DG.gold, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
                  {r.tag} · N°{String(i + 2).padStart(2, '0')}
                </div>
                <h3 style={{
                  fontFamily: DG_DISPLAY, fontWeight: 700, fontSize: 19, lineHeight: 1.15,
                  color: DG.ink, margin: 0, letterSpacing: '-0.005em', fontStyle: 'italic',
                }}>
                  {r.title}
                </h3>
                <p style={{ fontFamily: DG_BODY, fontSize: 11.5, color: DG.ink2, marginTop: 6, lineHeight: 1.55, margin: '6px 0 0' }}>
                  {r.sub}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${DG.rule}` }}>
                <span style={{ fontFamily: DG_BODY, fontSize: 10, color: DG.gold, fontWeight: 600 }}>★ {r.rating}</span>
                <span style={{ fontFamily: DG_BODY, fontSize: 10, color: DG.mute }}>·</span>
                <span style={{ fontFamily: DG_BODY, fontSize: 10, color: DG.mute }}>{r.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '40px 22px 16px' }}>
        <div style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 14, color: DG.gold, letterSpacing: '0.08em' }}>
          · Fin ·
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DETAIL — tabs
// ─────────────────────────────────────────────────────────────
function GourmetDetail() {
  const [tab, setTab] = React.useState(0);
  const r = window.RECIPE_SOUP_CURRY;
  const tabs = ['INGREDIENTS', 'PREP', 'METHOD', 'PLATING'];

  return (
    <div className="screen" style={{ height: '100%', overflow: 'auto', background: DG.bg, fontFamily: DG_BODY, color: DG.ink, position: 'relative' }}>
      {/* Hero — full bleed */}
      <div style={{ height: 460, position: 'relative', overflow: 'hidden' }}>
        <DGPlaceholder label="soup curry · hero" tone="ember" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(14,13,12,0.5) 0%, transparent 25%, transparent 60%, rgba(14,13,12,0.95) 100%)',
        }} />

        <div style={{ position: 'absolute', top: 54, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <button style={iconBtn()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DG.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={iconBtn()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DG.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
            </button>
            <button style={iconBtn()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DG.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            </button>
          </div>
        </div>

        {/* Title at bottom of hero */}
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 24 }}>
          <div style={{
            display: 'inline-block', padding: '4px 10px', marginBottom: 14,
            border: `1px solid ${DG.gold}`, color: DG.gold,
            fontFamily: DG_BODY, fontSize: 9, fontWeight: 600,
            letterSpacing: '0.3em', textTransform: 'uppercase',
          }}>
            Cover Story · February
          </div>
          <h1 style={{
            fontFamily: DG_DISPLAY, fontWeight: 700, fontStyle: 'italic',
            fontSize: 46, lineHeight: 0.95, letterSpacing: '-0.01em',
            color: DG.ink, margin: 0, textWrap: 'balance',
          }}>
            {r.title}
          </h1>
          <p style={{ fontFamily: DG_DISPLAY, fontSize: 14, fontStyle: 'italic', color: DG.ink2, margin: '8px 0 0', lineHeight: 1.5, letterSpacing: '0.005em' }}>
            {r.subtitle}
          </p>
        </div>
      </div>

      {/* Byline + meta */}
      <div style={{ padding: '22px 22px 18px', borderBottom: `1px solid ${DG.rule}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 99, border: `1px solid ${DG.gold}`, color: DG.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 14, fontWeight: 600 }}>
            H
          </div>
          <div>
            <div style={{ fontFamily: DG_BODY, fontSize: 9, letterSpacing: '0.3em', color: DG.mute, fontWeight: 600, textTransform: 'uppercase' }}>By</div>
            <div style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 15, color: DG.ink, marginTop: 1 }}>橋本先生</div>
          </div>
          <span style={{ marginLeft: 'auto', fontFamily: DG_BODY, fontSize: 11, color: DG.gold, fontWeight: 600, letterSpacing: '0.05em' }}>
            ★ {r.rating} <span style={{ color: DG.mute, fontWeight: 500 }}>· {r.reviews}</span>
          </span>
        </div>

        {/* Meta — magazine spec sheet */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 20, paddingTop: 16, borderTop: `1px solid ${DG.rule}` }}>
          {[
            { l: 'Serves', n: '5' },
            { l: 'Active', n: '90', u: 'min' },
            { l: 'Total',  n: '1', u: 'night+' },
            { l: 'Skill',  n: '3', u: '/5' },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: 'center', borderLeft: i ? `1px solid ${DG.rule}` : 'none' }}>
              <div style={{ fontFamily: DG_DISPLAY, fontWeight: 700, fontSize: 24, color: DG.gold, lineHeight: 1 }}>
                {m.n}{m.u && <span style={{ fontStyle: 'italic', fontSize: 10, color: DG.mute, marginLeft: 2, fontWeight: 400 }}>{m.u}</span>}
              </div>
              <div style={{ fontFamily: DG_BODY, fontSize: 8, letterSpacing: '0.3em', color: DG.mute, marginTop: 4, fontWeight: 600, textTransform: 'uppercase' }}>
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ position: 'sticky', top: 0, background: DG.bg, zIndex: 8, borderBottom: `1px solid ${DG.rule}` }}>
        <div className="no-bar" style={{ display: 'flex', overflowX: 'auto', padding: '0 22px' }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              flexShrink: 0, padding: '14px 16px 12px', marginRight: 4,
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: DG_BODY, fontWeight: 600, fontSize: 10,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: i === tab ? DG.gold : DG.mute,
              borderBottom: i === tab ? `2px solid ${DG.gold}` : '2px solid transparent',
            }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px 22px 120px' }}>
        {tab === 0 && <GourmetIngredients r={r} />}
        {tab === 1 && <GourmetPrep r={r} />}
        {tab === 2 && <GourmetMethod r={r} />}
        {tab === 3 && <GourmetServe r={r} />}
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(14,13,12,0.95)', backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${DG.rule}`, padding: '14px 20px 30px',
        display: 'flex', gap: 10,
      }}>
        <button style={{
          flex: 1, padding: '14px 0',
          background: DG.gold, color: DG.bg, border: 'none',
          fontFamily: DG_BODY, fontWeight: 700, fontSize: 11,
          letterSpacing: '0.35em', textTransform: 'uppercase', cursor: 'pointer',
        }}>
          Begin · Let's cook
        </button>
      </div>
    </div>
  );
}

const iconBtn = () => ({
  width: 36, height: 36, borderRadius: 99,
  background: 'rgba(14,13,12,0.55)', backdropFilter: 'blur(12px)',
  border: `1px solid ${DG.rule}`, padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
});

function GourmetIngredients({ r }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22 }}>
        <div style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 20, color: DG.gold }}>
          For 5 servings
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={{ width: 26, height: 26, border: `1px solid ${DG.rule}`, background: 'transparent', color: DG.ink, cursor: 'pointer', fontFamily: DG_DISPLAY }}>−</button>
          <span style={{ padding: '0 10px', fontFamily: DG_DISPLAY, fontSize: 15 }}>5</span>
          <button style={{ width: 26, height: 26, border: `1px solid ${DG.gold}`, background: DG.gold, color: DG.bg, cursor: 'pointer', fontFamily: DG_DISPLAY }}>+</button>
        </div>
      </div>
      {r.ingredients.map((g, i) => (
        <section key={i} style={{ marginBottom: 26 }}>
          <h3 style={{
            fontFamily: DG_BODY, fontSize: 10, fontWeight: 600,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: DG.gold, margin: '0 0 10px',
            paddingBottom: 8, borderBottom: `1px solid ${DG.rule}`,
          }}>
            {g.group}
          </h3>
          {g.items.map((it, j) => (
            <label key={j} style={{
              display: 'flex', alignItems: 'baseline', gap: 12,
              padding: '11px 0',
              paddingLeft: it.sub ? 16 : 0,
              borderBottom: j < g.items.length - 1 ? `1px solid ${DG.rule}` : 'none',
              cursor: 'pointer',
            }}>
              {!it.sub ? <span style={{
                width: 14, height: 14, border: `1px solid ${DG.gold}`, flexShrink: 0,
              }} /> : <span style={{ width: 14 }} />}
              <span style={{ flex: 1, fontFamily: DG_DISPLAY, fontSize: 14.5, color: it.sub ? DG.mute : DG.ink, letterSpacing: '0.005em' }}>{it.name}</span>
              <span style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 13, color: DG.gold, fontVariantNumeric: 'tabular-nums' }}>{it.amount}</span>
            </label>
          ))}
        </section>
      ))}
    </div>
  );
}

function GourmetPrep({ r }) {
  return (
    <div>
      <div style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 20, color: DG.gold, marginBottom: 18 }}>
        Mise en place
      </div>
      {r.prep.map((p, i) => (
        <article key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16, padding: '16px 0', borderBottom: i < r.prep.length - 1 ? `1px solid ${DG.rule}` : 'none' }}>
          <div style={{ fontFamily: DG_DISPLAY, fontWeight: 700, fontStyle: 'italic', fontSize: 32, color: DG.gold, lineHeight: 0.85 }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <p style={{ fontFamily: DG_DISPLAY, fontSize: 14.5, color: DG.ink, lineHeight: 1.7, margin: 0, letterSpacing: '0.005em' }}>
            {p}
          </p>
        </article>
      ))}
    </div>
  );
}

function GourmetMethod({ r }) {
  return (
    <div>
      <div style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 20, color: DG.gold, marginBottom: 18 }}>
        The Method
      </div>
      {r.steps.map((s, i) => (
        <article key={i} style={{ marginBottom: 24, paddingBottom: 22, borderBottom: i < r.steps.length - 1 ? `1px solid ${DG.rule}` : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: DG_DISPLAY, fontWeight: 700, fontStyle: 'italic', fontSize: 30, color: DG.gold, lineHeight: 0.9 }}>
              N° {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ flex: 1, height: 1, background: DG.rule }} />
            <span style={{ fontFamily: DG_BODY, fontSize: 9, letterSpacing: '0.3em', color: DG.mute, textTransform: 'uppercase', fontWeight: 600 }}>
              {s.time}
            </span>
          </div>
          <h4 style={{
            fontFamily: DG_DISPLAY, fontWeight: 700, fontSize: 20, lineHeight: 1.2,
            color: DG.ink, margin: '0 0 6px', letterSpacing: '-0.005em',
          }}>
            {s.title}
          </h4>
          <div style={{ fontFamily: DG_BODY, fontSize: 9, color: DG.rose, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 10 }}>
            ◆ {s.heat}
          </div>
          <p style={{ fontFamily: DG_DISPLAY, fontSize: 14.5, color: DG.ink2, lineHeight: 1.7, margin: 0, letterSpacing: '0.005em' }}>
            {s.body}
          </p>
        </article>
      ))}
    </div>
  );
}

function GourmetServe({ r }) {
  const sectionTitle = (en) => ({
    fontFamily: DG_BODY, fontSize: 10, fontWeight: 600,
    letterSpacing: '0.35em', textTransform: 'uppercase',
    color: DG.gold, margin: '0 0 12px',
    paddingBottom: 8, borderBottom: `1px solid ${DG.rule}`,
  });

  return (
    <div>
      <section style={{ marginBottom: 26 }}>
        <h3 style={sectionTitle()}>The Accompaniments</h3>
        <div style={{ fontFamily: DG_DISPLAY, fontSize: 15, color: DG.ink, lineHeight: 1.8, letterSpacing: '0.005em' }}>
          {r.sides.fried.map((v, i) => (
            <span key={i}>
              {v}{i < r.sides.fried.length - 1 && <span style={{ color: DG.gold, margin: '0 6px' }}>·</span>}
            </span>
          ))}
        </div>
        <p style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 12.5, color: DG.mute, marginTop: 10, lineHeight: 1.6 }}>
          {r.sides.note}。 {r.sides.egg.name} — {r.sides.egg.detail}.
        </p>
      </section>

      <section style={{ marginBottom: 26 }}>
        <h3 style={sectionTitle()}>The Rice</h3>
        {r.rice.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? `1px solid ${DG.rule}` : 'none' }}>
            <span style={{ fontFamily: DG_DISPLAY, fontSize: 14 }}>{it.name}</span>
            <span style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 13, color: DG.gold }}>{it.amount}</span>
          </div>
        ))}
        <p style={{ fontFamily: DG_DISPLAY, fontSize: 13, color: DG.ink2, marginTop: 10, lineHeight: 1.7, letterSpacing: '0.005em' }}>
          {r.rice.method}
        </p>
      </section>

      <section style={{ marginBottom: 26 }}>
        <h3 style={sectionTitle()}>To Plate</h3>
        <div style={{ background: DG.panel, border: `1px solid ${DG.rule}`, padding: '16px 18px' }}>
          {r.plating.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < r.plating.items.length - 1 ? `1px solid ${DG.rule}` : 'none' }}>
              <span style={{ fontFamily: DG_DISPLAY, fontSize: 14, color: DG.ink }}>{it.name}</span>
              <span style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 13, color: DG.gold }}>{it.amount}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 style={sectionTitle()}>From the freezer</h3>
        <div style={{ background: DG.bg2, border: `1px solid ${DG.gold}`, padding: '16px 18px' }}>
          {r.freezer.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ fontFamily: DG_DISPLAY, fontSize: 14 }}>{it.name}</span>
              <span style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 13, color: DG.gold }}>{it.amount}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COOKING MODE
// ─────────────────────────────────────────────────────────────
function GourmetCooking() {
  const r = window.RECIPE_SOUP_CURRY;
  const stepIdx = 2;
  const step = r.steps[stepIdx];
  const total = r.steps.length;

  return (
    <div className="screen" style={{ height: '100%', overflow: 'hidden', background: DG.bg, fontFamily: DG_BODY, color: DG.ink, display: 'flex', flexDirection: 'column' }}>
      {/* Top */}
      <div style={{ padding: '54px 22px 0', display: 'flex', alignItems: 'center' }}>
        <button style={iconBtn()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DG.ink} strokeWidth="1.8" strokeLinecap="round"><path d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: DG_BODY, fontSize: 9, letterSpacing: '0.35em', color: DG.mute, fontWeight: 600, textTransform: 'uppercase' }}>
            Cooking Mode
          </div>
          <div style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 15, color: DG.ink, marginTop: 2 }}>
            {r.title}
          </div>
        </div>
        <div style={{ width: 36 }} />
      </div>

      {/* Progress — bar segments + count */}
      <div style={{ padding: '18px 22px 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: DG_BODY, fontSize: 9, letterSpacing: '0.3em', color: DG.gold, fontWeight: 600, textTransform: 'uppercase' }}>
            Step {stepIdx + 1} of {total}
          </span>
          <span style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 12, color: DG.mute }}>
            {Math.round(((stepIdx + 1) / total) * 100)}%
          </span>
        </div>
        <div style={{ height: 2, background: DG.rule, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${((stepIdx + 1) / total) * 100}%`, background: DG.gold }} />
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 26px 8px' }}>
        {/* Section number big */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
          <div style={{ fontFamily: DG_DISPLAY, fontWeight: 700, fontStyle: 'italic', fontSize: 84, lineHeight: 0.8, color: DG.gold, letterSpacing: '-0.02em' }}>
            {stepIdx + 1}
          </div>
          <div style={{ flex: 1, paddingTop: 6 }}>
            <div style={{ fontFamily: DG_BODY, fontSize: 9, letterSpacing: '0.35em', color: DG.rose, fontWeight: 600, textTransform: 'uppercase' }}>◆ {step.heat}</div>
            <div style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 14, color: DG.ink2, marginTop: 4 }}>{step.time}</div>
          </div>
        </div>

        <h2 style={{
          fontFamily: DG_DISPLAY, fontWeight: 700, fontStyle: 'italic',
          fontSize: 34, lineHeight: 1, letterSpacing: '-0.005em',
          color: DG.ink, margin: '0 0 20px', textWrap: 'balance',
        }}>
          {step.title}
        </h2>

        <p style={{
          fontFamily: DG_DISPLAY, fontSize: 16.5, lineHeight: 1.75,
          color: DG.ink2, margin: '0 0 26px', letterSpacing: '0.005em', textWrap: 'pretty',
        }}>
          {step.body}
        </p>

        {/* Quick reference */}
        <div style={{ background: DG.panel, border: `1px solid ${DG.rule}`, padding: '16px 18px', marginBottom: 22 }}>
          <div style={{ fontFamily: DG_BODY, fontSize: 9, fontWeight: 600, letterSpacing: '0.35em', color: DG.gold, textTransform: 'uppercase', marginBottom: 10 }}>
            On the worktop
          </div>
          {[
            { name: '玉ねぎ', amount: '400 g', done: true },
            { name: '深鍋 · ストウブ', amount: '24 cm', done: true },
            { name: '炒めた香味野菜', amount: 'from N°02', done: false },
          ].map((it, i) => (
            <label key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
              borderBottom: i < 2 ? `1px solid ${DG.rule}` : 'none', cursor: 'pointer',
            }}>
              <span style={{
                width: 14, height: 14, border: `1px solid ${it.done ? DG.gold : DG.mute}`,
                background: it.done ? DG.gold : 'transparent', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {it.done && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={DG.bg} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </span>
              <span style={{ flex: 1, fontFamily: DG_DISPLAY, fontSize: 14, color: it.done ? DG.mute : DG.ink, textDecoration: it.done ? 'line-through' : 'none' }}>
                {it.name}
              </span>
              <span style={{ fontFamily: DG_DISPLAY, fontStyle: 'italic', fontSize: 12, color: DG.gold }}>
                {it.amount}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ padding: '14px 22px 30px', display: 'flex', gap: 10, borderTop: `1px solid ${DG.rule}` }}>
        <button style={{
          width: 48, height: 48, border: `1px solid ${DG.rule}`, background: 'transparent',
          color: DG.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={DG.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button style={{
          flex: 1, height: 48, background: DG.gold, color: DG.bg, border: 'none',
          fontFamily: DG_BODY, fontWeight: 700, fontSize: 11,
          letterSpacing: '0.4em', textTransform: 'uppercase', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <span>Next — N° IV</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { GourmetList, GourmetDetail, GourmetCooking });
