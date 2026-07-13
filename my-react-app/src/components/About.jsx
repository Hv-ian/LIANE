import { useLanguage } from '../context/LanguageContext'

export default function About({ onNavigate }) {
  const { t } = useLanguage()

  const values = [
    { stat: '100%', label: t('aboutStat1') },
    { stat: 'Lifetime', label: t('aboutStat2') },
    { stat: '48h', label: t('aboutStat3') },
  ]

  return (
    <div>
      <section className="about-hero">
        <div className="eyebrow">{t('aboutEyebrow')}</div>
        <h1>{t('aboutH1')}</h1>
      </section>
      <section className="about-copy">
        <p className="quote">{t('aboutQuote')}</p>
        <p>{t('aboutP1')}</p>
        <p>{t('aboutP2')}</p>
      </section>
      <section className="values-grid">
        {values.map(v => (
          <div className="value-card" key={v.label}>
            <div className="value-stat">{v.stat}</div>
            <div className="value-label">{v.label}</div>
          </div>
        ))}
      </section>
      <section className="about-cta">
        <button className="liane-btn" onClick={() => onNavigate('shop')}>{t('exploreCollection')}</button>
      </section>
    </div>
  )
}
