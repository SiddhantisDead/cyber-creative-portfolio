import { ResumeMenu } from "./ResumeMenu";

const LINKS = [
  { label: "GitHub", href: "https://github.com/SiddhantisDead" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gurjar-siddhant-begraj-600023294/",
  },
  {
    label: "Email",
    href: "mailto:gurjar.23scse1530007@galgotiasuniversity.ac.in",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#060f16] border-t border-primary/10 w-full py-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-20 max-w-[1200px] mx-auto gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-on-surface">
          © 2024 ACTIVE_DEFENSE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 items-center font-mono text-sm">
          {LINKS.map(({ label, href }) => {
            const external = href.startsWith("http") || href.endsWith(".pdf");
            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-on-surface-variant hover:text-primary opacity-80 hover:opacity-100 transition-colors transition-opacity"
              >
                {label}
              </a>
            );
          })}
          <ResumeMenu
            variant="ghost"
            triggerClassName="p-0 normal-case tracking-normal font-mono text-sm text-on-surface-variant hover:text-primary hover:bg-transparent opacity-80 hover:opacity-100"
          />
        </div>
      </div>
    </footer>
  );
}
