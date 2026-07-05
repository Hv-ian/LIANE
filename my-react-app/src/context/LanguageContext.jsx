import { createContext, useContext, useState } from 'react'

const T = {
  en: {
    // Utility bar
    announce: 'Complimentary engraving · Free shipping over 1 500 kr · Crafted in Stockholm',
    // Nav
    women: 'Women', men: 'Men', silverStone: 'Silver & Stone',
    sets: 'Sets', heritage: 'Heritage', collection: 'Collection',
    shopHer: 'Shop her', shopHim: 'Shop him',
    necklaces: 'Necklaces', earrings: 'Earrings', rings: 'Rings', bracelets: 'Bracelets',
    signetRings: 'Signet rings', chains: 'Chains', cufflinks: 'Cufflinks', viewAll: 'View all →',
    // Home
    heroEyebrow: 'The Línea Collection', heroH1a: 'In full', heroH1b: 'bloom',
    shopCollection: 'Shop the collection', ourStory: 'Our story',
    findYourPiece: 'Find your piece', shopByCategory: 'Shop by category',
    newArrivals: 'New arrivals', featuredPieces: 'Featured pieces',
    viewAll2: 'View all', addToCart: 'Add to cart',
    // Shop
    all: 'All',
    forHer: 'For her', forHim: 'For him', forAll: 'For all',
    newIn: 'New in', lowStock: 'Low stock',
    // Cart
    yourCart: 'Your cart', cartEmpty: 'Your bag is empty',
    subtotal: 'Subtotal', toCheckout: 'Go to checkout',
    freeShippingNote: 'Free shipping over 1 500 kr',
    // Product
    addToCartBtn: 'Add to cart',
    // Checkout
    placeOrder: 'Place order',
    orderSummary: 'Order summary',
    shipping: 'Shipping', free: 'Free', total: 'Total',
    firstName: 'First name', lastName: 'Last name',
    address: 'Address', city: 'City', postalCode: 'Postal code', country: 'Country',
    email: 'Email', phone: 'Phone',
    cardNumber: 'Card number', expiry: 'Expiry', cvc: 'CVC',
    // Footer
    footerTagline: 'Fine jewelry, quietly made. Stockholm · est. 2026.',
    shopCol: 'Shop', companyCol: 'Company', newsletterCol: 'Newsletter',
    newsletterNote: 'Early access to new drops.',
    emailPlaceholder: 'Email', joinBtn: 'Join',
    aboutLiane: 'About LIANÉ', loyaltyCircle: 'Loyalty Circle',
    silverAndStone: 'Silver & Stone', matchingSets: 'Matching Sets',
    armenianHeritage: 'Armenian Heritage', customOrders: 'Custom Orders',
    rights: '© 2026 LIANÉ. All rights reserved.',
    privacy: 'Privacy · Terms · Cookies',
    // Custom order
    customTitle: 'Custom Order',
    back: '← Back',
    // Loyalty
    yourAccount: 'Your Account', theLianeCircle: 'The LIANÉ Circle',
    myOrders: 'My Orders', history: 'History', returns: 'Returns', benefits: 'Circle Benefits',
    // Sets
    addSetToCart: 'Add set to cart',
  },
  sv: {
    announce: 'Kostnadsfri gravyr · Fri frakt över 1 500 kr · Tillverkad i Stockholm',
    women: 'Dam', men: 'Herr', silverStone: 'Silver & Sten',
    sets: 'Set', heritage: 'Arv', collection: 'Kollektion',
    shopHer: 'Shoppa dam', shopHim: 'Shoppa herr',
    necklaces: 'Halsband', earrings: 'Örhängen', rings: 'Ringar', bracelets: 'Armband',
    signetRings: 'Signetringar', chains: 'Kedjor', cufflinks: 'Manschettknappar', viewAll: 'Visa alla →',
    heroEyebrow: 'Línea-kollektionen', heroH1a: 'I full', heroH1b: 'blom',
    shopCollection: 'Shoppa kollektionen', ourStory: 'Vår berättelse',
    findYourPiece: 'Hitta ditt smycke', shopByCategory: 'Shoppa efter kategori',
    newArrivals: 'Nyheter', featuredPieces: 'Utvalda smycken',
    viewAll2: 'Visa alla', addToCart: 'Lägg i varukorg',
    all: 'Alla',
    forHer: 'För henne', forHim: 'För honom', forAll: 'För alla',
    newIn: 'Nyhet', lowStock: 'Få kvar',
    yourCart: 'Din varukorg', cartEmpty: 'Din väska är tom',
    subtotal: 'Delsumma', toCheckout: 'Till kassan',
    freeShippingNote: 'Fri frakt över 1 500 kr',
    addToCartBtn: 'Lägg i varukorg',
    placeOrder: 'Lägg beställning',
    orderSummary: 'Orderöversikt',
    shipping: 'Frakt', free: 'Gratis', total: 'Totalt',
    firstName: 'Förnamn', lastName: 'Efternamn',
    address: 'Adress', city: 'Stad', postalCode: 'Postnummer', country: 'Land',
    email: 'E-post', phone: 'Telefon',
    cardNumber: 'Kortnummer', expiry: 'Giltig till', cvc: 'CVC',
    footerTagline: 'Fina smycken, stilla skapade. Stockholm · est. 2026.',
    shopCol: 'Butik', companyCol: 'Företag', newsletterCol: 'Nyhetsbrev',
    newsletterNote: 'Tidig tillgång till nya kollektioner.',
    emailPlaceholder: 'E-post', joinBtn: 'Gå med',
    aboutLiane: 'Om LIANÉ', loyaltyCircle: 'Loyalty Circle',
    silverAndStone: 'Silver & Sten', matchingSets: 'Matchande set',
    armenianHeritage: 'Armeniskt arv', customOrders: 'Specialbeställningar',
    rights: '© 2026 LIANÉ. Alla rättigheter förbehållna.',
    privacy: 'Integritet · Villkor · Cookies',
    customTitle: 'Specialbeställning',
    back: '← Tillbaka',
    yourAccount: 'Ditt konto', theLianeCircle: 'LIANÉ-cirkeln',
    myOrders: 'Mina beställningar', history: 'Historik', returns: 'Returer', benefits: 'Förmåner',
    addSetToCart: 'Lägg set i varukorg',
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = (key) => T[lang][key] ?? T.en[key] ?? key
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
