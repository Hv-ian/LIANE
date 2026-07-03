import { useState } from 'react'

const TIERS = [
  {
    name: 'Silver',
    threshold: 'From first purchase',
    color: '#c8c5bf',
    hi: '#e2e0db',
    perks: ['5% off every order', 'Early access to new drops', 'Birthday gift'],
  },
  {
    name: 'Gold',
    threshold: 'After 2 000 kr spent',
    color: '#c9b88a',
    hi: '#ddd0a5',
    perks: ['10% off every order', 'Priority custom orders', 'Seasonal gifts', 'Free engraving'],
  },
  {
    name: 'Diamond',
    threshold: 'After 6 000 kr spent',
    color: '#a8c8d8',
    hi: '#cce0eb',
    perks: ['15% off every order', 'Dedicated stylist', 'Exclusive pieces first', 'Free shipping always', 'Complimentary annual cleaning'],
  },
]

export default function Loyalty({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [phone, setPhone]   = useState('')
  const [bday, setBday]     = useState('')
  const [agree, setAgree]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  if (submitted) return (
    <div className="loyalty-thanks">
      <div className="loyalty-thanks-inner">
        <div className="loyalty-thanks-icon">✦</div>
        <h1>Welcome to the Circle</h1>
        <p>You're now a <strong>Silver</strong> member, {name.split(' ')[0] || 'friend'}. A confirmation has been sent to {email}.<br/>Your discount activates on your next order.</p>
        <button className="liane-btn" style={{ marginTop: 28 }} onClick={() => onNavigate('shop')}>Start shopping</button>
      </div>
    </div>
  )

  return (
    <div className="loyalty-page">

      {/* Hero */}
      <div className="loyalty-hero">
        <div className="loyalty-hero-inner">
          <div className="eyebrow" style={{ color: '#c9b88a', letterSpacing: '4px' }}>Members only</div>
          <h1>The LIANÉ Circle</h1>
          <p>Join our loyalty programme and earn rewards with every purchase. The more you invest in pieces you love, the more we give back.</p>
        </div>
      </div>

      {/* Tiers */}
      <div className="loyalty-tiers-wrap">
        <div className="section-head" style={{ textAlign: 'center', paddingTop: 64 }}>
          <div className="eyebrow">Membership levels</div>
          <h2>Three tiers. Lifetime rewards.</h2>
        </div>
        <div className="loyalty-tiers">
          {TIERS.map((t, i) => (
            <div key={t.name} className={`loyalty-tier ${i === 1 ? 'tier-featured' : ''}`}>
              <div className="tier-gem" style={{ background: `radial-gradient(circle at 35% 30%, ${t.hi}, ${t.color})` }} />
              <div className="tier-name">{t.name}</div>
              <div className="tier-threshold">{t.threshold}</div>
              <ul className="tier-perks">
                {t.perks.map(p => (
                  <li key={p}><span className="tier-check">✓</span>{p}</li>
                ))}
              </ul>
              {i === 1 && <div className="tier-badge">Most popular</div>}
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="loyalty-how">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <div className="eyebrow">How it works</div>
          <h2>Simple by design</h2>
        </div>
        <div className="loyalty-steps">
          {[
            { n: '01', title: 'Sign up', desc: "Create your free Circle account below. You're instantly a Silver member." },
            { n: '02', title: 'Shop & earn', desc: 'Every purchase counts toward your lifetime total. Tiers unlock automatically.' },
            { n: '03', title: 'Enjoy rewards', desc: 'Discounts apply at checkout. Gifts, early access, and stylist perks follow.' },
          ].map(s => (
            <div key={s.n} className="loyalty-step">
              <div className="loyalty-step-n">{s.n}</div>
              <div className="loyalty-step-title">{s.title}</div>
              <p className="loyalty-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Signup form */}
      <div className="loyalty-form-wrap">
        <div className="loyalty-form-inner">
          <div className="section-head">
            <div className="eyebrow">Join free</div>
            <h2>Create your Circle account</h2>
            <p style={{ color: '#76736b', fontWeight: 300, marginTop: 8 }}>Takes 30 seconds. No purchase required to sign up.</p>
          </div>

          <form className="loyalty-form" onSubmit={handleSubmit}>
            <div className="loyalty-row2">
              <div className="loyalty-field">
                <label>Full name</label>
                <input className="ck-input" placeholder="Your name" required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="loyalty-field">
                <label>Email address</label>
                <input className="ck-input" type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="loyalty-row2">
              <div className="loyalty-field">
                <label>Phone <span className="loyalty-opt">optional</span></label>
                <input className="ck-input" placeholder="+46 70 000 00 00" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="loyalty-field">
                <label>Birthday <span className="loyalty-opt">for your birthday gift</span></label>
                <input className="ck-input" type="date" value={bday} onChange={e => setBday(e.target.value)} />
              </div>
            </div>

            <label className="loyalty-agree">
              <input type="checkbox" required checked={agree} onChange={e => setAgree(e.target.checked)} />
              <span>I agree to receive member communications from LIANÉ. You can unsubscribe at any time.</span>
            </label>

            <div className="loyalty-form-footer">
              <button type="submit" className="liane-btn" style={{ minWidth: 220 }}>Join the Circle — it's free</button>
              <div className="loyalty-privacy">We never share your data. Full privacy policy in the footer.</div>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
