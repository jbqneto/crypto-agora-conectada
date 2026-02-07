import { Wallet, Zap, Shield, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletBannerProps {
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

const WalletBanner = ({ isWalletConnected, onConnectWallet }: WalletBannerProps) => {
  if (isWalletConnected) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 p-6" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
          <Wallet className="h-6 w-6 text-primary" />
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="font-heading text-base font-semibold text-foreground">
            Conecte sua carteira e dê super poderes a este site ⚡
          </h3>
          <p className="text-sm text-muted-foreground">
            Participe de votações on-chain, acompanhe seu portfólio e desbloqueie recursos exclusivos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 sm:justify-start">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Vote className="h-3.5 w-3.5 text-primary" />
              Votações on-chain
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-crypto-gold" />
              Recursos premium
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-crypto-green" />
              Seguro & descentralizado
            </span>
          </div>
        </div>

        <Button onClick={onConnectWallet} size="sm" className="shrink-0 gap-2">
          <Wallet className="h-4 w-4" />
          Conectar
        </Button>
      </div>
    </div>
  );
};

export default WalletBanner;
