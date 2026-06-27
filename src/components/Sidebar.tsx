import TradingViewWidget from "./TradingViewWidget";
import MarketOverview from "./MarketOverview";
import TrendingTopics from "./TrendingTopics";
import NewsletterCard from "./NewsletterCard";
import { Activity } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="space-y-4 slide-in-right" id="mercado">
      <div className="flex items-end justify-between border-b border-border pb-2 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-2xl font-bold text-foreground">Mercado em Tempo Real</h2>
          </div>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            Cotações e indicadores ao vivo
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-crypto-green animate-pulse" />
          Ao vivo
        </span>
      </div>


      <MarketOverview />

      <div className="widget-container">
        <div className="border-b border-border px-4 py-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Bitcoin / USDT</h3>
        </div>
        <TradingViewWidget widgetType="mini-chart" symbol="BINANCE:BTCUSDT" height={180} />
      </div>

      <TrendingTopics />

      <div className="widget-container">
        <div className="border-b border-border px-4 py-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Ethereum / USDT</h3>
        </div>
        <TradingViewWidget widgetType="mini-chart" symbol="BINANCE:ETHUSDT" height={180} />
      </div>

      <NewsletterCard />

      <div className="widget-container">
        <div className="border-b border-border px-4 py-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Análise Técnica BTC</h3>
        </div>
        <TradingViewWidget widgetType="technical-analysis" symbol="BINANCE:BTCUSDT" height={320} />
      </div>
    </aside>
  );
};

export default Sidebar;
