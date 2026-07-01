import { useState } from 'react'
import { formatPrice } from '../data/products'

const ENGRAVING_PRICE = 250

const METALS = [
  { id: 'silver', label: 'Sterling silver', main: '#c8c5bf', hi: '#e2e0db', shadow: '#a8a5a0', oxidized: '#7a7872' },
  { id: 'gold',   label: 'Solid gold',      main: '#c9b88a', hi: '#ddd0a5', shadow: '#b09a68', oxidized: '#8a7848' },
]

const STONES = [
  { id: 'none',      label: 'No stone',  fill: 'none',    stroke: 'none' },
  { id: 'garnet',    label: 'Garnet',    fill: '#9b2335', stroke: '#7a1c28' },
  { id: 'moonstone', label: 'Moonstone', fill: '#dce8f0', stroke: '#b8ccd8' },
  { id: 'amethyst',  label: 'Amethyst',  fill: '#7b5ea7', stroke: '#5c4480' },
  { id: 'onyx',      label: 'Black onyx',fill: '#2a2825', stroke: '#1a1816' },
]

const SYMBOLS = [
  { id: 'cross',  label: 'Khachkar cross' },
  { id: 'knot',   label: 'Eternity knot' },
  { id: 'pom',    label: 'Pomegranate' },
]

const CHAINS = ['40 cm', '45 cm', '50 cm']

