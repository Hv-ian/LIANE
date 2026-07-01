import { useState, useRef, useEffect } from 'react'
import { formatPrice } from '../data/products'

const STEPS = ['Piece', 'Material', 'Engrave', 'Contact']

const PIECE_TYPES = [
  {
    id: 'pendant', label: 'Pendant', sub: 'Necklace / cross',
    svg: (
      <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 8 Q30 14 28 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M40 8 Q50 14 52 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <rect x="36" y="22" width="8" height="12" rx="2" fill="currentColor" opacity=".5"/>
        <rect x="33" y="32" width="14" height="46" rx="4" fill="currentColor" opacity=".15" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="18" y="50" width="44" height="14" rx="4" fill="currentColor" opacity=".15" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="40" cy="57" r="5" fill="currentColor" opacity=".3"/>
        <line x1="37" y1="57" x2="43" y2="57" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="40" y1="54" x2="40" y2="60" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: 'ring', label: 'Ring', sub: 'Band / signet',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="52" rx="22" ry="10" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity=".08"/>
        <rect x="18" y="28" width="44" height="24" rx="2" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1.4"/>
        <ellipse cx="40" cy="28" rx="22" ry="10" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity=".18"/>
        <text x="40" y="32" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="currentColor" fontFamily="serif" opacity=".6">✦</text>
      </svg>
    ),
  },
  {
    id: 'bracelet', label: 'Bracelet', sub: 'Cuff / chain',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 40 Q12 18 40 18 Q68 18 68 40 Q68 62 40 62 Q12 62 12 40Z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity=".08"/>
        <path d="M12 40 Q12 50 40 50 Q68 50 68 40" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity=".4"/>
        {[0,60,120,180,240,300].map(a => {
          const r = 28, cx = 40 + r * Math.cos(a * Math.PI / 180), cy = 40 + r * Math.sin(a * Math.PI / 180)
          return <circle key={a} cx={cx} cy={cy} r="2.5" fill="currentColor" opacity=".35"/>
        })}
      </svg>
    ),
  },
  {
    id: 'earrings', label: 'Earrings', sub: 'Studs / drops',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="22" r="5" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity=".15"/>
        <circle cx="54" cy="22" r="5" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity=".15"/>
        <path d="M26 27 Q20 42 24 58 Q26 65 26 65" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M54 27 Q60 42 56 58 Q54 65 54 65" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <ellipse cx="26" cy="65" rx="5" ry="7" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity=".2"/>
        <ellipse cx="54" cy="65" rx="5" ry="7" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity=".2"/>
      </svg>
    ),
  },
  {
    id: 'cuff', label: 'Cuff', sub: 'Wide bangle',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 32 Q10 18 40 18 Q70 18 70 32 L70 48 Q70 62 40 62 Q10 62 10 48Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity=".1"/>
        <path d="M10 40 Q10 28 40 28 Q70 28 70 40" stroke="currentColor" strokeWidth="1.2" opacity=".4"/>
        <path d="M10 44 Q10 32 40 32 Q70 32 70 44" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity=".3"/>
        <text x="40" y="50" textAnchor="middle" fontSize="8" fill="currentColor" opacity=".5" fontFamily="serif">✦ ✦ ✦</text>
      </svg>
    ),
  },
]

const METALS = [
  { id: 'silver', label: 'Sterling Silver', note: 'Recycled 925', color: '#c8c5bf', hi: '#e2e0db' },
  { id: 'gold',   label: 'Solid Gold',      note: 'Recycled 14k', color: '#c9b88a', hi: '#ddd0a5' },
]

const STONES = [
  { id: 'none',      label: 'No stone',   meaning: '',                                fill: null,    border: '#ccc' },
  { id: 'garnet',    label: 'Garnet',     meaning: 'Courage & vitality',              fill: '#9b2335', border: '#7a1c28' },
  { id: 'moonstone', label: 'Moonstone',  meaning: 'Balance & new beginnings',        fill: '#dce8f0', border: '#a0bece' },
  { id: 'amethyst',  label: 'Amethyst',   meaning: 'Peace & intuition',               fill: '#7b5ea7', border: '#5c4480' },
  { id: 'onyx',      label: 'Black onyx', meaning: 'Strength & protection',           fill: '#2a2825', border: '#555' },
  { id: 'turquoise', label: 'Turquoise',  meaning: 'Good fortune & communication',    fill: '#45b2a0', border: '#2e8a7a' },
]

