import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";

function Key({ children }) {
  return <span className="text-primary">{children}</span>;
}

function Prompt() {
  return (
    <>
      <Key>ad_arch</Key>
      {"@"}
      <span className="text-on-surface">system</span>
      {":~$ "}
    </>
  );
}

const HELP_ROWS = [
  ["help", "list available commands"],
  ["about", "short bio"],
  ["skills", "cat skills.json"],
  ["projects", "list featured projects"],
  ["contact", "how to reach me"],
  ["resume", "open resume.pdf"],
  ["whoami", "current session identity"],
  ["clear", "clear the terminal"],
];

function SkillsBlock() {
  return (
    <>
      <div>{"{"}</div>
      <div>
        {'  "'}
        <Key>languages</Key>
        {'": ["C++", "Python", "TypeScript", "JavaScript"],'}
      </div>
      <div>
        {'  "'}
        <Key>security</Key>
        {'": ['}
      </div>
      <div>{'    "Ghidra", '}</div>
      <div>{'    "offensive security", '}</div>
      <div>{'    "CTF (BreachLab — Ghost track)"'}</div>
      <div>{"  ],"}</div>
      <div>
        {'  "'}
        <Key>dev_stack</Key>
        {'": ["React", "Supabase", "REST APIs"],'}
      </div>
      <div>
        {'  "'}
        <Key>creative_tools</Key>
        {'": ['}
      </div>
      <div>{'    "After Effects", '}</div>
      <div>{'    "DaVinci Resolve", '}</div>
      <div>{'    "Blender", '}</div>
      <div>{'    "Cinema 4D"'}</div>
      <div>{"  ],"}</div>
      <div>
        {'  "'}
        <Key>currently</Key>
        {'": "BSc Computer Science (Cybersecurity focus)"'}
      </div>
      <div>{"}"}</div>
    </>
  );
}

function HelpBlock() {
  return (
    <>
      <div className="mb-1">Available commands:</div>
      {HELP_ROWS.map(([cmd, desc]) => (
        <div key={cmd} className="grid grid-cols-[84px_1fr] gap-x-3">
          <Key>{cmd}</Key>
          <span>{desc}</span>
        </div>
      ))}
    </>
  );
}

function AboutBlock() {
  return (
    <>
      <div>
        Gurjar Siddhant Begraj — Cybersecurity &amp; Systems Developer /
        Motion Designer.
      </div>
      <div>
        Currently pursuing a BSc in Computer Science (Cybersecurity focus).
      </div>
      <div>
        Splits time between offensive security (CTFs, reverse engineering)
      </div>
      <div>and motion design / 3D work (After Effects, Blender, Cinema 4D).</div>
    </>
  );
}

