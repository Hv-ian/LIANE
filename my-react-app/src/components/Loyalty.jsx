import { useState } from 'react'
import { useCurrency } from '../context/CurrencyContext'
import { useLanguage } from '../context/LanguageContext'

// ── Demo data ─────────────────────────────────────────────────────────────────
const SAMPLE_ORDERS_ACTIVE = [
  {
    id: 'ORD-2026-047',
    date: '2026-07-01',
    items: [
      { name: 'Moonstone Cuff', price: 890, qty: 1 },
      { name: 'Armenian Cross Pendant', price: 750, qty: 1 },
    ],
    total: 1640,
    status: 'shipped',
    carrier: 'PostNord',
    tracking: 'SE123456789SE',
    eta: '2026-07-07',
    steps: [
      { label: 'Order confirmed',   date: 'Jul 1',  done: true },
      { label: 'Engraving & prep', date: 'Jul 2',  done: true },
      { label: 'Shipped',          date: 'Jul 3',  done: true },
      { label: 'Out for delivery', date: 'Jul 7',  done: false },
      { label: 'Delivered',        date: '',       done: false },
    ],
  },
  {
    id: 'ORD-2026-051',
    date: '2026-07-02',
    items: [
      { name: 'Custom Ring — "HAIK"', price: 840, qty: 1 },
    ],
    total: 840,
    status: 'processing',
    carrier: null,
    tracking: null,
    eta: '2026-07-10',
    steps: [
      { label: 'Order confirmed',   date: 'Jul 2',  done: true },
      { label: 'Engraving & prep', date: 'Jul 4',  done: false },
      { label: 'Shipped',          date: '',       done: false },
      { label: 'Out for delivery', date: '',       done: false },
      { label: 'Delivered',        date: '',       done: false },
    ],
  },
]

const SAMPLE_ORDERS_HISTORY = [
  {
    id: 'ORD-2026-038',
    date: '2026-06-14',
    items: [{ name: 'Eternity Knot Ring', price: 590, qty: 1 }],
    total: 590,
    deliveredDate: 'Jun 19, 2026',
  },
  {
    id: 'ORD-2026-029',
    date: '2026-05-28',
    items: [
      { name: 'Garnet Drop Earrings', price: 650, qty: 1 },
      { name: 'Onyx Band', price: 690, qty: 1 },
    ],
    total: 1340,
    deliveredDate: 'Jun 3, 2026',
  },
  {
    id: 'ORD-2026-011',
    date: '2026-04-10',
    items: [{ name: 'Mesh Cuff', price: 3200, qty: 1 }],
    total: 3200,
    deliveredDate: 'Apr 16, 2026',
  },
]

const SAMPLE_RETURNS = [
  {
    id: 'RET-2026-009',
    orderId: 'ORD-2026-029',
    item: 'Onyx Band',
    price: 690,
    reason: 'Wrong size',
    requestedDate: 'Jun 6, 2026',
    status: 'refunded',
    refundDate: 'Jun 12, 2026',
    refundAmount: 690,
  },
]

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
    perks: ['15% off every order', 'Dedicated stylist', 'Exclusive pieces first', 'Free shipping always', 'Annual complimentary cleaning'],
  },
]

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    processing:       { label: 'Processing',        color: '#c9b88a', bg: '#fdf8ef' },
    shipped:          { label: 'Shipped',            color: '#4a9b6f', bg: '#edf7f1' },
    out_for_delivery: { label: 'Out for delivery',   color: '#3b7fc4', bg: '#eef4fb' },
    delivered:        { label: 'Delivered',          color: '#55534e', bg: '#f4f3f0' },
    refunded:         { label: 'Refunded',           color: '#4a9b6f', bg: '#edf7f1' },
    pending:          { label: 'Return requested',   color: '#c9b88a', bg: '#fdf8ef' },
  }
  const s = map[status] || map.processing
  return (
    <span className="order-status-badge" style={{ color: s.color, background: s.bg }}>
      {s.label}
    </span>
  )
}

