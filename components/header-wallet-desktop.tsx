import { truncateAddress } from "@/lib/utils";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@/app/providers/wallet-provider";

export function HeaderWalletDesktop() {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  
  if (isConnected) {
    return (
      (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="font-mono text-xs text-primary">
                  {truncateAddress(address!)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={disconnect}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                Desconectar
              </Button>
            </div>
          )
    )
  }
  
  return (
    <Button
        onClick={connect}
        disabled={isConnecting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm gap-2"
      >
        <Wallet className="h-4 w-4" />
        {isConnecting ? "Conectando..." : "Conectar Wallet"}
    </Button>
  )
}