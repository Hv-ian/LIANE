import { useCurrency } from '../context/CurrencyContext'
import PersonalizationPanel from './PersonalizationPanel'

const metals = [
  { name: 'Gold', active: true },
  { name: 'White gold', active: false },
  { name: 'Silver', active: false },
]
const accordion = [{ label: 'Details & materials' }, { label: 'Sizing & fit' }, { label: 'Shipping & returns' }]

export default function Product({ product, onBack, onAdd }) {
  const { formatPrice } = useCurrency()
  if (!product) return null
  return (
    <div className="product-page">
      <div className="back-link" onClick={onBack}>← Back to collection</div>

      {product.personalizable && (
        <div className="pers-flag">✦ This piece can be personalised</div>
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

          <div className="metal-label">Metal</div>
          <div className="metal-row">
            {metals.map(m => (
              <div key={m.name} className={`metal-chip ${m.active ? 'active' : ''}`}>{m.name}</div>
            ))}
          </div>

          <div className="prod-actions">
            <button className="liane-btn flex" onClick={() => onAdd(product)}>Add to cart — {formatPrice(product.price)}</button>
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
            <div className="eyebrow">Made for you</div>
            <h2>Design your own</h2>
            <p>Choose your initials, symbol, stone, and metal. We engrave each piece by hand before it ships.</p>
          </div>
          <PersonalizationPanel product={product} onAdd={onAdd} />
        </div>
      )}
    </div>
  )
}
