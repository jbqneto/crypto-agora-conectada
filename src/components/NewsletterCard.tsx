import { useState } from "react";
import { Mail } from "lucide-react";

const NewsletterCard = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="relative overflow-hidden rounded-xl border border-border p-5">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--accent) / 0.25), hsl(280 70% 60% / 0.25), hsl(330 80% 60% / 0.25))",
        }}
      />
      <div className="relative space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Briefing diário</h3>
        </div>
        <p className="text-xs leading-relaxed text-foreground/80">
          Receba uma curadoria objetiva sobre crypto, Web3, macro e tecnologia.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <button className="w-full rounded-lg bg-background py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-background/80">
          Receber Briefing
        </button>
      </div>
    </div>
  );
};

export default NewsletterCard;
