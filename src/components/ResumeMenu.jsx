import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../lib/utils";
import { RESUMES } from "../data/resumes";

export function ResumeMenu({
  variant = "primary",
  className,
  triggerClassName,
  onSelect,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <Button
        type="button"
        variant={variant}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn("w-full gap-2", triggerClassName)}
      >
        Resume
        <ChevronDown
          aria-hidden="true"
          className={cn("size-3 transition-transform", open && "rotate-180")}
        />
      </Button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-56 border border-primary/20 bg-surface shadow-2xl"
        >
          {RESUMES.map((resume) => (
            <a
              key={resume.href}
              role="menuitem"
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOpen(false);
                onSelect?.();
              }}
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
