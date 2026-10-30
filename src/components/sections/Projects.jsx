import { useMemo, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import ProjectVisual from "../showcase/ProjectVisual";
import { useProjectDialog } from "../showcase/ProjectDialog";
import { otherProjects, projectFilters } from "../../data/projects";

const matchesFilter = (project, filter) => filter === "all" || project.categories.includes(filter);

const matchesQuery = (project, query) => {
  if (!query) return true;
  const haystack = [project.title, project.role, project.scope, project.company, ...project.stack].join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((term) => haystack.includes(term));
};

export const ProjectCard = ({ project }) => {
  const { openProject } = useProjectDialog();
  const extra = project.stack.length - 4;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/50">
      <div className="overflow-hidden">
        <ProjectVisual project={project} compact className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2.5 py-1 font-medium ${project.kind === "product" ? "bg-accent text-on-accent" : "bg-accent-soft text-accent"}`}>
            {project.scope}
          </span>
          <span className="text-subtle">{project.period}</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-fg">
          <button type="button" onClick={() => openProject(project.id)} className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </button>
        </h3>
        <p className="mt-1 text-sm text-muted">{project.role}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">{tech}</li>
          ))}
          {extra > 0 && <li className="rounded-full px-2 py-1 text-xs text-subtle">+{extra} more</li>}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-semibold">
          <span className="inline-flex items-center gap-1 text-accent">
            Case details <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-fg"
            >
              Live site<span className="sr-only">: {project.shortTitle} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-transparent transition group-has-[:focus-visible]:ring-accent" aria-hidden="true" />
    </article>
  );
};

const filters = projectFilters
  .map((option) => ({ ...option, count: otherProjects.filter((project) => matchesFilter(project, option.id)).length }))
  .filter((option) => option.count > 0);

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();
  const visible = useMemo(
    () => otherProjects.filter((project) => matchesFilter(project, filter) && matchesQuery(project, query.trim())),
    [filter, query],
  );

  const clear = () => {
    setQuery("");
    setFilter("all");
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative border-t border-line bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-24">
        <SectionHeading index="05" eyebrow="All projects" id="projects-title" title="The rest of the work, in one place.">
          Admin dashboards, web applications, and websites. Each card is labelled with my scope; select one for the full write-up.
        </SectionHeading>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter projects" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {filters.map((option) => {
              const isActive = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  aria-pressed={isActive}
                  className={`relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${isActive ? "border-transparent text-on-accent" : "border-line text-muted hover:border-line-strong hover:text-fg"}`}
                >
                  {isActive && (
                    <Motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-accent" transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} />
                  )}
                  <span className="relative">
                    {option.label} <span className="opacity-60">{option.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Search projects by name or technology</span>
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search: React, dashboard, MUI…"
              className="w-full rounded-full border border-line bg-surface py-2.5 pl-11 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent focus-visible:outline-none"
            />
          </label>
        </div>

        <p className="mb-6 text-sm text-subtle" aria-live="polite">
          Showing {visible.length} of {otherProjects.length} projects
        </p>

        {visible.length ? (
          <Motion.ul layout={!reduce} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <Motion.li
                  key={project.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} />
                </Motion.li>
              ))}
            </AnimatePresence>
          </Motion.ul>
        ) : (
          <div className="rounded-3xl border border-dashed border-line-strong px-6 py-16 text-center">
            <p className="text-fg">No projects match your search.</p>
            <button type="button" onClick={clear} className="mt-4 text-sm font-semibold text-accent underline underline-offset-4">
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
