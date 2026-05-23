// Detail variant A — Tab navigation
// Sticky tabs below hero, content switches in-place

function DetailTabs({ onBack, onStartCooking }) {
  const [tab, setTab] = React.useState(0);
  const tabs = [
    { key: 'mat',   label: '材料',     count: 24 },
    { key: 'prep',  label: '下ごしらえ', count: 5 },
    { key: 'cook',  label: '調理',     count: 7 },
    { key: 'plate', label: '盛り付け',   count: 4 },
  ];

  return (
    <div className="screen paper" style={{ height: '100%', overflow: 'auto' }}>
      <DetailHero onBack={onBack} />

      {/* Sticky tab strip */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: C.washi, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
      }}>
        <div style={{ display: 'flex', position: 'relative' }}>
          {tabs.map((t, i) => (
            <button key={t.key} onClick={() => setTab(i)} style={{
              flex: 1, background: 'transparent', border: 'none',
              padding: '14px 0 12px', cursor: 'pointer',
              fontFamily: SERIF, fontSize: 13, fontWeight: i === tab ? 600 : 500,
              color: i === tab ? C.sumi : C.muted, letterSpacing: '0.1em',
              position: 'relative',
            }}>
              {t.label}
              <span style={{ fontFamily: SANS, fontSize: 9, marginLeft: 3, color: i === tab ? C.shu : C.muted, fontWeight: 500 }}>{t.count}</span>
              {i === tab && (
                <div style={{ position: 'absolute', bottom: -1, left: '25%', right: '25%', height: 2, background: C.shu }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: '22px 18px 110px' }}>
        {tab === 0 && <IngredientsBlock />}
        {tab === 1 && <PrepBlock />}
        {tab === 2 && <StepsBlock />}
        {tab === 3 && <PlatingBlock />}
      </div>

      {/* Sticky bottom action */}
      <StickyAction onStart={onStartCooking} />
    </div>
  );
}
window.DetailTabs = DetailTabs;

function StickyAction({ onStart }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(250,246,236,0.97)', backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${C.line}`, padding: '12px 16px 32px',
      display: 'flex', gap: 10,
      zIndex: 20,
    }}>
      <button style={{
        width: 44, height: 44, borderRadius: 99,
        background: C.washi, border: `1px solid ${C.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.sumi} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      </button>
      <button onClick={onStart} style={{
        flex: 1, height: 44, borderRadius: 99,
        background: C.shu, color: C.washi, border: 'none',
        fontFamily: SERIF, fontSize: 14, fontWeight: 600, letterSpacing: '0.2em',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        料理を はじめる
      </button>
    </div>
  );
}
window.StickyAction = StickyAction;