// ── SVG pendant ──────────────────────────────────────────────────────────────
function PendantSVG({ initials, metal, stone, symbol }) {
  const m = METALS.find(x => x.id === metal)
  const s = STONES.find(x => x.id === stone)
  const hasStone = stone !== 'none'

  return (
    <svg viewBox="0 0 280 420" xmlns="http://www.w3.org/2000/svg" className="pendant-svg">
      <defs>
        <radialGradient id="metalGrad" cx="38%" cy="30%" r="65%">
          <stop offset="0%"   stopColor={m.hi} />
          <stop offset="55%"  stopColor={m.main} />
          <stop offset="100%" stopColor={m.shadow} />
        </radialGradient>
        <radialGradient id="stoneGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%"   stopColor={s.fill} stopOpacity=".9" />
          <stop offset="100%" stopColor={s.stroke} />
        </radialGradient>
        <filter id="pendantShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1c1c1a" floodOpacity=".18" />
        </filter>
        <filter id="engraveShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor={m.shadow} floodOpacity=".6" />
        </filter>
      </defs>

      {/* chain */}
      <path d="M 140 62 Q 100 50 72 28" stroke={m.main} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".7" />
      <path d="M 140 62 Q 180 50 208 28" stroke={m.main} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".7" />
      <path d="M 140 62 Q 100 50 72 28" stroke={m.hi} strokeWidth=".8" fill="none" strokeLinecap="round" opacity=".5" />
      <path d="M 140 62 Q 180 50 208 28" stroke={m.hi} strokeWidth=".8" fill="none" strokeLinecap="round" opacity=".5" />
      {/* chain links hint */}
      {[0.2, 0.4, 0.6, 0.8].map(t => {
        const lx = 140 + (72 - 140) * t + (100 - 140) * t * (1 - t) * 2
        const ly = 62 + (28 - 62) * t + (50 - 62) * t * (1 - t) * 2
        return <circle key={`l${t}`} cx={lx} cy={ly} r="1.8" fill={m.main} opacity=".6" />
      })}
      {[0.2, 0.4, 0.6, 0.8].map(t => {
        const rx = 140 + (208 - 140) * t + (180 - 140) * t * (1 - t) * 2
        const ry = 62 + (28 - 62) * t + (50 - 62) * t * (1 - t) * 2
        return <circle key={`r${t}`} cx={rx} cy={ry} r="1.8" fill={m.main} opacity=".6" />
      })}

      {/* bail */}
      <rect x="133" y="55" width="14" height="22" rx="4" fill="url(#metalGrad)" filter="url(#pendantShadow)" />
      <rect x="135.5" y="57.5" width="9" height="17" rx="2.5" fill="none" stroke={m.hi} strokeWidth=".8" opacity=".6" />

      {/* cross body — Armenian cross with slightly flared ends */}
      <g filter="url(#pendantShadow)" style={{ transition: 'all .4s ease' }}>
        {/* vertical bar */}
        <rect x="126" y="72" width="28" height="230" rx="5" fill="url(#metalGrad)" />
        {/* horizontal bar */}
        <rect x="72"  y="178" width="136" height="28" rx="5" fill="url(#metalGrad)" />

        {/* flared tips — top */}
        <polygon points="122,80 140,68 158,80 152,88 128,88" fill="url(#metalGrad)" />
        {/* flared tips — bottom */}
        <polygon points="122,294 140,306 158,294 152,286 128,286" fill="url(#metalGrad)" />
        {/* flared tips — left */}
        <polygon points="80,174 68,192 80,210 88,204 88,180" fill="url(#metalGrad)" />
        {/* flared tips — right */}
        <polygon points="200,174 212,192 200,210 192,204 192,180" fill="url(#metalGrad)" />

        {/* surface highlight */}
        <rect x="133" y="74" width="8" height="226" rx="3" fill={m.hi} opacity=".35" />
        <rect x="74"  y="182" width="130" height="8" rx="3" fill={m.hi} opacity=".25" />

        {/* oxidized edge lines for depth */}
        <rect x="126" y="72" width="28" height="230" rx="5" fill="none" stroke={m.oxidized} strokeWidth=".6" opacity=".4" />
        <rect x="72"  y="178" width="136" height="28" rx="5" fill="none" stroke={m.oxidized} strokeWidth=".6" opacity=".4" />
      </g>

      {/* Armenian decorative motif in cross intersection */}
      <SymbolMark symbol={symbol} cx={140} cy={192} metal={m} />

      {/* stone */}
      {hasStone && (
        <g>
          <circle cx="140" cy="265" r="9" fill="url(#stoneGrad)" />
          <circle cx="140" cy="265" r="9" fill="none" stroke={m.oxidized} strokeWidth="1.2" />
          <circle cx="137" cy="262" r="2.5" fill="#fff" opacity=".35" />
        </g>
      )}

      {/* engraved initials */}
      {initials && (
        <text
          x="140"
          y={hasStone ? 245 : 255}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Marcellus', 'Georgia', serif"
          fontSize={initials.length === 1 ? 32 : initials.length === 2 ? 22 : 16}
          fill={m.oxidized}
          filter="url(#engraveShadow)"
          letterSpacing="2"
          style={{ transition: 'all .25s ease', userSelect: 'none' }}
        >
          {initials.toUpperCase()}
        </text>
      )}

      {/* placeholder when no initials */}
      {!initials && (
        <text x="140" y="248" textAnchor="middle" dominantBaseline="middle"
          fontFamily="'Jost', sans-serif" fontSize="10" fill={m.oxidized} opacity=".4"
          letterSpacing="1.5">
          ADD INITIALS
        </text>
      )}
    </svg>
  )
}

// Armenian decorative marks
function SymbolMark({ symbol, cx, cy, metal: m }) {
  const c = m.oxidized
  const op = .55
  if (symbol === 'cross') return (
    <g opacity={op}>
      <rect x={cx - 1.5} y={cy - 14} width="3" height="28" rx="1" fill={c} />
      <rect x={cx - 14} y={cy - 1.5} width="28" height="3" rx="1" fill={c} />
      <circle cx={cx} cy={cy} r="4.5" fill="none" stroke={c} strokeWidth="1.2" />
    </g>
  )
  if (symbol === 'knot') return (
    <g opacity={op}>
      <path d={`M${cx-9},${cy-9} Q${cx},${cy-18} ${cx+9},${cy-9} Q${cx+18},${cy} ${cx+9},${cy+9} Q${cx},${cy+18} ${cx-9},${cy+9} Q${cx-18},${cy} ${cx-9},${cy-9}Z`}
        fill="none" stroke={c} strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r="2" fill={c} />
    </g>
  )
  if (symbol === 'pom') return (
    <g opacity={op}>
      <circle cx={cx} cy={cy + 4} r="7" fill="none" stroke={c} strokeWidth="1.2" />
      <path d={`M${cx-3},${cy-3} L${cx},${cy-9} L${cx+3},${cy-3}`} stroke={c} strokeWidth="1.2" fill="none" />
      <circle cx={cx} cy={cy + 2} r="1.5" fill={c} />
      <circle cx={cx - 4} cy={cy + 5} r="1.2" fill={c} />
      <circle cx={cx + 4} cy={cy + 5} r="1.2" fill={c} />
    </g>
  )
  return null
}

