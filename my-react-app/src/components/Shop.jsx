import { useState } from 'react'
import { formatPrice } from '../data/products'

export default function Shop({ products, gender, material, onOpen, onAdd }) {
  const [category, setCategory] = useState('All')

  const filtered = products
    .filter(p => !gender || p.gender === gender || p.gender === 'unisex')
    .filter(p => !material || p.material === material)
    .filter(p => category === 'All' || p.category === category)

  const heading = gender === 'women' ? 'Women' : gender === 'men' ? 'Men' : material === 'silver' ? 'Silver & Stone' : 'The Collection'
  const eyebrow = gender === 'women' ? 'For her' : gender === 'men' ? 'For him' : material === 'silver' ? 'Natural stone, hand-set in sterling silver' : 'All pieces'

  return (
    <div className="shop-page">
      <div className="section-head">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{heading}</h1>
      </div>
      <div className="filters">
        {['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map(f => (
          <div key={f} className={`filter-item ${category === f ? 'active' : ''}`} onClick={() => setCategory(f)}>{f}</div>
        ))}
      </div>
      <div className="prod-grid4">
        {filtered.map(p => (
          <div className="prod-card" key={p.id}>
            <div className="prod-thumb" onClick={() => onOpen(p.id)}>
              <img src={p.img} alt={p.name} />
              {p.material === 'silver' && <div className="prod-material-badge">Silver</div>}
            </div>
            <div className="prod-cat">{p.category}</div>
            <div className="prod-row">
              <div className="prod-name" onClick={() => onOpen(p.id)}>{p.name}</div>
              <div className="prod-price">{formatPrice(p.price)}</div>
            </div>
            {p.meaning && <div className="prod-meaning">{p.meaning}</div>}
            <button className="ghost-btn" onClick={() => onAdd(p)}>Add to cart</button>
          </div>
        ))}
        {filtered.length === 0 && <div className="shop-empty">No pieces match this filter yet.</div>}
      </div>
    </div>
  )
}
