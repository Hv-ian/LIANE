import { useState } from 'react'
import { useCurrency } from '../context/CurrencyContext'
import { useLanguage } from '../context/LanguageContext'

const SAMPLE_ORDERS_ACTIVE = [
  {
    id: 'ORD-2026-047',
    date: '2026-07-01',
    items: [
      { name: 'Moonstone Cuff', price: 890, qty: 1 },
      { name: 'Solkors Pendant', price: 750, qty: 1 },
    ],
    total: 1640,
    status: 'shipped',
    carrier: 'PostNord',
    tracking: 'SE123456789SE',
    eta: '2026-07-07',
    stepKeys: ['orderStepConfirmed', 'orderStepEngraving', 'orderStepShipped', 'orderStepOutForDelivery', 'orderStepDelivered'],
    stepDates: ['Jul 1', 'Jul 2', 'Jul 3', 'Jul 7', ''],
    stepDone:  [true, true, true, false, false],
  },
  {
    id: 'ORD-2026-051',
    date: '2026-07-02',
    items: [{ name: 'Custom Ring — "HAIK"', price: 840, qty: 1 }],
    total: 840,
    status: 'processing',
    carrier: null,
    tracking: null,
    eta: '2026-07-10',
    stepKeys: ['orderStepConfirmed', 'orderStepEngraving', 'orderStepShipped', 'orderStepOutForDelivery', 'orderStepDelivered'],
    stepDates: ['Jul 2', '', '', '', ''],
    stepDone:  [true, false, false, false, false],
  },
]

const SAMPLE_ORDERS_HISTORY = [
  { id: 'ORD-2026-038', date: '2026-06-14', items: [{ name: 'Eternity Knot Ring', price: 590, qty: 1 }], total: 590, deliveredDate: 'Jun 19, 2026' },
  { id: 'ORD-2026-029', date: '2026-05-28', items: [{ name: 'Garnet Drop Earrings', price: 650, qty: 1 }, { name: 'Onyx Band', price: 690, qty: 1 }], total: 1340, deliveredDate: 'Jun 3, 2026' },
  { id: 'ORD-2026-011', date: '2026-04-10', items: [{ name: 'Mesh Cuff', price: 3200, qty: 1 }], total: 3200, deliveredDate: 'Apr 16, 2026' },
]

const SAMPLE_RETURNS = [
  { id: 'RET-2026-009', orderId: 'ORD-2026-029', item: 'Onyx Band', price: 690, reason: 'Wrong size', requestedDate: 'Jun 6, 2026', status: 'refunded', refundDate: 'Jun 12, 2026', refundAmount: 690 },
]

function StatusBadge({ status, t }) {
  const map = {
    processing:       { key: 'statusProcessing',       color: '#c9b88a', bg: '#fdf8ef' },
    shipped:          { key: 'statusShipped',           color: '#4a9b6f', bg: '#edf7f1' },
    out_for_delivery: { key: 'statusOutForDelivery',    color: '#3b7fc4', bg: '#eef4fb' },
    delivered:        { key: 'statusDelivered',         color: '#55534e', bg: '#f4f3f0' },
    refunded:         { key: 'statusRefunded',          color: '#4a9b6f', bg: '#edf7f1' },
    pending:          { key: 'statusReturnRequested',   color: '#c9b88a', bg: '#fdf8ef' },
  }
  const s = map[status] || map.processing
  return <span className="order-status-badge" style={{ color: s.color, background: s.bg }}>{t(s.key)}</span>
}

