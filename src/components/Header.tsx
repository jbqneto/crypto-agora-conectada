import { useState } from "react";
import { Wallet, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

const Header = ({ isWalletConnected, onConnectWallet }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Início", href: "#" },
    { label: "Notícias", href: "#noticias" },
    { label: "Mercado", href: "#mercado" },
    { label: "Web3", href: "#noticias" },
    { label: "Macro", href: "#noticias" },
    { label: "Votações", href: "#votacoes" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent" />
              <div className="absolute inset-[2px] rounded-[6px] bg-background" />
              <span className="relative text-base font-bold text-gradient">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-base font-bold text-foreground">
                Blocos <span className="text-primary">&</span> Bits
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Inteligência Cripto
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              className="h-9 w-48 rounded-lg border border-border bg-secondary/50 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <Button
            onClick={onConnectWallet}
            variant={isWalletConnected ? "secondary" : "default"}
            size="sm"
            className="hidden gap-2 sm:flex"
          >
            <Wallet className="h-4 w-4" />
            {isWalletConnected ? "0x1a2b...9f3e" : "Conectar"}
          </Button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => { onConnectWallet(); setMobileOpen(false); }}
              variant={isWalletConnected ? "secondary" : "default"}
              size="sm"
              className="mt-2 gap-2"
            >
              <Wallet className="h-4 w-4" />
              {isWalletConnected ? "0x1a2b...9f3e" : "Conectar Carteira"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
