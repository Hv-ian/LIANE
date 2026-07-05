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
import './App.css'

function App() {
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
    <CurrencyProvider>
    <div className="app-root">
      <Nav
        cartCount={cartCount}
        onNavigate={navigate}
        onOpenCart={() => setCartOpen(true)}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <div className="app-body">
        {screen === 'home' && (
          <Home products={products} onNavigate={navigate} onOpen={openProduct} onAdd={addToCart} />
        )}
        {screen === 'shop' && (
          <Shop products={products} gender={gender} material={material} onOpen={openProduct} onAdd={addToCart} />
        )}
        {screen === 'product' && (
          <Product product={currentProduct} onBack={() => navigate('shop')} onAdd={addToCart} />
        )}
        {screen === 'about' && <About onNavigate={navigate} />}
        {screen === 'sets' && (
          <Sets sets={matchingSets} products={products} onOpen={openProduct} onAddSet={addSetToCart} />
        )}
        {screen === 'heritage' && <Heritage symbols={armenianSymbols} onNavigate={navigate} />}
        {screen === 'custom' && <CustomOrder onBack={() => navigate('home')} />}
        {screen === 'checkout' && <Checkout cart={cart} onBack={() => navigate('shop')} />}
        {screen === 'owner' && <Owner onBack={() => navigate('home')} />}
        {screen === 'loyalty' && <Loyalty onNavigate={navigate} />}

        {screen === 'home' && (
          <footer className="site-footer">
            <div className="footer-grid">
              <div>
                <div className="footer-logo">LIANÉ</div>
                <p>Fine jewelry, quietly made. Stockholm · est. 2026.</p>
              </div>
              <div>
                <div className="footer-head">Shop</div>
                <div className="footer-list">
                  <span className="footer-link" onClick={() => navigate('shop', null, 'silver')}>Silver & Stone</span>
                  <span className="footer-link" onClick={() => navigate('sets')}>Matching Sets</span>
                  <span className="footer-link" onClick={() => navigate('heritage')}>Armenian Heritage</span>
                  <span className="footer-link" onClick={() => navigate('custom')}>Custom Orders</span>
                </div>
              </div>
              <div>
                <div className="footer-head">Company</div>
                <div className="footer-list">
                  <span className="footer-link" onClick={() => navigate('about')}>About LIANÉ</span>
                  <span className="footer-link" onClick={() => navigate('loyalty')}>Loyalty Circle</span>
                  <span>Shipping</span>
                  <span>Returns</span>
                </div>
              </div>
              <div>
                <div className="footer-head">Newsletter</div>
                <p>Early access to new drops.</p>
                <div className="newsletter-row">
                  <input placeholder="Email" />
                  <button>Join</button>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 LIANÉ. All rights reserved.</span>
              <span>Privacy · Terms · Cookies · <span className="owner-link" onClick={() => navigate('owner')}>Owner login</span></span>
            </div>
          </footer>
        )}
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
    </CurrencyProvider>
  )
}

export default App
