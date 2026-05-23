// Cooking mode — step-by-step, screen-on, big text, checkboxes
// Designed to be glanceable while cooking with hands busy

function CookingMode({ showTimer = true, onClose, onChangeStep }) {
  const r = window.RECIPE_SOUP_CURRY;
  const [stepIdx, _setStepIdx] = React.useState(2); // showing step 3 of 7 (玉ねぎ)
  const setStepIdx = (n) => { _setStepIdx(n); onChangeStep && onChangeStep(n); };
  const step = r.steps[stepIdx];
  const total = r.steps.length;

  return (
    <div className="screen" style={{
      height: '100%', overflow: 'hidden',
      background: C.sumi, color: C.washi,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '54px 16px 8px' }}>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 99, background: 'rgba(250,246,236,0.1)', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.washi} strokeWidth="2" strokeLinecap="round"><path d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: SERIF, fontSize: 13, color: C.washi, letterSpacing: '0.1em', fontWeight: 500 }}>{r.title}</div>
          <div style={{ fontFamily: SANS, fontSize: 9, color: 'rgba(250,246,236,0.5)', marginTop: 1, letterSpacing: '0.15em' }}>料理中モード · 画面常時オン</div>
        </div>
        <button style={{ width: 32, height: 32, borderRadius: 99, background: 'rgba(250,246,236,0.1)', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.washi} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
        </button>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 4, padding: '4px 16px 18px' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i < stepIdx ? C.shu : i === stepIdx ? C.washi : 'rgba(250,246,236,0.15)',
          }} />
        ))}
      </div>

      {/* Step content */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 76, color: C.shu, lineHeight: 0.9 }}>
            {String(stepIdx + 1).padStart(2, '0')}
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 14, color: 'rgba(250,246,236,0.5)' }}>
            / {String(total).padStart(2, '0')}
          </div>
          <span style={{
            marginLeft: 'auto',
            fontFamily: SANS, fontSize: 10, color: C.shu,
            border: `1px solid ${C.shu}`, padding: '3px 10px', letterSpacing: '0.2em',
          }}>
            {step.heat}
          </span>
        </div>

        {/* Step title */}
        <div style={{
          fontFamily: SERIF, fontWeight: 700, fontSize: 28, color: C.washi,
          letterSpacing: '0.04em', lineHeight: 1.3, marginBottom: 16,
        }}>
          {step.title}
        </div>

        {/* Step body */}
        <div style={{
          fontFamily: SERIF, fontSize: 16, color: 'rgba(250,246,236,0.92)',
          lineHeight: 1.85, letterSpacing: '0.04em', marginBottom: 24,
          textWrap: 'pretty',
        }}>
          {step.body}
        </div>

        {/* Reference card — time as info, no timer */}
        <div style={{
          background: 'rgba(250,246,236,0.05)', border: '1px solid rgba(250,246,236,0.12)',
          padding: '14px 18px', marginBottom: 22,
          display: 'flex', alignItems: 'center', gap: 24,
        }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 9, color: 'rgba(250,246,236,0.5)', letterSpacing: '0.2em', marginBottom: 4 }}>目安時間</div>
            <div className="tnum" style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: C.washi, lineHeight: 1 }}>
              {step.time}
            </div>
          </div>
          <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(250,246,236,0.12)' }} />
          <div>
            <div style={{ fontFamily: SANS, fontSize: 9, color: 'rgba(250,246,236,0.5)', letterSpacing: '0.2em', marginBottom: 4 }}>火加減</div>
            <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 600, color: C.washi, lineHeight: 1.2 }}>
              {step.heat}
            </div>
          </div>
        </div>

        {/* Checklist of materials needed in this step */}
        <div>
          <div style={{ fontFamily: SANS, fontSize: 9, color: 'rgba(250,246,236,0.5)', letterSpacing: '0.2em', marginBottom: 10 }}>
            この工程で使うもの
          </div>
          {[
            { name: '玉ねぎ', amount: '400g', done: true },
            { name: '深鍋（ストウブ）', amount: '24cm', done: true },
            { name: '炒めた香味野菜', amount: '前工程', done: false },
          ].map((it, i) => (
            <label key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 0',
              borderBottom: '1px solid rgba(250,246,236,0.08)',
              cursor: 'pointer',
            }}>
              <span style={{
                width: 20, height: 20,
                border: `1.5px solid ${it.done ? C.shu : 'rgba(250,246,236,0.4)'}`,
                background: it.done ? C.shu : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {it.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.washi} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </span>
              <span style={{
                fontFamily: SERIF, fontSize: 14, flex: 1,
                color: it.done ? 'rgba(250,246,236,0.5)' : C.washi,
                textDecoration: it.done ? 'line-through' : 'none',
              }}>{it.name}</span>
              <span className="tnum" style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(250,246,236,0.55)' }}>
                {it.amount}
              </span>
            </label>
          ))}
        </div>

        <div style={{ height: 100 }} />
      </div>

      {/* Step navigation */}
      <div style={{
        padding: '14px 16px 26px',
        background: 'linear-gradient(to top, rgba(29,26,22,1), rgba(29,26,22,0.85))',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} style={{
          width: 48, height: 48, borderRadius: 99,
          background: 'rgba(250,246,236,0.08)', border: '1px solid rgba(250,246,236,0.12)',
          color: C.washi, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button onClick={() => setStepIdx(Math.min(total - 1, stepIdx + 1))} style={{
          flex: 1, height: 48, borderRadius: 99,
          background: C.shu, color: C.washi, border: 'none',
          fontFamily: SERIF, fontSize: 14, fontWeight: 600, letterSpacing: '0.25em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          {stepIdx === total - 1 ? 'できあがり' : '次の工程へ'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}
window.CookingMode = CookingMode;
