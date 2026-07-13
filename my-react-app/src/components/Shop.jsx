import { useState } from 'react'
import { useCurrency } from '../context/CurrencyContext'
import { useLanguage } from '../context/LanguageContext'

export default function Shop({ products, gender, material, onOpen, onAdd }) {
  const { formatPrice } = useCurrency()
  const { t } = useLanguage()
  const [category, setCategory] = useState('All')

  const filtered = products
    .filter(p => !gender || p.gender === gender || p.gender === 'unisex')
    .filter(p => !material || p.material === material)
    .filter(p => category === 'All' || p.category === category)

  const heading = gender === 'women' ? t('women') : gender === 'men' ? t('men') : material === 'silver' ? t('silverStone') : t('collection')
  const eyebrow = gender === 'women' ? t('forHer') : gender === 'men' ? t('forHim') : material === 'silver' ? t('silverStoneEyebrow') : t('forAll')

  const filters = [
    { key: 'All', label: t('all') },
    { key: 'Rings', label: t('rings') },
    { key: 'Necklaces', label: t('necklaces') },
    { key: 'Earrings', label: t('earrings') },
    { key: 'Bracelets', label: t('bracelets') },
  ]

  return (
    <div className="shop-page">
      <div className="section-head">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{heading}</h1>
      </div>
      <div className="filters">
        {filters.map(f => (
          <div key={f.key} className={`filter-item ${category === f.key ? 'active' : ''}`} onClick={() => setCategory(f.key)}>{f.label}</div>
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
            <button className="ghost-btn" onClick={() => onAdd(p)}>{t('addToCart')}</button>
          </div>
        ))}
        {filtered.length === 0 && <div className="shop-empty">{t('shopEmpty')}</div>}
      </div>
    </div>
  )
}
