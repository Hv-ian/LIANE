import { createContext, useContext, useState } from 'react'

export const CURRENCIES = [
  { code: 'SEK', symbol: 'kr', locale: 'sv-SE' },
  { code: 'EUR', symbol: '€',  locale: 'de-DE' },
  { code: 'USD', symbol: '$',  locale: 'en-US' },
  { code: 'AMD', symbol: '֏',  locale: 'hy-AM' },
]

// Approximate fixed rates from SEK
const RATES = { SEK: 1, EUR: 0.087, USD: 0.092, AMD: 35.9 }

function makeFormatter(code) {
  const { symbol, locale } = CURRENCIES.find(c => c.code === code)
  const rate = RATES[code]
  return (sekAmount) => {
    const converted = Math.round(sekAmount * rate)
    if (code === 'SEK') {
      return converted.toLocaleString('sv-SE') + ' kr'
    }
    if (code === 'AMD') {
      return converted.toLocaleString('hy-AM') + ' ֏'
    }
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0,
    }).format(converted)
  }
}

const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('SEK')
  const formatPrice = makeFormatter(currency)
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
