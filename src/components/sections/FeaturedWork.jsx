import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ProjectVisual from "../showcase/ProjectVisual";
import { useProjectDialog } from "../showcase/ProjectDialog";
import { featuredProjects } from "../../data/projects";

const FeaturedRow = ({ project, index, total }) => {
  const rowRef = useRef(null);
  const reduce = useReducedMotion();
  const { openProject } = useProjectDialog();
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const flipped = index % 2 === 1;

  return (
    <article ref={rowRef} className="grid items-center gap-8 border-t border-line py-14 first:border-t-0 first:pt-0 sm:py-20 lg:grid-cols-12 lg:gap-14">
      <button
        type="button"
        onClick={() => openProject(project.id)}
        className={`group relative block overflow-hidden rounded-[28px] border border-line text-left lg:col-span-7 ${flipped ? "lg:order-last" : ""}`}
        aria-label={`Open the ${project.shortTitle} case study`}
      >
        <Motion.div style={{ y: visualY }} className="-my-[50px]">
          <ProjectVisual project={project} className="aspect-[16/11] w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        </Motion.div>
        <span className="absolute bottom-5 right-5 inline-flex translate-y-2 items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Case study <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </button>

      <Reveal delay={0.08} className="lg:col-span-5">
        <p className="flex items-center gap-4 font-mono text-xs text-subtle">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
          {String(total).padStart(2, "0")}
        </p>
        <h3 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl">{project.shortTitle}</h3>
        <p className="mt-3 text-sm text-muted">
          {project.company} · {project.period}
        </p>
        <p className="mt-6 text-base leading-7 text-muted sm:text-lg sm:leading-8">{project.summary}</p>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">My role</dt>
            <dd className="mt-1.5 text-fg">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">Scope</dt>
            <dd className="mt-1.5 text-accent">{project.scope}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => openProject(project.id)}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Read case study <ArrowUpRight size={15} aria-hidden="true" />
          </button>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Live site<span className="sr-only"> for {project.shortTitle} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
};

const FeaturedWork = () => (
  <section id="featured" aria-labelledby="featured-title" className="relative border-t border-line bg-elevated py-24 sm:py-32">
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-24">
      <SectionHeading index="04" eyebrow="Featured work" id="featured-title" title="Three products where I worked beyond the frontend.">
        Selected case studies. Every other project is listed once in All Projects below.
      </SectionHeading>
      {featuredProjects.map((project, index) => (
        <FeaturedRow key={project.id} project={project} index={index} total={featuredProjects.length} />
      ))}
    </div>
  </section>
);

export default FeaturedWork;
