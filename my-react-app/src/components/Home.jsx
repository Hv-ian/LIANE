import { useCurrency } from '../context/CurrencyContext'
import heroNeck from '../assets/hero-necklace.jpg'
import heroBranch from '../assets/hero-branch.png'
import splitWomen from '../assets/split-women.jpg'
import splitMen from '../assets/men-portrait.jpg'
import lookA from '../assets/cat-earrings.jpg'
import lookB from '../assets/cat-bracelets.jpg'
import highlightImg from '../assets/cat-bracelets.jpg'
import editorialImg from '../assets/cat-rings.jpg'

export default function Home({ products, onNavigate, onOpen, onAdd }) {
  const { formatPrice } = useCurrency()
  const featured = products.slice(0, 4)

  return (
    <div>
      <section className="hero">
        <div className="hero-petals">
          <span className="petal p1"></span>
          <span className="petal p2"></span>
          <span className="petal p3"></span>
          <span className="petal p4"></span>
          <span className="petal p5"></span>
        </div>
        <img src={heroBranch} alt="" className="hero-branch" />
        <div className="hero-neck">
          <img src={heroNeck} alt="Línea necklace collection" />
        </div>
        <div className="hero-text">
          <div className="eyebrow">The Línea Collection</div>
          <h1>In full<br />bloom</h1>
          <div className="hero-cta">
            <button className="liane-btn" onClick={() => onNavigate('shop')}>Shop the collection</button>
            <div className="liane-arrow" onClick={() => onNavigate('about')}>Our story</div>
          </div>
        </div>
      </section>

      <div className="section-head">
        <div className="eyebrow">Find your piece</div>
        <h2>Shop by category</h2>
      </div>
      <section className="cat-grid">
        {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((cat, i) => (
          <div className="cat-card" key={cat} onClick={() => onNavigate('shop')}>
            <div className="cat-circle"><img src={products.find(p => p.category === cat)?.img} alt={cat} /></div>
            <div className="cat-name">{cat}</div>
            <div className="cat-count">{[12, 9, 14, 7][i]} pieces</div>
          </div>
        ))}
      </section>

      <section className="split2">
        <div className="split-cell" onClick={() => onNavigate('shop', 'women')}>
          <img src={splitWomen} alt="Women" />
          <div className="split-overlay"></div>
          <div className="split-label">
            <div className="eyebrow light">For her</div>
            <div className="split-title">Women</div>
            <div className="split-link">Shop the edit</div>
          </div>
        </div>
        <div className="split-cell" onClick={() => onNavigate('shop', 'men')}>
          <img src={splitMen} alt="Men" />
          <div className="split-overlay"></div>
          <div className="split-label">
            <div className="eyebrow light">For him</div>
            <div className="split-title">Men</div>
            <div className="split-link">Shop the edit</div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-head">
          <div className="eyebrow">Selected for you</div>
          <h2>Best of the season</h2>
        </div>
        <div className="prod-grid4">
          {featured.map(p => (
            <div className="prod-card" key={p.id}>
              <div className="prod-thumb" onClick={() => onOpen(p.id)}>
                <img src={p.img} alt={p.name} />
                {p.tag && <div className="prod-tag">{p.tag}</div>}
              </div>
              <div className="prod-cat">{p.category}</div>
              <div className="prod-row">
                <div className="prod-name" onClick={() => onOpen(p.id)}>{p.name}</div>
                <div className="prod-price">{formatPrice(p.price)}</div>
              </div>
              <button className="ghost-btn" onClick={() => onAdd(p)}>Add to cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="lookbook">
        <div className="look-grid">
          <div className="look-img"><img src={lookA} alt="Lookbook" /></div>
          <div className="look-text">
            <div className="eyebrow">Lookbook</div>
            <h2>Worn, never<br />displayed</h2>
            <p>Pieces that live on skin — layered, mixed, and made to move with you from morning to evening.</p>
            <div className="text-link" onClick={() => onNavigate('shop')}>View the series</div>
          </div>
          <div className="look-img side"><img src={lookB} alt="Lookbook" /></div>
        </div>
      </section>

      <section className="marquee-band">
        <div className="marquee-track">
          <div className="marquee-row">
            <span>Recycled solid gold</span><span className="dot">✦</span><span>Crafted in Stockholm</span><span className="dot">✦</span><span>Armenian goldwork</span><span className="dot">✦</span><span>Lifetime repair</span><span className="dot">✦</span>
          </div>
          <div className="marquee-row">
            <span>Recycled solid gold</span><span className="dot">✦</span><span>Crafted in Stockholm</span><span className="dot">✦</span><span>Armenian goldwork</span><span className="dot">✦</span><span>Lifetime repair</span><span className="dot">✦</span>
          </div>
        </div>
      </section>

      <section className="highlight">
        <img src={highlightImg} alt="Gold mesh cuff" />
        <div className="highlight-tint"></div>
        <div className="highlight-shimmer"></div>
        <div className="highlight-text">
          <div className="eyebrow light">In motion</div>
          <h2>Catch the light from every angle</h2>
        </div>
      </section>

      <section className="split2 editorial">
        <div className="editorial-img"><img src={editorialImg} alt="Hand-finished signet ring" /></div>
        <div className="editorial-text">
          <div className="eyebrow">The house</div>
          <h2>Made to be worn for decades, not seasons</h2>
          <p>Recycled solid gold and responsibly sourced stones, hand-finished in small batches. Every piece carries the LIANÉ hallmark and a lifetime repair promise.</p>
          <div className="text-link" onClick={() => onNavigate('about')}>Read our story</div>
        </div>
      </section>
    </div>
  )
}
