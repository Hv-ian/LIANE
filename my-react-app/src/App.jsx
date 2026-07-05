import { useState } from 'react'
import { products, matchingSets, armenianSymbols } from './data/products'
import Nav from './components/Nav'
import MobileMenu from './components/MobileMenu'
import CartDrawer from './components/CartDrawer'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import About from './components/About'
import Checkout from './components/Checkout'
import Owner from './components/Owner'
import Sets from './components/Sets'
import Heritage from './components/Heritage'
import CustomOrder from './components/CustomOrder'
import Loyalty from './components/Loyalty'
import { CurrencyProvider } from './context/CurrencyContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import './App.css'

export default function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AppContent />
      </CurrencyProvider>
    </LanguageProvider>
  )
}

function SiteFooter({ navigate }) {
  const { t } = useLanguage()
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">LIANÉ</div>
          <p>{t('footerTagline')}</p>
        </div>
        <div>
          <div className="footer-head">{t('shopCol')}</div>
          <div className="footer-list">
            <span className="footer-link" onClick={() => navigate('shop', null, 'silver')}>{t('silverAndStone')}</span>
            <span className="footer-link" onClick={() => navigate('sets')}>{t('matchingSets')}</span>
            <span className="footer-link" onClick={() => navigate('heritage')}>{t('armenianHeritage')}</span>
            <span className="footer-link" onClick={() => navigate('custom')}>{t('customOrders')}</span>
          </div>
        </div>
        <div>
          <div className="footer-head">{t('companyCol')}</div>
          <div className="footer-list">
            <span className="footer-link" onClick={() => navigate('about')}>{t('aboutLiane')}</span>
            <span className="footer-link" onClick={() => navigate('loyalty')}>{t('loyaltyCircle')}</span>
            <span>{t('shipping')}</span>
            <span>{t('returns')}</span>
          </div>
        </div>
        <div>
          <div className="footer-head">{t('newsletterCol')}</div>
          <p>{t('newsletterNote')}</p>
          <div className="newsletter-row">
            <input placeholder={t('emailPlaceholder')} />
            <button>{t('joinBtn')}</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t('rights')}</span>
        <span>{t('privacy')} · <span className="owner-link" onClick={() => navigate('owner')}>Owner login</span></span>
      </div>
    </footer>
  )
}

function AppContent() {
  const [screen, setScreen] = useState('home')
  const [gender, setGender] = useState(null)
  const [material, setMaterial] = useState(null)
  const [currentId, setCurrentId] = useState('r1')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function navigate(target, g, m) {
    setScreen(target)
    if (g !== undefined) setGender(g)
    else if (target === 'shop') setGender(null)
    if (m !== undefined) setMaterial(m)
    else if (target === 'shop') setMaterial(null)
    setCartOpen(false)
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }

  function openProduct(id) {
    setCurrentId(id)
    setScreen('product')
    window.scrollTo(0, 0)
  }

  function addToCart(p) {
    setCart(prev => {
      const existing = prev.find(c => c.id === p.id)
      if (existing) return prev.map(c => c.id === p.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...p, qty: 1 }]
    })
    setCartOpen(true)
  }

  function changeQty(id, delta) {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c).filter(c => c.qty > 0))
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  function addSetToCart(items) {
    setCart(prev => {
      let next = prev
      items.forEach(p => {
        const existing = next.find(c => c.id === p.id)
        next = existing
          ? next.map(c => c.id === p.id ? { ...c, qty: c.qty + 1 } : c)
          : [...next, { ...p, qty: 1 }]
      })
      return next
    })
    setCartOpen(true)
  }

  const cartCount = cart.reduce((a, c) => a + c.qty, 0)
  const currentProduct = products.find(p => p.id === currentId)

  return (
    <div className="app-root">
      <Nav
        cartCount={cartCount}
        onNavigate={navigate}
        onOpenCart={() => setCartOpen(true)}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <div className="app-body">
        {screen === 'home' && <Home products={products} onNavigate={navigate} onOpen={openProduct} onAdd={addToCart} />}
        {screen === 'shop' && <Shop products={products} gender={gender} material={material} onOpen={openProduct} onAdd={addToCart} />}
        {screen === 'product' && <Product product={currentProduct} onBack={() => navigate('shop')} onAdd={addToCart} />}
        {screen === 'about' && <About onNavigate={navigate} />}
        {screen === 'sets' && <Sets sets={matchingSets} products={products} onOpen={openProduct} onAddSet={addSetToCart} />}
        {screen === 'heritage' && <Heritage symbols={armenianSymbols} onNavigate={navigate} />}
        {screen === 'custom' && <CustomOrder onBack={() => navigate('home')} />}
        {screen === 'checkout' && <Checkout cart={cart} onBack={() => navigate('shop')} />}
        {screen === 'owner' && <Owner onBack={() => navigate('home')} />}
        {screen === 'loyalty' && <Loyalty onNavigate={navigate} />}
        {screen === 'home' && <SiteFooter navigate={navigate} />}
      </div>

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onInc={(id) => changeQty(id, 1)}
        onDec={(id) => changeQty(id, -1)}
        onRemove={removeFromCart}
        onCheckout={() => navigate('checkout')}
      />

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onNavigate={navigate} />
    </div>
  )
}
