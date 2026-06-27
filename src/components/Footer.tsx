import { Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/40 mt-16">
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent" />
                <div className="absolute inset-[2px] rounded-[6px] bg-background" />
                <span className="relative text-sm font-bold text-gradient">B</span>
              </div>
              <span className="font-heading text-base font-bold text-foreground">
                Blocos <span className="text-primary">&</span> Bits
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Inteligência de mercado para a nova economia digital.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Navegação</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Sobre</a></li>
              <li><a href="#" className="hover:text-primary">Contato</a></li>
              <li><a href="#" className="hover:text-primary">Privacidade</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Editorias</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#mercado" className="hover:text-primary">Mercado</a></li>
              <li><a href="#noticias" className="hover:text-primary">Web3</a></li>
              <li><a href="#noticias" className="hover:text-primary">Macro</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Sistema</h4>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-crypto-green animate-pulse" />
              Online
            </div>
            <div className="flex items-center gap-2 pt-1">
              <a href="#" className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-[11px] text-muted-foreground sm:flex-row">
          <p>© 2026 Blocos & Bits. Todos os direitos reservados.</p>
          <p className="uppercase tracking-wider">Real-time accuracy in the chain.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
