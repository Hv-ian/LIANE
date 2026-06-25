const values = [
  { stat: '100%', label: 'Recycled gold' },
  { stat: 'Lifetime', label: 'Repair promise' },
  { stat: '48h', label: 'Stockholm dispatch' },
]

export default function About({ onNavigate }) {
  return (
    <div>
      <section className="about-hero">
        <div className="eyebrow">Since 2026</div>
        <h1>Between Yerevan and Stockholm</h1>
      </section>
      <section className="about-copy">
        <p className="quote">"I grew up with my grandmother's Armenian goldwork on one hand and Swedish restraint on the other. LIANÉ is where those two meet."</p>
        <p>Founded by Liana, LIANÉ pairs centuries-old Armenian metalwork traditions with the clean, considered language of Scandinavian design. Each piece is made in small batches from recycled solid gold and responsibly sourced stones.</p>
        <p>We believe jewelry should be lived in — worn daily, passed down, repaired rather than replaced. Every LIANÉ order carries a lifetime craftsmanship promise.</p>
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
        <button className="liane-btn" onClick={() => onNavigate('shop')}>Explore the collection</button>
      </section>
    </div>
  )
}
