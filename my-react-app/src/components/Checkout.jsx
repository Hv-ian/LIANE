import { formatPrice } from '../data/products'

export default function Checkout({ cart, onBack }) {
  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0)
  const free = subtotal >= 1500 || subtotal === 0
  const shipping = free ? 0 : 75
  const total = subtotal + shipping

  return (
    <div className="checkout-page">
      <div className="checkout-form">
        <div className="back-link" onClick={onBack}>← Continue shopping</div>
        <h1>Checkout</h1>

        <div className="step-label">01 · Contact</div>
        <input className="ck-input full" placeholder="Email address" />

        <div className="step-label">02 · Shipping address</div>
        <div className="ck-row2">
          <input className="ck-input" placeholder="First name" />
          <input className="ck-input" placeholder="Last name" />
        </div>
        <input className="ck-input full" placeholder="Address" />
        <div className="ck-row-postal">
          <input className="ck-input" placeholder="Postal code" />
          <input className="ck-input" placeholder="City" />
        </div>

        <div className="step-label">03 · Payment</div>
        <input className="ck-input full" placeholder="Card number" />
        <div className="ck-row2">
          <input className="ck-input" placeholder="MM / YY" />
          <input className="ck-input" placeholder="CVC" />
        </div>
        <button className="liane-btn full">Place order · {formatPrice(total)}</button>
      </div>
      <div className="checkout-summary">
        <div className="summary-label">Order summary</div>
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
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{free ? 'Free' : formatPrice(shipping)}</span></div>
          <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
      </div>
    </div>
  )
}
