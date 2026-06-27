import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedArticle {
  id: number;
  category: string;
  title: string;
  excerpt: string;
}

const articles: FeaturedArticle[] = [
  {
    id: 1,
    category: "Regulação",
    title: "CLARITY Act: A Lei que Pode Mudar o Cripto Para Sempre Está em Fio de Navalha",
    excerpt:
      "O CLARITY Act pode ser uma das leis mais importantes para o futuro do mercado cripto nos Estados Unidos. O projeto busca criar regras claras para ativos digitais...",
  },
  {
    id: 2,
    category: "Bitcoin",
    title: "Bitcoin Rompe Resistência Histórica e Mira Novo Topo Acima de US$ 150 mil",
    excerpt:
      "Com fluxo institucional recorde nos ETFs e escassez pós-halving, analistas projetam um ciclo de alta sustentado pelas próximas semanas...",
  },
  {
    id: 3,
    category: "DeFi",
    title: "TVL do DeFi Ultrapassa US$ 200 Bilhões e Marca Nova Era da Finança Descentralizada",
    excerpt:
      "Protocolos de empréstimo e liquid staking impulsionam o crescimento, com Ethereum mantendo a liderança absoluta no setor...",
  },
];

const FeaturedHero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % articles.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const article = articles[index];

  const go = (dir: number) =>
    setIndex((i) => (i + dir + articles.length) % articles.length);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, hsl(var(--primary) / 0.18), transparent 55%), radial-gradient(ellipse at 20% 80%, hsl(var(--accent) / 0.12), transparent 55%), hsl(var(--card))",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,hsl(var(--background)/0.6)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-5 lg:p-14">
        <div key={article.id} className="lg:col-span-3 space-y-5 fade-in">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {article.category}
          </span>

          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="#noticias"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Ler análise
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <div className="hidden items-center gap-2 sm:flex">
              {articles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para notícia ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    i === index ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden lg:col-span-2 lg:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-64 w-64">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute inset-4 rounded-full border border-primary/30" />
              <div className="absolute inset-10 rounded-full border border-accent/30" />
              <div className="absolute inset-16 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/20 backdrop-blur-sm">
                <span className="font-heading text-5xl font-bold text-gradient">B&B</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Notícia anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/70 p-2 text-foreground backdrop-blur transition hover:bg-card"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Próxima notícia"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/70 p-2 text-foreground backdrop-blur transition hover:bg-card"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedHero;
