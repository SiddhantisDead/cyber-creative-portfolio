import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-5 md:px-20 max-w-[1200px] mx-auto border-t border-primary/10 scroll-mt-24"
    >
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="font-sans text-3xl text-on-surface mb-2">
            Featured Projects
          </h2>
          <p className="font-mono text-sm text-primary">SELECTED_WORK_V1.0</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
