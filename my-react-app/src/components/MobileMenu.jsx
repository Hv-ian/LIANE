import { useLanguage } from '../context/LanguageContext'

export default function MobileMenu({ open, onClose, onNavigate }) {
  const { t } = useLanguage()
  return (
    <>
      <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mobile-menu-head">
          <div className="logo-sm">LIANÉ</div>
          <div className="close-x" onClick={onClose}>×</div>
        </div>
        <div className="mobile-menu-links">
          <div className="mobile-link" onClick={() => onNavigate('shop', 'women')}>{t('women')}</div>
          <div className="mobile-link" onClick={() => onNavigate('shop', 'men')}>{t('men')}</div>
          <div className="mobile-link" onClick={() => onNavigate('shop', null, 'silver')}>{t('silverStone')}</div>
          <div className="mobile-link" onClick={() => onNavigate('sets')}>{t('sets')}</div>
          <div className="mobile-link" onClick={() => onNavigate('heritage')}>{t('heritage')}</div>
          <div className="mobile-link" onClick={() => onNavigate('shop')}>{t('collection')}</div>
          <div className="mobile-link last" onClick={() => onNavigate('loyalty')}>{t('loyaltyCircle')}</div>
        </div>
      </div>
    </>
  )
}
