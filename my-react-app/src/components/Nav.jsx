import { useState } from 'react'
import { useCurrency, CURRENCIES } from '../context/CurrencyContext'

export default function Nav({ cartCount, onNavigate, onOpenCart, onOpenMobileMenu }) {
  const [openMenu, setOpenMenu] = useState(null)
  const { currency, setCurrency } = useCurrency()

  return (
    <>
      <div className="announce">
        Complimentary engraving · Free shipping over 1 500 kr · Crafted in Stockholm
      </div>
      <nav className="nav">
        <div className="hamburger" onClick={onOpenMobileMenu} aria-label="Open menu">
          <span></span><span></span><span></span>
        </div>
        <div className="nav-links">
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setOpenMenu('women')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="liane-nav" onClick={() => onNavigate('shop', 'women')}>Women</div>
            {openMenu === 'women' && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-inner">
                  <div className="nav-dropdown-eyebrow">Shop her</div>
                  <div className="nav-dropdown-list">
                    <div onClick={() => onNavigate('shop', 'women')}>Necklaces</div>
                    <div onClick={() => onNavigate('shop', 'women')}>Earrings</div>
                    <div onClick={() => onNavigate('shop', 'women')}>Rings</div>
                    <div onClick={() => onNavigate('shop', 'women')}>Bracelets</div>
                  </div>
                  <div className="nav-dropdown-viewall" onClick={() => onNavigate('shop', 'women')}>View all →</div>
                </div>
              </div>
            )}
          </div>
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setOpenMenu('men')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="liane-nav" onClick={() => onNavigate('shop', 'men')}>Men</div>
            {openMenu === 'men' && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-inner">
                  <div className="nav-dropdown-eyebrow">Shop him</div>
                  <div className="nav-dropdown-list">
                    <div onClick={() => onNavigate('shop', 'men')}>Signet rings</div>
                    <div onClick={() => onNavigate('shop', 'men')}>Chains</div>
                    <div onClick={() => onNavigate('shop', 'men')}>Bracelets</div>
                    <div onClick={() => onNavigate('shop', 'men')}>Cufflinks</div>
                  </div>
                  <div className="nav-dropdown-viewall" onClick={() => onNavigate('shop', 'men')}>View all →</div>
                </div>
              </div>
            )}
          </div>
          <div className="liane-nav muted" onClick={() => onNavigate('shop', null, 'silver')}>Silver &amp; Stone</div>
          <div className="liane-nav muted" onClick={() => onNavigate('sets')}>Sets</div>
          <div className="liane-nav muted" onClick={() => onNavigate('heritage')}>Heritage</div>
          <div className="liane-nav muted" onClick={() => onNavigate('shop')}>Collection</div>
        </div>
        <div className="logo" onClick={() => onNavigate('home')}>LIANÉ</div>
        <div className="nav-icons">
          <select
            className="currency-select"
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            aria-label="Select currency"
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>{c.code}</option>
            ))}
          </select>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1c1c1a" strokeWidth="1.5"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>
          <div className="nav-icon-btn" onClick={() => onNavigate('loyalty')} title="Loyalty Circle">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1c1c1a" strokeWidth="1.5" style={{ pointerEvents: 'none' }}><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"></path></svg>
          </div>
          <div className="cart-icon" onClick={onOpenCart}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c1c1a" strokeWidth="1.5"><path d="M6 8h12l-1 12H7L6 8z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path></svg>
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </nav>
    </>
  )
}
