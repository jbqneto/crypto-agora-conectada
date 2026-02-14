"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Wallet, Lock, CheckCircle2, Vote, Zap, Shield, Star, Users, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/app/providers/wallet-provider"
import { Progress } from "@/components/ui/progress"
import { CreatePollModal } from "@/components/create-poll-modal"
import { useReadContract } from "wagmi"
import { contractAbi, contractAddress } from "@/lib/voting-contract"

interface Poll {
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

const INITIAL_POLLS: Poll[] = [
  {
    id: 1,
    question: "Qual blockchain tera o maior crescimento em 2026?",
    options: [
      { label: "Ethereum", votes: 3842 },
      { label: "Solana", votes: 5210 },
      { label: "BNB Chain", votes: 1890 },
      { label: "Avalanche", votes: 1254 },
    ],
    totalVotes: 12196,
    endsIn: "2 dias",
    category: "Blockchain",
  },
  {
    id: 2,
    question: "Bitcoin vai ultrapassar US$ 150 mil ate o final de 2026?",
    options: [
      { label: "Sim, com certeza", votes: 7845 },
      { label: "Sim, possivelmente", votes: 4230 },
      { label: "Nao, improvavel", votes: 2105 },
      { label: "Nao, de jeito nenhum", votes: 890 },
    ],
    totalVotes: 15070,
    endsIn: "5 dias",
    category: "Bitcoin",
  },
  {
    id: 3,
    question: "Qual setor cripto sera mais lucrativo em 2026?",
    options: [
      { label: "DeFi", votes: 4560 },
      { label: "Gaming/GameFi", votes: 3210 },
      { label: "IA + Crypto", votes: 6780 },
      { label: "RWA (Real World Assets)", votes: 5430 },
    ],
    totalVotes: 19980,
    endsIn: "3 dias",
    category: "Mercado",
  },
  {
    id: 4,
    question: "Qual exchange centralizada e a mais segura?",
    options: [
      { label: "Binance", votes: 6120 },
      { label: "Coinbase", votes: 4890 },
      { label: "Kraken", votes: 2340 },
      { label: "OKX", votes: 1780 },
    ],
    totalVotes: 15130,
    endsIn: "4 dias",
    category: "Exchange",
  },
  {
    id: 5,
    question: "ETH vai superar o BTC em valorizacao percentual em 2026?",
    options: [
      { label: "Sim, ETH surpreende", votes: 5670 },
      { label: "Nao, BTC domina", votes: 8320 },
      { label: "Ambos iguais", votes: 2140 },
    ],
    totalVotes: 16130,
    endsIn: "6 dias",
    category: "Ethereum",
  },
  {
    id: 6,
    question: "Regulamentacao cripto no Brasil vai avançar em 2026?",
    options: [
      { label: "Sim, positivamente", votes: 7200 },
      { label: "Sim, mas restritiva", votes: 4100 },
      { label: "Nao, vai estagnar", votes: 1950 },
    ],
    totalVotes: 13250,
    endsIn: "7 dias",
    category: "Regulacao",
  },
]

const SUPER_POWERS = [
  { icon: Vote, label: "Votar em enquetes", description: "Participe das votacoes da comunidade" },
  { icon: Star, label: "Perfil verificado", description: "Badge exclusivo de membro Web3" },
  { icon: Zap, label: "Acesso antecipado", description: "Noticias e analises em primeira mao" },
  { icon: Shield, label: "Governanca", description: "Influencie o futuro do Blocos & Bits" },
]

export function VotingSection() {
  const { isConnected, isConnecting, connect } = useWallet()
  const [votedPolls, setVotedPolls] = useState<Record<number, number>>({})
  const [polls, setPolls] = useState<Poll[]>(INITIAL_POLLS)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const { data } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "totalVotings",
  });

  const totalPages = Math.ceil(polls.length / cardsPerView)

  useEffect(() => {
    const checkWidth = () => {
      if (typeof window !== "undefined") {
        setCardsPerView(window.innerWidth < 1024 ? 1 : 3)
      }
    }
    
    checkWidth();
    
    window.addEventListener("resize", checkWidth)
    
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  useEffect(() => {
    console.log("Wallet connection status changed:", isConnected);

    console.log("--- votings from contract:", data);

  }, [isConnected]);

  const scrollToPage = useCallback(
    (page: number) => {
      const container = scrollRef.current
      if (!container) return
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth
        : 0
      const gap = 16
      container.scrollTo({
        left: page * cardsPerView * (cardWidth + gap),
        behavior: "smooth",
      })
      setCurrentPage(page)
    },
    [cardsPerView]
  )

  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container || !container.firstElementChild) return
    const cardWidth = (container.firstElementChild as HTMLElement).offsetWidth
    const gap = 16
    const scrollPos = container.scrollLeft
    const page = Math.round(scrollPos / (cardsPerView * (cardWidth + gap)))
    setCurrentPage(Math.min(page, totalPages - 1))
  }, [cardsPerView, totalPages])

  const handleVote = (pollId: number, optionIndex: number) => {
    if (!isConnected) return
    setVotedPolls((prev) => ({ ...prev, [pollId]: optionIndex }))
  }

  const handlePollCreated = (newPollData: {
    question: string
    options: string[]
    category: string
    duration: string
  }) => {
    const newPoll: Poll = {
      id: Date.now(),
      question: newPollData.question,
      options: newPollData.options.map((label) => ({ label, votes: 0 })),
      totalVotes: 0,
      endsIn: `${newPollData.duration} dias`,
      category: newPollData.category.charAt(0).toUpperCase() + newPollData.category.slice(1),
      isUserCreated: true,
    }
    setPolls((prev) => [newPoll, ...prev])
    setCurrentPage(0)
    scrollToPage(0)
  }

  const totalGlobalVotes = polls.reduce((acc, p) => acc + p.totalVotes, 0)

  return (
    <section id="votacoes" className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Votacoes da Comunidade
        </h2>
        <div className="h-px flex-1 ml-4 bg-border" />
      </div>

      {/* Wallet Info Banner */}
      {!isConnected && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Conecte sua wallet para ganhar super poderes
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Membros Web3 tem acesso exclusivo a votacoes, criacao de enquetes, governanca e muito mais.
                </p>
              </div>
            </div>
            <Button
              onClick={connect}
              disabled={isConnecting}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono gap-2 shrink-0"
            >
              <Wallet className="h-4 w-4" />
              {isConnecting ? "Conectando..." : "Conectar Wallet"}
            </Button>
          </div>

          {/* Super Powers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {SUPER_POWERS.map((power) => (
              <div
                key={power.label}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50 border border-border text-center"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <power.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-semibold text-foreground">{power.label}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{power.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connected user bar with Create Poll button */}
      {isConnected && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse-glow shrink-0" />
            <span className="text-sm text-primary font-medium">
              Wallet conectada - Super poderes ativos!
            </span>
            <div className="hidden sm:flex items-center gap-1.5 ml-auto mr-3">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-mono">
                {totalGlobalVotes.toLocaleString("pt-BR")} votos totais
              </span>
            </div>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium gap-2 shrink-0"
            size="sm"
          >
            <PlusCircle className="h-4 w-4" />
            Criar Enquete
          </Button>
        </div>
      )}

      {/* Polls Carousel */}
      <div className="relative group">
        {/* Left Arrow */}
        {currentPage > 0 && (
          <button
            onClick={() => scrollToPage(currentPage - 1)}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-lg"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Right Arrow */}
        {currentPage < totalPages - 1 && (
          <button
            onClick={() => scrollToPage(currentPage + 1)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-lg"
            aria-label="Proximo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {polls.map((poll) => {
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
          })}
        </div>
      </div>

      {/* Carousel Navigation Dots & Page Info */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentPage
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Pagina ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">
            {currentPage + 1} / {totalPages}
          </span>
        </div>
      )}

      {/* Create Poll Modal */}
      <CreatePollModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onPollCreated={handlePollCreated}
      />
    </section>
  )
}
