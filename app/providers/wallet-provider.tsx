"use client"

import { WalletModal } from "@/components/onchain/wallet-modal"
import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from "react"
import { useConnection, useDisconnect } from "wagmi"

interface WalletContextType {
  address: string | undefined
  isConnected: boolean
  isConnecting: boolean
  connect: () => Promise<void>,
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: undefined,
  isConnected: false,
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {},
})

export function useWallet() {
  return useContext(WalletContext)
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isConnected, address } = useConnection();
  const { disconnect: _disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  const disconnect = useCallback(() => {
    setIsConnecting(false);
    _disconnect();
  }, []);

  const connect = useCallback(async () => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsConnecting(true);
    setModalOpen(false);
  } , []);

  useEffect(() => {
    console.log( address + " >> isConnected = " + isConnected);
    setIsConnecting(isConnected);
  }, [isConnected]);

  return (
      <WalletContext.Provider
        value={{
          address,
          isConnected: isConnected,
          isConnecting,
          connect,
          disconnect,
        }}
      >
        {children}
        <WalletModal open={isModalOpen} handleClose={handleCloseModal} />
      </WalletContext.Provider>
  )
}
