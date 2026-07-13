import { useLanguage } from '../context/LanguageContext'

export default function Heritage({ symbols, onNavigate }) {
  const { t } = useLanguage()
  return (
    <div className="heritage-page">
      <section className="heritage-hero">
        <div className="eyebrow">{t('heritageEyebrow')}</div>
        <h1>{t('heritageH1')}</h1>
        <p>{t('heritageP')}</p>
      </section>
      <section className="heritage-grid">
        {symbols.map(s => (
          <div className="symbol-card" key={s.name}>
            <div className="symbol-img"><img src={s.img} alt={s.name} /></div>
            <h3>{s.name}</h3>
            <div className="symbol-meaning">{s.meaning}</div>
            <p>{s.desc}</p>
          </div>
        ))}
      </section>
      <section className="heritage-cta">
        <p>{t('heritageCtaP')}</p>
        <button className="liane-btn" onClick={() => onNavigate('custom')}>{t('heritageCtaBtn')}</button>
      </section>
    </div>
  )
}
