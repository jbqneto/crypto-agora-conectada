"use client"

import { useState } from "react"
import { Clock, ArrowRight, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  category: string
  timeAgo: string
  featured?: boolean
}

const CATEGORIES = [
  { id: "all", label: "Todas" },
  { id: "bitcoin", label: "Bitcoin" },
  { id: "ethereum", label: "Ethereum" },
  { id: "defi", label: "DeFi" },
  { id: "regulacao", label: "Regulacao" },
  { id: "nft", label: "NFTs" },
]

const ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "Bitcoin supera US$ 100 mil e atinge nova maxima historica em meio a euforia institucional",
    excerpt: "A principal criptomoeda do mundo ultrapassou a marca dos US$ 100 mil pela primeira vez, impulsionada por fluxos massivos de ETFs spot e crescente adocao institucional.",
    category: "bitcoin",
    timeAgo: "2h",
    featured: true,
  },
  {
    id: 2,
    title: "Ethereum implementa atualizacao Pectra e promete reduzir taxas em ate 80%",
    excerpt: "A rede Ethereum completou com sucesso a atualizacao Pectra, trazendo melhorias significativas de escalabilidade e reducao drastica nas taxas de gas.",
    category: "ethereum",
    timeAgo: "4h",
    featured: true,
  },
  {
    id: 3,
    title: "Banco Central do Brasil anuncia regulamentacao completa de stablecoins",
    excerpt: "O BACEN publicou a regulamentacao definitiva para stablecoins, estabelecendo requisitos de reserva e compliance para emissores operando no Brasil.",
    category: "regulacao",
    timeAgo: "5h",
    featured: true,
  },
  {
    id: 4,
    title: "Solana processa recorde de 100 mil transacoes por segundo em teste de stress",
    excerpt: "A blockchain Solana demonstrou capacidade de processar mais de 100 mil TPS durante um teste de carga, consolidando sua posicao como alternativa de alta performance.",
    category: "defi",
    timeAgo: "6h",
  },
  {
    id: 5,
    title: "Portugal aprova isencao fiscal para criptomoedas mantidas por mais de um ano",
    excerpt: "O parlamento portugues aprovou legislacao que isenta de impostos os ganhos de capital em criptomoedas detidas por periodo superior a 12 meses.",
    category: "regulacao",
    timeAgo: "8h",
  },
  {
    id: 6,
    title: "Protocolo DeFi brasileiro atinge US$ 1 bilhao em TVL e lidera America Latina",
    excerpt: "Um protocolo de financas descentralizadas desenvolvido por brasileiros se tornou o primeiro da America Latina a ultrapassar US$ 1 bilhao em valor total bloqueado.",
    category: "defi",
    timeAgo: "10h",
  },
  {
    id: 7,
    title: "Colecao de NFTs brasileira 'Arte Digital' bate recorde de vendas na OpenSea",
    excerpt: "A colecao 'Arte Digital' criada por artistas brasileiros ultrapassou 10 mil ETH em volume total de vendas, tornando-se a maior colecao latina na plataforma.",
    category: "nft",
    timeAgo: "12h",
  },
  {
    id: 8,
    title: "BNB Chain lanca programa de US$ 500 milhoes para desenvolvedores Web3",
    excerpt: "A Binance Smart Chain anunciou um fundo de meio bilhao de dolares para atrair desenvolvedores e startups ao ecossistema Web3 na America Latina.",
    category: "defi",
    timeAgo: "14h",
  },
]

/* ==============================
   Featured News - Top 3 cards
   ============================== */
export function FeaturedNews() {
  const featuredArticles = ARTICLES.filter((a) => a.featured).slice(0, 3)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Ultimas Noticias
        </h2>
        <div className="h-px flex-1 ml-4 bg-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredArticles.map((article) => (
          <article
            key={article.id}
            className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40 group-hover:bg-primary transition-colors" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 text-[10px] uppercase tracking-wider font-mono">
                  {article.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.timeAgo}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors text-balance">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium mt-auto group-hover:gap-2 transition-all">
                Ler mais
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ==============================
   Remaining News - filtered list
   ============================== */
export function RemainingNews() {
  const [activeCategory, setActiveCategory] = useState("all")

  const nonFeaturedArticles = ARTICLES.filter((a) => !a.featured)
  const filteredArticles =
    activeCategory === "all"
      ? nonFeaturedArticles
      : nonFeaturedArticles.filter((a) => a.category === activeCategory)

  return (
    <section id="noticias" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Mais Noticias
        </h2>
        <div className="h-px flex-1 ml-4 bg-border" />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles list */}
      <div className="space-y-1">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="group flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer border border-transparent hover:border-border"
          >
            <div className="mt-1.5 h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <Tag className="h-2.5 w-2.5" />
                  {article.category}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {article.timeAgo}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {article.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
