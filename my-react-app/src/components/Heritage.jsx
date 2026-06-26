export default function Heritage({ symbols, onNavigate }) {
  return (
    <div className="heritage-page">
      <section className="heritage-hero">
        <div className="eyebrow">Armenian heritage</div>
        <h1>Symbols carried in silver</h1>
        <p>Every motif we engrave traces back to Armenian stonework and goldsmithing — carried forward in sterling silver and natural stone, each one chosen for what it means, not just how it looks.</p>
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
        <p>Want a symbol that isn't shown here, sized or engraved for someone specific?</p>
        <button className="liane-btn" onClick={() => onNavigate('custom')}>Request a custom piece</button>
      </section>
    </div>
  )
}
