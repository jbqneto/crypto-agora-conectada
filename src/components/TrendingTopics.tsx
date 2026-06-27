const topics = [
  "#BTC",
  "#CFTC",
  "#DeFi",
  "#CLARITY Act",
  "#Regulação Cripto",
  "#SEC",
  "#BlackRock",
  "#MicroStrategy",
  "#Strategy",
  "#Bitcoin",
  "#Institucional",
  "#Stablecoins",
];

const TrendingTopics = () => {
  return (
    <div className="widget-container p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Trending Topics</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
