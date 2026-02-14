"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { TrendingUp, TrendingDown, BarChart3, Activity, ChevronLeft, ChevronRight, Flame, Globe } from "lucide-react"

interface CoinData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  sparkline_in_7d?: { price: number[] }
}

interface FearGreedData {
  value: number
  classification: string
}

interface TrendingCoin {
  name: string
  symbol: string
  price: string
  change24h: number
}

interface IndexData {
  name: string
  ticker: string
  value: string
  change: number
}

const COIN_IDS = "bitcoin,ethereum,solana,binancecoin,usd-coin,cardano,ripple,avalanche-2,polkadot,chainlink"

export function MarketCards() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [fearGreed, setFearGreed] = useState<FearGreedData | null>(null)
  const [globalData, setGlobalData] = useState<{
    total_market_cap: number
    total_volume: number
    btc_dominance: number
    eth_dominance: number
    market_cap_change_24h: number
    active_cryptocurrencies: number
    markets: number
  } | null>(null)
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([])
  const [indices, setIndices] = useState<IndexData[]>([])
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [coinsRes, fgRes, globalRes, trendingRes] = await Promise.allSettled([
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS}&order=market_cap_desc&sparkline=true`),
          fetch("https://api.alternative.me/fng/?limit=1"),
          fetch("https://api.coingecko.com/api/v3/global"),
          fetch("https://api.coingecko.com/api/v3/search/trending"),
        ])

        if (coinsRes.status === "fulfilled" && coinsRes.value.ok) {
          setCoins(await coinsRes.value.json())
        } else {
          setCoins(getFallbackCoins())
        }

        if (fgRes.status === "fulfilled" && fgRes.value.ok) {
          const fgData = await fgRes.value.json()
          setFearGreed({
            value: parseInt(fgData.data[0].value),
            classification: fgData.data[0].value_classification,
          })
        } else {
          setFearGreed({ value: 72, classification: "Greed" })
        }

        if (globalRes.status === "fulfilled" && globalRes.value.ok) {
          const gData = await globalRes.value.json()
          setGlobalData({
            total_market_cap: gData.data.total_market_cap.usd,
            total_volume: gData.data.total_volume.usd,
            btc_dominance: gData.data.market_cap_percentage.btc,
            eth_dominance: gData.data.market_cap_percentage.eth,
            market_cap_change_24h: gData.data.market_cap_change_percentage_24h_usd,
            active_cryptocurrencies: gData.data.active_cryptocurrencies || 14532,
            markets: gData.data.markets || 1102,
          })
        } else {
          setGlobalData({
            total_market_cap: 3.45e12,
            total_volume: 142.5e9,
            btc_dominance: 52.3,
            eth_dominance: 17.1,
            market_cap_change_24h: 1.85,
            active_cryptocurrencies: 14532,
            markets: 1102,
          })
        }

        if (trendingRes.status === "fulfilled" && trendingRes.value.ok) {
          const tData = await trendingRes.value.json()
          const mapped = (tData.coins || []).slice(0, 4).map((c: { item: { name: string; symbol: string; data?: { price?: string; price_change_percentage_24h?: { usd?: number } } } }) => ({
            name: c.item.name,
            symbol: c.item.symbol,
            price: c.item.data?.price || "$0.00",
            change24h: c.item.data?.price_change_percentage_24h?.usd || 0,
          }))
          setTrendingCoins(mapped.length > 0 ? mapped : getFallbackTrending())
        } else {
          setTrendingCoins(getFallbackTrending())
        }

        // Traditional indices (no free reliable API, using curated data)
        setIndices(getFallbackIndices())
      } catch {
        setCoins(getFallbackCoins())
        setFearGreed({ value: 72, classification: "Greed" })
        setGlobalData({
          total_market_cap: 3.45e12,
          total_volume: 142.5e9,
          btc_dominance: 52.3,
          eth_dominance: 17.1,
          market_cap_change_24h: 1.85,
          active_cryptocurrencies: 14532,
          markets: 1102,
        })
        setTrendingCoins(getFallbackTrending())
        setIndices(getFallbackIndices())
      }
    }

    fetchAll()
    const interval = setInterval(fetchAll, 120000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSlide = useCallback((index: number) => {
    if (!scrollRef.current) return
    const children = scrollRef.current.children
    if (children[index]) {
      ;(children[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      })
      setActiveSlide(index)
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollLeft = container.scrollLeft
    const cardWidth = container.children[0]?.clientWidth || 0
    const gap = 16
    const index = Math.round(scrollLeft / (cardWidth + gap))
    setActiveSlide(index)
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
    if (value <= 25) return "bg-red-500"
    if (value <= 45) return "bg-orange-400"
    if (value <= 55) return "bg-yellow-400"
    if (value <= 75) return "bg-lime-400"
    return "bg-emerald-400"
  }

  const getFearGreedTextColor = (value: number) => {
    if (value <= 25) return "text-red-500"
    if (value <= 45) return "text-orange-400"
    if (value <= 55) return "text-yellow-400"
    if (value <= 75) return "text-lime-400"
    return "text-emerald-400"
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return `$${value.toFixed(2)}`
  }

  const MiniSparkline = ({ prices, positive }: { prices: number[]; positive: boolean }) => {
    if (!prices || prices.length === 0) return null
    const sampled = prices.filter((_, i) => i % 4 === 0)
    const min = Math.min(...sampled)
    const max = Math.max(...sampled)
    const range = max - min || 1
    const width = 60
    const height = 20
    const points = sampled
      .map((p, i) => {
        const x = (i / (sampled.length - 1)) * width
        const y = height - ((p - min) / range) * height
        return `${x},${y}`
      })
      .join(" ")

    return (
      <svg width={width} height={height} className="shrink-0">
        <polyline
          points={points}
          fill="none"
          stroke={positive ? "hsl(165, 80%, 48%)" : "hsl(0, 72%, 55%)"}
          strokeWidth="1.5"
        />
      </svg>
    )
  }

  return (
    <section id="mercado" className="space-y-3">
      {/* Carousel nav for mobile */}
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="text-lg font-bold text-foreground tracking-tight">Dados de Mercado</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
            className="h-7 w-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollToSlide(Math.min(2, activeSlide + 1))}
            className="h-7 w-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Proximo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Cards container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0"
      >
        {/* Card 1: Fear & Greed + Trending */}
        <div className="min-w-[85vw] sm:min-w-[70vw] lg:min-w-0 snap-start rounded-xl border border-border bg-card p-5 flex flex-col">
          {fearGreed ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Fear & Greed Index</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-[72px] w-[72px] shrink-0">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8"
                      strokeDasharray={`${(fearGreed.value / 100) * 264} 264`}
                      strokeLinecap="round"
                      className={getFearGreedTextColor(fearGreed.value)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xl font-mono font-bold ${getFearGreedTextColor(fearGreed.value)}`}>
                      {fearGreed.value}
                    </span>
                  </div>
                </div>
                <div>
                  <p className={`text-sm font-bold ${getFearGreedTextColor(fearGreed.value)}`}>
                    {translateClassification(fearGreed.classification)}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Sentimento do mercado
                  </p>
                </div>
              </div>
              <div className="mt-2.5 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getFearGreedColor(fearGreed.value)}`}
                  style={{ width: `${fearGreed.value}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-[9px] text-muted-foreground font-mono">
                <span>Medo Extremo</span>
                <span>Ganancia Extrema</span>
              </div>

              {/* Trending Coins Section */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Flame className="h-3.5 w-3.5 text-orange-400" />
                  <span className="text-xs font-semibold text-foreground">Em Alta</span>
                </div>
                <div className="space-y-1.5">
                  {trendingCoins.map((coin) => (
                    <div key={coin.symbol} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-foreground">{coin.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">{coin.symbol}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-foreground">{coin.price}</span>
                        <span className={`text-[10px] font-mono flex items-center gap-0.5 ${
                          coin.change24h >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}>
                          {coin.change24h >= 0 ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                          {Math.abs(coin.change24h).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-secondary rounded w-1/2" />
              <div className="h-20 bg-secondary rounded" />
              <div className="h-24 bg-secondary rounded" />
            </div>
          )}
        </div>

        {/* Card 2: Mercado Global + Indices */}
        <div className="min-w-[85vw] sm:min-w-[70vw] lg:min-w-0 snap-start rounded-xl border border-border bg-card p-5 flex flex-col">
          {globalData ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Mercado Cripto</h3>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Market Cap Total</span>
                  <span className="text-sm font-mono font-bold text-foreground">
                    {formatMarketCap(globalData.total_market_cap)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Volume 24h</span>
                  <span className="text-sm font-mono font-bold text-foreground">
                    {formatMarketCap(globalData.total_volume)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Variacao 24h</span>
                  <span className={`text-sm font-mono font-bold flex items-center gap-1 ${
                    globalData.market_cap_change_24h >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {globalData.market_cap_change_24h >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(globalData.market_cap_change_24h).toFixed(2)}%
                  </span>
                </div>
                {/* Dominance bars */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-muted-foreground">Dominancia</span>
                  </div>
                  <div className="h-3 rounded-full bg-secondary overflow-hidden flex">
                    <div
                      className="h-full bg-orange-400 flex items-center justify-center"
                      style={{ width: `${globalData.btc_dominance}%` }}
                    >
                      <span className="text-[8px] font-mono font-bold text-background">BTC {globalData.btc_dominance.toFixed(1)}%</span>
                    </div>
                    <div
                      className="h-full bg-blue-400 flex items-center justify-center"
                      style={{ width: `${globalData.eth_dominance}%` }}
                    >
                      <span className="text-[8px] font-mono font-bold text-background">ETH {globalData.eth_dominance.toFixed(1)}%</span>
                    </div>
                    <div className="h-full flex-1 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-muted-foreground">Outros</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <div className="flex-1 rounded-lg bg-secondary/60 p-2 text-center">
                    <div className="text-[10px] text-muted-foreground">Criptos Ativas</div>
                    <div className="text-xs font-mono font-bold text-foreground">{globalData.active_cryptocurrencies.toLocaleString("pt-BR")}</div>
                  </div>
                  <div className="flex-1 rounded-lg bg-secondary/60 p-2 text-center">
                    <div className="text-[10px] text-muted-foreground">Exchanges</div>
                    <div className="text-xs font-mono font-bold text-foreground">{globalData.markets.toLocaleString("pt-BR")}</div>
                  </div>
                </div>
              </div>

              {/* Traditional Indices */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Globe className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs font-semibold text-foreground">Indices Globais</span>
                </div>
                <div className="space-y-1.5">
                  {indices.map((idx) => (
                    <div key={idx.ticker} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-foreground">{idx.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{idx.ticker}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-foreground">{idx.value}</span>
                        <span className={`text-[10px] font-mono flex items-center gap-0.5 ${
                          idx.change >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}>
                          {idx.change >= 0 ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                          {Math.abs(idx.change).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-secondary rounded w-1/2" />
              <div className="h-20 bg-secondary rounded" />
              <div className="h-24 bg-secondary rounded" />
            </div>
          )}
        </div>

        {/* Card 3: Top Criptomoedas */}
        <div className="min-w-[85vw] sm:min-w-[70vw] lg:min-w-0 snap-start rounded-xl border border-border bg-card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Top Criptomoedas</h3>
            <span className="text-[10px] text-muted-foreground font-mono">24h</span>
          </div>
          <div className="space-y-1">
            {(coins.length > 0 ? coins : getFallbackCoins()).slice(0, 10).map((coin) => (
              <div
                key={coin.id}
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <span className="text-[10px] text-muted-foreground font-mono w-4 text-right">
                  {coin.market_cap_rank}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-foreground">{coin.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{coin.symbol}</span>
                  </div>
                </div>
                <MiniSparkline
                  prices={coin.sparkline_in_7d?.price || []}
                  positive={coin.price_change_percentage_24h >= 0}
                />
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-foreground">
                    ${coin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-[10px] font-mono flex items-center justify-end gap-0.5 ${
                    coin.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {coin.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="h-2.5 w-2.5" />
                    ) : (
                      <TrendingDown className="h-2.5 w-2.5" />
                    )}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots indicator for mobile */}
      <div className="flex items-center justify-center gap-2 lg:hidden">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === i ? "w-6 bg-primary" : "w-1.5 bg-border"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function getFallbackCoins(): CoinData[] {
  return [
    { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 97432.5, price_change_percentage_24h: 2.34, market_cap: 1.92e12, market_cap_rank: 1, total_volume: 42.5e9 },
    { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 3245.8, price_change_percentage_24h: -1.12, market_cap: 390e9, market_cap_rank: 2, total_volume: 18.2e9 },
    { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 612.3, price_change_percentage_24h: 0.89, market_cap: 91.5e9, market_cap_rank: 3, total_volume: 1.8e9 },
    { id: "solana", symbol: "sol", name: "Solana", current_price: 198.42, price_change_percentage_24h: 5.67, market_cap: 86.2e9, market_cap_rank: 4, total_volume: 3.5e9 },
    { id: "usd-coin", symbol: "usdc", name: "USDC", current_price: 1.0, price_change_percentage_24h: 0.01, market_cap: 45e9, market_cap_rank: 5, total_volume: 8.5e9 },
    { id: "ripple", symbol: "xrp", name: "XRP", current_price: 2.18, price_change_percentage_24h: 3.45, market_cap: 42e9, market_cap_rank: 6, total_volume: 5.2e9 },
    { id: "cardano", symbol: "ada", name: "Cardano", current_price: 0.98, price_change_percentage_24h: -0.78, market_cap: 34.5e9, market_cap_rank: 7, total_volume: 1.2e9 },
    { id: "avalanche-2", symbol: "avax", name: "Avalanche", current_price: 38.65, price_change_percentage_24h: 1.23, market_cap: 15.2e9, market_cap_rank: 8, total_volume: 680e6 },
    { id: "polkadot", symbol: "dot", name: "Polkadot", current_price: 7.82, price_change_percentage_24h: -2.1, market_cap: 10.8e9, market_cap_rank: 9, total_volume: 450e6 },
    { id: "chainlink", symbol: "link", name: "Chainlink", current_price: 18.45, price_change_percentage_24h: 4.56, market_cap: 10.5e9, market_cap_rank: 10, total_volume: 890e6 },
  ]
}

function getFallbackTrending(): TrendingCoin[] {
  return [
    { name: "Pepe", symbol: "PEPE", price: "$0.00001234", change24h: 15.3 },
    { name: "Render", symbol: "RNDR", price: "$8.45", change24h: 8.7 },
    { name: "Injective", symbol: "INJ", price: "$24.12", change24h: -3.2 },
    { name: "Sui", symbol: "SUI", price: "$1.85", change24h: 12.1 },
  ]
}

function getFallbackIndices(): IndexData[] {
  return [
    { name: "S&P 500", ticker: "SPX", value: "5,987.15", change: 0.42 },
    { name: "Nasdaq", ticker: "IXIC", value: "19,230.74", change: 0.68 },
    { name: "Ouro", ticker: "XAU", value: "$2,658.30", change: 1.12 },
    { name: "DXY", ticker: "DXY", value: "104.28", change: -0.35 },
  ]
}
