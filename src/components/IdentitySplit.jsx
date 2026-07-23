import { ShieldCheck, Terminal, Sparkles, Palette } from "lucide-react";

const SECURITY_ITEMS = [
  "Penetration Testing & Vulnerability Assessment",
  "Capture The Flag (CTF) Competitions",
  "C++ & Low-Level Systems Programming",
  "Reverse Engineering",
];

const CREATIVE_ITEMS = [
  "After Effects & Compositing",
  "Blender 3D Modeling & Animation",
  "Cinema 4D Dynamics",
  "DaVinci Resolve Color Grading",
];

function IdentityCard({ watermark: Watermark, icon: Icon, title, items }) {
  return (
    <div className="bg-surface border border-primary/15 p-8 relative overflow-hidden group hover:border-primary/40 transition-colors duration-500">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Watermark aria-hidden="true" className="size-[120px] text-primary" />
      </div>
      <h2 className="font-sans text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
        <Icon aria-hidden="true" className="size-6" />
        {title}
      </h2>
      <ul className="space-y-4 font-mono text-sm text-on-surface-variant">
        {items.map((item, i) => (
          <li
            key={item}
            className={
              i < items.length - 1
                ? "flex items-center gap-3 border-b border-surface-high pb-2"
                : "flex items-center gap-3"
            }
          >
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IdentitySplit() {
  return (
    <section className="py-24 px-5 md:px-20 max-w-[1200px] mx-auto border-t border-primary/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <IdentityCard
          watermark={ShieldCheck}
          icon={Terminal}
          title="Security & Dev"
          items={SECURITY_ITEMS}
        />
        <IdentityCard
          watermark={Sparkles}
          icon={Palette}
          title="Creative & Motion"
          items={CREATIVE_ITEMS}
        />
      </div>
    </section>
  );
}
