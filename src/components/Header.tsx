import { useState } from "react";
import { Wallet, Menu, X } from "lucide-react";
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
    { label: "Votações", href: "#votacoes" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">C</span>
            </div>
            <span className="font-heading text-xl font-bold text-foreground">
              Crypto<span className="text-gradient">Pulse</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
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

        <div className="flex items-center gap-3">
          <Button
            onClick={onConnectWallet}
            variant={isWalletConnected ? "secondary" : "default"}
            size="sm"
            className="hidden gap-2 sm:flex"
          >
            <Wallet className="h-4 w-4" />
            {isWalletConnected ? "0x1a2b...9f3e" : "Conectar Carteira"}
          </Button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
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
