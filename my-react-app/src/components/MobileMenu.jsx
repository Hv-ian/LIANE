export default function MobileMenu({ open, onClose, onNavigate }) {
  return (
    <>
      <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mobile-menu-head">
          <div className="logo-sm">LIANÉ</div>
          <div className="close-x" onClick={onClose}>×</div>
        </div>
        <div className="mobile-menu-links">
          <div className="mobile-link" onClick={() => onNavigate('shop', 'women')}>Women</div>
          <div className="mobile-link" onClick={() => onNavigate('shop', 'men')}>Men</div>
          <div className="mobile-link" onClick={() => onNavigate('shop', null, 'silver')}>Silver &amp; Stone</div>
          <div className="mobile-link" onClick={() => onNavigate('sets')}>Sets</div>
          <div className="mobile-link" onClick={() => onNavigate('heritage')}>Heritage</div>
          <div className="mobile-link last" onClick={() => onNavigate('about')}>About</div>
        </div>
      </div>
    </>
  )
}
