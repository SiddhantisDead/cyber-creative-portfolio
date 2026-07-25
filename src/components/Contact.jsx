import { useEffect, useRef, useState } from "react";
import { Mail, Link, SquareCode, Download } from "lucide-react";
import { RESUMES } from "../data/resumes";
import { cn } from "../lib/utils";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "gurjar.23scse1530007@galgotiasuniversity.ac.in",
    href: "mailto:gurjar.23scse1530007@galgotiasuniversity.ac.in",
  },
  {
    icon: Link,
    label: "LinkedIn",
    value: "gurjar-siddhant-begraj",
    href: "https://www.linkedin.com/in/gurjar-siddhant-begraj-600023294/",
  },
  {
    icon: SquareCode,
    label: "GitHub",
    value: "@SiddhantisDead",
    href: "https://github.com/SiddhantisDead",
  },
];

function ResumeCard() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "group flex flex-col gap-4 bg-surface border border-primary/15 p-6 hover:border-primary/50 transition-colors duration-300 w-full text-left",
          open && "border-primary/50",
        )}
      >
        <Download aria-hidden="true" className="text-primary size-6" />
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant mb-1">
            Resume
          </div>
          <div className="text-on-surface text-sm break-words group-hover:text-primary transition-colors">
            Choose a version
          </div>
        </div>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 right-0 z-20 mt-2 border border-primary/20 bg-surface shadow-2xl"
        >
          {RESUMES.map((resume) => (
            <a
              key={resume.href}
              role="menuitem"
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 font-mono text-xs uppercase tracking-widest text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {resume.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-5 md:px-20 max-w-[1200px] mx-auto border-t border-primary/10 scroll-mt-24"
    >
      <div className="mb-12">
        <h2 className="font-sans text-3xl text-on-surface mb-2">
          Get In Touch
        </h2>
        <p className="font-mono text-sm text-primary">OPEN_CHANNELS_V1.0</p>
        <p className="text-on-surface-variant max-w-2xl mt-4">
          Have a project, opportunity, or just want to talk security and
          motion design? Reach out through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CHANNELS.map(({ icon: Icon, label, value, href }) => {
          const external = href.startsWith("http") || href.endsWith(".pdf");
          return (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-4 bg-surface border border-primary/15 p-6 hover:border-primary/50 transition-colors duration-300"
            >
              <Icon aria-hidden="true" className="text-primary size-6" />
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant mb-1">
                  {label}
                </div>
                <div className="text-on-surface text-sm break-words group-hover:text-primary transition-colors">
                  {value}
                </div>
              </div>
            </a>
          );
        })}
        <ResumeCard />
      </div>
    </section>
  );
}
