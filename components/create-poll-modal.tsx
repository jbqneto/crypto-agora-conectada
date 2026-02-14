"use client"

import { useState } from "react"
import { Plus, X, Loader2, Coins, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useWallet } from "@/app/providers/wallet-provider"

interface CreatePollModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPollCreated: (poll: {
    question: string
    options: string[]
    category: string
    duration: string
  }) => void
}

const CATEGORIES = [
  { value: "bitcoin", label: "Bitcoin" },
  { value: "ethereum", label: "Ethereum" },
  { value: "blockchain", label: "Blockchain" },
  { value: "defi", label: "DeFi" },
  { value: "nfts", label: "NFTs" },
  { value: "regulacao", label: "Regulacao" },
  { value: "mercado", label: "Mercado" },
  { value: "gaming", label: "Gaming" },
  { value: "ia", label: "IA + Crypto" },
]

const DURATIONS = [
  { value: "1", label: "1 dia" },
  { value: "3", label: "3 dias" },
  { value: "5", label: "5 dias" },
  { value: "7", label: "7 dias" },
  { value: "14", label: "14 dias" },
]

const FEE_AMOUNT = "0.001"
const FEE_CURRENCY = "ETH"

type Step = "form" | "confirm" | "processing" | "success"

export function CreatePollModal({ open, onOpenChange, onPollCreated }: CreatePollModalProps) {
  const { address } = useWallet()
  const [step, setStep] = useState<Step>("form")
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [category, setCategory] = useState("")
  const [duration, setDuration] = useState("")
  const [txHash, setTxHash] = useState("")

  const resetForm = () => {
    setStep("form")
    setQuestion("")
    setOptions(["", ""])
    setCategory("")
    setDuration("")
    setTxHash("")
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm()
    }
    onOpenChange(isOpen)
  }

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const updated = [...options]
    updated[index] = value
    setOptions(updated)
  }

  const isFormValid =
    question.trim().length >= 10 &&
    options.filter((o) => o.trim().length > 0).length >= 2 &&
    category &&
    duration

  const handleSubmitForm = () => {
    if (isFormValid) {
      setStep("confirm")
    }
  }

  const handleConfirmTransaction = async () => {
    setStep("processing")

    // Simulate smart contract interaction
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Generate a mock tx hash
    const chars = "0123456789abcdef"
    let hash = "0x"
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)]
    }
    setTxHash(hash)
    setStep("success")

    // Notify parent
    onPollCreated({
      question,
      options: options.filter((o) => o.trim().length > 0),
      category,
      duration,
    })
  }

  const filledOptions = options.filter((o) => o.trim().length > 0)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        {/* Step 1: Form */}
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground text-lg">Criar Nova Enquete</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Crie uma enquete para a comunidade votar. Uma taxa de{" "}
                <span className="text-primary font-mono font-semibold">
                  {FEE_AMOUNT} {FEE_CURRENCY}
                </span>{" "}
                sera cobrada para registrar no smart contract.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 mt-2">
              {/* Question */}
              <div className="space-y-2">
                <Label htmlFor="poll-question" className="text-sm font-medium text-foreground">
                  Pergunta
                </Label>
                <Input
                  id="poll-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex: Qual criptomoeda tera melhor desempenho em 2026?"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  maxLength={150}
                />
                <span className="text-[10px] text-muted-foreground font-mono">
                  {question.length}/150 caracteres (minimo 10)
                </span>
              </div>

              {/* Options */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Opcoes de resposta
                </Label>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-mono text-primary font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Opcao ${index + 1}`}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground flex-1"
                        maxLength={60}
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => removeOption(index)}
                          className="h-8 w-8 rounded-md border border-border hover:border-destructive/50 hover:bg-destructive/10 flex items-center justify-center transition-colors"
                          aria-label={`Remover opcao ${index + 1}`}
                        >
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {options.length < 6 && (
                  <button
                    onClick={addOption}
                    className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors mt-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Adicionar opcao ({options.length}/6)
                  </button>
                )}
              </div>

              {/* Category & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Categoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Duracao</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {DURATIONS.map((dur) => (
                        <SelectItem key={dur.value} value={dur.value}>
                          {dur.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fee Info */}
              <div className="rounded-lg border border-border bg-secondary/30 p-3 flex items-start gap-3">
                <Coins className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Taxa de criacao:</span>{" "}
                  {FEE_AMOUNT} {FEE_CURRENCY} (~$3.50 USD). Esta taxa e usada para registrar a enquete
                  on-chain e prevenir spam.
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmitForm}
                disabled={!isFormValid}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium gap-2"
              >
                Revisar e Confirmar
              </Button>
            </div>
          </>
        )}

        {/* Step 2: Confirm Transaction */}
        {step === "confirm" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground text-lg">Confirmar Transacao</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Revise os detalhes da enquete antes de assinar a transacao.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              {/* Poll Preview */}
              <div className="rounded-xl border border-border bg-background p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {CATEGORIES.find((c) => c.value === category)?.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto">
                    {DURATIONS.find((d) => d.value === duration)?.label}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-foreground leading-snug">
                  {question}
                </h4>
                <div className="space-y-1.5">
                  {filledOptions.map((opt, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-secondary/20"
                    >
                      <span className="text-[10px] font-mono text-primary font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-xs text-foreground">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction Details */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Detalhes da Transacao
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Rede</span>
                    <span className="text-xs font-mono text-foreground">Ethereum Mainnet</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Contrato</span>
                    <span className="text-[10px] font-mono text-foreground">0x1a2b...9f0e</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Funcao</span>
                    <span className="text-xs font-mono text-primary">{"createPoll()"}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Taxa de criacao</span>
                    <span className="text-sm font-mono font-bold text-foreground">
                      {FEE_AMOUNT} {FEE_CURRENCY}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Gas estimado</span>
                    <span className="text-xs font-mono text-muted-foreground">~0.0003 ETH</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">Total estimado</span>
                    <span className="text-sm font-mono font-bold text-primary">
                      ~0.0013 {FEE_CURRENCY}
                    </span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Ao confirmar, sua wallet ira solicitar a assinatura da transacao. A taxa nao e reembolsavel.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep("form")}
                  className="flex-1 border-border text-foreground hover:bg-secondary"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleConfirmTransaction}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-medium gap-2"
                >
                  <Coins className="h-4 w-4" />
                  Assinar e Pagar {FEE_AMOUNT} {FEE_CURRENCY}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Processing */}
        {step === "processing" && (
          <div className="py-10 flex flex-col items-center gap-5 text-center">
            <div className="h-16 w-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <div>
              <h3 className="text-base font-bold text-foreground">Processando Transacao</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Aguarde a confirmacao na blockchain...
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="h-3 w-3 text-muted-foreground animate-spin" />
              <span className="text-[10px] font-mono text-muted-foreground">
                Aguardando assinatura da wallet...
              </span>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="py-8 flex flex-col items-center gap-5 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Enquete Criada!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Sua enquete foi registrada on-chain com sucesso.
              </p>
            </div>

            {/* TX Details */}
            <div className="w-full rounded-xl border border-border bg-background p-4 space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">TX Hash</span>
                <span className="text-[10px] font-mono text-primary">
                  {txHash.slice(0, 10)}...{txHash.slice(-8)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status</span>
                <span className="text-xs text-primary font-medium flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Confirmado
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">De</span>
                <span className="text-[10px] font-mono text-foreground">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
                </span>
              </div>
            </div>

            <Button
              onClick={() => handleClose(false)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
