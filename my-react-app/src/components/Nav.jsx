export default function Nav({ cartCount, onNavigate, onOpenCart, onOpenMobileMenu }) {
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
          <div className="liane-nav" onClick={() => onNavigate('shop', 'women')}>Women</div>
          <div className="liane-nav" onClick={() => onNavigate('shop', 'men')}>Men</div>
          <div className="liane-nav muted" onClick={() => onNavigate('shop')}>Collections</div>
          <div className="liane-nav muted" onClick={() => onNavigate('about')}>About</div>
        </div>
        <div className="logo" onClick={() => onNavigate('home')}>LIANÉ</div>
        <div className="nav-icons">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1c1c1a" strokeWidth="1.5"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1c1c1a" strokeWidth="1.5"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"></path></svg>
          <div className="cart-icon" onClick={onOpenCart}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c1c1a" strokeWidth="1.5"><path d="M6 8h12l-1 12H7L6 8z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path></svg>
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </nav>
    </>
  )
}
