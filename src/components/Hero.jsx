import { ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { OrbitCanvas } from "./OrbitCanvas";

export function Hero() {
  return (
    <section className="relative min-h-[870px] flex flex-col justify-center items-center text-center overflow-hidden">
      <OrbitCanvas className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(10,14,20,0.72), rgba(10,14,20,0.32) 46%, rgba(10,14,20,0) 68%)",
        }}
      />

      <div className="relative z-10 px-5 md:px-20 max-w-3xl mx-auto space-y-6">
        <h1 className="font-sans text-4xl md:text-[64px] font-bold leading-tight tracking-tighter text-on-surface">
          [Gurjar Siddhant Begraj]
        </h1>
        <p className="font-mono text-sm text-primary uppercase tracking-widest">
          Cybersecurity &amp; Systems Developer{" "}
          <span className="text-on-surface-variant">/</span> Motion Designer
        </p>
        <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 text-lg">
          Engineering secure systems and crafting high-fidelity motion
          experiences. Bridging technical rigor with creative execution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8">
          <Button asChild variant="primary">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href="/siddhant-gurjar-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </Button>
        </div>
      </div>

      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown aria-hidden="true" className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
