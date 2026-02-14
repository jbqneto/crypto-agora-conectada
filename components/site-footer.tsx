import { Blocks } from "lucide-react"
import Link from "next/link"

const FOOTER_LINKS = [
  {
    title: "Conteudo",
    links: [
      { label: "Noticias", href: "#noticias" },
      { label: "Mercado", href: "#mercado" },
      { label: "Votacoes", href: "#votacoes" },
    ],
  },
  {
    title: "Criptomoedas",
    links: [
      { label: "Bitcoin", href: "#" },
      { label: "Ethereum", href: "#" },
      { label: "Solana", href: "#" },
      { label: "BNB", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de Uso", href: "#" },
      { label: "Privacidade", href: "#" },
      { label: "Disclaimer", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Blocks className="h-4 w-4 text-primary" />
              </div>
              <span className="font-mono font-bold text-foreground">
                {'Blocos & Bits'}
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              O seu portal de criptomoedas e blockchain em Portugues. 
              Noticias, analises de mercado e comunidade Web3.
            </p>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground font-mono">
            2024-2026 Blocos & Bits. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-muted-foreground">
            As informacoes neste site nao constituem aconselhamento financeiro. Faca sua propria pesquisa (DYOR).
          </p>
        </div>
      </div>
    </footer>
  )
}
