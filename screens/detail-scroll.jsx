// Detail variant C — Long scroll with floating TOC (table of contents)
// All sections rendered inline, in narrative reading order

function DetailScroll() {
  return (
    <div className="screen paper" style={{ height: '100%', overflow: 'auto', position: 'relative' }}>
      <DetailHero />

      {/* Floating TOC pill on the right */}
      <div style={{
        position: 'sticky', top: 14, float: 'right', marginRight: 12, marginTop: -340, marginBottom: -200,
        zIndex: 9, width: 38,
      }}>
        <div style={{
          background: 'rgba(29,26,22,0.85)', backdropFilter: 'blur(12px)',
          padding: '12px 6px', display: 'flex', flexDirection: 'column',
          gap: 0, alignItems: 'center',
        }}>
          {[
            { kanji: '材', active: true },
            { kanji: '備' },
            { kanji: '炊' },
            { kanji: '膳' },
          ].map((t, i) => (
            <div key={i} style={{
              padding: '6px 0', width: '100%',
              fontFamily: SERIF, fontSize: 13, fontWeight: 600,
              color: t.active ? C.washi : 'rgba(250,246,236,0.5)',
              textAlign: 'center',
              borderLeft: t.active ? `2px solid ${C.shu}` : '2px solid transparent',
              letterSpacing: 0,
            }}>{t.kanji}</div>
          ))}
          {/* progress */}
          <div style={{ marginTop: 8, paddingTop: 6, borderTop: '1px solid rgba(250,246,236,0.15)', width: '60%', textAlign: 'center' }}>
            <div style={{ fontFamily: SANS, fontSize: 8, color: 'rgba(250,246,236,0.55)', letterSpacing: '0.1em' }}>1/4</div>
          </div>
        </div>
      </div>

      <div style={{ background: C.washi, paddingBottom: 110 }}>
        {/* Section dividers with kanji ornament */}
        <NarrativeSection kanji="材" label="材料" sub="MATERIALS" no="壱"><IngredientsBlock /></NarrativeSection>
        <NarrativeSection kanji="備" label="下ごしらえ" sub="PREPARATION" no="弐"><PrepBlock /></NarrativeSection>
        <NarrativeSection kanji="炊" label="調理" sub="COOKING" no="参"><StepsBlock /></NarrativeSection>
        <NarrativeSection kanji="膳" label="盛り付け" sub="PLATING" no="肆"><PlatingBlock /></NarrativeSection>

        {/* End mark */}
        <div style={{ textAlign: 'center', padding: '32px 18px 12px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: SERIF, fontSize: 11, color: C.muted, letterSpacing: '0.3em' }}>
            <span style={{ width: 24, height: 1, background: C.line }} />
            完
            <span style={{ width: 24, height: 1, background: C.line }} />
          </div>
          <div style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 8, letterSpacing: '0.15em' }}>
            橋本先生のレシピ · つくる帖 2026
          </div>
        </div>
      </div>

      <StickyAction />
    </div>
  );
}
window.DetailScroll = DetailScroll;

function NarrativeSection({ kanji, label, sub, no, children }) {
  return (
    <div style={{ padding: '32px 18px 12px' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 22, paddingBottom: 14, borderBottom: `1px solid ${C.line}` }}>
        <div style={{
          width: 56, height: 56,
          background: C.kinari, border: `1px solid ${C.line}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 600, color: C.shu, lineHeight: 1 }}>{kanji}</div>
          <div style={{ fontFamily: SERIF, fontSize: 8, color: C.muted, letterSpacing: '0.1em', marginTop: 2 }}>{no}</div>
        </div>
        <div style={{ paddingTop: 4 }}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 22, color: C.sumi, letterSpacing: '0.06em', lineHeight: 1.2 }}>
            {label}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 4, letterSpacing: '0.25em' }}>
            {sub}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
