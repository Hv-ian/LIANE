import { useState } from 'react'
import { useCurrency } from '../context/CurrencyContext'
import { useLanguage } from '../context/LanguageContext'
import ringImg from '../assets/men-rings.jpg'
import braceletImg from '../assets/men-bracelet.jpg'
import ringPng from '../assets/ring-product.png'
import braceletPng from '../assets/bracelet-product.png'

const BASE_PRICE = { ring: 590, bracelet: 890 }
const ENGRAVING_FEE = 250

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
          left: s.left, top: s.top, width: s.size, height: s.size,
          animationDelay: s.delay, animationDuration: s.dur,
        }} />
      ))}
    </div>
  )
}

function StepBar({ step, labels }) {
  return (
    <div className="custom-stepbar">
      {labels.map((label, i) => (
        <div key={label} className={`custom-step ${i < step ? 'done' : i === step ? 'active' : ''}`}>
          <div className="custom-step-dot">{i < step ? '✓' : i + 1}</div>
          <div className="custom-step-label">{label}</div>
          {i < labels.length - 1 && <div className="custom-step-line" />}
        </div>
      ))}
    </div>
  )
}

function SummaryCard({ piece, stone, engraving, stoneLabel, t }) {
  const { formatPrice } = useCurrency()
  const base = BASE_PRICE[piece] || 590
  const total = base + (engraving.trim() ? ENGRAVING_FEE : 0)
  const pieceLabel = piece === 'ring' ? t('pieceRing') : t('pieceBracelet')
  return (
    <div className="summary-card">
      <div className="summary-card-head">{t('yourDesign')}</div>
      <div className="summary-card-row"><span>{pieceLabel}</span><span>{formatPrice(base)}</span></div>
      <div className="summary-card-row"><span>{t('materialLabel')}</span><span>{t('materialValue')}</span></div>
      {stone !== 'none' && <div className="summary-card-row"><span>{t('stoneLabel')}</span><span>{stoneLabel}</span></div>}
      {engraving.trim() && <div className="summary-card-row"><span>{t('engravingLabel')}</span><span>"{engraving.toUpperCase()}" +{formatPrice(ENGRAVING_FEE)}</span></div>}
      <div className="summary-card-total"><span>{t('estimatedTotal')}</span><span>{formatPrice(total)}</span></div>
      <div className="summary-card-note">{t('summaryNote')}</div>
    </div>
  )
}

function EngravingPreview({ piece, engraving, innerLabel, outerLabel, placeholder }) {
  const src = piece === 'ring' ? ringImg : braceletImg
  const hasText = engraving.trim().length > 0
  return (
    <div className={`engrave-photo-wrap ${piece}`}>
      <img src={src} className="engrave-photo" alt={piece} />
      <div className="engrave-photo-band" />
      <div className="engrave-photo-overlay">
        <div className={`engrave-photo-text ${hasText ? '' : 'placeholder'}`}>
          {hasText ? engraving.toUpperCase() : placeholder}
        </div>
        <div className="engrave-photo-caption">
          {piece === 'ring' ? innerLabel : outerLabel}
        </div>
      </div>
    </div>
  )
}