// ── Tracking timeline ─────────────────────────────────────────────────────────
function TrackingTimeline({ order }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="order-tracking">
      <button className="order-track-btn" onClick={() => setOpen(o => !o)}>
        {open ? 'Hide tracking' : 'Track order'}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="tracking-panel">
          {order.carrier && (
            <div className="tracking-ref">
              {order.carrier} · <span className="tracking-num">{order.tracking}</span>
            </div>
          )}
          <div className="tracking-steps">
            {order.steps.map((s, i) => {
              const isActive = s.done && !order.steps[i + 1]?.done
              return (
                <div key={i} className={`tracking-step ${s.done ? 'done' : ''} ${isActive ? 'current' : ''}`}>
                  <div className="tracking-dot">
                    {s.done ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    ) : null}
                  </div>
                  {i < order.steps.length - 1 && <div className="tracking-line" />}
                  <div className="tracking-step-info">
                    <div className="tracking-step-label">{s.label}</div>
                    {s.date && <div className="tracking-step-date">{s.date}</div>}
                  </div>
                </div>
              )
            })}
          </div>
          {order.eta && (
            <div className="tracking-eta">
              Estimated delivery: <strong>{new Date(order.eta).toLocaleDateString('en-SE', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Order card ────────────────────────────────────────────────────────────────
function OrderCard({ order, showTracking = false }) {
  const { formatPrice } = useCurrency()
  return (
    <div className="order-card">
      <div className="order-card-head">
        <div>
          <div className="order-id">{order.id}</div>
          <div className="order-date">{new Date(order.date).toLocaleDateString('en-SE', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        <div className="order-head-right">
          <StatusBadge status={order.status || 'delivered'} />
          <div className="order-total">{formatPrice(order.total)}</div>
        </div>
      </div>

      <div className="order-items">
        {order.items.map((item, i) => (
          <div key={i} className="order-item-row">
            <span className="order-item-name">{item.name}</span>
            <span className="order-item-meta">{item.qty > 1 ? `×${item.qty} · ` : ''}{formatPrice(item.price * item.qty)}</span>
          </div>
        ))}
      </div>

      {order.deliveredDate && (
        <div className="order-delivered">Delivered {order.deliveredDate}</div>
      )}

      {showTracking && <TrackingTimeline order={order} />}
    </div>
  )
}

// ── Return card ───────────────────────────────────────────────────────────────
function ReturnCard({ ret }) {
  const { formatPrice } = useCurrency()
  return (
    <div className="order-card">
      <div className="order-card-head">
        <div>
          <div className="order-id">{ret.id}</div>
          <div className="order-date">Requested {ret.requestedDate} · from order {ret.orderId}</div>
        </div>
        <StatusBadge status={ret.status} />
      </div>
      <div className="order-items">
        <div className="order-item-row">
          <span className="order-item-name">{ret.item}</span>
          <span className="order-item-meta">{formatPrice(ret.price)}</span>
        </div>
      </div>
      <div className="return-reason">Reason: {ret.reason}</div>
      {ret.status === 'refunded' && (
        <div className="return-refund">
          ✓ Refund of {formatPrice(ret.refundAmount)} processed on {ret.refundDate}
        </div>
      )}
    </div>
  )
}

// ── Loyalty signup section ────────────────────────────────────────────────────
function BenefitsSection({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bday, setBday]   = useState('')
  const [agree, setAgree] = useState(false)

  if (submitted) return (
    <div className="loyalty-thanks" style={{ minHeight: 'auto', padding: '60px 24px' }}>
      <div className="loyalty-thanks-inner">
        <div className="loyalty-thanks-icon">✦</div>
        <h2>Welcome to the Circle</h2>
        <p>You're now a <strong>Silver</strong> member, {name.split(' ')[0] || 'friend'}. A confirmation has been sent to {email}.</p>
        <button className="liane-btn" style={{ marginTop: 24 }} onClick={() => onNavigate('shop')}>Start shopping</button>
      </div>
    </div>
  )

  return (
    <div className="benefits-section">
      {/* Tiers */}
      <div className="loyalty-tiers-wrap" style={{ paddingTop: 48 }}>
        <div className="section-head" style={{ textAlign: 'center' }}>
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

      {/* Signup */}
      <div className="loyalty-form-wrap">
        <div className="loyalty-form-inner">
          <div className="section-head">
            <div className="eyebrow">Join free</div>
            <h2>Create your Circle account</h2>
            <p style={{ color: '#76736b', fontWeight: 300, marginTop: 8 }}>Takes 30 seconds. No purchase required.</p>
          </div>
          <form className="loyalty-form" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
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
              <div className="loyalty-privacy">We never share your data.</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Loyalty({ onNavigate }) {
  const { t } = useLanguage()
  const [tab, setTab] = useState('orders')

  const TABS = [
    { id: 'orders',  label: t('myOrders') },
    { id: 'history', label: t('history') },
    { id: 'returns', label: t('returns') },
    { id: 'circle',  label: t('benefits') },
  ]

  return (
    <div className="loyalty-page">

      {/* Account hero */}
      <div className="loyalty-hero">
        <div className="loyalty-hero-inner">
          <div className="eyebrow" style={{ color: '#c9b88a', letterSpacing: '4px' }}>{t('yourAccount')}</div>
          <h1>{t('theLianeCircle')}</h1>
          <div className="loyalty-hero-member">
            <div className="member-tier-gem" style={{ background: 'radial-gradient(circle at 35% 30%, #e2e0db, #c8c5bf)' }} />
            <div>
              <div className="member-tier-name">Silver Member</div>
              <div className="member-tier-note">5 730 kr lifetime spend · Gold at 6 000 kr</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="account-tabs-wrap">
        <div className="account-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`account-tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {t.id === 'orders' && <span className="tab-count">{SAMPLE_ORDERS_ACTIVE.length}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="account-content">

        {/* My Orders */}
        {tab === 'orders' && (
          <div className="account-panel animate-in">
            <div className="account-panel-head">
              <h2>Active orders</h2>
              <p>Track your current shipments in real time.</p>
            </div>
            {SAMPLE_ORDERS_ACTIVE.length === 0 ? (
              <div className="account-empty">No active orders right now.</div>
            ) : (
              <div className="orders-list">
                {SAMPLE_ORDERS_ACTIVE.map(o => (
                  <OrderCard key={o.id} order={o} showTracking />
                ))}
              </div>
            )}
          </div>
        )}

        {/* History */}
        {tab === 'history' && (
          <div className="account-panel animate-in">
            <div className="account-panel-head">
              <h2>Order history</h2>
              <p>All your past LIANÉ purchases.</p>
            </div>
            <div className="orders-list">
              {SAMPLE_ORDERS_HISTORY.map(o => (
                <OrderCard key={o.id} order={{ ...o, status: 'delivered' }} />
              ))}
            </div>
          </div>
        )}

        {/* Returns */}
        {tab === 'returns' && (
          <div className="account-panel animate-in">
            <div className="account-panel-head">
              <h2>Returns & refunds</h2>
              <p>Items you've returned and the status of your refunds.</p>
            </div>
            {SAMPLE_RETURNS.length === 0 ? (
              <div className="account-empty">No returns on record.</div>
            ) : (
              <div className="orders-list">
                {SAMPLE_RETURNS.map(r => (
                  <ReturnCard key={r.id} ret={r} />
                ))}
              </div>
            )}
            <div className="returns-note">
              To start a return, email us at <strong>returns@liane.se</strong> within 14 days of delivery. Items must be unworn and in original packaging.
            </div>
          </div>
        )}

        {/* Circle Benefits */}
        {tab === 'circle' && (
          <BenefitsSection onNavigate={onNavigate} />
        )}

      </div>
    </div>
  )
}
