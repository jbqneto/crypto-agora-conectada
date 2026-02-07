import { Clock, TrendingUp, TrendingDown, MessageSquare } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  timeAgo: string;
  imageUrl: string;
  isPositive: boolean;
  comments: number;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Bitcoin ultrapassa US$ 100.000 pela primeira vez na história",
    excerpt: "O Bitcoin atingiu um marco histórico ao ultrapassar os US$ 100.000 durante a sessão de negociação da madrugada. Analistas atribuem o movimento à aprovação de novos ETFs e ao aumento da demanda institucional.",
    category: "Bitcoin",
    timeAgo: "2h atrás",
    imageUrl: "",
    isPositive: true,
    comments: 234,
  },
  {
    id: 2,
    title: "Ethereum 2.0: Nova atualização promete reduzir taxas em 90%",
    excerpt: "A equipe de desenvolvimento do Ethereum anunciou a implementação do Danksharding, que deve reduzir drasticamente as taxas de transação na rede principal.",
    category: "Ethereum",
    timeAgo: "4h atrás",
    imageUrl: "",
    isPositive: true,
    comments: 156,
  },
  {
    id: 3,
    title: "SEC aprova mais 3 ETFs de criptomoedas nos Estados Unidos",
    excerpt: "A Comissão de Valores Mobiliários dos EUA aprovou três novos fundos negociados em bolsa baseados em criptomoedas, ampliando o acesso de investidores institucionais ao mercado.",
    category: "Regulação",
    timeAgo: "5h atrás",
    imageUrl: "",
    isPositive: true,
    comments: 89,
  },
  {
    id: 4,
    title: "Solana enfrenta nova instabilidade na rede após pico de transações",
    excerpt: "A rede Solana enfrentou intermitências após um volume recorde de transações, levantando questões sobre a escalabilidade real do protocolo.",
    category: "Solana",
    timeAgo: "7h atrás",
    imageUrl: "",
    isPositive: false,
    comments: 312,
  },
  {
    id: 5,
    title: "DeFi atinge US$ 200 bilhões em valor total travado",
    excerpt: "O setor de finanças descentralizadas alcançou um novo recorde, impulsionado pelo crescimento de protocolos de empréstimo e yield farming em múltiplas blockchains.",
    category: "DeFi",
    timeAgo: "9h atrás",
    imageUrl: "",
    isPositive: true,
    comments: 67,
  },
  {
    id: 6,
    title: "Banco Central do Brasil avança com testes do Real Digital",
    excerpt: "O projeto Drex entra em sua fase final de testes, com expectativa de lançamento para o público geral no segundo semestre. Especialistas avaliam impactos no mercado crypto.",
    category: "CBDC",
    timeAgo: "12h atrás",
    imageUrl: "",
    isPositive: true,
    comments: 145,
  },
];

const categoryColors: Record<string, string> = {
  Bitcoin: "bg-crypto-gold/15 text-crypto-gold",
  Ethereum: "bg-accent/15 text-accent",
  Regulação: "bg-primary/15 text-primary",
  Solana: "bg-purple-500/15 text-purple-400",
  DeFi: "bg-primary/15 text-primary",
  CBDC: "bg-blue-500/15 text-blue-400",
};

const NewsFeed = () => {
  return (
    <section id="noticias" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">Últimas Notícias</h2>
        <div className="flex gap-2">
          {["Todas", "Bitcoin", "Ethereum", "DeFi"].map((filter) => (
            <button
              key={filter}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === "Todas"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {newsData.map((news, index) => (
          <article
            key={news.id}
            className="card-glass-hover group cursor-pointer p-4 fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${categoryColors[news.category] || "bg-secondary text-muted-foreground"}`}>
                    {news.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {news.timeAgo}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                  {news.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {news.excerpt}
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <span className={`flex items-center gap-1 text-xs font-medium ${news.isPositive ? "text-crypto-green" : "text-crypto-red"}`}>
                    {news.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {news.isPositive ? "Bullish" : "Bearish"}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare className="h-3 w-3" />
                    {news.comments} comentários
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsFeed;
