import { TrendingUp, TrendingDown } from "lucide-react";

const tickerData = [
  { symbol: "SOL/USD", price: "$72.15", change: "+2.13%", isPositive: true },
  { symbol: "BNB/USD", price: "$564.60", change: "-0.61%", isPositive: false },
  { symbol: "BTC/USD", price: "$60,399", change: "+0.10%", isPositive: true },
  { symbol: "ETH/USD", price: "$1,583", change: "+0.42%", isPositive: true },
  { symbol: "SOL/USD", price: "$72.15", change: "+2.13%", isPositive: true },
  { symbol: "BNB/USD", price: "$564.60", change: "-0.61%", isPositive: false },
];

const MarketTicker = () => {
  return (
    <div className="border-b border-border bg-card/60 backdrop-blur-sm overflow-hidden">
      <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap">
        {[...tickerData, ...tickerData].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-6 py-2 text-xs">
            <span className="font-semibold tracking-wider text-muted-foreground">{item.symbol}</span>
            <span className="font-medium text-foreground">{item.price}</span>
            <span
              className={`flex items-center gap-0.5 font-medium ${
                item.isPositive ? "text-crypto-green" : "text-crypto-red"
              }`}
            >
              {item.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default MarketTicker;
