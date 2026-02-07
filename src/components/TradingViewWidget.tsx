import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  widgetType: "ticker" | "mini-chart" | "technical-analysis" | "fear-greed";
  symbol?: string;
  height?: number;
}

const TradingViewWidget = ({ widgetType, symbol = "BINANCE:BTCUSDT", height = 220 }: TradingViewWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    switch (widgetType) {
      case "mini-chart":
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.textContent = JSON.stringify({
          symbol,
          width: "100%",
          height,
          locale: "br",
          dateRange: "1M",
          colorTheme: "dark",
          isTransparent: true,
          autosize: false,
          largeChartUrl: "",
          chartOnly: false,
          noTimeScale: false,
        });
        break;

      case "technical-analysis":
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.textContent = JSON.stringify({
          interval: "1h",
          width: "100%",
          height,
          symbol,
          showIntervalTabs: true,
          isTransparent: true,
          locale: "br",
          colorTheme: "dark",
        });
        break;

      case "ticker":
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
        script.textContent = JSON.stringify({
          symbols: [
            { proName: "BINANCE:BTCUSDT", title: "Bitcoin" },
            { proName: "BINANCE:ETHUSDT", title: "Ethereum" },
            { proName: "BINANCE:SOLUSDT", title: "Solana" },
          ],
          isTransparent: true,
          showSymbolLogo: true,
          colorTheme: "dark",
          locale: "br",
        });
        break;

      default:
        break;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "tradingview-widget-container";
    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);
  }, [widgetType, symbol, height]);

  return (
    <div ref={containerRef} className="overflow-hidden rounded-lg" style={{ minHeight: height }} />
  );
};

export default TradingViewWidget;
