import { useState } from "react";
import Header from "@/components/Header";
import NewsFeed from "@/components/NewsFeed";
import Sidebar from "@/components/Sidebar";
import VotingSection from "@/components/VotingSection";
import WalletBanner from "@/components/WalletBanner";
import Footer from "@/components/Footer";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isWalletConnected={isWalletConnected} onConnectWallet={handleConnectWallet} />

      <main className="container py-6">
        {/* Wallet Banner */}
        <div className="mb-6">
          <WalletBanner isWalletConnected={isWalletConnected} onConnectWallet={handleConnectWallet} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: News + Voting */}
          <div className="space-y-8 lg:col-span-2">
            <NewsFeed />
            <VotingSection isWalletConnected={isWalletConnected} onConnectWallet={handleConnectWallet} />
          </div>

          {/* Right: Sidebar with Widgets */}
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
