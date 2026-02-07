import { Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 mt-12">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">C</span>
            </div>
            <span className="font-heading text-sm font-semibold text-foreground">CryptoPulse</span>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2025 CryptoPulse. Informações não constituem aconselhamento financeiro.
          </p>

          <div className="flex items-center gap-3">
            <a href="#" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
