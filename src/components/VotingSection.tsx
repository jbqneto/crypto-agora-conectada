import { useState } from "react";
import { Vote, Lock, ThumbsUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VotingOption {
  id: number;
  label: string;
  votes: number;
}

interface Poll {
  id: number;
  title: string;
  description: string;
  options: VotingOption[];
  totalVotes: number;
  endsIn: string;
}

const pollsData: Poll[] = [
  {
    id: 1,
    title: "Qual blockchain terá mais adoção em 2025?",
    description: "Vote na blockchain que você acredita que terá o maior crescimento de usuários.",
    options: [
      { id: 1, label: "Ethereum", votes: 1250 },
      { id: 2, label: "Solana", votes: 980 },
      { id: 3, label: "Polygon", votes: 560 },
      { id: 4, label: "Arbitrum", votes: 430 },
    ],
    totalVotes: 3220,
    endsIn: "2 dias",
  },
  {
    id: 2,
    title: "Bitcoin vai atingir US$ 150k este ano?",
    description: "Sua previsão para o preço máximo do BTC.",
    options: [
      { id: 1, label: "Sim, antes do Q3", votes: 2100 },
      { id: 2, label: "Sim, no final do ano", votes: 1800 },
      { id: 3, label: "Não, ficará abaixo", votes: 900 },
    ],
    totalVotes: 4800,
    endsIn: "5 dias",
  },
];

interface VotingSectionProps {
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

const VotingSection = ({ isWalletConnected, onConnectWallet }: VotingSectionProps) => {
  const [votedPolls, setVotedPolls] = useState<Record<number, number>>({});

  const handleVote = (pollId: number, optionId: number) => {
    if (!isWalletConnected) return;
    setVotedPolls((prev) => ({ ...prev, [pollId]: optionId }));
  };

  return (
    <section id="votacoes" className="space-y-4">
      <div className="flex items-center gap-2">
        <Vote className="h-5 w-5 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground">Votações On-Chain</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        Votações registradas em smart contract. Transparência e imutabilidade garantidas pela blockchain. Ao conectar sua carteira você também poderá <span className="text-foreground font-medium">criar suas próprias votações</span>.
      </p>


      {!isWalletConnected ? (
        <div className="card-glass p-8 text-center space-y-4 pulse-glow">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Conecte sua carteira e dê super poderes a este site
            </h3>
            <p className="text-sm text-muted-foreground">
              Ao conectar sua carteira, você poderá votar em enquetes on-chain, participar de decisões da comunidade e muito mais.
            </p>
          </div>
          <Button onClick={onConnectWallet} className="gap-2">
            <Lock className="h-4 w-4" />
            Conectar Carteira
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="card-glass rounded-lg border-primary/20 p-3">
            <p className="text-xs text-primary flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Carteira conectada — seus votos serão registrados no smart contract
            </p>
          </div>

          {pollsData.map((poll) => (
            <div key={poll.id} className="card-glass p-5 space-y-4 fade-in">
              <div className="space-y-1">
                <h3 className="font-heading text-base font-semibold text-foreground">{poll.title}</h3>
                <p className="text-xs text-muted-foreground">{poll.description}</p>
              </div>

              <div className="space-y-2">
                {poll.options.map((option) => {
                  const percentage = Math.round((option.votes / poll.totalVotes) * 100);
                  const isVoted = votedPolls[poll.id] === option.id;
                  const hasVoted = poll.id in votedPolls;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleVote(poll.id, option.id)}
                      disabled={hasVoted}
                      className={`relative w-full overflow-hidden rounded-lg border p-3 text-left transition-all ${
                        isVoted
                          ? "border-primary/40 bg-primary/5"
                          : hasVoted
                          ? "border-border bg-card cursor-default"
                          : "border-border bg-card hover:border-primary/30 hover:bg-secondary"
                      }`}
                    >
                      {hasVoted && (
                        <div
                          className="absolute inset-y-0 left-0 bg-primary/10 transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        />
                      )}
                      <div className="relative flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground flex items-center gap-2">
                          {isVoted && <ThumbsUp className="h-3 w-3 text-primary" />}
                          {option.label}
                        </span>
                        {hasVoted && (
                          <span className="text-xs font-semibold text-muted-foreground">{percentage}%</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {poll.totalVotes.toLocaleString("pt-BR")} votos
                </span>
                <span>Encerra em {poll.endsIn}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VotingSection;
