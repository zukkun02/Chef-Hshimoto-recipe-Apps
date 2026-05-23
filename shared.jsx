// Shared UI components for the recipe app screens.
// All screens live inside an IOSDevice (402×874). Use these to keep visuals consistent.

const C = {
  washi: '#faf6ec', kinari: '#f3ecdb', kinariDeep: '#e8dfc8', line: '#ddd2b8',
  sumi: '#1d1a16', sumi2: '#3a342d', sumi3: '#6b6353', muted: '#9a917e',
  shu: '#b8442a', shuDeep: '#8d3220', shuSoft: '#f0d4c9',
  tea: '#7a6643', moss: '#5e6b3b',
};
window.C = C;

const SERIF = "'Noto Serif JP','Shippori Mincho','Hiragino Mincho ProN',serif";
const SANS  = "'Noto Sans JP','Hiragino Sans',system-ui,sans-serif";
window.SERIF = SERIF; window.SANS = SANS;

const accentColor = (key) => ({ shu: C.shu, tea: C.tea, moss: C.moss, sumi: C.sumi2 }[key] || C.sumi2);
window.accentColor = accentColor;

// ─────────────────────────────────────────────────────────────
// Stylized photo placeholder — diagonal striped paper, monospace caption
// ─────────────────────────────────────────────────────────────
function PhotoPlaceholder({ label = 'photo', tone = 'kinari', style = {} }) {
  const bg = tone === 'shu' ? C.shuSoft : tone === 'tea' ? '#e8d9bf' : tone === 'moss' ? '#d6dac3' : tone === 'dark' ? '#3a342d' : C.kinariDeep;
  const stripe = tone === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
  const text = tone === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(29,26,22,0.5)';
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      backgroundImage: `repeating-linear-gradient(45deg, ${stripe} 0 1px, transparent 1px 9px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <div style={{ fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', fontSize: 10, letterSpacing: 0.5, color: text, padding: '2px 8px', background: tone === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(250,246,236,0.55)' }}>
        {label}
      </div>
    </div>
  );
}
window.PhotoPlaceholder = PhotoPlaceholder;

// ─────────────────────────────────────────────────────────────
// Tag pill — small label with accent left bar
// ─────────────────────────────────────────────────────────────
function Tag({ children, accent = 'sumi', filled = false, sm = false }) {
  const col = accentColor(accent);
  if (filled) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        fontSize: sm ? 10 : 11, fontFamily: SANS, fontWeight: 500,
        padding: sm ? '2px 8px' : '3px 10px', borderRadius: 99,
        background: col, color: C.washi, letterSpacing: '0.05em',
      }}>{children}</span>
    );
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: sm ? 10 : 11, fontFamily: SANS, fontWeight: 500,
      padding: sm ? '2px 8px' : '3px 10px',
      border: `1px solid ${col}`, color: col, borderRadius: 99,
      letterSpacing: '0.05em',
    }}>{children}</span>
  );
}
window.Tag = Tag;

// ─────────────────────────────────────────────────────────────
// Star rating display
// ─────────────────────────────────────────────────────────────
function Stars({ value = 0, size = 12, color = C.shu }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span style={{ display: 'inline-flex', gap: 1, color }}>
      {[0,1,2,3,4].map(i => {
        const filled = i < full ? 1 : (i === full && half) ? 0.5 : 0;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
            <defs>
              <linearGradient id={`star-${i}-${filled}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${filled*100}%`} stopColor={color} />
                <stop offset={`${filled*100}%`} stopColor={C.kinariDeep} />
              </linearGradient>
            </defs>
            <path d="M12 2l3 7 7.5.6-5.7 5 1.8 7.4L12 18l-6.6 4 1.8-7.4-5.7-5L9 9z"
              fill={`url(#star-${i}-${filled})`} stroke={color} strokeWidth="0.5"/>
          </svg>
        );
      })}
    </span>
  );
}
window.Stars = Stars;

