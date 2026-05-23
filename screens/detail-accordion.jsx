// Detail variant B — Accordion
// All sections in one scroll; each section collapsed/expanded by tap

function DetailAccordion() {
  const [open, setOpen] = React.useState({ mat: true, prep: false, cook: false, plate: false });
  const toggle = (k) => setOpen(o => ({ ...o, [k]: !o[k] }));

  const sections = [
    { key: 'mat',   kanji: '材',  label: '材料',     count: 24, color: C.shu,  body: <IngredientsBlock /> },
    { key: 'prep',  kanji: '備',  label: '下ごしらえ', count: 5,  color: C.tea,  body: <PrepBlock /> },
    { key: 'cook',  kanji: '炊',  label: '調理',     count: 7,  color: C.moss, body: <StepsBlock compact /> },
    { key: 'plate', kanji: '膳',  label: '盛り付け',   count: 4,  color: C.sumi2, body: <PlatingBlock /> },
  ];

  return (
    <div className="screen paper" style={{ height: '100%', overflow: 'auto' }}>
      <DetailHero />

      <div style={{ padding: '0 0 110px', background: C.washi }}>
        {sections.map(s => (
          <div key={s.key} style={{ borderTop: `1px solid ${C.line}` }}>
            <button onClick={() => toggle(s.key)} style={{
              width: '100%', background: 'transparent', border: 'none', padding: '18px 18px',
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            }}>
              {/* Kanji seal */}
              <div style={{
                width: 36, height: 36,
                background: open[s.key] ? s.color : 'transparent',
                color: open[s.key] ? C.washi : s.color,
                border: `1.5px solid ${s.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: SERIF, fontWeight: 600, fontSize: 16, letterSpacing: 0,
                transition: 'all 0.2s',
              }}>{s.kanji}</div>

              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 16, color: C.sumi, letterSpacing: '0.1em' }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 2, letterSpacing: '0.1em' }}>
                  {s.count} ITEMS
                </div>
              </div>

              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.sumi3} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open[s.key] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {open[s.key] && (
              <div style={{ padding: '0 18px 22px' }}>
                {s.body}
              </div>
            )}
          </div>
        ))}

        {/* Comments / reviews preview */}
        <div style={{ borderTop: `1px solid ${C.line}`, padding: '20px 18px 24px', background: C.kinari }}>
          <SectionTitle kanji="評" label="つくったよ" count={127} />
          <div style={{ padding: '0 0 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'ゆかり', when: '3日前', rating: 5, text: '一晩寝かせるとぐっと深くなる…！じっくり作る価値ありです。' },
              { name: 'たけし',  when: '1週間前', rating: 5, text: 'ホールスパイスから作ったの初めてですが、香りが全然違いますね。' },
            ].map((r, i) => (
              <div key={i} style={{ padding: '12px 14px', background: C.washi, border: `1px solid ${C.line}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 99, background: C.kinariDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 10, color: C.tea }}>
                    {r.name.charAt(0)}
                  </div>
                  <span style={{ fontFamily: SERIF, fontSize: 12, color: C.sumi, fontWeight: 600 }}>{r.name}</span>
                  <Stars value={r.rating} size={10} />
                  <span style={{ marginLeft: 'auto', fontFamily: SANS, fontSize: 9, color: C.muted }}>{r.when}</span>
                </div>
                <div style={{ fontFamily: SERIF, fontSize: 12, color: C.sumi2, lineHeight: 1.7 }}>
                  {r.text}
                </div>
              </div>
            ))}
            <button style={{ fontFamily: SERIF, fontSize: 12, color: C.shu, background: 'transparent', border: 'none', padding: '4px 0', textAlign: 'center', letterSpacing: '0.15em', fontWeight: 600 }}>
              すべての評価を見る →
            </button>
          </div>
        </div>
      </div>

      <StickyAction />
    </div>
  );
}
window.DetailAccordion = DetailAccordion;
