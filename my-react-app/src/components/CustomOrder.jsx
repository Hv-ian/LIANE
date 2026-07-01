import { useState } from 'react'
import { formatPrice } from '../data/products'
import ringImg from '../assets/men-rings.jpg'
import braceletImg from '../assets/men-bracelet.jpg'

const STEPS = ['Piece', 'Stone', 'Engrave', 'Contact']

const PIECE_TYPES = [
  {
    id: 'ring',
    label: 'Ring',
    sub: 'Band / signet',
    engravingNote: 'Engraved on the inner band — a secret message only you know.',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="54" rx="22" ry="10" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity=".08"/>
        <rect x="18" y="28" width="44" height="26" rx="2" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1.4"/>
        <ellipse cx="40" cy="28" rx="22" ry="10" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity=".2"/>
        <ellipse cx="40" cy="28" rx="12" ry="5" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth=".9" opacity=".5"/>
      </svg>
    ),
  },
  {
    id: 'bracelet',
    label: 'Bracelet',
    sub: 'Cuff / bangle',
    engravingNote: 'Engraved on the outer face — visible, personal, and permanent.',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 40 Q12 18 40 18 Q68 18 68 40 Q68 62 40 62 Q12 62 12 40Z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity=".08"/>
        <path d="M18 40 Q18 24 40 24 Q62 24 62 40" fill="none" stroke="currentColor" strokeWidth="1" opacity=".35"/>
        {[0, 72, 144, 216, 288].map(a => {
          const r = 26, x = 40 + r * Math.cos(a * Math.PI / 180), y = 40 + r * Math.sin(a * Math.PI / 180)
          return <circle key={a} cx={x} cy={y} r="2.2" fill="currentColor" opacity=".3"/>
        })}
      </svg>
    ),
  },
]

const STONES = [
  { id: 'none',      label: 'No stone',   meaning: '',                              fill: null,      border: '#ccc' },
  { id: 'garnet',    label: 'Garnet',     meaning: 'Courage & vitality',            fill: '#9b2335', border: '#7a1c28' },
  { id: 'moonstone', label: 'Moonstone',  meaning: 'Balance & new beginnings',      fill: '#dce8f0', border: '#a0bece' },
  { id: 'amethyst',  label: 'Amethyst',   meaning: 'Peace & intuition',             fill: '#7b5ea7', border: '#5c4480' },
  { id: 'onyx',      label: 'Black onyx', meaning: 'Strength & protection',         fill: '#2a2825', border: '#555' },
  { id: 'turquoise', label: 'Turquoise',  meaning: 'Good fortune & communication',  fill: '#45b2a0', border: '#2e8a7a' },
]

const BASE_PRICE = { ring: 590, bracelet: 890 }
const ENGRAVING_FEE = 250

