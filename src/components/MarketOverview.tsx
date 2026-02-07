import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketItem {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const marketData: MarketItem[] = [
  { name: "Bitcoin", symbol: "BTC", price: "$97,432", change: "+2.4%", isPositive: true },
  { name: "Ethereum", symbol: "ETH", price: "$3,521", change: "+1.8%", isPositive: true },
  { name: "Solana", symbol: "SOL", price: "$198.50", change: "-0.9%", isPositive: false },
  { name: "BNB", symbol: "BNB", price: "$612.30", change: "+0.5%", isPositive: true },
];

const MarketOverview = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {marketData.map((item) => (
        <div key={item.symbol} className="card-glass rounded-lg p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{item.symbol}</span>
            <span className={`flex items-center gap-0.5 text-xs font-medium ${item.isPositive ? "text-crypto-green" : "text-crypto-red"}`}>
              {item.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {item.change}
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground">{item.price}</p>
          <p className="text-[10px] text-muted-foreground">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MarketOverview;
