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

export function SkillsTerminal() {
  return (
    <section
      id="skills"
      className="py-24 px-5 md:px-20 max-w-[1200px] mx-auto border-t border-primary/10"
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

        <div className="p-6 md:p-8 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words text-on-surface-variant">
          <div>
            <Prompt />
            {"cat skills.json"}
          </div>
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
          <div>
            <Prompt />
            <span className="terminal-cursor" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
