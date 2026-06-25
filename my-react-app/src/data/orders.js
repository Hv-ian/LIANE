export const sampleOrders = [
  {
    id: 'LN-10482',
    date: '2026-06-20',
    status: 'Paid',
    customer: { name: 'Elin Bergström', email: 'elin.b@example.com', phone: '+46 70 123 45 67' },
    address: { line1: 'Götgatan 14', line2: 'Lgh 1203', postal: '116 46', city: 'Stockholm', country: 'Sweden' },
    items: [
      { name: 'Línea Necklace', qty: 1, priceLabel: '1 890 kr' },
      { name: 'Droplet Studs', qty: 1, priceLabel: '1 290 kr' },
    ],
    subtotalLabel: '3 180 kr', shippingLabel: 'Free', totalLabel: '3 180 kr',
  },
  {
    id: 'LN-10483',
    date: '2026-06-21',
    status: 'Paid',
    customer: { name: 'Marcus Lindqvist', email: 'marcus.l@example.com', phone: '+46 73 987 65 43' },
    address: { line1: 'Sveavägen 88', line2: '', postal: '113 50', city: 'Stockholm', country: 'Sweden' },
    items: [
      { name: 'Stone Signet', qty: 1, priceLabel: '2 450 kr' },
    ],
    subtotalLabel: '2 450 kr', shippingLabel: 'Free', totalLabel: '2 450 kr',
  },
  {
    id: 'LN-10484',
    date: '2026-06-22',
    status: 'Processing',
    customer: { name: 'Sara Nilsson', email: 'sara.n@example.com', phone: '+46 76 555 22 11' },
    address: { line1: 'Kungsgatan 32', line2: 'Box 4', postal: '411 19', city: 'Göteborg', country: 'Sweden' },
    items: [
      { name: 'Mesh Cuff', qty: 1, priceLabel: '3 200 kr' },
      { name: 'Thread Bracelet', qty: 2, priceLabel: '2 780 kr' },
    ],
    subtotalLabel: '5 980 kr', shippingLabel: 'Free', totalLabel: '5 980 kr',
  },
  {
    id: 'LN-10485',
    date: '2026-06-23',
    status: 'Shipped',
    customer: { name: 'Johan Åkesson', email: 'johan.a@example.com', phone: '+46 70 222 33 44' },
    address: { line1: 'Storgatan 5', line2: '', postal: '211 34', city: 'Malmö', country: 'Sweden' },
    items: [
      { name: 'Layered Chain', qty: 1, priceLabel: '2 350 kr' },
    ],
    subtotalLabel: '2 350 kr', shippingLabel: '75 kr', totalLabel: '2 425 kr',
  },
]
