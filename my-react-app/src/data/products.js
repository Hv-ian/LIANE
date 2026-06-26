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
  // ===== Fine gold line =====
  { id: 'r1', name: 'Stone Signet', category: 'Rings', gender: 'men', material: 'gold', price: 2450, tag: 'New', img: menRings, desc: 'A softly squared signet in recycled solid gold, hand-finished to a quiet matte. Weighted to sit flat and wear every day.' },
  { id: 'n1', name: 'Línea Necklace', category: 'Necklaces', gender: 'women', material: 'gold', price: 1890, tag: 'New', img: catNecklaces, desc: 'A fluid herringbone chain that catches light as it moves. Lies flush against the collarbone with a hidden clasp.' },
  { id: 'e1', name: 'Droplet Studs', category: 'Earrings', gender: 'women', material: 'gold', price: 1290, tag: '', img: catEarrings, desc: 'Faceted teardrop studs that read as a single point of light. Posts in nickel-free recycled gold.' },
  { id: 'b1', name: 'Mesh Cuff', category: 'Bracelets', gender: 'women', material: 'gold', price: 3200, tag: '', img: catBracelets, desc: 'A woven mesh cuff inspired by Armenian metalwork — flexible, substantial, and entirely seamless.' },
  { id: 'r2', name: 'Halo Stone Ring', category: 'Rings', gender: 'women', material: 'gold', price: 1650, tag: '', img: pMbracelet, desc: 'A cushion-cut stone framed by a fine pavé halo on a slender band. Quietly romantic.' },
  { id: 'n2', name: 'Pebble Pendant', category: 'Necklaces', gender: 'women', material: 'gold', price: 2100, tag: 'Low stock', img: heroNecklace, desc: 'A smooth river-stone pendant suspended on a fine cable chain. Each stone is selected by hand.' },
  { id: 'e2', name: 'Rope Hoops', category: 'Earrings', gender: 'women', material: 'gold', price: 1480, tag: '', img: pMmodel, desc: 'Twisted rope hoops with a warm gold finish. Light enough to forget you are wearing them.' },
  { id: 'm1', name: 'Layered Chain', category: 'Necklaces', gender: 'men', material: 'gold', price: 2350, tag: 'New', img: menRingBracelet, desc: 'A layered cable chain with a single faceted pendant — substantial, never loud. Designed for him.' },
  { id: 'm2', name: 'Curb Bracelet', category: 'Bracelets', gender: 'men', material: 'gold', price: 2680, tag: '', img: menBracelet, desc: 'A weighted curb-link bracelet in recycled solid gold, with a low-profile box clasp.' },
  { id: 'b2', name: 'Thread Bracelet', category: 'Bracelets', gender: 'unisex', material: 'gold', price: 1390, tag: '', img: catBracelets, desc: 'The thinnest possible chain, knife-edge polished. Designed to be layered endlessly.' },

  // ===== Silver & natural stone line =====
  { id: 's1', name: 'Moonstone Cuff', category: 'Bracelets', gender: 'women', material: 'silver', price: 890, tag: 'New', img: catBracelets, desc: 'A polished sterling silver cuff set with a raw moonstone. Said to calm and bring balance to the one who wears it.', meaning: 'Moonstone — balance & new beginnings' },
  { id: 's2', name: 'Onyx Band', category: 'Rings', gender: 'men', material: 'silver', price: 690, tag: '', img: menRings, desc: 'A heavy sterling silver band set with black onyx, oxidized for depth. Worn as protection against negativity.', meaning: 'Onyx — strength & protection' },
  { id: 's3', name: 'Armenian Cross Pendant', category: 'Necklaces', gender: 'unisex', material: 'silver', price: 750, tag: 'New', img: catNecklaces, desc: 'A khachkar-inspired cross hand-engraved in sterling silver, carrying the eternity knot found on Armenian stone crosses for centuries.', meaning: 'Armenian cross — eternal faith & protection', armenian: true },
  { id: 's4', name: 'Eternity Knot Ring', category: 'Rings', gender: 'women', material: 'silver', price: 590, tag: '', img: catRings, desc: 'The endless Armenian eternity knot, hand-carved into a slender silver band — a quiet symbol of unity and continuity.', meaning: 'Eternity knot — unity & continuity', armenian: true },
  { id: 's5', name: 'Garnet Drop Earrings', category: 'Earrings', gender: 'women', material: 'silver', price: 650, tag: '', img: catEarrings, desc: 'Raw-cut garnet drops set in oxidized sterling silver. Traditionally worn for courage and vitality.', meaning: 'Garnet — courage & vitality' },
  { id: 's6', name: "Men's Stone Cuff", category: 'Bracelets', gender: 'men', material: 'silver', price: 790, tag: '', img: menBracelet, desc: 'A substantial sterling silver cuff set with natural tiger-eye, worn for focus and grounding.', meaning: 'Tiger-eye — focus & grounding' },
]

export const categories = [
  { name: 'Rings', count: '12 pieces', img: catRings },
  { name: 'Necklaces', count: '9 pieces', img: catNecklaces },
  { name: 'Earrings', count: '14 pieces', img: catEarrings },
  { name: 'Bracelets', count: '7 pieces', img: catBracelets },
]

// ===== Matching sets — bracelet / necklace / ring combinations with shared meaning =====
export const matchingSets = [
  {
    id: 'set-sisters',
    name: 'Sisters Set',
    occasion: 'Sisters',
    eyebrow: 'For two',
    img: catNecklaces,
    desc: 'A necklace and cuff pair, each carrying the same fluid line — made so two sisters can wear half of the same piece.',
    meaning: 'Worn together, never apart',
    itemIds: ['n1', 'b1'],
  },
  {
    id: 'set-brothers',
    name: 'Brothers Set',
    occasion: 'Brothers',
    eyebrow: 'For two',
    img: menRingBracelet,
    desc: 'A layered chain and curb bracelet in matching recycled gold — substantial pieces designed to be worn as a pair.',
    meaning: 'Shared weight, shared bond',
    itemIds: ['m1', 'm2'],
  },
  {
    id: 'set-friends',
    name: 'Two Girls Set',
    occasion: 'Best friends',
    eyebrow: 'For two',
    img: catEarrings,
    desc: 'Droplet studs and a halo stone ring — a quiet matching gesture for best friends or two girls who share everything.',
    meaning: 'A small piece of each other',
    itemIds: ['e1', 'r2'],
  },
  {
    id: 'set-family',
    name: 'Generations Set',
    occasion: 'Family',
    eyebrow: 'For three',
    img: catNecklaces,
    desc: 'The Armenian cross pendant and eternity knot ring, sized for mother, daughter, and the generation after — the same symbol, carried by everyone.',
    meaning: 'One symbol, passed down',
    itemIds: ['s3', 's4'],
  },
]

// ===== Armenian motifs & symbolic stones — heritage / education content =====
export const armenianSymbols = [
  {
    name: 'Khachkar Cross',
    img: catNecklaces,
    meaning: 'Eternal faith & protection',
    desc: 'Modeled on the carved stone crosses found across Armenia, this motif has marked protection and remembrance for over a thousand years.',
  },
  {
    name: 'Eternity Knot',
    img: catRings,
    meaning: 'Unity & continuity',
    desc: 'An unbroken interlacing line, traditionally worked into Armenian silverwork to symbolize a bond or family line that never ends.',
  },
  {
    name: 'Pomegranate Motif',
    img: catBracelets,
    meaning: 'Fertility & abundance',
    desc: 'A recurring symbol in Armenian decorative arts, often engraved into bracelets gifted between women in the same family.',
  },
]
