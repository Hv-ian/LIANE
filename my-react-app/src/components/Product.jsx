import { useCurrency } from '../context/CurrencyContext'
import { useLanguage } from '../context/LanguageContext'
import PersonalizationPanel from './PersonalizationPanel'

export default function Product({ product, onBack, onAdd }) {
  const { formatPrice } = useCurrency()
  const { t } = useLanguage()
  if (!product) return null

  const metals = [
    { name: t('metalGold'), active: true },
    { name: t('metalWhiteGold'), active: false },
    { name: t('metalSilver'), active: false },
  ]
  const accordion = [
    { label: t('accordionDetails') },
    { label: t('accordionSizing') },
    { label: t('accordionShipping') },
  ]

  return (
    <div className="product-page">
      <div className="back-link" onClick={onBack}>{t('back')}</div>

      {product.personalizable && (
        <div className="pers-flag">{t('personalisableFlag')}</div>
      )}

      <div className="prod-detail">
        <div className="prod-gallery">
          <div className="prod-thumbs">
            {[1, 2, 3, 4].map(i => (
              <div className="prod-thumb-sm" key={i}><img src={product.img} alt="" /></div>
            ))}
          </div>
          <div className="prod-main-img"><img src={product.img} alt={product.name} /></div>
        </div>
        <div className="prod-info">
          <div className="prod-cat">{product.category}</div>
          <h1>{product.name}</h1>
          <div className="prod-price-lg">{formatPrice(product.price)}</div>
          <p className="prod-desc">{product.desc}</p>

          <div className="metal-label">{t('metalLabel')}</div>
          <div className="metal-row">
            {metals.map(m => (
              <div key={m.name} className={`metal-chip ${m.active ? 'active' : ''}`}>{m.name}</div>
            ))}
          </div>

          <div className="prod-actions">
            <button className="liane-btn flex" onClick={() => onAdd(product)}>{t('addToCartBtn')} — {formatPrice(product.price)}</button>
            <button className="wish-btn">♡</button>
          </div>

          <div className="accordion">
            {accordion.map(a => (
              <div className="accordion-row" key={a.label}>
                <span>{a.label}</span><span className="plus">+</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {product.personalizable && (
        <div className="pers-section-wrap">
          <div className="pers-section-head">
            <div className="eyebrow">{t('persEyebrow')}</div>
            <h2>{t('persH2')}</h2>
            <p>{t('persIntro')}</p>
          </div>
          <PersonalizationPanel product={product} onAdd={onAdd} />
        </div>
      )}
    </div>
  )
}
