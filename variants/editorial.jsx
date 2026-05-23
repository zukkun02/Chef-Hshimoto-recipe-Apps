// Direction 1 — Editorial Magazine
// Inspired by Kinfolk / Cherry Bombe / The Gentlewoman.
// Pure white, generous whitespace, oversized display serif, thin rules.
// Single neutral palette + olive/sage as a quiet accent.

const ED = {
  paper: '#ffffff',
  cream: '#f5f1ea',
  ink:   '#111111',
  ink2:  '#3a3a3a',
  mute:  '#7a7a7a',
  rule:  '#dcd6cc',
  olive: '#6b7a5a',
  wine:  '#7a2433',
};
const ED_DISPLAY = "'Cormorant Garamond', 'Times New Roman', serif";
const ED_SANS    = "'DM Sans', system-ui, sans-serif";

function EDPlaceholder({ label, tone = 'cream', ratio = 'auto' }) {
  const colors = {
    cream: ED.cream, sage: '#d9dfcd', warm: '#e8d9c4', dark: '#2a2624', wine: '#e6cdd1',
  };
  const bg = colors[tone] || ED.cream;
  const isDark = tone === 'dark';
  return (
    <div style={{
      width: '100%', height: ratio === 'auto' ? '100%' : undefined,
      aspectRatio: ratio === 'auto' ? undefined : ratio,
      background: bg,
      backgroundImage: `radial-gradient(circle at 30% 40%, ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} 0, transparent 50%), repeating-linear-gradient(45deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)'} 0 1px, transparent 1px 12px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      <span style={{
        fontFamily: 'ui-monospace, monospace', fontSize: 9, letterSpacing: '0.25em',
        color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.35)',
        padding: '3px 8px', background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
        textTransform: 'uppercase',
      }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LIST SCREEN
// ─────────────────────────────────────────────────────────────
function EditorialList() {
  const recipes = window.RECIPE_LIST;
  const featured = recipes.find(r => r.featured);
  const rest = recipes.filter(r => !r.featured);

  return (
    <div className="screen" style={{ height: '100%', overflow: 'auto', background: ED.paper, fontFamily: ED_SANS, color: ED.ink }}>
      <div style={{ height: 54 }} aria-hidden />

      {/* Masthead */}
      <header style={{ padding: '14px 24px 18px', borderBottom: `1px solid ${ED.rule}`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: ED_SANS, fontSize: 9, letterSpacing: '0.3em', color: ED.mute, textTransform: 'uppercase' }}>
              Issue No. 14 — February
            </div>
            <div style={{ fontFamily: ED_DISPLAY, fontSize: 38, fontWeight: 500, color: ED.ink, letterSpacing: '0.01em', lineHeight: 1, marginTop: 6 }}>
              <i>Le Livre</i>
            </div>
            <div style={{ fontFamily: ED_DISPLAY, fontSize: 14, fontStyle: 'italic', color: ED.olive, marginTop: 2, letterSpacing: '0.05em' }}>
              de cuisine
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, paddingTop: 6 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ED.ink} strokeWidth="1.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ED.ink} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
          </div>
        </div>
      </header>

      {/* Featured editorial */}
      <article style={{ padding: '28px 24px 32px' }}>
        <div style={{ fontFamily: ED_SANS, fontSize: 10, letterSpacing: '0.3em', color: ED.olive, textTransform: 'uppercase', marginBottom: 14 }}>
          The Cover Recipe — N°01
        </div>
        <div style={{ marginBottom: 18, aspectRatio: '4 / 5' }}>
          <EDPlaceholder label="soup curry" tone="warm" ratio="4 / 5" />
        </div>
        <div style={{ fontFamily: ED_DISPLAY, fontWeight: 500, fontSize: 38, lineHeight: 1.05, color: ED.ink, letterSpacing: '-0.005em', textWrap: 'balance' }}>
          {featured.title}<i style={{ color: ED.olive, fontSize: 28 }}>,</i><br/>
          <i style={{ fontSize: 28, fontWeight: 400, color: ED.ink2 }}>骨付き鶏もも肉で。</i>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 18, paddingBottom: 4 }}>
          <span style={{ fontFamily: ED_SANS, fontSize: 10, letterSpacing: '0.25em', color: ED.mute, textTransform: 'uppercase' }}>BY</span>
          <span style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 18, color: ED.ink }}>橋本 先生</span>
          <span style={{ flex: 1, height: 1, background: ED.rule }} />
          <span style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 13, color: ED.mute }}>15 min read</span>
        </div>
        <p style={{ fontFamily: ED_DISPLAY, fontSize: 15, lineHeight: 1.7, color: ED.ink2, marginTop: 16, letterSpacing: '0.005em', textWrap: 'pretty' }}>
          <span style={{ fontSize: 42, float: 'left', fontFamily: ED_DISPLAY, fontWeight: 500, color: ED.wine, lineHeight: 0.85, marginRight: 8, marginTop: 2 }}>立</span>
          春の頃合いに、芯まで温まる一皿を。ホールスパイスから丁寧に立ち上げた香りと、一晩寝かせた深い味わいが、寒さの抜けきらない夜にちょうどよく。
        </p>
        <button style={{
          marginTop: 24, padding: '14px 20px', background: 'transparent',
          border: `1px solid ${ED.ink}`, color: ED.ink,
          fontFamily: ED_SANS, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
        }}>
          <span>Read the recipe</span>
          <span>→</span>
        </button>
      </article>

      {/* Section divider */}
      <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 22, color: ED.ink }}>The Index</span>
        <span style={{ fontFamily: ED_SANS, fontSize: 9, letterSpacing: '0.3em', color: ED.mute, textTransform: 'uppercase' }}>
          {rest.length} recipes
        </span>
        <span style={{ flex: 1, height: 1, background: ED.rule }} />
      </div>

      {/* Editorial index — large numbered list */}
      <ol style={{ listStyle: 'none', margin: 0, padding: '20px 24px 0' }}>
        {rest.map((r, i) => (
          <li key={r.id} style={{
            display: 'grid', gridTemplateColumns: 'auto 1fr 80px',
            gap: 16, alignItems: 'center',
            padding: '18px 0', borderBottom: i === rest.length - 1 ? 'none' : `1px solid ${ED.rule}`,
          }}>
            <span style={{ fontFamily: ED_DISPLAY, fontWeight: 400, fontSize: 24, color: ED.olive, letterSpacing: '0.04em', minWidth: 28 }}>
              {String(i + 2).padStart(2, '0')}
            </span>
            <div>
              <div style={{ fontFamily: ED_SANS, fontSize: 9, letterSpacing: '0.25em', color: ED.mute, textTransform: 'uppercase', marginBottom: 3 }}>
                {r.tag} · {r.season}
              </div>
              <div style={{ fontFamily: ED_DISPLAY, fontSize: 21, fontWeight: 500, color: ED.ink, lineHeight: 1.1, letterSpacing: '0.005em' }}>
                {r.title}
              </div>
              <div style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 12, color: ED.mute, marginTop: 4, lineHeight: 1.5 }}>
                {r.sub}
              </div>
            </div>
            <div style={{ width: 80, aspectRatio: '1', overflow: 'hidden' }}>
              <EDPlaceholder label={r.id} tone={i % 3 === 0 ? 'sage' : i % 3 === 1 ? 'warm' : 'wine'} />
            </div>
          </li>
        ))}
      </ol>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px 24px 36px', borderTop: `1px solid ${ED.rule}`, marginTop: 32 }}>
        <div style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 13, color: ED.mute, letterSpacing: '0.05em' }}>
          — finis —
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DETAIL SCREEN — tabs, editorial layout
// ─────────────────────────────────────────────────────────────
function EditorialDetail() {
  const [tab, setTab] = React.useState(0);
  const r = window.RECIPE_SOUP_CURRY;
  const tabs = ['Ingredients', 'Mise en place', 'Method', 'To serve'];

  return (
    <div className="screen" style={{ height: '100%', overflow: 'auto', background: ED.paper, fontFamily: ED_SANS, color: ED.ink, position: 'relative' }}>
      {/* Full-bleed hero */}
      <div style={{ height: 420, position: 'relative', overflow: 'hidden' }}>
        <EDPlaceholder label="soup curry · hero" tone="warm" />
        <div style={{ position: 'absolute', top: 54, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <button style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(255,255,255,0.85)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ED.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(255,255,255,0.85)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ED.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
          </button>
        </div>
        <div style={{ position: 'absolute', left: 24, bottom: 22, fontFamily: ED_SANS, fontSize: 9, letterSpacing: '0.3em', color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>
          Volume 14 · The Cover
        </div>
      </div>

      {/* Title block */}
      <div style={{ padding: '28px 24px 20px', background: ED.paper }}>
        <div style={{ fontFamily: ED_SANS, fontSize: 9, letterSpacing: '0.35em', color: ED.olive, textTransform: 'uppercase', marginBottom: 12 }}>
          A warming bowl, slowly built
        </div>
        <h1 style={{ fontFamily: ED_DISPLAY, fontWeight: 500, fontSize: 44, lineHeight: 1, color: ED.ink, margin: 0, letterSpacing: '-0.005em', textWrap: 'balance' }}>
          {r.title}<i style={{ color: ED.olive }}>.</i>
        </h1>
        <p style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 17, lineHeight: 1.5, color: ED.ink2, margin: '14px 0 0', letterSpacing: '0.01em' }}>
          {r.subtitle}
        </p>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 20 }}>
          <span style={{ fontFamily: ED_SANS, fontSize: 9, letterSpacing: '0.3em', color: ED.mute, textTransform: 'uppercase' }}>By</span>
          <span style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 16, color: ED.ink }}>橋本 先生</span>
          <span style={{ marginLeft: 'auto', fontFamily: ED_SANS, fontSize: 10, color: ED.mute }}>2026.2</span>
        </div>

        {/* Stats — magazine style, big numerals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 22, paddingTop: 18, borderTop: `1px solid ${ED.rule}` }}>
          {[
            { l: 'Serves', n: '5' },
            { l: 'Active', n: '90', u: 'min' },
            { l: 'Rest',   n: '1', u: 'night' },
            { l: 'Skill',  n: '3', u: '/5' },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: 'center', borderLeft: i ? `1px solid ${ED.rule}` : 'none' }}>
              <div style={{ fontFamily: ED_DISPLAY, fontWeight: 500, fontSize: 28, color: ED.ink, lineHeight: 1 }}>
                {m.n}{m.u && <span style={{ fontStyle: 'italic', fontSize: 11, color: ED.mute, marginLeft: 2 }}>{m.u}</span>}
              </div>
              <div style={{ fontFamily: ED_SANS, fontSize: 8, letterSpacing: '0.25em', color: ED.mute, marginTop: 4, textTransform: 'uppercase' }}>
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ position: 'sticky', top: 0, background: ED.paper, zIndex: 5, borderTop: `1px solid ${ED.rule}`, borderBottom: `1px solid ${ED.rule}` }}>
        <div className="no-bar" style={{ display: 'flex', overflowX: 'auto', padding: '0 12px' }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              flexShrink: 0, padding: '14px 14px 12px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: ED_DISPLAY, fontStyle: 'italic',
              fontSize: i === tab ? 18 : 16, fontWeight: 500,
              color: i === tab ? ED.ink : ED.mute,
              borderBottom: i === tab ? `2px solid ${ED.ink}` : '2px solid transparent',
              letterSpacing: '0.01em', transition: 'all 0.2s',
            }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px 24px 120px' }}>
        {tab === 0 && <EditorialIngredients r={r} />}
        {tab === 1 && <EditorialPrep r={r} />}
        {tab === 2 && <EditorialMethod r={r} />}
        {tab === 3 && <EditorialServe r={r} />}
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${ED.rule}`, padding: '14px 20px 30px',
        display: 'flex', gap: 10,
      }}>
        <button style={{
          flex: 1, padding: '14px 0', background: ED.ink, color: '#fff',
          border: 'none', fontFamily: ED_SANS, fontSize: 11,
          letterSpacing: '0.35em', textTransform: 'uppercase', cursor: 'pointer',
        }}>
          Begin cooking — let's go
        </button>
      </div>
    </div>
  );
}

