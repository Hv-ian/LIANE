import heroNecklace from '../assets/hero-necklace.jpg'
import pMbracelet from '../assets/p-mbracelet.jpg'
import pMmodel from '../assets/p-mmodel.jpg'
import catRings from '../assets/cat-rings.jpg'
import catNecklaces from '../assets/cat-necklaces.jpg'
import catEarrings from '../assets/cat-earrings.jpg'
import catBracelets from '../assets/cat-bracelets.jpg'
import menRingBracelet from '../assets/men-ring-bracelet.jpg'
import menRings from '../assets/men-rings.jpg'
import menBracelet from '../assets/men-bracelet.jpg'

export function formatPrice(n) {
  return n.toLocaleString('sv-SE').replace(/,/g, ' ') + ' kr'
}

export const products = [
  { id: 'r1', name: 'Stone Signet', category: 'Rings', gender: 'men', price: 2450, tag: 'New', img: menRings, desc: 'A softly squared signet in recycled solid gold, hand-finished to a quiet matte. Weighted to sit flat and wear every day.' },
  { id: 'n1', name: 'Línea Necklace', category: 'Necklaces', gender: 'women', price: 1890, tag: 'New', img: catNecklaces, desc: 'A fluid herringbone chain that catches light as it moves. Lies flush against the collarbone with a hidden clasp.' },
  { id: 'e1', name: 'Droplet Studs', category: 'Earrings', gender: 'women', price: 1290, tag: '', img: catEarrings, desc: 'Faceted teardrop studs that read as a single point of light. Posts in nickel-free recycled gold.' },
  { id: 'b1', name: 'Mesh Cuff', category: 'Bracelets', gender: 'women', price: 3200, tag: '', img: catBracelets, desc: 'A woven mesh cuff inspired by Armenian metalwork — flexible, substantial, and entirely seamless.' },
  { id: 'r2', name: 'Halo Stone Ring', category: 'Rings', gender: 'women', price: 1650, tag: '', img: pMbracelet, desc: 'A cushion-cut stone framed by a fine pavé halo on a slender band. Quietly romantic.' },
  { id: 'n2', name: 'Pebble Pendant', category: 'Necklaces', gender: 'women', price: 2100, tag: 'Low stock', img: heroNecklace, desc: 'A smooth river-stone pendant suspended on a fine cable chain. Each stone is selected by hand.' },
  { id: 'e2', name: 'Rope Hoops', category: 'Earrings', gender: 'women', price: 1480, tag: '', img: pMmodel, desc: 'Twisted rope hoops with a warm gold finish. Light enough to forget you are wearing them.' },
  { id: 'm1', name: 'Layered Chain', category: 'Necklaces', gender: 'men', price: 2350, tag: 'New', img: menRingBracelet, desc: 'A layered cable chain with a single faceted pendant — substantial, never loud. Designed for him.' },
  { id: 'm2', name: 'Curb Bracelet', category: 'Bracelets', gender: 'men', price: 2680, tag: '', img: menBracelet, desc: 'A weighted curb-link bracelet in recycled solid gold, with a low-profile box clasp.' },
  { id: 'b2', name: 'Thread Bracelet', category: 'Bracelets', gender: 'unisex', price: 1390, tag: '', img: catBracelets, desc: 'The thinnest possible chain, knife-edge polished. Designed to be layered endlessly.' },
]

export const categories = [
  { name: 'Rings', count: '12 pieces', img: catRings },
  { name: 'Necklaces', count: '9 pieces', img: catNecklaces },
  { name: 'Earrings', count: '14 pieces', img: catEarrings },
  { name: 'Bracelets', count: '7 pieces', img: catBracelets },
]