function TrackingTimeline({ order, t }) {
  const [open, setOpen] = useState(false)
  const steps = order.stepKeys.map((key, i) => ({
    label: t(key),
    date: order.stepDates[i],
    done: order.stepDone[i],
  }))
  return (
    <div className="order-tracking">
      <button className="order-track-btn" onClick={() => setOpen(o => !o)}>
        {open ? t('hideTracking') : t('trackOrder')}
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
            {steps.map((s, i) => {
              const isActive = s.done && !steps[i + 1]?.done
              return (
                <div key={i} className={`tracking-step ${s.done ? 'done' : ''} ${isActive ? 'current' : ''}`}>
                  <div className="tracking-dot">
                    {s.done ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    ) : null}
                  </div>
                  {i < steps.length - 1 && <div className="tracking-line" />}
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
              {t('estimatedDelivery')} <strong>{new Date(order.eta).toLocaleDateString('sv-SE', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function OrderCard({ order, showTracking = false, t }) {
  const { formatPrice } = useCurrency()
  return (
    <div className="order-card">
      <div className="order-card-head">
        <div>
          <div className="order-id">{order.id}</div>
          <div className="order-date">{new Date(order.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        <div className="order-head-right">
          <StatusBadge status={order.status || 'delivered'} t={t} />
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
        <div className="order-delivered">{t('deliveredOn')} {order.deliveredDate}</div>
      )}
      {showTracking && <TrackingTimeline order={order} t={t} />}
    </div>
  )
}

function ReturnCard({ ret, t }) {
  const { formatPrice } = useCurrency()
  return (
    <div className="order-card">
      <div className="order-card-head">
        <div>
          <div className="order-id">{ret.id}</div>
          <div className="order-date">{t('returnRequested')} {ret.requestedDate} · {t('returnedFrom')} {ret.orderId}</div>
        </div>
        <StatusBadge status={ret.status} t={t} />
      </div>
      <div className="order-items">
        <div className="order-item-row">
          <span className="order-item-name">{ret.item}</span>
          <span className="order-item-meta">{formatPrice(ret.price)}</span>
        </div>
      </div>
      <div className="return-reason">{t('returnReason')} {ret.reason}</div>
      {ret.status === 'refunded' && (
        <div className="return-refund">
          {t('refundProcessed')} {ret.refundDate}: {formatPrice(ret.refundAmount)}
        </div>
      )}
    </div>
  )
}

function BenefitsSection({ onNavigate, t }) {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bday, setBday]   = useState('')
  const [agree, setAgree] = useState(false)

  const TIERS = [
    {
      nameKey: 'tierSilverName', fromKey: 'tierSilverFrom',
      color: '#c8c5bf', hi: '#e2e0db',
      perkKeys: ['perk5off', 'perkEarlyAccess', 'perkBirthday'],
    },
    {
      nameKey: 'tierGoldName', fromKey: 'tierGoldFrom',
      color: '#c9b88a', hi: '#ddd0a5',
      perkKeys: ['perk10off', 'perkPriorityCustom', 'perkSeasonalGifts', 'perkFreeEngraving'],
    },
    {
      nameKey: 'tierDiamondName', fromKey: 'tierDiamondFrom',
      color: '#a8c8d8', hi: '#cce0eb',
      perkKeys: ['perk15off', 'perkStylist', 'perkExclusive', 'perkFreeShipping', 'perkCleaning'],
    },
  ]

  if (submitted) return (
    <div className="loyalty-thanks" style={{ minHeight: 'auto', padding: '60px 24px' }}>
      <div className="loyalty-thanks-inner">
        <div className="loyalty-thanks-icon">✦</div>
        <h2>{t('welcomeToCircle')}</h2>
        <p>{t('tierSilverName')} {t('memberSpend').split('·')[0].trim()} · {name.split(' ')[0] || ''}</p>
        <button className="liane-btn" style={{ marginTop: 24 }} onClick={() => onNavigate('shop')}>{t('startShopping')}</button>
      </div>
    </div>
  )

  return (
    <div className="benefits-section">
      <div className="loyalty-tiers-wrap" style={{ paddingTop: 48 }}>
        <div className="section-head" style={{ textAlign: 'center' }}>
          <div className="eyebrow">{t('membershipLevels')}</div>
          <h2>{t('threeTiers')}</h2>
        </div>
        <div className="loyalty-tiers">
          {TIERS.map((tier, i) => (
            <div key={tier.nameKey} className={`loyalty-tier ${i === 1 ? 'tier-featured' : ''}`}>
              <div className="tier-gem" style={{ background: `radial-gradient(circle at 35% 30%, ${tier.hi}, ${tier.color})` }} />
              <div className="tier-name">{t(tier.nameKey)}</div>
              <div className="tier-threshold">{t(tier.fromKey)}</div>
              <ul className="tier-perks">
                {tier.perkKeys.map(k => (
                  <li key={k}><span className="tier-check">✓</span>{t(k)}</li>
                ))}
              </ul>
              {i === 1 && <div className="tier-badge">{t('mostPopular')}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="loyalty-form-wrap">
        <div className="loyalty-form-inner">
          <div className="section-head">
            <div className="eyebrow">{t('joinFree')}</div>
            <h2>{t('createCircleAccount')}</h2>
            <p style={{ color: '#76736b', fontWeight: 300, marginTop: 8 }}>{t('takes30seconds')}</p>
          </div>
          <form className="loyalty-form" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
            <div className="loyalty-row2">
              <div className="loyalty-field">
                <label>{t('fullName')}</label>
                <input className="ck-input" placeholder={t('yourName')} required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="loyalty-field">
                <label>{t('emailAddress')}</label>
                <input className="ck-input" type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="loyalty-row2">
              <div className="loyalty-field">
                <label>{t('phone')} <span className="loyalty-opt">{t('optional')}</span></label>
                <input className="ck-input" placeholder="+46 70 000 00 00" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="loyalty-field">
                <label>{t('birthday') || 'Birthday'} <span className="loyalty-opt">{t('birthdayGiftNote')}</span></label>
                <input className="ck-input" type="date" value={bday} onChange={e => setBday(e.target.value)} />
              </div>
            </div>
            <label className="loyalty-agree">
              <input type="checkbox" required checked={agree} onChange={e => setAgree(e.target.checked)} />
              <span>{t('agreeText')}</span>
            </label>
            <div className="loyalty-form-footer">
              <button type="submit" className="liane-btn" style={{ minWidth: 220 }}>{t('joinCircleBtn')}</button>
              <div className="loyalty-privacy">{t('neverShareData')}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

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

      <div className="loyalty-hero">
        <div className="loyalty-hero-inner">
          <div className="eyebrow" style={{ color: '#c9b88a', letterSpacing: '4px' }}>{t('yourAccount')}</div>
          <h1>{t('theLianeCircle')}</h1>
          <div className="loyalty-hero-member">
            <div className="member-tier-gem" style={{ background: 'radial-gradient(circle at 35% 30%, #e2e0db, #c8c5bf)' }} />
            <div>
              <div className="member-tier-name">{t('silverMember')}</div>
              <div className="member-tier-note">{t('memberSpend')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="account-tabs-wrap">
        <div className="account-tabs">
          {TABS.map(tab_ => (
            <button
              key={tab_.id}
              className={`account-tab ${tab === tab_.id ? 'active' : ''}`}
              onClick={() => setTab(tab_.id)}
            >
              {tab_.label}
              {tab_.id === 'orders' && <span className="tab-count">{SAMPLE_ORDERS_ACTIVE.length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="account-content">

        {tab === 'orders' && (
          <div className="account-panel animate-in">
            <div className="account-panel-head">
              <h2>{t('activeOrders')}</h2>
              <p>{t('trackCurrentShipments')}</p>
            </div>
            {SAMPLE_ORDERS_ACTIVE.length === 0 ? (
              <div className="account-empty">{t('noActiveOrders')}</div>
            ) : (
              <div className="orders-list">
                {SAMPLE_ORDERS_ACTIVE.map(o => (
                  <OrderCard key={o.id} order={o} showTracking t={t} />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div className="account-panel animate-in">
            <div className="account-panel-head">
              <h2>{t('orderHistory')}</h2>
              <p>{t('allPastPurchases')}</p>
            </div>
            <div className="orders-list">
              {SAMPLE_ORDERS_HISTORY.map(o => (
                <OrderCard key={o.id} order={{ ...o, status: 'delivered' }} t={t} />
              ))}
            </div>
          </div>
        )}

        {tab === 'returns' && (
          <div className="account-panel animate-in">
            <div className="account-panel-head">
              <h2>{t('returnsRefunds')}</h2>
              <p>{t('returnsDesc')}</p>
            </div>
            {SAMPLE_RETURNS.length === 0 ? (
              <div className="account-empty">{t('noReturns')}</div>
            ) : (
              <div className="orders-list">
                {SAMPLE_RETURNS.map(r => (
                  <ReturnCard key={r.id} ret={r} t={t} />
                ))}
              </div>
            )}
            <div className="returns-note">{t('returnsNote')}</div>
          </div>
        )}

        {tab === 'circle' && (
          <BenefitsSection onNavigate={onNavigate} t={t} />
        )}

      </div>
    </div>
  )
}