// ── Main panel ────────────────────────────────────────────────────────────────
export default function PersonalizationPanel({ product, onAdd }) {
  const [initials, setInitials] = useState('')
  const [metal, setMetal] = useState(product.material === 'gold' ? 'gold' : 'silver')
  const [stone, setStone] = useState('none')
  const [symbol, setSymbol] = useState('cross')
  const [chain, setChain] = useState('45 cm')

  const engravingFee = initials.trim().length > 0 ? ENGRAVING_PRICE : 0
  const total = product.price + engravingFee

  function handleAdd() {
    const config = {
      ...product,
      id: product.id + '-custom',
      name: `${product.name}${initials ? ` — "${initials.toUpperCase()}"` : ''}`,
      price: total,
      customConfig: { initials: initials.toUpperCase(), metal, stone, symbol, chain },
    }
    onAdd(config)
  }

  return (
    <div className="pers-panel">
      <div className="pers-preview">
        <PendantSVG initials={initials} metal={metal} stone={stone} symbol={symbol} />
        <div className="pers-preview-note">Live preview · not to scale</div>
      </div>

      <div className="pers-controls">
        <div className="pers-headline">Personalise this piece</div>

        {/* initials */}
        <div className="pers-section">
          <div className="pers-label">Engraved initials <span className="pers-badge">+{ENGRAVING_PRICE} kr</span></div>
          <input
            className="pers-input"
            maxLength={3}
            placeholder="e.g. L · LA · LIA"
            value={initials}
            onChange={e => setInitials(e.target.value.replace(/[^a-zA-Z·. ]/g, ''))}
          />
          <div className="pers-hint">1–3 letters, spaced with · if needed</div>
        </div>

        {/* Armenian symbol */}
        <div className="pers-section">
          <div className="pers-label">Engraved symbol</div>
          <div className="pers-chip-row">
            {SYMBOLS.map(s => (
              <button key={s.id} className={`pers-chip ${symbol === s.id ? 'active' : ''}`} onClick={() => setSymbol(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* metal */}
        <div className="pers-section">
          <div className="pers-label">Metal</div>
          <div className="pers-chip-row">
            {METALS.map(m => (
              <button key={m.id} className={`pers-chip ${metal === m.id ? 'active' : ''}`} onClick={() => setMetal(m.id)}>
                <span className="pers-swatch" style={{ background: m.main }}></span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* stone */}
        <div className="pers-section">
          <div className="pers-label">Stone accent <span className="pers-muted">— choose for meaning</span></div>
          <div className="pers-stone-row">
            {STONES.map(s => (
              <button key={s.id} title={s.label} className={`pers-stone-btn ${stone === s.id ? 'active' : ''}`}
                onClick={() => setStone(s.id)}>
                <span className="pers-stone-dot" style={{ background: s.id === 'none' ? 'transparent' : s.fill, border: s.id === 'none' ? '1.5px dashed #ccc' : `1.5px solid ${s.stroke}` }}></span>
                <span className="pers-stone-label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* chain length */}
        <div className="pers-section">
          <div className="pers-label">Chain length</div>
          <div className="pers-chip-row">
            {CHAINS.map(c => (
              <button key={c} className={`pers-chip ${chain === c ? 'active' : ''}`} onClick={() => setChain(c)}>{c}</button>
            ))}
          </div>
        </div>

        {/* price + CTA */}
        <div className="pers-price-row">
          <div>
            <div className="pers-price">{formatPrice(total)}</div>
            {engravingFee > 0 && <div className="pers-price-note">Incl. {formatPrice(ENGRAVING_PRICE)} engraving</div>}
          </div>
          <button className="liane-btn pers-add-btn" onClick={handleAdd}>
            Add to cart
          </button>
        </div>
        <div className="pers-disclaimer">Each piece is hand-finished to order · allow 5–7 days</div>
      </div>
    </div>
  )
}