function EditorialIngredients({ r }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 22, color: ED.ink }}>
          for <span style={{ color: ED.olive }}>five</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: ED_SANS, fontSize: 11, color: ED.mute }}>
          <button style={{ width: 24, height: 24, border: `1px solid ${ED.rule}`, background: 'transparent', fontFamily: ED_DISPLAY, fontSize: 14 }}>−</button>
          <span style={{ padding: '0 8px' }}>5</span>
          <button style={{ width: 24, height: 24, border: `1px solid ${ED.ink}`, background: ED.ink, color: '#fff', fontFamily: ED_DISPLAY, fontSize: 14 }}>+</button>
        </div>
      </div>
      {r.ingredients.map((g, i) => (
        <section key={i} style={{ marginBottom: 28 }}>
          <h3 style={{
            fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 18, fontWeight: 500,
            color: ED.olive, margin: '0 0 10px', letterSpacing: '0.01em',
            paddingBottom: 6, borderBottom: `1px solid ${ED.rule}`,
          }}>
            {g.group}
          </h3>
          {g.items.map((it, j) => (
            <div key={j} style={{
              display: 'grid', gridTemplateColumns: '20px 1fr auto',
              gap: 10, alignItems: 'baseline',
              padding: '10px 0',
              paddingLeft: it.sub ? 16 : 0,
              borderBottom: j < g.items.length - 1 ? `1px dotted ${ED.rule}` : 'none',
            }}>
              {!it.sub ? <input type="checkbox" style={{ accentColor: ED.olive, width: 14, height: 14, justifySelf: 'center' }} /> : <span/>}
              <span style={{ fontFamily: ED_DISPLAY, fontSize: 15, color: it.sub ? ED.mute : ED.ink, letterSpacing: '0.01em' }}>{it.name}</span>
              <span style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 14, color: ED.ink2, fontVariantNumeric: 'tabular-nums' }}>{it.amount}</span>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function EditorialPrep({ r }) {
  return (
    <div>
      <div style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 22, color: ED.ink, marginBottom: 20 }}>
        before we begin
      </div>
      {r.prep.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: i < r.prep.length - 1 ? `1px solid ${ED.rule}` : 'none' }}>
          <span style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 32, color: ED.olive, lineHeight: 1, minWidth: 36 }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <p style={{ fontFamily: ED_DISPLAY, fontSize: 15, lineHeight: 1.65, color: ED.ink, margin: 0, letterSpacing: '0.005em' }}>
            {p}
          </p>
        </div>
      ))}
    </div>
  );
}

