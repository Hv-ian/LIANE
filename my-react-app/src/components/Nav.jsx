import { useState, useRef, useEffect } from 'react'
import { useCurrency, CURRENCIES } from '../context/CurrencyContext'
import { useLanguage } from '../context/LanguageContext'

export default function Nav({ cartCount, onNavigate, onOpenCart, onOpenMobileMenu }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const currencyRef = useRef(null)
  const { currency, setCurrency } = useCurrency()
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    function handleClick(e) {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      {/* Utility strip: announcement left, controls right */}
      <div className="utility-bar">
        <span className="utility-announce">{t('announce')}</span>
        <div className="utility-controls">
          <div className="lang-toggle">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            <span className="util-divider">|</span>
            <button className={lang === 'sv' ? 'active' : ''} onClick={() => setLang('sv')}>SV</button>
          </div>
          <span className="util-divider">·</span>
          <div className="currency-wrap" ref={currencyRef}>
            <button className="currency-btn" onClick={() => setCurrencyOpen(o => !o)}>
              {currency} <span className="currency-chevron">{currencyOpen ? '▴' : '▾'}</span>
            </button>
            {currencyOpen && (
              <div className="currency-dropdown">
                {CURRENCIES.map(c => (
                  <div
                    key={c.code}
                    className={`currency-option${currency === c.code ? ' active' : ''}`}
                    onClick={() => { setCurrency(c.code); setCurrencyOpen(false) }}
                  >
                    {c.code}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main nav — clean, no controls */}
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
            <div className="liane-nav" onClick={() => onNavigate('shop', 'women')}>{t('women')}</div>
            {openMenu === 'women' && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-inner">
                  <div className="nav-dropdown-eyebrow">{t('shopHer')}</div>
                  <div className="nav-dropdown-list">
                    <div onClick={() => onNavigate('shop', 'women')}>{t('necklaces')}</div>
                    <div onClick={() => onNavigate('shop', 'women')}>{t('earrings')}</div>
                    <div onClick={() => onNavigate('shop', 'women')}>{t('rings')}</div>
                    <div onClick={() => onNavigate('shop', 'women')}>{t('bracelets')}</div>
                    <div className="nav-dropdown-divider" />
                    <div onClick={() => onNavigate('shop', null, 'silver')}>{t('silverStone')}</div>
                    <div onClick={() => onNavigate('sets')}>{t('sets')}</div>
                  </div>
                  <div className="nav-dropdown-viewall" onClick={() => onNavigate('shop', 'women')}>{t('viewAll')}</div>
                </div>
              </div>
            )}
          </div>

          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setOpenMenu('men')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="liane-nav" onClick={() => onNavigate('shop', 'men')}>{t('men')}</div>
            {openMenu === 'men' && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-inner">
                  <div className="nav-dropdown-eyebrow">{t('shopHim')}</div>
                  <div className="nav-dropdown-list">
                    <div onClick={() => onNavigate('shop', 'men')}>{t('signetRings')}</div>
                    <div onClick={() => onNavigate('shop', 'men')}>{t('chains')}</div>
                    <div onClick={() => onNavigate('shop', 'men')}>{t('bracelets')}</div>
                    <div onClick={() => onNavigate('shop', 'men')}>{t('cufflinks')}</div>
                    <div className="nav-dropdown-divider" />
                    <div onClick={() => onNavigate('shop', null, 'silver')}>{t('silverStone')}</div>
                    <div onClick={() => onNavigate('sets')}>{t('sets')}</div>
                  </div>
                  <div className="nav-dropdown-viewall" onClick={() => onNavigate('shop', 'men')}>{t('viewAll')}</div>
                </div>
              </div>
            )}
          </div>

          <div className="liane-nav muted" onClick={() => onNavigate('heritage')}>{t('heritage')}</div>
          <div className="liane-nav muted" onClick={() => onNavigate('shop')}>{t('collection')}</div>
          <div className="liane-nav muted nav-custom" onClick={() => onNavigate('custom-order')}>{t('customOrders')}</div>
          <div className="liane-nav muted nav-loyalty" onClick={() => onNavigate('loyalty')}>{t('loyaltyCircle')}</div>
        </div>

        <div className="logo" onClick={() => onNavigate('home')}>LIANELA</div>

        <div className="nav-icons">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1a" strokeWidth="1.5" style={{cursor:'pointer'}}><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
          <div className="nav-icon-btn" onClick={() => onNavigate('loyalty')} title="My account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1a" strokeWidth="1.5" style={{ pointerEvents: 'none' }}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>
          </div>
          <div className="cart-icon" onClick={onOpenCart}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1a" strokeWidth="1.5"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </nav>
    </>
  )
}
