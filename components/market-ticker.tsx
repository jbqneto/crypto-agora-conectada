"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface CoinPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
}

const COIN_IDS = "bitcoin,ethereum,solana,binancecoin,usd-coin"

export function MarketTicker() {
  const [coins, setCoins] = useState<CoinPrice[]>([])
  const [fearGreed, setFearGreed] = useState<{ value: number; classification: string } | null>(null)

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS}&order=market_cap_desc&sparkline=false`
        )
        if (res.ok) {
          const data = await res.json()
          setCoins(data)
        }
      } catch {
        // fallback data
        setCoins([
          { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 97432.5, price_change_percentage_24h: 2.34 },
          { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 3245.8, price_change_percentage_24h: -1.12 },
          { id: "solana", symbol: "sol", name: "Solana", current_price: 198.42, price_change_percentage_24h: 5.67 },
          { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 612.3, price_change_percentage_24h: 0.89 },
          { id: "usd-coin", symbol: "usdc", name: "USDC", current_price: 1.0, price_change_percentage_24h: 0.01 },
        ])
      }
    }

    async function fetchFearGreed() {
      try {
        const res = await fetch("https://api.alternative.me/fng/?limit=1")
        if (res.ok) {
          const data = await res.json()
          setFearGreed({
            value: parseInt(data.data[0].value),
            classification: data.data[0].value_classification,
          })
        }
      } catch {
        setFearGreed({ value: 72, classification: "Greed" })
      }
    }

    fetchPrices()
    fetchFearGreed()

    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [])

  const translateClassification = (cls: string) => {
    const map: Record<string, string> = {
      "Extreme Fear": "Medo Extremo",
      "Fear": "Medo",
      "Neutral": "Neutro",
      "Greed": "Ganancia",
      "Extreme Greed": "Ganancia Extrema",
    }
    return map[cls] || cls
  }

  const getFearGreedColor = (value: number) => {
    if (value <= 25) return "text-red-500"
    if (value <= 45) return "text-orange-400"
    if (value <= 55) return "text-yellow-400"
    if (value <= 75) return "text-lime-400"
    return "text-emerald-400"
  }

  if (coins.length === 0) return null

  const items = [...coins, ...coins]

  return (
    <div className="bg-secondary/50 border-b border-border overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap py-2">
        {items.map((coin, i) => (
          <div
            key={`${coin.id}-${i}`}
            className="flex items-center gap-2 px-6 text-sm"
          >
            <span className="font-mono text-muted-foreground uppercase text-xs">
              {coin.symbol}
            </span>
            <span className="font-mono font-bold text-foreground">
              ${coin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`flex items-center gap-0.5 font-mono text-xs ${
                coin.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {coin.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
            <span className="text-border mx-2">|</span>
          </div>
        ))}
        {fearGreed && (
          <>
            <div className="flex items-center gap-2 px-6 text-sm">
              <span className="font-mono text-muted-foreground text-xs">
                Fear & Greed
              </span>
              <span className={`font-mono font-bold ${getFearGreedColor(fearGreed.value)}`}>
                {fearGreed.value}
              </span>
              <span className={`font-mono text-xs ${getFearGreedColor(fearGreed.value)}`}>
                {translateClassification(fearGreed.classification)}
              </span>
              <span className="text-border mx-2">|</span>
            </div>
            <div className="flex items-center gap-2 px-6 text-sm">
              <span className="font-mono text-muted-foreground text-xs">
                Fear & Greed
              </span>
              <span className={`font-mono font-bold ${getFearGreedColor(fearGreed.value)}`}>
                {fearGreed.value}
              </span>
              <span className={`font-mono text-xs ${getFearGreedColor(fearGreed.value)}`}>
                {translateClassification(fearGreed.classification)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
