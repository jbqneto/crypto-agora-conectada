"use client";

import { CheckCircle2, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { useReadContracts } from "wagmi";
import { Abi } from "viem";
import { useMounted } from "@/app/providers/providers";

export interface Poll {
  id: number
  question: string
  options: {
    label: string
    votes: number
  }[]
  totalVotes: number
  endsIn: string
  category: string
  isUserCreated?: boolean
}

export type VotingContract = {
  abi: Abi,
  id: number;
  address: `0x${string}`
}

export type VotingsProps = {
  isConnected: boolean;
  contracts: VotingContract[];
}

function getContractMethods(contracts: VotingContract[]) {
    return contracts.map((contract) => ({
        address: contract.address,
        abi: contract.abi,
        functionName: 'getVoting',
        args: [BigInt(contract.id)],
      } as const));
}

export function Votings({ contracts, isConnected }: VotingsProps) {
  const [votesData, setVotesData] = useState<any[] | undefined>();
  const [polls, setPolls] = useState<Poll[]>([]);
  const mounted = useMounted();
  const [votedPolls, setVotedPolls] = useState<Record<number, number>>({});
  const { data: votingsData, isLoading } = useReadContracts({
    contracts: getContractMethods(contracts),
  });

  const handleVote = (pollId: number, optionIndex: number) => {
    if (!isConnected) return
    setVotedPolls((prev) => ({ ...prev, [pollId]: optionIndex }))
  }

  useEffect(() => {

    console.log(`${isLoading ? "Loading" : "Loaded"} Votings data:`, votingsData);

    if (isLoading || !votingsData) return;

    const parsedPolls: Poll[] = votingsData
    .filter((voting) => voting.status === "success")
    .map((voting, index) => {
      const result = voting.result ?? {} as any;
      const options = result.options.map((opt: string, i: number) => ({
        label: opt,
        votes: Number(result.votes[i]),
      }));
      
      const totalVotes = options.reduce((sum: number, opt: any) => sum + opt.votes, 0);
      const timestamp = Number(result.maxDate);

      return {
        id: index,
        question: result.title,
        options,
        totalVotes,
        endsIn: new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        }),
        category: "Geral",
      };
    });

    console.log("Parsed polls:", parsedPolls);

    setPolls(parsedPolls);

  }, [votingsData, isLoading])

  return (
    <>
      {!mounted ? <></> : (
        polls.map((poll) => {
            const hasVoted = votedPolls[poll.id] !== undefined
            const userVote = votedPolls[poll.id]
            const totalWithUserVote = hasVoted ? poll.totalVotes + 1 : poll.totalVotes

            return (
              <div
                key={poll.id}
                className={`snap-start shrink-0 w-full lg:w-[calc((100%-2rem)/3)] rounded-xl border bg-card p-5 flex flex-col ${
                  poll.isUserCreated
                    ? "border-primary/30 ring-1 ring-primary/10"
                    : "border-border"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {poll.category}
                  </span>
                  {poll.isUserCreated && (
                    <span className="text-[10px] font-mono text-foreground uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary border border-border">
                      Sua enquete
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground ml-auto">
                    Encerra em {poll.endsIn}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-foreground mb-4 leading-snug text-balance">
                  {poll.question}
                </h4>
                <div className="space-y-2 flex-1">
                  {poll.options.map((option, i) => {
                    const optVotes = i === userVote ? option.votes + 1 : option.votes
                    const percentage =
                      totalWithUserVote > 0
                        ? (optVotes / totalWithUserVote) * 100
                        : 0

                    return (
                      <button
                        key={option.label}
                        onClick={() => handleVote(poll.id, i)}
                        disabled={!isConnected || hasVoted}
                        className={`w-full text-left relative rounded-lg border p-3 transition-all ${
                          !isConnected
                            ? "opacity-60 cursor-not-allowed border-border"
                            : hasVoted
                            ? i === userVote
                              ? "border-primary/40 bg-primary/5"
                              : "border-border bg-secondary/20"
                            : "border-border hover:border-primary/30 hover:bg-secondary/50 cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-2">
                            {hasVoted && i === userVote && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                            )}
                            {!isConnected && (
                              <Lock className="h-3 w-3 text-muted-foreground shrink-0" />
                            )}
                            <span
                              className={`text-xs font-medium ${
                                hasVoted && i === userVote
                                  ? "text-primary"
                                  : "text-foreground"
                              }`}
                            >
                              {option.label}
                            </span>
                          </div>
                          {(hasVoted || !isConnected) && (
                            <span className="text-[11px] font-mono text-muted-foreground">
                              {percentage.toFixed(1)}%
                            </span>
                          )}
                        </div>
                        {(hasVoted || !isConnected) && (
                          <div className="mt-2">
                            <Progress value={percentage} className="h-1 bg-secondary" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {totalWithUserVote.toLocaleString("pt-BR")} votos
                  </span>
                  {hasVoted && (
                    <span className="text-[10px] text-primary font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Voto registrado
                    </span>
                  )}
                  {!isConnected && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Conecte a wallet para votar
                    </span>
                  )}
                </div>
              </div>
            )
          }))}
    </>
  )
}