export default function CustomOrder({ onBack }) {
  const { t } = useLanguage()
  const [step, setStep]           = useState(0)
  const [piece, setPiece]         = useState(null)
  const [stone, setStone]         = useState('none')
  const [engraving, setEngraving] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [name,  setName]  = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const STEPS = [t('stepPiece'), t('stepStone'), t('stepEngrave'), t('stepContact')]

  const PIECE_TYPES = [
    { id: 'ring',     label: t('pieceRing'),     sub: t('pieceRingSub'),     engravingNote: t('pieceEngRing'),     img: ringImg,     png: ringPng },
    { id: 'bracelet', label: t('pieceBracelet'), sub: t('pieceBraceletSub'), engravingNote: t('pieceEngBracelet'), img: braceletImg, png: braceletPng },
  ]

  const STONES = [
    { id: 'none',      label: t('stoneNone'),      meaning: '',                      fill: null,      border: '#ccc' },
    { id: 'garnet',    label: t('stoneGarnet'),    meaning: t('stoneMeanGarnet'),    fill: '#9b2335', border: '#7a1c28' },
    { id: 'moonstone', label: t('stoneMoonstone'), meaning: t('stoneMeanMoonstone'), fill: '#dce8f0', border: '#a0bece' },
    { id: 'amethyst',  label: t('stoneAmethyst'),  meaning: t('stoneMeanAmethyst'),  fill: '#7b5ea7', border: '#5c4480' },
    { id: 'onyx',      label: t('stoneOnyx'),      meaning: t('stoneMeanOnyx'),      fill: '#2a2825', border: '#555' },
    { id: 'turquoise', label: t('stoneTurquoise'), meaning: t('stoneMeanTurquoise'), fill: '#45b2a0', border: '#2e8a7a' },
  ]

  const stoneObj = STONES.find(s => s.id === stone)
  const pieceObj = PIECE_TYPES.find(p => p.id === piece)

  function next() { setStep(s => Math.min(s + 1, STEPS.length - 1)) }
  function prev() { setStep(s => Math.max(s - 1, 0)) }

  const backLabel = t('back').replace('← ', '')

  if (submitted) return (
    <div className="custom-page custom-thanks">
      <div className="custom-thanks-inner">
        <div className="custom-thanks-mark">✦</div>
        <h1>{t('requestReceived')}</h1>
        <p>{t('requestThankYouP1')} {name.split(' ')[0] || t('requestThankYouFallback')}{t('requestThankYouP2')}</p>
        <SummaryCard piece={piece} stone={stone} engraving={engraving}
          stoneLabel={stoneObj?.label + (stoneObj?.meaning ? ' — ' + stoneObj.meaning : '')} t={t} />
        <button className="liane-btn" onClick={onBack} style={{ marginTop: 28 }}>{t('backToSiteBtn')}</button>
        <div className="custom-demo-note">{t('customDemoNote')}</div>
      </div>
    </div>
  )

  return (
    <div className="custom-page">

      <div className="custom-hero">
        <Sparks />
        <div className="custom-hero-text">
          <div className="eyebrow" style={{ color: '#c9b88a', letterSpacing: '4px' }}>{t('customEyebrow')}</div>
          <h1>{t('customH1')}</h1>
          <p>{t('customHeroDesc')}</p>
        </div>
        <div className="custom-hero-scroll" onClick={() => document.getElementById('custom-builder')?.scrollIntoView({ behavior: 'smooth' })}>
          <span>{t('customBegin')}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </div>

      <div className="custom-builder" id="custom-builder">
        <StepBar step={step} labels={STEPS} />
        <div className="custom-builder-body">

          {step === 0 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>{t('customPieceQ')}</h2>
                <p>{t('customPieceDesc')}</p>
              </div>
              <div className="piece-grid piece-grid-2">
                {PIECE_TYPES.map(pt => (
                  <button key={pt.id}
                    className={`piece-card piece-card-photo ${piece === pt.id ? 'active' : ''}`}
                    onClick={() => setPiece(pt.id)}
                  >
                    <div className="piece-photo-wrap">
                      <img src={pt.png} alt={pt.label} className="piece-photo-png" />
                      {piece === pt.id && <div className="piece-check">✓</div>}
                    </div>
                    <div className="piece-card-foot">
                      <div className="piece-label">{pt.label}</div>
                      <div className="piece-sub">{pt.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="custom-nav">
                <span className="back-link" onClick={onBack}>{t('backToSite')}</span>
                <button className="liane-btn" disabled={!piece} onClick={next}>{t('nextStone')}</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>{t('customStoneQ')}</h2>
                <p>{t('customStoneDesc')}</p>
              </div>
              <div className="silver-badge">
                <div className="silver-badge-swatch" />
                <div>
                  <div className="silver-badge-name">{t('silverBadge')}</div>
                  <div className="silver-badge-note">{t('silverBadgeNote')}</div>
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
                <button className="ghost-btn" onClick={prev}>← {backLabel}</button>
                <button className="liane-btn" onClick={next}>{t('nextEngrave')}</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>{t('customEngraveQ')}</h2>
                <p>{pieceObj?.engravingNote}</p>
              </div>
              <div className="engrave-layout">
                <div className="engrave-preview">
                  <EngravingPreview
                    piece={piece} engraving={engraving}
                    innerLabel={t('innerBandEngrave')} outerLabel={t('outerFaceEngrave')}
                    placeholder={t('yourTextPlaceholder')}
                  />
                </div>
                <div className="engrave-controls">
                  <div className="pers-section">
                    <div className="pers-label">{t('engravingText')} <span className="pers-badge">+{ENGRAVING_FEE} kr</span></div>
                    <input
                      className="pers-input" maxLength={16}
                      placeholder={t('engravingInputPlaceholder')}
                      value={engraving} onChange={e => setEngraving(e.target.value)}
                    />
                    <div className="pers-hint">{t('engravingHint')}</div>
                  </div>
                  <div className="engrave-info-box">
                    <div className="engrave-info-title">{t('howItsDone')}</div>
                    <p className="engrave-info-text">{t('howItsDoneText')}</p>
                  </div>
                </div>
              </div>
              <div className="custom-nav">
                <button className="ghost-btn" onClick={prev}>← {backLabel}</button>
                <button className="liane-btn" onClick={next}>{t('nextContact')}</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="custom-step-panel animate-in">
              <div className="custom-panel-head">
                <h2>{t('customContactQ')}</h2>
                <p>{t('customContactDesc')}</p>
              </div>
              <div className="contact-layout">
                <form className="contact-form" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                  <div className="ck-row2">
                    <input className="ck-input" placeholder={t('fullNamePlaceholder')} required value={name} onChange={e => setName(e.target.value)} />
                    <input className="ck-input" placeholder={t('email')} type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <input className="ck-input full" placeholder={t('phonePlaceholder')} value={phone} onChange={e => setPhone(e.target.value)} />
                  <textarea className="ck-input full ck-textarea" rows={4}
                    placeholder={t('notesPlaceholder')}
                    value={notes} onChange={e => setNotes(e.target.value)}
                  />
                  <div className="custom-nav" style={{ marginTop: 0 }}>
                    <button type="button" className="ghost-btn" onClick={prev}>← {backLabel}</button>
                    <button type="submit" className="liane-btn">{t('sendDesignRequest')}</button>
                  </div>
                </form>
                <SummaryCard piece={piece} stone={stone} engraving={engraving}
                  stoneLabel={stoneObj?.label + (stoneObj?.meaning ? ' — ' + stoneObj.meaning : '')} t={t} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
