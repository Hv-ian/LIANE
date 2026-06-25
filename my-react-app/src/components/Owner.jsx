import { useState } from 'react'
import { sampleOrders } from '../data/orders'

const OWNER_PASSWORD = 'liane2026'

export default function Owner({ onBack }) {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [labelOrder, setLabelOrder] = useState(null)

  function handleLogin(e) {
    e.preventDefault()
    if (pw === OWNER_PASSWORD) {
      setAuthed(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  if (labelOrder) {
    return <ShippingLabel order={labelOrder} onBack={() => setLabelOrder(null)} />
  }

  if (!authed) {
    return (
      <div className="owner-login">
        <div className="owner-login-box">
          <div className="back-link" onClick={onBack}>← Back to site</div>
          <div className="logo-sm" style={{ marginBottom: 28 }}>LIANÉ — Owner</div>
          <form onSubmit={handleLogin}>
            <input
              className="ck-input full"
              type="password"
              placeholder="Owner password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoFocus
            />
            {error && <div className="owner-error">{error}</div>}
            <button className="liane-btn full" type="submit" style={{ marginTop: 18 }}>Log in</button>
          </form>
          <div className="owner-demo-note">Demo only — password: liane2026</div>
        </div>
      </div>
    )
  }

  return (
    <div className="owner-page">
      <div className="owner-header">
        <div className="back-link" onClick={onBack}>← Back to site</div>
        <h1>Orders</h1>
        <div className="owner-demo-note">Demo data — not connected to real orders yet</div>
      </div>
      <div className="owner-orders">
        {sampleOrders.map(o => (
          <div className="owner-order-card" key={o.id}>
            <div className="owner-order-top">
              <div>
                <div className="owner-order-id">{o.id}</div>
                <div className="owner-order-date">{o.date}</div>
              </div>
              <div className={`owner-status owner-status-${o.status.toLowerCase()}`}>{o.status}</div>
            </div>
            <div className="owner-order-body">
              <div className="owner-order-customer">
                <div className="owner-order-name">{o.customer.name}</div>
                <div className="owner-order-addr">{o.address.line1}{o.address.line2 ? `, ${o.address.line2}` : ''}</div>
                <div className="owner-order-addr">{o.address.postal} {o.address.city}, {o.address.country}</div>
                <div className="owner-order-addr">{o.customer.email} · {o.customer.phone}</div>
              </div>
              <div className="owner-order-items">
                {o.items.map(it => (
                  <div className="owner-order-item" key={it.name}>{it.qty}× {it.name} — {it.priceLabel}</div>
                ))}
                <div className="owner-order-total">Total: {o.totalLabel}</div>
              </div>
            </div>
            <button className="ghost-btn owner-print-btn" onClick={() => setLabelOrder(o)}>Print shipping label</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ShippingLabel({ order, onBack }) {
  return (
    <div className="label-page">
      <div className="label-actions no-print">
        <div className="back-link" onClick={onBack}>← Back to orders</div>
        <button className="liane-btn" onClick={() => window.print()}>Print label</button>
      </div>
      <div className="shipping-label">
        <div className="label-from">
          <div className="label-section-title">From</div>
          <div>LIANÉ</div>
          <div>Götgatan 1</div>
          <div>111 22 Stockholm</div>
          <div>Sweden</div>
        </div>
        <div className="label-divider"></div>
        <div className="label-to">
          <div className="label-section-title">Ship to</div>
          <div className="label-name">{order.customer.name}</div>
          <div className="label-addr">{order.address.line1}</div>
          {order.address.line2 && <div className="label-addr">{order.address.line2}</div>}
          <div className="label-addr">{order.address.postal} {order.address.city}</div>
          <div className="label-addr">{order.address.country}</div>
        </div>
        <div className="label-divider"></div>
        <div className="label-meta">
          <span>Order {order.id}</span>
          <span>{order.date}</span>
        </div>
      </div>
    </div>
  )
}
