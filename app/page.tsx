import { MarketTicker } from "@/components/market-ticker"
import { SiteHeader } from "@/components/site-header"
import { HeroBanner } from "@/components/hero-banner"
import { FeaturedNews, RemainingNews } from "@/components/news-feed"
import { MarketCards } from "@/components/market-cards"
import { VotingSection } from "@/components/voting-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Live market ticker strip */}
      <MarketTicker />

      {/* Site header with nav + wallet */}
      <SiteHeader />

      {/* Main content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8">
        {/* 1. Hero / Destaque */}
        <HeroBanner />

        {/* 2. Market data cards (carousel on mobile, 3-col grid on desktop) */}
        <div className="mt-8">
          <MarketCards />
        </div>

        {/* 3. Top 3 featured news cards */}
        <div className="mt-10">
          <FeaturedNews />
        </div>

        {/* 4. Community voting (with wallet gate) */}
        <div className="mt-10">
          <VotingSection />
        </div>

        {/* 5. Remaining news with category filter */}
        <div className="mt-10">
          <RemainingNews />
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
