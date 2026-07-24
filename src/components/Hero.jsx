import { Button } from "./Button";

export function Hero() {
  return (
    <section className="min-h-[870px] flex flex-col justify-center items-center text-center px-5 md:px-20 max-w-[1200px] mx-auto relative">
      <div className="space-y-6 max-w-3xl">
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
    </section>
  );
}
