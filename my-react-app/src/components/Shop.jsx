import { formatPrice } from '../data/products'

export default function Shop({ products, gender, onOpen, onAdd }) {
  const filtered = products.filter(p => !gender || p.gender === gender || p.gender === 'unisex')
  const heading = gender === 'women' ? 'Women' : gender === 'men' ? 'Men' : 'The Collection'
  const eyebrow = gender === 'women' ? 'For her' : gender === 'men' ? 'For him' : 'All pieces'

  return (
    <div className="shop-page">
      <div className="section-head">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{heading}</h1>
      </div>
      <div className="filters">
        {['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((f, i) => (
          <div key={f} className={`filter-item ${i === 0 ? 'active' : ''}`}>{f}</div>
        ))}
      </div>
      <div className="prod-grid4">
        {filtered.map(p => (
          <div className="prod-card" key={p.id}>
            <div className="prod-thumb" onClick={() => onOpen(p.id)}>
              <img src={p.img} alt={p.name} />
            </div>
            <div className="prod-cat">{p.category}</div>
            <div className="prod-row">
              <div className="prod-name" onClick={() => onOpen(p.id)}>{p.name}</div>
              <div className="prod-price">{formatPrice(p.price)}</div>
            </div>
            <button className="ghost-btn" onClick={() => onAdd(p)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}
