// Direction 2 — Bold & Playful
// Inspired by Mob Kitchen / NYT Cooking / Tasty.
// Cream BG, vibrant tomato red + mustard accents, chunky sans, big numerals,
// thick black outlines, big rounded corners, slightly tilted elements.

const BP = {
  cream: '#fdf7ea',
  paper: '#fffaef',
  ink:   '#0f0f0f',
  ink2:  '#3a3a3a',
  mute:  '#7a7468',
  rule:  '#1a1a1a',
  red:   '#e8462a',   // tomato
  mustard: '#f1b829',
  green: '#3d7d3a',   // herb
  pink:  '#ffd1c7',
};
const BP_DISPLAY = "'Space Grotesk', 'Helvetica Neue', sans-serif";
const BP_BODY    = "'DM Sans', system-ui, sans-serif";

function BPPlaceholder({ label, tone = 'pink', rotate = 0 }) {
  const tones = {
    pink: BP.pink, red: '#f7a691', mustard: '#fbe39a', green: '#c7d6b8', dark: '#1f1d19', cream: BP.cream,
  };
  const bg = tones[tone] || BP.pink;
  const isDark = tone === 'dark';
  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg,
      backgroundImage: `radial-gradient(circle at 70% 30%, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 0, transparent 60%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <span style={{
        fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700,
        letterSpacing: '0.1em', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
        padding: '3px 10px', textTransform: 'uppercase',
        transform: `rotate(${rotate}deg)`,
      }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LIST
// ─────────────────────────────────────────────────────────────
function BoldList() {
  const recipes = window.RECIPE_LIST;
  const featured = recipes.find(r => r.featured);
  const rest = recipes.filter(r => !r.featured);

  return (
    <div className="screen" style={{ height: '100%', overflow: 'auto', background: BP.cream, fontFamily: BP_BODY, color: BP.ink, paddingBottom: 100 }}>
      <div style={{ height: 54 }} aria-hidden />

      {/* Header — chunky, asymmetric */}
      <header style={{ padding: '18px 20px 4px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 30, letterSpacing: '-0.04em', lineHeight: 0.9, color: BP.ink }}>
              KITCHEN<br/><span style={{ color: BP.red }}>NOTE!</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={chunkyBtn('icon')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BP.ink} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>
            </button>
            <button style={chunkyBtn('icon')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BP.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            </button>
          </div>
        </div>
        <div style={{
          marginTop: 14, padding: '12px 16px',
          background: BP.ink, color: BP.cream,
          fontFamily: BP_DISPLAY, fontWeight: 600, fontSize: 13, letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', gap: 10, borderRadius: 999,
        }}>
          <span>👋</span>
          <span>こんにちは — 今日は何作る？</span>
        </div>
      </header>

      {/* Category chips */}
      <div className="no-bar" style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '18px 20px 16px' }}>
        {[
          { label: 'すべて', active: true },
          { label: '⚡ ぱぱっと' }, { label: '🍳 朝ごはん' }, { label: '🍲 メイン' },
          { label: '🥗 副菜' }, { label: '🍜 麺' }, { label: '🌶 スパイス' },
        ].map((c, i) => (
          <button key={i} style={{
            flexShrink: 0, padding: '10px 16px',
            background: c.active ? BP.ink : BP.paper,
            color: c.active ? BP.cream : BP.ink,
            border: `2px solid ${BP.ink}`, borderRadius: 999,
            fontFamily: BP_DISPLAY, fontWeight: 600, fontSize: 12,
            letterSpacing: '-0.01em', cursor: 'pointer',
            boxShadow: c.active ? `3px 3px 0 ${BP.red}` : 'none',
          }}>{c.label}</button>
        ))}
      </div>

      {/* Featured card — bold, sticker-style */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{
          position: 'relative', background: BP.paper, border: `2px solid ${BP.ink}`,
          borderRadius: 24, overflow: 'hidden', boxShadow: `6px 6px 0 ${BP.ink}`,
        }}>
          <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
            <BPPlaceholder label="soup curry" tone="red" />
            <div style={{
              position: 'absolute', top: 14, left: 14,
              background: BP.mustard, color: BP.ink,
              fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 11,
              padding: '6px 12px', letterSpacing: '0.04em',
              border: `2px solid ${BP.ink}`, borderRadius: 99,
              transform: 'rotate(-3deg)',
            }}>⭐ 今月のNo.1</div>
            <button style={{
              position: 'absolute', top: 14, right: 14,
              width: 40, height: 40, borderRadius: 99,
              background: BP.cream, border: `2px solid ${BP.ink}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
              boxShadow: `2px 2px 0 ${BP.ink}`,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BP.red} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            </button>
          </div>
          <div style={{ padding: '18px 20px 20px' }}>
            <h2 style={{
              fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 28,
              letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 8px', color: BP.ink,
            }}>
              {featured.title}<span style={{ color: BP.red }}>!</span>
            </h2>
            <p style={{ fontFamily: BP_BODY, fontSize: 13, color: BP.ink2, margin: 0, lineHeight: 1.5 }}>
              {featured.sub}
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <span style={metaPill}>⏱ 90分＋一晩</span>
              <span style={metaPill}>👥 5人分</span>
              <span style={metaPill}>🔥 中級</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <h3 style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 22, letterSpacing: '-0.03em', color: BP.ink, margin: 0 }}>
          みんなの定番。
        </h3>
        <span style={{ flex: 1, height: 3, background: BP.ink, borderRadius: 99 }} />
      </div>

      {/* 2-column grid, chunky cards */}
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {rest.map((r, i) => (
          <div key={r.id} style={{
            background: BP.paper, border: `2px solid ${BP.ink}`, borderRadius: 18,
            overflow: 'hidden', boxShadow: i % 2 === 0 ? `3px 3px 0 ${BP.ink}` : `3px 3px 0 ${BP.red}`,
          }}>
            <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden' }}>
              <BPPlaceholder label={r.id.slice(0, 5)} tone={['pink','mustard','green','red'][i % 4]} />
              <div style={{
                position: 'absolute', bottom: 8, left: 8,
                background: BP.cream, fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 10,
                padding: '3px 8px', border: `1.5px solid ${BP.ink}`, letterSpacing: '-0.01em',
              }}>★ {r.rating}</div>
            </div>
            <div style={{ padding: '10px 12px 12px' }}>
              <div style={{
                fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 15,
                letterSpacing: '-0.02em', lineHeight: 1.15, color: BP.ink,
              }}>
                {r.title}
              </div>
              <div style={{
                fontFamily: BP_BODY, fontSize: 10, color: BP.mute, marginTop: 4, fontWeight: 500,
              }}>
                ⏱ {r.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
}

const chunkyBtn = (kind) => ({
  width: kind === 'icon' ? 40 : 'auto',
  height: 40, padding: kind === 'icon' ? 0 : '0 16px',
  background: BP.paper, border: `2px solid ${BP.ink}`, borderRadius: 99,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: `2px 2px 0 ${BP.ink}`, cursor: 'pointer',
});

const metaPill = {
  display: 'inline-flex', alignItems: 'center',
  padding: '5px 12px', background: BP.cream,
  border: `1.5px solid ${BP.ink}`, borderRadius: 99,
  fontFamily: BP_DISPLAY, fontWeight: 600, fontSize: 11,
  letterSpacing: '-0.01em', color: BP.ink,
};

// ─────────────────────────────────────────────────────────────
// DETAIL — tabs
// ─────────────────────────────────────────────────────────────
function BoldDetail() {
  const [tab, setTab] = React.useState(0);
  const r = window.RECIPE_SOUP_CURRY;
  const tabs = [
    { label: '材料', count: 24, emoji: '🥘' },
    { label: '準備', count: 5,  emoji: '🔪' },
    { label: '調理', count: 7,  emoji: '🍳' },
    { label: '盛り付け', count: 4, emoji: '🍽' },
  ];

  return (
    <div className="screen" style={{ height: '100%', overflow: 'auto', background: BP.cream, fontFamily: BP_BODY, color: BP.ink, position: 'relative' }}>
      {/* Hero */}
      <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden' }}>
        <BPPlaceholder label="soup curry · hero" tone="red" />

        <div style={{ position: 'absolute', top: 54, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <button style={chunkyBtn('icon')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BP.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={chunkyBtn('icon')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BP.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
            </button>
            <button style={{...chunkyBtn('icon'), background: BP.red}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={BP.cream} stroke={BP.cream} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            </button>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 16, left: 16,
          background: BP.mustard, color: BP.ink,
          fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 11,
          padding: '6px 12px', border: `2px solid ${BP.ink}`, borderRadius: 99,
          transform: 'rotate(-2deg)',
        }}>
          🌶 SPICE LEVEL · ★★☆
        </div>
      </div>

      {/* Title block */}
      <div style={{ padding: '20px 20px 16px' }}>
        <h1 style={{
          fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 38,
          letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 10px', color: BP.ink, textWrap: 'balance',
        }}>
          {r.title}<span style={{ color: BP.red }}>!</span>
        </h1>
        <p style={{ fontFamily: BP_BODY, fontSize: 14, color: BP.ink2, margin: 0, lineHeight: 1.6 }}>
          {r.subtitle}
        </p>

        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 99, background: BP.mustard, border: `2px solid ${BP.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 13 }}>
            橋
          </div>
          <div style={{ fontFamily: BP_DISPLAY, fontWeight: 600, fontSize: 13, color: BP.ink }}>
            橋本先生
          </div>
          <span style={{ flex: 1 }} />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', background: BP.paper,
            border: `2px solid ${BP.ink}`, borderRadius: 99,
            fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 12,
          }}>
            <span>⭐</span>
            <span>{r.rating}</span>
            <span style={{ color: BP.mute, fontWeight: 500 }}>({r.reviews})</span>
          </div>
        </div>

        {/* Meta cards — chunky stickers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 18 }}>
          {[
            { l: '人数', n: '5', u: '人分', bg: BP.pink },
            { l: '時間', n: '90', u: '分＋一晩', bg: BP.mustard, rotate: 1 },
            { l: '工程', n: '7', u: 'STEPS', bg: '#c7e0c5', rotate: -1 },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '12px 10px', background: m.bg, border: `2px solid ${BP.ink}`,
              borderRadius: 14, transform: `rotate(${m.rotate || 0}deg)`, textAlign: 'center',
            }}>
              <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 11, color: BP.ink, letterSpacing: 0 }}>{m.l}</div>
              <div style={{ fontFamily: BP_DISPLAY, fontWeight: 800, fontSize: 26, lineHeight: 1, color: BP.ink, marginTop: 2, letterSpacing: '-0.02em' }}>
                {m.n}
              </div>
              <div style={{ fontFamily: BP_BODY, fontSize: 9, color: BP.ink2, fontWeight: 500, marginTop: 2 }}>{m.u}</div>
            </div>
          ))}
        </div>

        {/* Author's tip — speech bubble */}
        <div style={{
          marginTop: 22, padding: '14px 16px',
          background: BP.paper, border: `2px solid ${BP.ink}`, borderRadius: 16,
          position: 'relative', boxShadow: `3px 3px 0 ${BP.mustard}`,
        }}>
          <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 11, color: BP.red, letterSpacing: '0.03em', marginBottom: 6 }}>
            💡 先生のひとこと
          </div>
          <div style={{ fontFamily: BP_BODY, fontSize: 13, color: BP.ink, lineHeight: 1.65 }}>
            {r.note}
          </div>
        </div>
      </div>

      {/* Tab bar — chunky pills */}
      <div style={{ position: 'sticky', top: 0, background: BP.cream, zIndex: 8, padding: '12px 20px', borderBottom: `2px solid ${BP.ink}` }}>
        <div className="no-bar" style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
          {tabs.map((t, i) => (
            <button key={t.label} onClick={() => setTab(i)} style={{
              flexShrink: 0, padding: '10px 14px',
              background: i === tab ? BP.ink : BP.paper,
              color: i === tab ? BP.cream : BP.ink,
              border: `2px solid ${BP.ink}`, borderRadius: 99,
              fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 12,
              letterSpacing: '-0.01em', cursor: 'pointer',
              boxShadow: i === tab ? `2px 2px 0 ${BP.red}` : 'none',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span>{t.emoji}</span>
              <span>{t.label}</span>
              <span style={{
                background: i === tab ? BP.red : BP.cream, color: i === tab ? BP.cream : BP.ink,
                padding: '1px 6px', borderRadius: 99, fontSize: 10, fontWeight: 700,
              }}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: '24px 20px 120px' }}>
        {tab === 0 && <BoldIngredients r={r} />}
        {tab === 1 && <BoldPrep r={r} />}
        {tab === 2 && <BoldMethod r={r} />}
        {tab === 3 && <BoldServe r={r} />}
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(253,247,234,0.95)', backdropFilter: 'blur(20px)',
        borderTop: `2px solid ${BP.ink}`, padding: '12px 16px 30px',
        display: 'flex', gap: 8,
      }}>
        <button style={{ ...chunkyBtn('icon'), width: 48, height: 48 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BP.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
        <button style={{
          flex: 1, height: 48, background: BP.red, color: BP.cream,
          border: `2px solid ${BP.ink}`, borderRadius: 99,
          fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 16,
          letterSpacing: '-0.01em', boxShadow: `3px 3px 0 ${BP.ink}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
        }}>
          <span>🔥</span>
          <span>料理スタート！</span>
        </button>
      </div>
    </div>
  );
}

function BoldIngredients({ r }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 24, color: BP.ink, letterSpacing: '-0.02em' }}>
            <span style={{ color: BP.red }}>5</span>人分の材料
          </div>
          <div style={{ fontFamily: BP_BODY, fontSize: 11, color: BP.mute, marginTop: 2 }}>
            ・タップでチェック
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', background: BP.paper, border: `2px solid ${BP.ink}`, borderRadius: 99, padding: 3 }}>
          <button style={{ width: 26, height: 26, borderRadius: 99, background: 'transparent', border: 'none', fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>−</button>
          <span style={{ padding: '0 8px', fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 14 }}>5</span>
          <button style={{ width: 26, height: 26, borderRadius: 99, background: BP.red, color: BP.cream, border: 'none', fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>+</button>
        </div>
      </div>

      {r.ingredients.map((g, gi) => (
        <div key={gi} style={{ marginBottom: 22 }}>
          <div style={{
            display: 'inline-block', padding: '4px 12px',
            background: ['#ffd1c7','#fbe39a','#c7e0c5','#d4d0e8','#f7c5b8'][gi % 5],
            border: `2px solid ${BP.ink}`, borderRadius: 99,
            fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 12,
            color: BP.ink, marginBottom: 10, letterSpacing: '-0.01em',
            transform: `rotate(${gi % 2 === 0 ? -1 : 1}deg)`,
          }}>
            {g.group}
          </div>
          <div style={{ background: BP.paper, border: `2px solid ${BP.ink}`, borderRadius: 14, padding: '4px 14px', boxShadow: `2px 2px 0 ${BP.ink}` }}>
            {g.items.map((it, j) => (
              <label key={j} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 0', borderBottom: j < g.items.length - 1 ? `1px dashed ${BP.rule}` : 'none',
                paddingLeft: it.sub ? 14 : 0, cursor: 'pointer',
              }}>
                {!it.sub ? <span style={{
                  width: 18, height: 18, borderRadius: 6, border: `2px solid ${BP.ink}`,
                  background: BP.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }} /> : <span style={{ width: 18 }} />}
                <span style={{ flex: 1, fontFamily: BP_BODY, fontSize: 13, fontWeight: it.sub ? 400 : 500, color: it.sub ? BP.mute : BP.ink }}>
                  {it.name}
                </span>
                <span style={{ fontFamily: BP_DISPLAY, fontSize: 13, fontWeight: 700, color: BP.ink, fontVariantNumeric: 'tabular-nums' }}>
                  {it.amount}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BoldPrep({ r }) {
  return (
    <div>
      <h3 style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', color: BP.ink, margin: '0 0 16px' }}>
        まず<span style={{ color: BP.red }}>下ごしらえ</span>。
      </h3>
      {r.prep.map((p, i) => (
        <div key={i} style={{
          display: 'flex', gap: 14, padding: '14px 16px', marginBottom: 10,
          background: BP.paper, border: `2px solid ${BP.ink}`, borderRadius: 14,
          boxShadow: i % 2 === 0 ? `2px 2px 0 ${BP.mustard}` : `2px 2px 0 ${BP.pink}`,
        }}>
          <div style={{
            width: 34, height: 34, flexShrink: 0,
            background: BP.ink, color: BP.cream, borderRadius: 99,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 16,
          }}>{i + 1}</div>
          <p style={{ flex: 1, fontFamily: BP_BODY, fontSize: 13, color: BP.ink, lineHeight: 1.65, margin: 0 }}>
            {p}
          </p>
        </div>
      ))}
    </div>
  );
}

function BoldMethod({ r }) {
  return (
    <div>
      {r.steps.map((s, i) => (
        <article key={i} style={{
          marginBottom: 14, padding: '16px 18px',
          background: BP.paper, border: `2px solid ${BP.ink}`, borderRadius: 18,
          boxShadow: `3px 3px 0 ${BP.ink}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 10 }}>
            <div style={{
              fontFamily: BP_DISPLAY, fontWeight: 800, fontSize: 44, lineHeight: 0.85,
              color: BP.red, letterSpacing: '-0.04em',
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ flex: 1, paddingTop: 4 }}>
              <h4 style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 17, lineHeight: 1.2, letterSpacing: '-0.02em', color: BP.ink, margin: 0 }}>
                {s.title}
              </h4>
              <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                <span style={{...metaPill, fontSize: 10, padding: '3px 8px'}}>⏱ {s.time}</span>
                <span style={{...metaPill, fontSize: 10, padding: '3px 8px', background: BP.mustard}}>🔥 {s.heat}</span>
              </div>
            </div>
          </div>
          <p style={{ fontFamily: BP_BODY, fontSize: 13, color: BP.ink2, lineHeight: 1.65, margin: 0 }}>
            {s.body}
          </p>
        </article>
      ))}
    </div>
  );
}

function BoldServe({ r }) {
  return (
    <div>
      <h3 style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', color: BP.ink, margin: '0 0 16px' }}>
        さあ、<span style={{ color: BP.red }}>盛り付け</span>！
      </h3>

      {/* Sides */}
      <section style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 13, color: BP.red, marginBottom: 10, letterSpacing: '-0.01em' }}>
          🥕 付け合わせ
        </div>
        <div style={{ background: BP.pink, border: `2px solid ${BP.ink}`, borderRadius: 14, padding: '14px 14px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {r.sides.fried.map((v, i) => (
            <span key={i} style={{
              padding: '5px 12px', background: BP.cream, border: `1.5px solid ${BP.ink}`, borderRadius: 99,
              fontFamily: BP_DISPLAY, fontWeight: 600, fontSize: 12,
            }}>{v}</span>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 13, color: BP.red, marginBottom: 10 }}>
          🍚 雑穀ごはん
        </div>
        <div style={{ background: BP.paper, border: `2px solid ${BP.ink}`, borderRadius: 14, padding: '14px 16px' }}>
          {r.rice.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 2 ? `1px dashed ${BP.rule}` : 'none' }}>
              <span style={{ fontFamily: BP_BODY, fontSize: 13 }}>{it.name}</span>
              <span style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 13 }}>{it.amount}</span>
            </div>
          ))}
          <p style={{ fontFamily: BP_BODY, fontSize: 12, color: BP.ink2, lineHeight: 1.6, marginTop: 10, marginBottom: 0 }}>
            {r.rice.method}
          </p>
        </div>
      </section>

      <section>
        <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 13, color: BP.red, marginBottom: 10 }}>
          🍽 盛り付けるもの
        </div>
        <div style={{ background: BP.ink, color: BP.cream, border: `2px solid ${BP.ink}`, borderRadius: 14, padding: '14px 16px' }}>
          {r.plating.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
              <span style={{ width: 22, height: 22, borderRadius: 99, background: BP.red, color: BP.cream, fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ flex: 1, fontFamily: BP_BODY, fontSize: 13 }}>{it.name}</span>
              <span style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 13 }}>{it.amount}</span>
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
function BoldCooking() {
  const r = window.RECIPE_SOUP_CURRY;
  const stepIdx = 2;
  const step = r.steps[stepIdx];
  const total = r.steps.length;

  return (
    <div className="screen" style={{ height: '100%', overflow: 'hidden', background: BP.cream, fontFamily: BP_BODY, color: BP.ink, display: 'flex', flexDirection: 'column' }}>
      {/* Top */}
      <div style={{ padding: '54px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={chunkyBtn('icon')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BP.ink} strokeWidth="2.5" strokeLinecap="round"><path d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div style={{ flex: 1, fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 14, color: BP.ink, letterSpacing: '-0.01em', textAlign: 'center' }}>
          {r.title}<span style={{ color: BP.red }}>!</span>
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Step progress chunky */}
      <div style={{ padding: '18px 20px 8px', display: 'flex', gap: 4 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 8, borderRadius: 4,
            background: i < stepIdx ? BP.red : i === stepIdx ? BP.mustard : BP.paper,
            border: `1.5px solid ${BP.ink}`,
          }} />
        ))}
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 24px' }}>
        {/* Step number — big sticker */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16, marginTop: 8 }}>
          <div style={{
            background: BP.red, color: BP.cream,
            fontFamily: BP_DISPLAY, fontWeight: 800, fontSize: 14,
            padding: '4px 14px', border: `2px solid ${BP.ink}`, borderRadius: 99,
            transform: 'rotate(-3deg)', letterSpacing: '-0.01em',
            boxShadow: `2px 2px 0 ${BP.ink}`,
          }}>
            STEP {stepIdx + 1} / {total}
          </div>
        </div>

        <h2 style={{
          fontFamily: BP_DISPLAY, fontWeight: 800, fontSize: 38, lineHeight: 1,
          letterSpacing: '-0.04em', color: BP.ink, margin: '0 0 18px', textWrap: 'balance',
        }}>
          {step.title}<span style={{ color: BP.red }}>。</span>
        </h2>

        <p style={{ fontFamily: BP_BODY, fontSize: 16, color: BP.ink, lineHeight: 1.7, margin: '0 0 22px', textWrap: 'pretty' }}>
          {step.body}
        </p>

        {/* Info row — time + heat */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          <div style={{
            flex: 1, padding: '14px', background: BP.mustard,
            border: `2px solid ${BP.ink}`, borderRadius: 14,
            boxShadow: `3px 3px 0 ${BP.ink}`,
          }}>
            <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 10, color: BP.ink, letterSpacing: 0 }}>⏱ 時間</div>
            <div style={{ fontFamily: BP_DISPLAY, fontWeight: 800, fontSize: 28, color: BP.ink, lineHeight: 1, marginTop: 4, letterSpacing: '-0.02em' }}>
              {step.time}
            </div>
          </div>
          <div style={{
            flex: 1, padding: '14px', background: BP.red, color: BP.cream,
            border: `2px solid ${BP.ink}`, borderRadius: 14,
            boxShadow: `3px 3px 0 ${BP.ink}`,
          }}>
            <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 10, letterSpacing: 0 }}>🔥 火加減</div>
            <div style={{ fontFamily: BP_DISPLAY, fontWeight: 800, fontSize: 24, lineHeight: 1, marginTop: 4, letterSpacing: '-0.02em' }}>
              {step.heat}
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 13, color: BP.ink, marginBottom: 8, letterSpacing: '-0.01em' }}>
          ✅ この工程で使うもの
        </div>
        {[
          { name: '玉ねぎ', amount: '400g', done: true },
          { name: '深鍋（ストウブ）', amount: '24cm', done: true },
          { name: '炒めた香味野菜', amount: '前工程', done: false },
        ].map((it, i) => (
          <label key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', marginBottom: 6,
            background: it.done ? BP.pink : BP.paper, border: `2px solid ${BP.ink}`, borderRadius: 12,
            cursor: 'pointer',
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 6, border: `2px solid ${BP.ink}`,
              background: it.done ? BP.ink : BP.cream,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {it.done && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BP.cream} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </span>
            <span style={{ flex: 1, fontFamily: BP_BODY, fontSize: 14, fontWeight: 500, color: BP.ink, textDecoration: it.done ? 'line-through' : 'none', opacity: it.done ? 0.6 : 1 }}>
              {it.name}
            </span>
            <span style={{ fontFamily: BP_DISPLAY, fontWeight: 700, fontSize: 12, color: BP.ink, opacity: it.done ? 0.6 : 1 }}>
              {it.amount}
            </span>
          </label>
        ))}
        <div style={{ height: 30 }} />
      </div>

      {/* Bottom nav */}
      <div style={{ padding: '14px 16px 30px', display: 'flex', gap: 10, background: BP.cream, borderTop: `2px solid ${BP.ink}` }}>
        <button style={{ ...chunkyBtn('icon'), width: 52, height: 52 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BP.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button style={{
          flex: 1, height: 52, background: BP.red, color: BP.cream,
          border: `2px solid ${BP.ink}`, borderRadius: 99,
          fontFamily: BP_DISPLAY, fontWeight: 800, fontSize: 17,
          letterSpacing: '-0.01em', boxShadow: `3px 3px 0 ${BP.ink}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
        }}>
          <span>次の工程へ</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { BoldList, BoldDetail, BoldCooking });
