import * as React from 'react'
import { Connector, useConnect, useConnectors } from 'wagmi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

type WalletOptionProps = {
  open?: boolean,
  handleClose: () => void
}

function WalletOption({
  connector,
  onClick
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <button key={connector.id} disabled={!ready} onClick={onClick} className={cn(
                  "w-full",
                  "rounded-xl",
                  "border border-zinc-800",
                  "bg-zinc-950",
                  "p-4",
                  "text-left",
                  "transition-all",
                  "hover:border-emerald-500/40",
                  "hover:bg-zinc-800",
                  "hover:shadow-lg"
                )}>

                      <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <Wallet size={18} className="text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {connector.name}
                    </p>
                  </div>
                </div>
    </button>
  )
}

export function WalletModal(props: WalletOptionProps) {
  const { open, handleClose } = props;
  const { connect } = useConnect()
  const connectors = useConnectors();

  const handleConnect = (connector: Connector) => {
    try {
      connect({ connector });
      handleClose();
    } catch (error) {
      console.error('Connection error:', error)
    }
  }

  return (
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-lg bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground text-lg">Criar Nova Enquete</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Conecte a sua carteira EVM e ganhe super poderes.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">

              {
                connectors.map((connector) => (
                    <WalletOption
                      key={connector.uid}
                      connector={connector}
                      onClick={() => handleConnect(connector)}
                    />
                  ))
              }

            </div>
          </DialogContent>
        </Dialog>
  );
}