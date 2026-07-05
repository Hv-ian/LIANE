import { useCurrency } from '../context/CurrencyContext'
import { useLanguage } from '../context/LanguageContext'

export default function Checkout({ cart, onBack }) {
  const { formatPrice } = useCurrency()
  const { t } = useLanguage()
  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0)
  const free = subtotal >= 1500 || subtotal === 0
  const shipping = free ? 0 : 75
  const total = subtotal + shipping

  return (
    <div className="checkout-page">
      <div className="checkout-form">
        <div className="back-link" onClick={onBack}>{t('back')}</div>
        <h1>Checkout</h1>

        <div className="step-label">01 · {t('email')}</div>
        <input className="ck-input full" placeholder={t('email')} />

        <div className="step-label">02 · {t('shipping')}</div>
        <div className="ck-row2">
          <input className="ck-input" placeholder={t('firstName')} />
          <input className="ck-input" placeholder={t('lastName')} />
        </div>
        <input className="ck-input full" placeholder={t('address')} />
        <div className="ck-row-postal">
          <input className="ck-input" placeholder={t('postalCode')} />
          <input className="ck-input" placeholder={t('city')} />
        </div>

        <div className="step-label">03 · Payment</div>
        <input className="ck-input full" placeholder={t('cardNumber')} />
        <div className="ck-row2">
          <input className="ck-input" placeholder={t('expiry')} />
          <input className="ck-input" placeholder={t('cvc')} />
        </div>
        <button className="liane-btn full">{t('placeOrder')} · {formatPrice(total)}</button>
      </div>
      <div className="checkout-summary">
        <div className="summary-label">{t('orderSummary')}</div>
        {cart.map(c => (
          <div className="summary-item" key={c.id}>
            <div className="summary-img"><img src={c.img} alt="" /><span className="qty-badge">{c.qty}</span></div>
            <div className="summary-info">
              <div className="summary-name">{c.name}</div>
              <div className="summary-cat">{c.category}</div>
            </div>
            <div className="summary-price">{formatPrice(c.price * c.qty)}</div>
          </div>
        ))}
        <div className="summary-totals">
          <div className="summary-row"><span>{t('subtotal')}</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary-row"><span>{t('shipping')}</span><span>{free ? t('free') : formatPrice(shipping)}</span></div>
          <div className="summary-row total"><span>{t('total')}</span><span>{formatPrice(total)}</span></div>
        </div>
      </div>
    </div>
  )
}
