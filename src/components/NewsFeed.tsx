import { Clock, MessageSquare, ArrowUpRight } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  timeAgo: string;
  readTime: string;
  author: string;
  size: "large" | "medium" | "small";
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Bitcoin Não É Mais o Ativo dos Entusiastas — É o Ativo dos Gestores de Patrimônio",
    excerpt:
      "Bitcoin deixou de ser uma aposta marginal e passou a ocupar espaço nas carteiras institucionais. No primeiro trimestre de 2026, os ETFs de Bitcoin acumularam entradas recordes...",
    category: "Análises",
    timeAgo: "Maio 1, 2026",
    readTime: "4 min",
    author: "jbqneto@gmail.com",
    size: "large",
  },
  {
    id: 2,
    title: "Ethereum 2.0: Nova atualização promete reduzir taxas em 90%",
    excerpt: "Implementação do Danksharding deve reduzir drasticamente taxas de transação na rede principal.",
    category: "Ethereum",
    timeAgo: "4h atrás",
    readTime: "3 min",
    author: "Editorial",
    size: "medium",
  },
  {
    id: 3,
    title: "SEC aprova mais 3 ETFs de criptomoedas",
    excerpt: "Comissão aprova três novos fundos baseados em criptomoedas, ampliando o acesso institucional.",
    category: "Regulação",
    timeAgo: "5h atrás",
    readTime: "2 min",
    author: "Editorial",
    size: "medium",
  },
  {
    id: 4,
    title: "Solana enfrenta nova instabilidade após pico de transações",
    excerpt: "Rede enfrenta intermitências após volume recorde, levantando questões sobre escalabilidade.",
    category: "Solana",
    timeAgo: "7h atrás",
    readTime: "3 min",
    author: "Editorial",
    size: "small",
  },
  {
    id: 5,
    title: "DeFi atinge US$ 200 bilhões em valor total travado",
    excerpt: "Setor descentralizado alcança recorde impulsionado por protocolos de empréstimo.",
    category: "DeFi",
    timeAgo: "9h atrás",
    readTime: "2 min",
    author: "Editorial",
    size: "small",
  },
  {
    id: 6,
    title: "Banco Central avança com testes do Real Digital",
    excerpt: "Projeto Drex entra na fase final de testes com lançamento previsto para o segundo semestre.",
    category: "CBDC",
    timeAgo: "12h atrás",
    readTime: "4 min",
    author: "Editorial",
    size: "small",
  },
];

const categoryColors: Record<string, string> = {
  Análises: "bg-primary/15 text-primary border-primary/30",
  Bitcoin: "bg-crypto-gold/15 text-crypto-gold border-crypto-gold/30",
  Ethereum: "bg-accent/15 text-accent border-accent/30",
  Regulação: "bg-primary/15 text-primary border-primary/30",
  Solana: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  DeFi: "bg-primary/15 text-primary border-primary/30",
  CBDC: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

const NewsCard = ({ news }: { news: NewsItem }) => {
  const isLarge = news.size === "large";
  return (
    <article className={`card-glass-hover group cursor-pointer overflow-hidden ${isLarge ? "p-0" : "p-4"}`}>
      {isLarge && (
        <div
          className="relative h-56 w-full overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, hsl(220 30% 15%), hsl(220 25% 10%)), radial-gradient(circle at 30% 50%, hsl(var(--crypto-gold) / 0.3), transparent)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full bg-crypto-gold/20 blur-2xl" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-crypto-gold/40 bg-card/50 backdrop-blur-sm">
                <span className="font-heading text-5xl font-bold text-crypto-gold">₿</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
      )}

      <div className={isLarge ? "space-y-3 p-5" : "space-y-2"}>
        <div className="flex items-center gap-2">
          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColors[news.category] || "border-border bg-secondary text-muted-foreground"}`}>
            {news.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {news.timeAgo}
          </span>
        </div>

        <h3 className={`font-heading font-semibold leading-tight text-foreground transition-colors group-hover:text-primary ${isLarge ? "text-xl" : "text-base"}`}>
          {news.title}
        </h3>

        <p className={`leading-relaxed text-muted-foreground ${isLarge ? "text-sm line-clamp-3" : "text-xs line-clamp-2"}`}>
          {news.excerpt}
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-muted-foreground">
            {news.author} · {news.readTime}
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </article>
  );
};

const NewsFeed = () => {
  const [featured, ...rest] = newsData;

  return (
    <section id="noticias" className="space-y-6">
      <div className="flex items-end justify-between border-b border-border pb-3">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Últimas Análises</h2>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            Cobertura editorial em tempo real
          </p>
        </div>
        <a href="#" className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
          Ver arquivo →
        </a>
      </div>

      {/* Featured + grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:row-span-2">
          <NewsCard news={featured} />
        </div>
        {rest.slice(0, 2).map((n) => (
          <NewsCard key={n.id} news={n} />
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-foreground">Mais notícias</h3>
          <div className="flex gap-1.5">
            {["Todas", "Bitcoin", "DeFi", "Macro"].map((f) => (
              <button
                key={f}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  f === "Todas"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