function ProjectsBlock() {
  return (
    <>
      {projects.map((p) => (
        <div key={p.title}>
          <Key>{p.title}</Key>
          {` — ${p.tags.join(", ")}`}
          {p.href ? (
            <>
              {" → "}
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                {p.href}
              </a>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
}

function ContactBlock() {
  return (
    <>
      <div className="grid grid-cols-[84px_1fr] gap-x-3">
        <Key>email</Key>
        <a
          href="mailto:gurjar.23scse1530007@galgotiasuniversity.ac.in"
          className="underline hover:text-primary break-all"
        >
          gurjar.23scse1530007@galgotiasuniversity.ac.in
        </a>
      </div>
      <div className="grid grid-cols-[84px_1fr] gap-x-3">
        <Key>linkedin</Key>
        <a
          href="https://www.linkedin.com/in/gurjar-siddhant-begraj-600023294/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          gurjar-siddhant-begraj
        </a>
      </div>
      <div className="grid grid-cols-[84px_1fr] gap-x-3">
        <Key>github</Key>
        <a
          href="https://github.com/SiddhantisDead"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          @SiddhantisDead
        </a>
      </div>
    </>
  );
}

function LsBlock() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
      <span>about.txt</span>
      <span>skills.json</span>
      <span>projects.md</span>
      <span>contact.sh</span>
      <span>resume.pdf</span>
    </div>
  );
}

function runCommand(raw) {
  const trimmed = raw.trim();
  const [cmd, ...args] = trimmed.split(/\s+/);
  const lower = (cmd ?? "").toLowerCase();

  switch (lower) {
    case "":
      return { output: null };
    case "help":
      return { output: <HelpBlock /> };
    case "about":
      return { output: <AboutBlock /> };
    case "whoami":
      return {
        output: (
          <div>ad_arch (guest session) — role: visitor, access: read-only</div>
        ),
      };
    case "skills":
      return { output: <SkillsBlock /> };
    case "cat":
      if ((args[0] ?? "").toLowerCase() !== "skills.json") {
        return {
          output: <div>{`cat: ${args[0] ?? ""}: No such file`}</div>,
        };
      }
      return { output: <SkillsBlock /> };
    case "projects":
      return { output: <ProjectsBlock /> };
    case "ls":
      return { output: <LsBlock /> };
    case "contact":
      return { output: <ContactBlock /> };
    case "resume":
      window.open(
        "/siddhant-gurjar-resume.pdf",
        "_blank",
        "noopener,noreferrer",
      );
      return { output: <div>Opening resume.pdf in a new tab…</div> };
    case "date":
      return { output: <div>{new Date().toString()}</div> };
    case "echo":
      return { output: <div>{args.join(" ")}</div> };
    case "sudo":
      return { output: <div>Permission denied. Nice try though.</div> };
    case "exit":
      return {
        output: <div>There is no escape — this is a portfolio, not a shell.</div>,
      };
    case "clear":
      return { clear: true };
    default:
      return {
        output: (
          <div>
            {`command not found: ${cmd}. Type `}
            <Key>help</Key>
            {" for a list of commands."}
          </div>
        ),
      };
  }
}

export function SkillsTerminal() {
  const [history, setHistory] = useState(() => [
    { id: 0, prompt: "cat skills.json", output: <SkillsBlock /> },
    {
      id: 1,
      prompt: null,
      output: (
        <div className="opacity-80">
          {"Type "}
          <Key>help</Key>
          {" to see available commands."}
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [commandLog, setCommandLog] = useState([]);
  const [logIndex, setLogIndex] = useState(-1);

  const nextId = useRef(2);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const raw = input;
    const result = runCommand(raw);

    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((h) => [
        ...h,
        { id: nextId.current++, prompt: raw, output: result.output },
      ]);
    }

    if (raw.trim()) {
      setCommandLog((log) => [...log, raw.trim()]);
    }
    setLogIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!commandLog.length) return;
      const newIndex =
        logIndex < 0 ? commandLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(newIndex);
      setInput(commandLog[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (logIndex < 0) return;
      const newIndex = logIndex + 1;
      if (newIndex >= commandLog.length) {
        setLogIndex(-1);
        setInput("");
      } else {
        setLogIndex(newIndex);
        setInput(commandLog[newIndex]);
      }
    }
  };

  return (
    <section
      id="skills"
      className="py-24 px-5 md:px-20 max-w-[1200px] mx-auto border-t border-primary/10 scroll-mt-24"
    >
      <div className="bg-terminal border border-primary/20 rounded-md overflow-hidden shadow-2xl relative">
        <div className="bg-surface-high px-4 py-2 flex items-center border-b border-primary/10">
          <div className="flex gap-2 mr-4" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-error/70" />
            <div className="w-3 h-3 rounded-full bg-warn/70" />
            <div className="w-3 h-3 rounded-full bg-primary/70" />
          </div>
          <span className="font-mono text-sm text-on-surface-variant opacity-70">
            root@ad_arch:~
          </span>
        </div>

        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="p-6 md:p-8 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words text-on-surface-variant h-[380px] sm:h-[440px] overflow-y-auto cursor-text"
        >
          {history.map((entry) => (
            <div key={entry.id}>
              {entry.prompt !== null && (
                <div>
                  <Prompt />
                  {entry.prompt}
                </div>
              )}
              {entry.output && <div className="mb-2">{entry.output}</div>}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center">
            <Prompt />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
              aria-label="Terminal command input"
              style={{ caretColor: "var(--color-primary)" }}
              className="flex-1 min-w-0 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-on-surface"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
