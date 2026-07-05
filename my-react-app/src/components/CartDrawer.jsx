import { useCurrency } from '../context/CurrencyContext'
import { useLanguage } from '../context/LanguageContext'

export default function CartDrawer({ open, cart, onClose, onInc, onDec, onRemove, onCheckout }) {
  const { formatPrice } = useCurrency()
  const { t } = useLanguage()
  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0)
  const itemCount = cart.reduce((a, c) => a + c.qty, 0)

  return (
    <>
      <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-head">
          <div className="cart-title">{t('yourCart')} ({itemCount})</div>
          <div className="close-x" onClick={onClose}>×</div>
        </div>
        <div className="cart-items liane-scroll">
          {cart.map(c => (
            <div className="cart-item" key={c.id}>
              <div className="cart-item-img"><img src={c.img} alt="" /></div>
              <div className="cart-item-info">
                <div className="cart-item-name">{c.name}</div>
                <div className="cart-item-cat">{c.category}</div>
                <div className="qty-row">
                  <div className="qty-stepper">
                    <span onClick={() => onDec(c.id)}>−</span>
                    <span className="qty-val">{c.qty}</span>
                    <span onClick={() => onInc(c.id)}>+</span>
                  </div>
                  <div className="cart-item-price">{formatPrice(c.price * c.qty)}</div>
                </div>
              </div>
              <div className="remove-x" onClick={() => onRemove(c.id)}>✕</div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="cart-empty">
              <div className="cart-empty-title">{t('cartEmpty')}</div>
              <div className="cart-empty-sub">Pieces you add will appear here.</div>
            </div>
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-subtotal-row"><span>{t('subtotal')}</span><span>{formatPrice(subtotal)}</span></div>
          <div className="cart-note">{t('freeShippingNote')}</div>
          <button className="liane-btn full" onClick={onCheckout}>{t('toCheckout')}</button>
          <div className="continue-link" onClick={onClose}>Continue shopping</div>
        </div>
      </div>
    </>
  )
}