function EditorialMethod({ r }) {
  return (
    <div>
      {r.steps.map((s, i) => (
        <article key={i} style={{ marginBottom: 28, paddingBottom: 24, borderBottom: i < r.steps.length - 1 ? `1px solid ${ED.rule}` : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: ED_DISPLAY, fontWeight: 500, fontSize: 28, color: ED.ink, lineHeight: 1 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: ED_SANS, fontSize: 9, letterSpacing: '0.3em', color: ED.olive, textTransform: 'uppercase' }}>
              {s.heat} · {s.time}
            </span>
          </div>
          <h4 style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 21, fontWeight: 500, color: ED.ink, margin: '0 0 10px', letterSpacing: '0.005em' }}>
            {s.title}
          </h4>
          <p style={{ fontFamily: ED_DISPLAY, fontSize: 15, lineHeight: 1.75, color: ED.ink2, margin: 0, letterSpacing: '0.005em' }}>
            {s.body}
          </p>
        </article>
      ))}
    </div>
  );
}

function EditorialServe({ r }) {
  return (
    <div>
      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 20, fontWeight: 500, color: ED.olive, margin: '0 0 14px', borderBottom: `1px solid ${ED.rule}`, paddingBottom: 6 }}>
          accompaniments
        </h3>
        <div style={{ fontFamily: ED_DISPLAY, fontSize: 15, lineHeight: 1.8, color: ED.ink, letterSpacing: '0.01em' }}>
          {r.sides.fried.join('・')}<span style={{ color: ED.mute }}>。</span>
        </div>
        <p style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 13, color: ED.mute, marginTop: 8 }}>
          それぞれ下ごしらえし、素揚げに。{r.sides.egg.name}は{r.sides.egg.detail}。
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 20, fontWeight: 500, color: ED.olive, margin: '0 0 14px', borderBottom: `1px solid ${ED.rule}`, paddingBottom: 6 }}>
          the rice
        </h3>
        {r.rice.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? `1px dotted ${ED.rule}` : 'none' }}>
            <span style={{ fontFamily: ED_DISPLAY, fontSize: 14 }}>{it.name}</span>
            <span style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 14, color: ED.ink2 }}>{it.amount}</span>
          </div>
        ))}
        <p style={{ fontFamily: ED_DISPLAY, fontSize: 14, lineHeight: 1.7, color: ED.ink2, marginTop: 12, letterSpacing: '0.005em' }}>
          {r.rice.method}
        </p>
      </section>

      <section>
        <h3 style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 20, fontWeight: 500, color: ED.olive, margin: '0 0 14px', borderBottom: `1px solid ${ED.rule}`, paddingBottom: 6 }}>
          to plate
        </h3>
        <div style={{ background: ED.cream, padding: '20px 22px' }}>
          {r.plating.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < r.plating.items.length - 1 ? `1px dotted ${ED.rule}` : 'none' }}>
              <span style={{ fontFamily: ED_DISPLAY, fontSize: 14 }}>{it.name}</span>
              <span style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 14, color: ED.ink2 }}>{it.amount}</span>
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
function EditorialCooking() {
  const r = window.RECIPE_SOUP_CURRY;
  const stepIdx = 2;
  const step = r.steps[stepIdx];
  const total = r.steps.length;

  return (
    <div className="screen" style={{ height: '100%', overflow: 'hidden', background: ED.paper, fontFamily: ED_SANS, color: ED.ink, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 0', display: 'flex', alignItems: 'center' }}>
        <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ED.ink} strokeWidth="1.5" strokeLinecap="round"><path d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 16, color: ED.ink }}>
          {r.title}
        </div>
        <div style={{ width: 32 }} />
      </div>

      {/* Progress as roman numerals */}
      <div style={{ padding: '20px 24px 12px', display: 'flex', justifyContent: 'center', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} style={{
            fontFamily: ED_DISPLAY, fontSize: 11, fontStyle: 'italic',
            color: i < stepIdx ? ED.mute : i === stepIdx ? ED.olive : ED.rule,
            fontWeight: i === stepIdx ? 600 : 400,
            letterSpacing: '0.05em',
          }}>
            {['ⅰ', 'ⅱ', 'ⅲ', 'ⅳ', 'ⅴ', 'ⅵ', 'ⅶ'][i]}
          </span>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
        <div style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 13, color: ED.olive, letterSpacing: '0.05em', marginBottom: 6 }}>
          Step {stepIdx + 1} of {total}
        </div>
        <h2 style={{
          fontFamily: ED_DISPLAY, fontWeight: 500, fontSize: 42, lineHeight: 1.05,
          color: ED.ink, margin: '0 0 24px', letterSpacing: '-0.005em', textWrap: 'balance',
        }}>
          {step.title}<i style={{ color: ED.olive }}>.</i>
        </h2>

        <p style={{
          fontFamily: ED_DISPLAY, fontSize: 18, lineHeight: 1.75, color: ED.ink,
          margin: '0 0 28px', letterSpacing: '0.005em', textWrap: 'pretty',
        }}>
          {step.body}
        </p>

        {/* Time + heat — info only, no timer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: `1px solid ${ED.rule}`, marginBottom: 28 }}>
          <div style={{ padding: '16px 18px', borderRight: `1px solid ${ED.rule}` }}>
            <div style={{ fontFamily: ED_SANS, fontSize: 9, letterSpacing: '0.3em', color: ED.mute, textTransform: 'uppercase', marginBottom: 8 }}>Time</div>
            <div style={{ fontFamily: ED_DISPLAY, fontSize: 26, fontWeight: 500, color: ED.ink, lineHeight: 1 }}>{step.time}</div>
          </div>
          <div style={{ padding: '16px 18px' }}>
            <div style={{ fontFamily: ED_SANS, fontSize: 9, letterSpacing: '0.3em', color: ED.mute, textTransform: 'uppercase', marginBottom: 8 }}>Heat</div>
            <div style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 22, fontWeight: 500, color: ED.olive, lineHeight: 1 }}>{step.heat}</div>
          </div>
        </div>

        <div style={{ fontFamily: ED_SANS, fontSize: 10, letterSpacing: '0.3em', color: ED.mute, textTransform: 'uppercase', marginBottom: 12 }}>
          On the worktop
        </div>
        {[
          { name: '玉ねぎ', amount: '400g', done: true },
          { name: '深鍋（ストウブ）', amount: '24cm', done: true },
          { name: '炒めた香味野菜', amount: 'from prev.', done: false },
        ].map((it, i) => (
          <label key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
            borderBottom: `1px dotted ${ED.rule}`, cursor: 'pointer',
          }}>
            <span style={{
              width: 18, height: 18, border: `1px solid ${it.done ? ED.olive : ED.rule}`,
              background: it.done ? ED.olive : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {it.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </span>
            <span style={{
              flex: 1, fontFamily: ED_DISPLAY, fontSize: 15,
              color: it.done ? ED.mute : ED.ink,
              textDecoration: it.done ? 'line-through' : 'none',
            }}>{it.name}</span>
            <span style={{ fontFamily: ED_DISPLAY, fontStyle: 'italic', fontSize: 13, color: ED.mute }}>{it.amount}</span>
          </label>
        ))}
      </div>

      <div style={{ padding: '14px 20px 30px', display: 'flex', gap: 10, borderTop: `1px solid ${ED.rule}` }}>
        <button style={{
          width: 48, height: 48, border: `1px solid ${ED.rule}`, background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ED.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button style={{
          flex: 1, height: 48, background: ED.ink, color: '#fff', border: 'none',
          fontFamily: ED_SANS, fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', cursor: 'pointer',
        }}>
          Next — IV
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { EditorialList, EditorialDetail, EditorialCooking });
