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
        <h1>Old craft. New hands.</h1>
      </section>
      <section className="about-copy">
        <p className="quote">"Swedish silversmiths once engraved motifs that carried meaning for generations. I wanted to bring that back — not as nostalgia, but as something you actually wear."</p>
        <p>Founded by Liana in Stockholm, LIANÉ revives pre-industrial Swedish metalsmithing — drawing on Norse knotwork, folk motifs, and ancient soldering techniques that largely disappeared with mass production. Each piece is made in small batches from recycled solid gold and responsibly sourced stones.</p>
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
