import { useCurrency } from '../context/CurrencyContext'

export default function Sets({ sets, products, onOpen, onAddSet }) {
  const { formatPrice } = useCurrency()
  return (
    <div className="sets-page">
      <div className="section-head">
        <div className="eyebrow">Worn together</div>
        <h1>Matching sets</h1>
        <p className="sets-intro">Pieces designed to be split between two people, or carried across a family — sisters, brothers, best friends, generations.</p>
      </div>
      <div className="sets-grid">
        {sets.map(s => {
          const items = s.itemIds.map(id => products.find(p => p.id === id)).filter(Boolean)
          const total = items.reduce((a, p) => a + p.price, 0)
          return (
            <div className="set-card" key={s.id}>
              <div className="set-img"><img src={s.img} alt={s.name} /></div>
              <div className="set-body">
                <div className="set-eyebrow">{s.eyebrow} · {s.occasion}</div>
                <h2>{s.name}</h2>
                <p>{s.desc}</p>
                <div className="set-meaning">{s.meaning}</div>
                <div className="set-items">
                  {items.map(p => (
                    <div className="set-item-row" key={p.id} onClick={() => onOpen(p.id)}>
                      <span>{p.name}</span>
                      <span>{formatPrice(p.price)}</span>
                    </div>
                  ))}
                </div>
                <button className="liane-btn full" onClick={() => onAddSet(items)}>Add set to cart — {formatPrice(total)}</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
