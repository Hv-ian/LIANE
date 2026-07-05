import { createContext, useContext, useState, useEffect } from 'react'

export const CURRENCIES = [
  { code: 'SEK', symbol: 'kr', locale: 'sv-SE' },
  { code: 'EUR', symbol: '€',  locale: 'de-DE' },
  { code: 'USD', symbol: '$',  locale: 'en-US' },
  { code: 'AMD', symbol: '֏',  locale: 'hy-AM' },
]

// Fallback rates in case the fetch fails
const FALLBACK_RATES = { SEK: 1, EUR: 0.087, USD: 0.092, AMD: 35.9 }

function makeFormatter(code, rates) {
  const { locale } = CURRENCIES.find(c => c.code === code)
  const rate = rates[code] ?? FALLBACK_RATES[code]
  return (sekAmount) => {
    const converted = Math.round(sekAmount * rate)
    if (code === 'SEK') return converted.toLocaleString('sv-SE') + ' kr'
    if (code === 'AMD') return converted.toLocaleString('hy-AM') + ' ֏'
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
  const [rates, setRates] = useState(FALLBACK_RATES)

  useEffect(() => {
    // AMD is not in ECB data — fetch only EUR and USD live, keep AMD as fixed rate
    fetch('https://api.frankfurter.app/latest?base=SEK&symbols=EUR,USD')
      .then(r => r.json())
      .then(data => {
        if (data.rates) setRates(prev => ({ ...prev, ...data.rates }))
      })
      .catch(() => {}) // silently keep fallback rates on network failure
  }, [])

  const formatPrice = makeFormatter(currency, rates)

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, rates }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