// ─────────────────────────────────────────────────────────────
// App header — minimal, seal-style logo + actions
// ─────────────────────────────────────────────────────────────
function AppHeader({ title, back, action, sub, dark = false, transparent = false }) {
  const fg = dark ? C.washi : C.sumi;
  const subColor = dark ? 'rgba(250,246,236,0.6)' : C.sumi3;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px 12px', background: transparent ? 'transparent' : (dark ? C.sumi : C.washi),
      borderBottom: transparent ? 'none' : `1px solid ${dark ? 'rgba(255,255,255,0.08)' : C.line}`,
    }}>
      <div style={{ width: 32, display: 'flex', justifyContent: 'flex-start' }}>
        {back ? (
          <button style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        ) : (
          <div className="seal" style={{ width: 28, height: 28, fontSize: 14, borderRadius: 4 }}>帖</div>
        )}
      </div>
      <div style={{ flex: 1, textAlign: 'center', overflow: 'hidden' }}>
        <div className="wordmark" style={{ fontSize: 15, color: fg, letterSpacing: '0.18em' }}>
          {title}
        </div>
        {sub && <div style={{ fontSize: 10, color: subColor, marginTop: 1, fontFamily: SANS, letterSpacing: '0.15em' }}>{sub}</div>}
      </div>
      <div style={{ width: 32, display: 'flex', justifyContent: 'flex-end' }}>
        {action || (
          <button style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}
window.AppHeader = AppHeader;

// ─────────────────────────────────────────────────────────────
// Bottom tab bar
// ─────────────────────────────────────────────────────────────
function TabBar({ active = 0 }) {
  const tabs = [
    { label: 'さがす',     icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg> },
    { label: 'カテゴリ',   icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
    { label: 'お気に入り', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.5 1 6 3.5C14.5 6 16 5 18 5c3.5 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z"/></svg> },
    { label: 'マイページ', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8"/></svg> },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(250,246,236,0.96)',
      backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${C.line}`,
      paddingBottom: 22, paddingTop: 6,
      display: 'flex', justifyContent: 'space-around',
      zIndex: 30,
    }}>
      {tabs.map((t, i) => (
        <div key={i} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: i === active ? C.shu : C.muted, padding: '4px 12px',
          fontSize: 10, fontFamily: SANS,
        }}>
          <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', stroke: 'currentColor' }}>{t.icon}</div>
          <span style={{ letterSpacing: '0.05em' }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}
window.TabBar = TabBar;

// ─────────────────────────────────────────────────────────────
// Hero image — uses <image-slot> if available, else PhotoPlaceholder
// ─────────────────────────────────────────────────────────────
function HeroImage({ id, label, height = 320, shape = 'rect', radius = 0, tone = 'kinari' }) {
  // Render image-slot via dangerouslySetInnerHTML so the custom element initializes.
  return (
    <div style={{ width: '100%', height, position: 'relative', overflow: 'hidden', background: C.kinariDeep }}
      dangerouslySetInnerHTML={{
        __html: `<image-slot id="${id}" shape="${shape}" ${radius ? `radius="${radius}"` : ''} placeholder="${label}" style="display:block;width:100%;height:100%;"></image-slot>`
      }}
    />
  );
}
window.HeroImage = HeroImage;

// ─────────────────────────────────────────────────────────────
// Section title (with optional tategaki kanji ornament)
// ─────────────────────────────────────────────────────────────
function SectionTitle({ kanji, label, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '0 18px', marginBottom: 12 }}>
      {kanji && <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 22, color: C.shu, letterSpacing: '0.05em' }}>{kanji}</span>}
      <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 14, color: C.sumi, letterSpacing: '0.1em' }}>{label}</span>
      {count !== undefined && <span style={{ fontFamily: SANS, fontSize: 11, color: C.muted }}>· {count}</span>}
      <div style={{ flex: 1, height: 1, background: C.line, marginLeft: 4 }} />
    </div>
  );
}
window.SectionTitle = SectionTitle;
