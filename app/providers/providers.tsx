"use client";

import { createConfig, http, WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { WalletProvider } from './wallet-provider';
import { metaMask, injected, safe } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    metaMask(),
    safe()
  ],
  transports: {
    [sepolia.id]: http(),
  }
});

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
    
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
            {children}
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}