const SYMBOLS = [
  { id: 'cross', label: 'Armenian Cross',  note: 'Eternal faith' },
  { id: 'knot',  label: 'Eternity Knot',   note: 'Unity & continuity' },
  { id: 'pom',   label: 'Pomegranate',     note: 'Abundance & family' },
  { id: 'none',  label: 'No symbol',       note: 'Initials only' },
]

const BASE_PRICE = { pendant: 750, ring: 590, bracelet: 890, earrings: 650, cuff: 990 }
const ENGRAVING_FEE = 250

// ── Sparkle particles (CSS animated) ─────────────────────────────────────────
function Sparks() {
  const sparks = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 37 + 11) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: `${(i * 0.4) % 4}s`,
    size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
    dur: `${3 + (i % 4)}s`,
  }))
  return (
    <div className="sparks-layer" aria-hidden>
      {sparks.map((s, i) => (
        <span key={i} className="spark" style={{
          left: s.left, top: s.top,
          width: s.size, height: s.size,
          animationDelay: s.delay,
          animationDuration: s.dur,
        }} />
      ))}
    </div>
  )
}

// ── Step indicator ─────────────────────────────────────────────────────────────
function StepBar({ step }) {
  return (
    <div className="custom-stepbar">
      {STEPS.map((label, i) => (
        <div key={label} className={`custom-step ${i < step ? 'done' : i === step ? 'active' : ''}`}>
          <div className="custom-step-dot">{i < step ? '✓' : i + 1}</div>
          <div className="custom-step-label">{label}</div>
          {i < STEPS.length - 1 && <div className="custom-step-line" />}
        </div>
      ))}
    </div>
  )
}

