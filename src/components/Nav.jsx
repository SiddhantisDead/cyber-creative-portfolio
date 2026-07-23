import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";

const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-primary/10">
      <nav className="flex justify-between items-center h-16 px-5 md:px-20 max-w-[1200px] mx-auto">
        <a
          href="#"
          className="font-sans text-2xl font-bold tracking-tighter text-primary active:scale-95 transition-transform"
        >
          AD_ARCH
        </a>

        <div className="hidden md:flex gap-2 items-center">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-on-surface-variant uppercase tracking-widest hover:text-primary hover:bg-surface/30 transition-colors duration-300 px-3 py-2 rounded"
            >
              {link.label}
            </a>
          ))}
          <Button asChild variant="primary" className="px-4 py-2">
            <a href="#">Resume</a>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-primary"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-primary/10 bg-background/95 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-on-surface-variant uppercase tracking-widest hover:text-primary hover:bg-surface/30 transition-colors duration-300 px-3 py-3 rounded"
              >
                {link.label}
              </a>
            ))}
            <Button asChild variant="primary" className="mt-2 justify-center">
              <a href="#" onClick={() => setOpen(false)}>
                Resume
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
