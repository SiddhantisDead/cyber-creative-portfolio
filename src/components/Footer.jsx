const LINKS = [
  { label: "GitHub", href: "https://github.com/SiddhantisDead" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "#" },
  { label: "Resume", href: "#" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#060f16] border-t border-primary/10 w-full py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-20 max-w-[1200px] mx-auto gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-on-surface">
          © 2024 ACTIVE_DEFENSE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 font-mono text-sm">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-on-surface-variant hover:text-primary opacity-80 hover:opacity-100 transition-colors transition-opacity"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
