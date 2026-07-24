import * as React from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import { cn } from "../lib/utils";

const ICONS = {
  external: ExternalLink,
  play: PlayCircle,
};

export const ProjectCard = React.forwardRef(
  (
    { title, description, tags, image, imageAlt, icon, href, className, ...props },
    ref,
  ) => {
    const Icon = ICONS[icon] ?? ExternalLink;
    const Comp = href ? "a" : "div";
    const linkProps = href
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Comp
        ref={ref}
        className={cn(
          "group border border-primary/15 bg-surface overflow-hidden hover:border-primary/50 transition-all duration-300",
          href && "block cursor-pointer",
          className,
        )}
        {...linkProps}
        {...props}
      >
        <div className="h-48 relative overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/40 group-hover:bg-background/10 transition-colors duration-300" />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-sans text-2xl font-semibold text-on-surface">
              {title}
            </h3>
            <Icon aria-hidden="true" className="text-primary shrink-0" />
          </div>
          <p className="text-on-surface-variant mb-6 text-sm">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-background border border-primary/30 font-mono text-[10px] uppercase tracking-widest text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Comp>
    );
  },
);
ProjectCard.displayName = "ProjectCard";