// ── Sparkle particles ─────────────────────────────────────────────────────────
function Sparks() {
  const sparks = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 37 + 11) % 100}%`,
    top:  `${(i * 53 + 7)  % 100}%`,
    delay: `${(i * 0.4) % 4}s`,
    size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
    dur:  `${3 + (i % 4)}s`,
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
function SummaryCard({ piece, stone, engraving }) {
  const s = STONES.find(x => x.id === stone)
  const p = PIECE_TYPES.find(x => x.id === piece)
  const base = BASE_PRICE[piece] || 590
  const total = base + (engraving.trim() ? ENGRAVING_FEE : 0)

  return (
    <div className="summary-card">
      <div className="summary-card-head">Your design</div>
      <div className="summary-card-row"><span>{p?.label}</span><span>{formatPrice(base)}</span></div>
      <div className="summary-card-row"><span>Material</span><span>Recycled Sterling Silver · 925</span></div>
      {stone !== 'none' && <div className="summary-card-row"><span>Stone</span><span>{s?.label} — {s?.meaning}</span></div>}
      {engraving.trim() && <div className="summary-card-row"><span>Engraving</span><span>"{engraving.toUpperCase()}" +{formatPrice(ENGRAVING_FEE)}</span></div>}
      <div className="summary-card-total"><span>Estimated total</span><span>{formatPrice(total)}</span></div>
      <div className="summary-card-note">Final price confirmed at consultation · handmade to order · 5–7 days</div>
    </div>
  )
}

// ── Photo engraving preview ───────────────────────────────────────────────────
function EngravingPreview({ piece, engraving }) {
  const src = piece === 'ring' ? ringImg : braceletImg
  const hasText = engraving.trim().length > 0
  return (
    <div className={`engrave-photo-wrap ${piece}`}>
      <img src={src} className="engrave-photo" alt={piece === 'ring' ? 'Silver ring' : 'Silver bracelet'} />
      {/* dark gradient band behind text */}
      <div className="engrave-photo-band" />
      <div className="engrave-photo-overlay">
        <div className={`engrave-photo-text ${hasText ? '' : 'placeholder'}`}>
          {hasText ? engraving.toUpperCase() : 'YOUR TEXT'}
        </div>
        <div className="engrave-photo-caption">
          {piece === 'ring' ? 'Inner band engraving' : 'Outer face engraving'}
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CustomOrder({ onBack }) {
  const [step, setStep]           = useState(0)
  const [piece, setPiece]         = useState(null)
  const [stone, setStone]         = useState('none')
  const [engraving, setEngraving] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [name,  setName]  = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  function next() { setStep(s => Math.min(s + 1, STEPS.length - 1)) }
  function prev() { setStep(s => Math.max(s - 1, 0)) }

  const stoneObj   = STONES.find(s => s.id === stone)
  const pieceObj   = PIECE_TYPES.find(p => p.id === piece)

  if (submitted) return (
    <div className="custom-page custom-thanks">
      <div className="custom-thanks-inner">
        <div className="custom-thanks-mark">✦</div>
        <h1>Request received</h1>
        <p>Thank you, {name.split(' ')[0] || 'there'}. We'll reach out within 48 hours to begin crafting your piece together.</p>
        <SummaryCard piece={piece} stone={stone} engraving={engraving} />
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
          <p>Choose your piece and stone. Add a name, an initial, a date. We engrave and hand-finish every custom order in recycled sterling silver.</p>
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

          {/* ── Step 0 · Piece ── */}
          {step === 0 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>What would you like to create?</h2>
                <p>Ring or bracelet — we'll craft the rest around your choice.</p>
              </div>
              <div className="piece-grid piece-grid-2">
                {PIECE_TYPES.map(pt => (
                  <button key={pt.id}
                    className={`piece-card piece-card-large ${piece === pt.id ? 'active' : ''}`}
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
                <button className="liane-btn" disabled={!piece} onClick={next}>Next — Stone</button>
              </div>
            </div>
          )}

          {/* ── Step 1 · Stone ── */}
          {step === 1 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>Choose your stone</h2>
                <p>Each stone carries its own meaning. All pieces are crafted in recycled sterling silver.</p>
              </div>

              <div className="silver-badge">
                <div className="silver-badge-swatch" />
                <div>
                  <div className="silver-badge-name">Recycled Sterling Silver · 925</div>
                  <div className="silver-badge-note">ethically sourced · hand-polished · hallmarked</div>
                </div>
              </div>

              <div className="stone-grid">
                {STONES.map(s => (
                  <button key={s.id} className={`stone-card ${stone === s.id ? 'active' : ''}`} onClick={() => setStone(s.id)}>
                    {s.fill ? (
                      <div className="stone-orb" style={{ background: `radial-gradient(circle at 35% 30%, ${s.fill}cc, ${s.border})`, border: `2px solid ${s.border}` }} />
                    ) : (
                      <div className="stone-orb stone-orb-none" />
                    )}
                    <div className="stone-name">{s.label}</div>
                    {s.meaning && <div className="stone-meaning">{s.meaning}</div>}
                  </button>
                ))}
              </div>

              {stone !== 'none' && (
                <div className="stone-selected-bar">
                  <div className="stone-selected-dot" style={{ background: stoneObj?.fill || 'transparent', border: `2px solid ${stoneObj?.border}` }} />
                  <strong>{stoneObj?.label}</strong>&ensp;·&ensp;{stoneObj?.meaning}
                </div>
              )}

              <div className="custom-nav">
                <button className="ghost-btn" onClick={prev}>← Back</button>
                <button className="liane-btn" onClick={next}>Next — Engrave</button>
              </div>
            </div>
          )}

          {/* ── Step 2 · Engrave ── */}
          {step === 2 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>Add your engraving</h2>
                <p>{pieceObj?.engravingNote}</p>
              </div>

              <div className="engrave-layout">
                <div className="engrave-preview">
                  <EngravingPreview piece={piece} engraving={engraving} />
                </div>

                <div className="engrave-controls">
                  <div className="pers-section">
                    <div className="pers-label">Text to engrave <span className="pers-badge">+{ENGRAVING_FEE} kr</span></div>
                    <input
                      className="pers-input"
                      maxLength={16}
                      placeholder="A name, initials, or date…"
                      value={engraving}
                      onChange={e => setEngraving(e.target.value)}
                    />
                    <div className="pers-hint">Max 16 characters · hand-engraved · optional — skip to continue</div>
                  </div>

                  <div className="engrave-info-box">
                    <div className="engrave-info-title">How it's done</div>
                    <p className="engrave-info-text">Each letter is cut by hand using a traditional engraving tool — not laser-etched. The depth and texture give every piece a mark that's completely its own.</p>
                  </div>
                </div>
              </div>

              <div className="custom-nav">
                <button className="ghost-btn" onClick={prev}>← Back</button>
                <button className="liane-btn" onClick={next}>Next — Contact</button>
              </div>
            </div>
          )}

          {/* ── Step 3 · Contact ── */}
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
                <SummaryCard piece={piece} stone={stone} engraving={engraving} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
