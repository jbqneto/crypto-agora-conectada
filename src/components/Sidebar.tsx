import TradingViewWidget from "./TradingViewWidget";
import MarketOverview from "./MarketOverview";

const Sidebar = () => {
  return (
    <aside className="space-y-4 slide-in-right" id="mercado">
      <h2 className="font-heading text-lg font-bold text-foreground">Mercado em Tempo Real</h2>

      {/* Market overview cards */}
      <MarketOverview />

      {/* BTC Mini Chart */}
      <div className="widget-container">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">Bitcoin / USDT</h3>
        </div>
        <TradingViewWidget widgetType="mini-chart" symbol="BINANCE:BTCUSDT" height={220} />
      </div>

      {/* ETH Mini Chart */}
      <div className="widget-container">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">Ethereum / USDT</h3>
        </div>
        <TradingViewWidget widgetType="mini-chart" symbol="BINANCE:ETHUSDT" height={220} />
      </div>

      {/* Technical Analysis */}
      <div className="widget-container">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">Análise Técnica BTC</h3>
        </div>
        <TradingViewWidget widgetType="technical-analysis" symbol="BINANCE:BTCUSDT" height={350} />
      </div>
    </aside>
  );
};

export default Sidebar;