// ── Summary card ──────────────────────────────────────────────────────────────
function SummaryCard({ piece, metal, stone, engraving, symbol }) {
  const m = METALS.find(x => x.id === metal)
  const s = STONES.find(x => x.id === stone)
  const p = PIECE_TYPES.find(x => x.id === piece)
  const sym = SYMBOLS.find(x => x.id === symbol)
  const base = BASE_PRICE[piece] || 750
  const total = base + (engraving.trim() ? ENGRAVING_FEE : 0)

  return (
    <div className="summary-card">
      <div className="summary-card-head">Your design</div>
      <div className="summary-card-row"><span>{p?.label}</span><span>{formatPrice(base)}</span></div>
      <div className="summary-card-row"><span>Metal</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span className="summary-swatch" style={{ background: m?.color }} />{m?.label}</span></div>
      {stone !== 'none' && <div className="summary-card-row"><span>Stone</span><span>{s?.label} — {s?.meaning}</span></div>}
      {symbol !== 'none' && <div className="summary-card-row"><span>Symbol</span><span>{sym?.label}</span></div>}
      {engraving.trim() && <div className="summary-card-row"><span>Engraving</span><span>"{engraving.toUpperCase()}" +{formatPrice(ENGRAVING_FEE)}</span></div>}
      <div className="summary-card-total"><span>Estimated total</span><span>{formatPrice(total)}</span></div>
      <div className="summary-card-note">Final price confirmed at consultation · handmade to order · 5–7 days</div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CustomOrder({ onBack }) {
  const [step, setStep] = useState(0)
  const [piece, setPiece]       = useState(null)
  const [metal, setMetal]       = useState('silver')
  const [stone, setStone]       = useState('none')
  const [symbol, setSymbol]     = useState('cross')
  const [engraving, setEngraving] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // contact
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [notes, setNotes]     = useState('')

  function next() { setStep(s => Math.min(s + 1, STEPS.length - 1)) }
  function prev() { setStep(s => Math.max(s - 1, 0)) }

  const stoneObj  = STONES.find(s => s.id === stone)
  const metalObj  = METALS.find(m => m.id === metal)

  if (submitted) return (
    <div className="custom-page custom-thanks">
      <div className="custom-thanks-inner">
        <div className="custom-thanks-mark">✦</div>
        <h1>Request received</h1>
        <p>Thank you, {name.split(' ')[0] || 'there'}. We'll reach out within 48 hours to begin crafting your piece together.</p>
        <SummaryCard piece={piece} metal={metal} stone={stone} engraving={engraving} symbol={symbol} />
        <button className="liane-btn" onClick={onBack} style={{ marginTop: 28 }}>Back to site</button>
        <div className="custom-demo-note">Demo only — form is not yet wired to an email/backend.</div>
      </div>
    </div>
  )

  return (
    <div className="custom-page">

      {/* ── Hero ── */}
      <div className="custom-hero">
        <Sparks />
        <div className="custom-hero-text">
          <div className="eyebrow" style={{ color: '#c9b88a', letterSpacing: '4px' }}>Made only for you</div>
          <h1>Design your own piece</h1>
          <p>Choose the form, the metal, the stone. Add a word, an initial, a symbol. We engrave and hand-finish every custom order in our Stockholm atelier.</p>
        </div>
        <div className="custom-hero-scroll" onClick={() => document.getElementById('custom-builder')?.scrollIntoView({ behavior: 'smooth' })}>
          <span>Begin</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </div>

      {/* ── Builder ── */}
      <div className="custom-builder" id="custom-builder">
        <StepBar step={step} />

        <div className="custom-builder-body">

          {/* Step 0 — pick piece */}
          {step === 0 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>What would you like to create?</h2>
                <p>Select the type of piece. We'll build the rest around your choice.</p>
              </div>
              <div className="piece-grid">
                {PIECE_TYPES.map(pt => (
                  <button key={pt.id}
                    className={`piece-card ${piece === pt.id ? 'active' : ''}`}
                    onClick={() => setPiece(pt.id)}
                  >
                    <div className="piece-svg">{pt.svg}</div>
                    <div className="piece-label">{pt.label}</div>
                    <div className="piece-sub">{pt.sub}</div>
                    {piece === pt.id && <div className="piece-check">✓</div>}
                  </button>
                ))}
              </div>
              <div className="custom-nav">
                <span className="back-link" onClick={onBack}>← Back to site</span>
                <button className="liane-btn" disabled={!piece} onClick={next}>Next — Material</button>
              </div>
            </div>
          )}

          {/* Step 1 — metal + stone */}
          {step === 1 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>Choose your metal &amp; stone</h2>
                <p>The metal sets the tone. The stone adds meaning.</p>
              </div>

              <div className="material-section">
                <div className="pers-label">Metal</div>
                <div className="metal-cards">
                  {METALS.map(m => (
                    <button key={m.id} className={`metal-card ${metal === m.id ? 'active' : ''}`} onClick={() => setMetal(m.id)}>
                      <div className="metal-swatch" style={{ background: `linear-gradient(135deg, ${m.hi}, ${m.color})` }} />
                      <div className="metal-card-label">{m.label}</div>
                      <div className="metal-card-note">{m.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="material-section">
                <div className="pers-label">Stone <span className="pers-muted">— each carries a meaning</span></div>
                <div className="stone-grid">
                  {STONES.map(s => (
                    <button key={s.id} className={`stone-card ${stone === s.id ? 'active' : ''}`} onClick={() => setStone(s.id)}>
                      <div className="stone-orb" style={{
                        background: s.fill ? `radial-gradient(circle at 35% 30%, ${s.fill}cc, ${s.border})` : 'transparent',
                        border: `2px solid ${s.border}`,
                      }} />
                      <div className="stone-name">{s.label}</div>
                      {s.meaning && <div className="stone-meaning">{s.meaning}</div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* live metal+stone preview */}
              <div className="material-preview">
                <div className="material-preview-swatch" style={{ background: `linear-gradient(135deg, ${metalObj?.hi}, ${metalObj?.color} 60%, ${metalObj?.color}99)` }}>
                  {stone !== 'none' && (
                    <div className="material-preview-stone" style={{ background: `radial-gradient(circle at 35% 30%, ${stoneObj?.fill}cc, ${stoneObj?.border})`, border: `2px solid ${stoneObj?.border}` }} />
                  )}
                </div>
                <div className="material-preview-label">{metalObj?.label}{stone !== 'none' ? ` · ${stoneObj?.label}` : ''}</div>
                {stone !== 'none' && <div className="material-preview-meaning">{stoneObj?.meaning}</div>}
              </div>

              <div className="custom-nav">
                <button className="ghost-btn" onClick={prev}>← Back</button>
                <button className="liane-btn" onClick={next}>Next — Engrave</button>
              </div>
            </div>
          )}

          {/* Step 2 — engraving */}
          {step === 2 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>Add your engraving</h2>
                <p>Initials, a name, a date, or leave it bare. Choose an Armenian symbol to be etched alongside.</p>
              </div>

              <div className="engrave-layout">
                {/* live preview */}
                <div className="engrave-preview">
                  <EngravingPreview piece={piece} metal={metalObj} engraving={engraving} symbol={symbol} stone={stoneObj} />
                  <div className="pers-preview-note">Live preview</div>
                </div>

                <div className="engrave-controls">
                  <div className="pers-section">
                    <div className="pers-label">Text to engrave <span className="pers-badge">+{ENGRAVING_FEE} kr</span></div>
                    <input className="pers-input" maxLength={12}
                      placeholder="Initials, name, or date…"
                      value={engraving}
                      onChange={e => setEngraving(e.target.value)}
                    />
                    <div className="pers-hint">Max 12 characters · hand-engraved in our atelier</div>
                  </div>

                  <div className="pers-section">
                    <div className="pers-label">Armenian symbol</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {SYMBOLS.map(s => (
                        <button key={s.id} className={`symbol-row-btn ${symbol === s.id ? 'active' : ''}`} onClick={() => setSymbol(s.id)}>
                          <span className="symbol-row-name">{s.label}</span>
                          <span className="symbol-row-note">{s.note}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="custom-nav">
                <button className="ghost-btn" onClick={prev}>← Back</button>
                <button className="liane-btn" onClick={next}>Next — Contact</button>
              </div>
            </div>
          )}

          {/* Step 3 — contact */}
          {step === 3 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>Almost done</h2>
                <p>Leave your details and we'll be in touch to confirm your piece before we start crafting.</p>
              </div>

              <div className="contact-layout">
                <form className="contact-form" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                  <div className="ck-row2">
                    <input className="ck-input" placeholder="Full name" required value={name} onChange={e => setName(e.target.value)} />
                    <input className="ck-input" placeholder="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <input className="ck-input full" placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} />
                  <textarea className="ck-input full ck-textarea" rows={4}
                    placeholder="Any extra details — who it's for, a special date, a photo reference…"
                    value={notes} onChange={e => setNotes(e.target.value)}
                  />
                  <div className="custom-nav" style={{ marginTop: 0 }}>
                    <button type="button" className="ghost-btn" onClick={prev}>← Back</button>
                    <button type="submit" className="liane-btn">Send my design request</button>
                  </div>
                </form>
                <SummaryCard piece={piece} metal={metal} stone={stone} engraving={engraving} symbol={symbol} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ── Armenian symbol — drawn clearly for all piece types ───────────────────────
function SymbolMark({ symbol, cx, cy, size = 22, color }) {
  if (!symbol || symbol === 'none') return null
  const s = size

  if (symbol === 'cross') return (
    <g>
      {/* Vertical bar */}
      <rect x={cx - s * 0.14} y={cy - s * 0.82} width={s * 0.28} height={s * 1.64} rx={s * 0.06} fill={color} opacity=".78"/>
      {/* Horizontal bar */}
      <rect x={cx - s * 0.68} y={cy - s * 0.14} width={s * 1.36} height={s * 0.28} rx={s * 0.06} fill={color} opacity=".78"/>
      {/* Khachkar circle */}
      <circle cx={cx} cy={cy} r={s * 0.35} fill="none" stroke={color} strokeWidth={s * 0.065} opacity=".72"/>
      {/* Corner dots (traditional khachkar detail) */}
      {[[-s*.55,-s*.55],[s*.55,-s*.55],[-s*.55,s*.55],[s*.55,s*.55]].map(([dx,dy],i) => (
        <circle key={i} cx={cx+dx} cy={cy+dy} r={s*0.07} fill={color} opacity=".5"/>
      ))}
    </g>
  )

  if (symbol === 'knot') return (
    <g>
      {/* Eternity knot — interlocking loops */}
      <path d={`M${cx-s*.55},${cy-s*.3} C${cx-s*.55},${cy-s*.82} ${cx+s*.55},${cy-s*.82} ${cx+s*.55},${cy-s*.3}
               C${cx+s*.55},${cy+s*.12} ${cx},${cy+s*.12} ${cx},${cy}
               C${cx},${cy-s*.12} ${cx-s*.55},${cy-s*.12} ${cx-s*.55},${cy+s*.3}
               C${cx-s*.55},${cy+s*.82} ${cx+s*.55},${cy+s*.82} ${cx+s*.55},${cy+s*.3}`}
        fill="none" stroke={color} strokeWidth={s*0.075} opacity=".75" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r={s*0.1} fill={color} opacity=".65"/>
    </g>
  )

  if (symbol === 'pom') return (
    <g>
      {/* Pomegranate body */}
      <ellipse cx={cx} cy={cy + s*.2} rx={s*.46} ry={s*.42} fill="none" stroke={color} strokeWidth={s*.07} opacity=".76"/>
      {/* Crown */}
      <path d={`M${cx-s*.28},${cy-s*.22} L${cx-s*.16},${cy-s*.54} L${cx},${cy-s*.38} L${cx+s*.16},${cy-s*.54} L${cx+s*.28},${cy-s*.22}`}
        stroke={color} strokeWidth={s*.075} fill="none" strokeLinejoin="round" opacity=".76"/>
      {/* Seeds */}
      <circle cx={cx} cy={cy+s*.12} r={s*.1} fill={color} opacity=".58"/>
      <circle cx={cx-s*.22} cy={cy+s*.28} r={s*.075} fill={color} opacity=".52"/>
      <circle cx={cx+s*.22} cy={cy+s*.28} r={s*.075} fill={color} opacity=".52"/>
    </g>
  )

  return null
}

// ── Engraving preview SVG — adapts per piece type ─────────────────────────────
function EngravingPreview({ piece, metal: m, engraving, symbol, stone }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    el.classList.remove('engrave-pulse')
    void el.offsetWidth
    el.classList.add('engrave-pulse')
  }, [engraving, symbol])

  const c = m?.color || '#c8c5bf'
  const hi = m?.hi || '#e2e0db'
  const ox = m?.id === 'gold' ? '#8a7848' : '#7a7872'
  const hasStone = stone?.id && stone.id !== 'none'
  const sf = hasStone ? stone.fill : null

  // ── Signet ring — proper 3D perspective ──────────────────────────────────────
  if (piece === 'ring') return (
    <div ref={wrapRef} className="engrave-pulse-wrap">
      <svg viewBox="0 0 240 260" className="engrave-svg">
        <defs>
          <radialGradient id="rmg" cx="38%" cy="30%" r="68%">
            <stop offset="0%" stopColor={hi}/>
            <stop offset="58%" stopColor={c}/>
            <stop offset="100%" stopColor={ox}/>
          </radialGradient>
          <radialGradient id="rfg" cx="42%" cy="32%" r="62%">
            <stop offset="0%" stopColor={hi}/>
            <stop offset="100%" stopColor={c}/>
          </radialGradient>
          <linearGradient id="rwg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c}/>
            <stop offset="100%" stopColor={ox} stopOpacity=".8"/>
          </linearGradient>
          <filter id="rfs">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#1c1c1a" floodOpacity=".3"/>
          </filter>
          <filter id="rps">
            <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#1c1c1a" floodOpacity=".22"/>
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="120" cy="250" rx="62" ry="7" fill="#1c1c1a" opacity=".08"/>

        {/* Ring band — left wall */}
        <path d="M58 95 Q52 128 54 175 Q66 192 94 196 L96 184 Q70 180 66 165 Q64 128 70 95Z" fill="url(#rwg)" opacity=".8"/>

        {/* Ring band — right wall */}
        <path d="M182 95 Q188 128 186 175 Q174 192 146 196 L144 184 Q170 180 174 165 Q176 128 170 95Z" fill="url(#rwg)" opacity=".8"/>

        {/* Ring band — bottom arc */}
        <ellipse cx="120" cy="188" rx="52" ry="12" fill={ox} opacity=".55"/>
        <ellipse cx="120" cy="188" rx="52" ry="12" fill="none" stroke={hi} strokeWidth=".8" opacity=".25"/>

        {/* Ring top face */}
        <ellipse cx="120" cy="92" rx="74" ry="26" fill="url(#rmg)" filter="url(#rfs)"/>

        {/* Ring hole */}
        <ellipse cx="120" cy="92" rx="37" ry="14" fill="#1a1815"/>
        <ellipse cx="120" cy="92" rx="37" ry="14" fill="none" stroke={ox} strokeWidth=".8" opacity=".4"/>

        {/* Top face edge highlight */}
        <ellipse cx="120" cy="92" rx="74" ry="26" fill="none" stroke={hi} strokeWidth="1.8" opacity=".5"/>

        {/* Signet plate (front bezel) */}
        <rect x="76" y="112" width="88" height="74" rx="9" fill="url(#rfg)" filter="url(#rps)"/>
        <rect x="76" y="112" width="88" height="74" rx="9" fill="none" stroke={hi} strokeWidth="1.3" opacity=".5"/>

        {/* Inset engraving panel */}
        <rect x="83" y="119" width="74" height="60" rx="6" fill={c} opacity=".28"/>
        <rect x="83" y="119" width="74" height="60" rx="6" fill="none" stroke={ox} strokeWidth=".7" opacity=".3"/>

        {/* Stone on bezel */}
        {hasStone && <>
          <circle cx="120" cy="130" r="9" fill={sf} stroke={ox} strokeWidth="1.3" opacity=".95"/>
          <circle cx="117" cy="127" r="3" fill="#fff" opacity=".28"/>
        </>}

        {/* Armenian symbol — large and clear */}
        <SymbolMark symbol={symbol} cx={120} cy={hasStone ? 154 : 146} size={28} color={ox}/>

        {/* Engraved text */}
        {engraving ? (
          <text x="120" y={hasStone ? 176 : 172}
            textAnchor="middle" dominantBaseline="middle"
            fontSize={engraving.length > 7 ? 10 : engraving.length > 4 ? 13 : 16}
            fill={ox} fontFamily="'Marcellus',serif" letterSpacing="2.5" opacity=".9">
            {engraving.toUpperCase()}
          </text>
        ) : (
          <text x="120" y="165" textAnchor="middle" fontSize="9.5" fill={ox} opacity=".32"
            fontFamily="'Jost',sans-serif" letterSpacing="1.5">YOUR TEXT</text>
        )}
      </svg>
    </div>
  )

  // ── Bracelet / cuff ──────────────────────────────────────────────────────────
  if (piece === 'bracelet' || piece === 'cuff') {
    const isCuff = piece === 'cuff'
    return (
      <div ref={wrapRef} className="engrave-pulse-wrap">
        <svg viewBox="0 0 220 190" className="engrave-svg">
          <defs>
            <radialGradient id="brmg" cx="40%" cy="28%" r="65%">
              <stop offset="0%" stopColor={hi}/>
              <stop offset="55%" stopColor={c}/>
              <stop offset="100%" stopColor={ox}/>
            </radialGradient>
            <linearGradient id="brdg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={c}/>
              <stop offset="100%" stopColor={ox} stopOpacity=".7"/>
            </linearGradient>
            <filter id="brf">
              <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="#1c1c1a" floodOpacity=".22"/>
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="110" cy="182" rx="72" ry="6" fill="#1c1c1a" opacity=".07"/>

          {/* Bracelet body — oval band from slightly above */}
          <path d="M22 85 Q22 38 110 38 Q198 38 198 85 L198 110 Q198 157 110 157 Q22 157 22 110Z"
            fill="url(#brmg)" filter="url(#brf)"/>

          {/* Inner cavity (opening of bracelet) */}
          <path d="M52 85 Q52 62 110 62 Q168 62 168 85 L168 110 Q168 133 110 133 Q52 133 52 110Z"
            fill="#1c1b18" opacity=".85"/>
          <path d="M52 85 Q52 62 110 62 Q168 62 168 85 L168 110 Q168 133 110 133 Q52 133 52 110Z"
            fill="none" stroke={ox} strokeWidth=".9" opacity=".35"/>

          {/* Top edge highlight */}
          <path d="M22 85 Q22 38 110 38 Q198 38 198 85" fill="none" stroke={hi} strokeWidth="1.8" opacity=".55"/>

          {/* Cuff has a wider face band */}
          {isCuff && <>
            <path d="M22 97 Q22 50 110 50 Q198 50 198 97" fill="none" stroke={hi} strokeWidth="1" opacity=".25"/>
            <path d="M22 98 Q22 50 110 50 Q198 50 198 98 L198 85 Q198 38 110 38 Q22 38 22 85Z" fill={hi} opacity=".07"/>
          </>}

          {/* Stone on top */}
          {hasStone && <>
            <circle cx="110" cy="46" r="10" fill={sf} stroke={ox} strokeWidth="1.3" opacity=".92"/>
            <circle cx="107" cy="43" r="3.5" fill="#fff" opacity=".28"/>
          </>}

          {/* Symbol on inner band face (front visible portion) */}
          <SymbolMark symbol={symbol} cx={110} cy={hasStone ? 86 : 88} size={24} color={ox}/>

          {/* Engraved text */}
          {engraving ? (
            <text x="110" y={hasStone ? 110 : 112}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={engraving.length > 7 ? 11 : engraving.length > 4 ? 13 : 16}
              fill={ox} fontFamily="'Marcellus',serif" letterSpacing="3" opacity=".9">
              {engraving.toUpperCase()}
            </text>
          ) : (
            <text x="110" y="100" textAnchor="middle" fontSize="10" fill={ox} opacity=".32"
              fontFamily="'Jost',sans-serif" letterSpacing="1.5">YOUR TEXT</text>
          )}
        </svg>
      </div>
    )
  }

  // ── Earrings ─────────────────────────────────────────────────────────────────
  if (piece === 'earrings') return (
    <div ref={wrapRef} className="engrave-pulse-wrap">
      <svg viewBox="0 0 200 200" className="engrave-svg">
        <defs>
          <radialGradient id="emg" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor={hi}/>
            <stop offset="100%" stopColor={c}/>
          </radialGradient>
          <filter id="efs">
            <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#1c1c1a" floodOpacity=".2"/>
          </filter>
        </defs>

        {[52, 148].map(cx => (
          <g key={cx} filter="url(#efs)">
            {/* Post + butterfly */}
            <circle cx={cx} cy="22" r="8" fill="url(#emg)" stroke={ox} strokeWidth=".9"/>
            {hasStone && <>
              <circle cx={cx} cy="22" r="4" fill={sf} opacity=".9"/>
              <circle cx={cx-1.5} cy="20" r="1.5" fill="#fff" opacity=".3"/>
            </>}
            {!hasStone && <circle cx={cx} cy="22" r="2.5" fill={hi} opacity=".7"/>}

            {/* Connector wire */}
            <line x1={cx} y1="30" x2={cx} y2="52" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>

            {/* Drop body */}
            <path d={`M${cx-14} 72 Q${cx-16} 98 ${cx} 122 Q${cx+16} 98 ${cx+14} 72 Q${cx+10} 58 ${cx} 56 Q${cx-10} 58 ${cx-14} 72Z`}
              fill="url(#emg)" stroke={ox} strokeWidth=".8"/>

            {/* Highlight on drop */}
            <path d={`M${cx-7} 70 Q${cx-9} 88 ${cx-2} 108`} stroke={hi} strokeWidth="1.2" fill="none" opacity=".45"/>

            {/* Symbol on drop face */}
            <SymbolMark symbol={symbol} cx={cx} cy={88} size={17} color={ox}/>

            {/* Engraved text on drop */}
            {engraving && (
              <text x={cx} y="112" textAnchor="middle" fontSize="9" fill={ox}
                fontFamily="'Marcellus',serif" letterSpacing="1" opacity=".85">
                {engraving.slice(0, 2).toUpperCase()}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )

  // ── Pendant / Armenian cross (default) ───────────────────────────────────────
  return (
    <div ref={wrapRef} className="engrave-pulse-wrap">
      <svg viewBox="0 0 160 260" className="engrave-svg">
        <defs>
          <radialGradient id="pmg" cx="38%" cy="30%" r="65%">
            <stop offset="0%" stopColor={hi}/>
            <stop offset="55%" stopColor={c}/>
            <stop offset="100%" stopColor={ox}/>
          </radialGradient>
          <filter id="pfs">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1c1c1a" floodOpacity=".22"/>
          </filter>
          <filter id="pes">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor={ox} floodOpacity=".5"/>
          </filter>
        </defs>

        {/* Chain */}
        <path d="M80 24 Q62 32 60 44" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" opacity=".65"/>
        <path d="M80 24 Q98 32 100 44" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" opacity=".65"/>
        {[0.25, 0.5, 0.75].map(t => {
          const lx = 80 + (60 - 80) * t + (62 - 80) * t * (1-t) * 2
          const ly = 24 + (44 - 24) * t + (32 - 24) * t * (1-t) * 2
          return <circle key={`l${t}`} cx={lx} cy={ly} r="1.6" fill={c} opacity=".55"/>
        })}
        {[0.25, 0.5, 0.75].map(t => {
          const rx = 80 + (100 - 80) * t + (98 - 80) * t * (1-t) * 2
          const ry = 24 + (44 - 24) * t + (32 - 24) * t * (1-t) * 2
          return <circle key={`r${t}`} cx={rx} cy={ry} r="1.6" fill={c} opacity=".55"/>
        })}
        <path d="M80 24 Q62 32 60 44" stroke={hi} strokeWidth=".8" fill="none" strokeLinecap="round" opacity=".4"/>
        <path d="M80 24 Q98 32 100 44" stroke={hi} strokeWidth=".8" fill="none" strokeLinecap="round" opacity=".4"/>

        {/* Bail */}
        <rect x="74" y="42" width="12" height="18" rx="4" fill="url(#pmg)"/>
        <rect x="76" y="44" width="8" height="14" rx="2.5" fill="none" stroke={hi} strokeWidth=".8" opacity=".55"/>

        {/* Cross body — Armenian cross with flared tips */}
        <g filter="url(#pfs)">
          <rect x="68" y="58" width="24" height="152" rx="5" fill="url(#pmg)"/>
          <rect x="30" y="114" width="100" height="24" rx="5" fill="url(#pmg)"/>
          {/* Flared tips */}
          <polygon points="64,64 80,52 96,64 91,72 69,72" fill="url(#pmg)"/>
          <polygon points="64,202 80,214 96,202 91,194 69,194" fill="url(#pmg)"/>
          <polygon points="38,110 26,126 38,142 46,136 46,116" fill="url(#pmg)"/>
          <polygon points="122,110 134,126 122,142 114,136 114,116" fill="url(#pmg)"/>
          {/* Highlight stripe */}
          <rect x="74" y="60" width="6" height="148" rx="2" fill={hi} opacity=".3"/>
          <rect x="32" y="119" width="94" height="5" rx="2" fill={hi} opacity=".22"/>
        </g>

        {/* Armenian symbol in cross intersection — large, clear */}
        <SymbolMark symbol={symbol} cx={80} cy={126} size={26} color={ox}/>

        {/* Stone below symbol */}
        {hasStone && <>
          <circle cx="80" cy="184" r="10" fill={sf} stroke={ox} strokeWidth="1.2" opacity=".92"/>
          <circle cx="77" cy="181" r="3" fill="#fff" opacity=".28"/>
        </>}

        {/* Engraved initials */}
        {engraving ? (
          <text x="80" y={hasStone ? 160 : 168}
            textAnchor="middle" dominantBaseline="middle"
            fontSize={engraving.length > 4 ? 12 : engraving.length > 2 ? 15 : 19}
            fill={ox} fontFamily="'Marcellus',serif" letterSpacing="2.5"
            filter="url(#pes)" opacity=".88">
            {engraving.toUpperCase()}
          </text>
        ) : (
          <text x="80" y="162" textAnchor="middle" fontSize="9" fill={ox} opacity=".32"
            fontFamily="'Jost',sans-serif" letterSpacing="1.5">ADD TEXT</text>
        )}
      </svg>
    </div>
  )
}
