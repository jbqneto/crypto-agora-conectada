import { useState } from "react";
import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";
import FeaturedHero from "@/components/FeaturedHero";
import NewsFeed from "@/components/NewsFeed";
import Sidebar from "@/components/Sidebar";
import VotingSection from "@/components/VotingSection";

import Footer from "@/components/Footer";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketTicker />
      <Header isWalletConnected={isWalletConnected} onConnectWallet={handleConnectWallet} />

      <main className="container py-6 space-y-8">
        <FeaturedHero />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <NewsFeed />
            <VotingSection isWalletConnected={isWalletConnected} onConnectWallet={handleConnectWallet} />
          </div>

          <div className="order-first lg:order-last">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

