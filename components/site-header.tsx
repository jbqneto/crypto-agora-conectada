"use client"

import { useState } from "react"
import Link from "next/link"
import { Wallet, Menu, X, Blocks } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/app/providers/wallet-provider"
import { useMounted } from "@/app/providers/providers"
import { HeaderWalletDesktop } from "./header-wallet-desktop"
import { truncateAddress } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Noticias", href: "#noticias" },
  { label: "Mercado", href: "#mercado" },
  { label: "Votacoes", href: "#votacoes" },
]

export function SiteHeader() {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useMounted();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Blocks className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-lg leading-tight text-foreground tracking-tight">
              {'Blocos & Bits'}
            </span>
            <span className="text-[10px] text-muted-foreground leading-none tracking-widest uppercase">
              Crypto News
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Wallet Button */}
        <div className="hidden md:flex items-center gap-3">
          {mounted && <HeaderWalletDesktop />}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border">
              {isConnected ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 w-fit">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                    <span className="font-mono text-xs text-primary">
                      {truncateAddress(address!)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={disconnect}
                    className="text-muted-foreground hover:text-foreground text-xs w-fit"
                  >
                    Desconectar
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connect}
                  disabled={isConnecting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm gap-2 w-full"
                >
                  <Wallet className="h-4 w-4" />
                  {isConnecting ? "Conectando..." : "Conectar Wallet"}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
