"use client"

import { ArrowRight, TrendingUp } from "lucide-react"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-primary/20" />
      <div className="relative p-6 md:p-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
            <TrendingUp className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[10px] font-mono text-primary uppercase tracking-widest">
            Destaque
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight max-w-2xl text-balance">
          O futuro descentralizado, em Portugues.
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-xl leading-relaxed">
          Acompanhe as noticias mais relevantes do mundo cripto, dados de mercado em tempo real
          e participe das votacoes da comunidade Web3 lusofona.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <a
            href="#noticias"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Ler Noticias
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#mercado"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm hover:bg-secondary/50 transition-colors"
          >
            Ver Mercado
          </a>
        </div>
      </div>
    </section>
  )
}
