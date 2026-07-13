export default function Heritage({ symbols, onNavigate }) {
  return (
    <div className="heritage-page">
      <section className="heritage-hero">
        <div className="eyebrow">Swedish craft heritage</div>
        <h1>Symbols carried in silver</h1>
        <p>Every motif we engrave traces back to ancient Swedish metalsmithing — patterns cut by hand into iron, bone, and silver for over a thousand years. We carry them forward in sterling silver, chosen for what they mean, not just how they look.</p>
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
