import { useState } from 'react'
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

// ── Engraving preview SVG — adapts per piece type ─────────────────────────────
function EngravingPreview({ piece, metal: m, engraving, symbol, stone }) {
  const c = m?.color || '#c8c5bf'
  const hi = m?.hi || '#e2e0db'
  const ox = m?.id === 'gold' ? '#8a7848' : '#7a7872'
  const hasStone = stone?.id && stone.id !== 'none'
  const sf = hasStone ? stone.fill : null

  // ring preview
  if (piece === 'ring') return (
    <svg viewBox="0 0 200 140" className="engrave-svg">
      <defs>
        <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={hi}/><stop offset="100%" stopColor={c}/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="95" rx="55" ry="22" fill={c} opacity=".3"/>
      <rect x="45" y="42" width="110" height="53" rx="4" fill="url(#rg)" opacity=".9"/>
      <ellipse cx="100" cy="42" rx="55" ry="20" fill={hi}/>
      <ellipse cx="100" cy="42" rx="55" ry="20" fill="none" stroke={ox} strokeWidth="1"/>
      {hasStone && <ellipse cx="100" cy="42" rx="12" ry="7" fill={sf} opacity=".9"/>}
      {engraving && <text x="100" y="72" textAnchor="middle" dominantBaseline="middle" fontSize={engraving.length > 6 ? 11 : 14} fill={ox} fontFamily="'Marcellus',serif" letterSpacing="2">{engraving.toUpperCase()}</text>}
      {!engraving && <text x="100" y="72" textAnchor="middle" fontSize="9" fill={ox} opacity=".4" fontFamily="'Jost',sans-serif" letterSpacing="1.5">YOUR TEXT</text>}
    </svg>
  )

  // bracelet / cuff
  if (piece === 'bracelet' || piece === 'cuff') return (
    <svg viewBox="0 0 200 160" className="engrave-svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={hi}/><stop offset="100%" stopColor={c}/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="126" rx="70" ry="22" fill={c} opacity=".2"/>
      <path d="M30 70 Q30 30 100 30 Q170 30 170 70 L170 100 Q170 140 100 140 Q30 140 30 100Z" fill="url(#bg)" stroke={ox} strokeWidth="1.2"/>
      <path d="M30 84 Q30 50 100 50 Q170 50 170 84" stroke={hi} strokeWidth="1" opacity=".5"/>
      {hasStone && <circle cx="100" cy="38" r="7" fill={sf} stroke={ox} strokeWidth="1"/>}
      {engraving && <text x="100" y="110" textAnchor="middle" dominantBaseline="middle" fontSize={engraving.length > 6 ? 10 : 13} fill={ox} fontFamily="'Marcellus',serif" letterSpacing="3">{engraving.toUpperCase()}</text>}
      {!engraving && <text x="100" y="110" textAnchor="middle" fontSize="9" fill={ox} opacity=".4" fontFamily="'Jost',sans-serif" letterSpacing="1.5">YOUR TEXT</text>}
    </svg>
  )

  // earrings
  if (piece === 'earrings') return (
    <svg viewBox="0 0 200 160" className="engrave-svg">
      <defs>
        <radialGradient id="eg"><stop offset="0%" stopColor={hi}/><stop offset="100%" stopColor={c}/></radialGradient>
      </defs>
      {[55, 145].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy="32" r="11" fill="url(#eg)" stroke={ox} strokeWidth="1"/>
          {hasStone && <circle cx={cx} cy="32" r="5" fill={sf}/>}
          <line x1={cx} y1="43" x2={cx} y2="70" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx={cx} cy="90" rx="12" ry="18" fill="url(#eg)" stroke={ox} strokeWidth="1"/>
          {engraving && <text x={cx} y="90" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill={ox} fontFamily="'Marcellus',serif">{engraving.slice(0,2).toUpperCase()}</text>}
        </g>
      ))}
    </svg>
  )

  // default: pendant / cross
  return (
    <svg viewBox="0 0 160 240" className="engrave-svg">
      <defs>
        <radialGradient id="pg" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor={hi}/><stop offset="100%" stopColor={c}/>
        </radialGradient>
        <filter id="ps"><feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#1c1c1a" floodOpacity=".2"/></filter>
      </defs>
      <path d="M80 22 Q65 30 64 40" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".6"/>
      <path d="M80 22 Q95 30 96 40" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".6"/>
      <rect x="75" y="38" width="10" height="16" rx="3" fill={c} opacity=".7"/>
      <g filter="url(#ps)">
        <rect x="68" y="52" width="24" height="148" rx="5" fill="url(#pg)"/>
        <rect x="32" y="108" width="96" height="24" rx="5" fill="url(#pg)"/>
        <polygon points="64,58 80,46 96,58 91,66 69,66" fill="url(#pg)"/>
        <polygon points="64,192 80,204 96,192 91,184 69,184" fill="url(#pg)"/>
        <polygon points="40,104 28,120 40,136 48,130 48,110" fill="url(#pg)"/>
        <polygon points="120,104 132,120 120,136 112,130 112,110" fill="url(#pg)"/>
        <rect x="74" y="54" width="7" height="144" rx="3" fill={hi} opacity=".3"/>
      </g>
      {/* symbol in cross intersection */}
      {symbol === 'cross' && <>
        <line x1="80" y1="108" x2="80" y2="132" stroke={ox} strokeWidth="1.5" opacity=".7"/>
        <line x1="68" y1="120" x2="92" y2="120" stroke={ox} strokeWidth="1.5" opacity=".7"/>
        <circle cx="80" cy="120" r="5" fill="none" stroke={ox} strokeWidth="1" opacity=".6"/>
      </>}
      {symbol === 'knot' && <path d={`M71,112 Q80,103 89,112 Q98,121 89,130 Q80,139 71,130 Q62,121 71,112Z`} fill="none" stroke={ox} strokeWidth="1.3" opacity=".6"/>}
      {symbol === 'pom' && <>
        <circle cx="80" cy="122" r="7" fill="none" stroke={ox} strokeWidth="1.2" opacity=".6"/>
        <path d="M77,115 L80,109 L83,115" stroke={ox} strokeWidth="1.2" fill="none" opacity=".6"/>
      </>}
      {hasStone && <circle cx="80" cy="168" r="8" fill={sf} stroke={ox} strokeWidth="1.2"/>}
      {engraving && <text x="80" y={hasStone ? 148 : 155} textAnchor="middle" dominantBaseline="middle" fontSize={engraving.length > 4 ? 11 : 14} fill={ox} fontFamily="'Marcellus',serif" letterSpacing="2">{engraving.toUpperCase()}</text>}
      {!engraving && <text x="80" y="150" textAnchor="middle" fontSize="8" fill={ox} opacity=".4" fontFamily="'Jost',sans-serif" letterSpacing="1.5">ADD TEXT</text>}
    </svg>
  )
}
