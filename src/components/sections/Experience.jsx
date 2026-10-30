import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { experience } from "../../data/experience";
import { getProject } from "../../data/projects";
import { useProjectDialog } from "../showcase/ProjectDialog";

const Experience = () => {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  const { openProject } = useProjectDialog();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative border-t border-line bg-elevated py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-24">
        <SectionHeading index="02" eyebrow="Experience" id="experience-title" title="Four roles, one steady direction: deeper into the product.">
          Employment history only, from my first trainee role to my current position.
        </SectionHeading>

        <ol ref={listRef} className="relative">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[calc(28%+7px)]" aria-hidden="true" />
          <Motion.span
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(28%+7px)]"
            style={{ scaleY: reduce ? 1 : progress }}
            aria-hidden="true"
          />

          {experience.map((job) => (
            <li key={job.company} className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-[28%_1fr] md:gap-0 md:pl-0">
              <Reveal className="md:pr-12 md:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{job.period}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-subtle md:justify-end">
                  <MapPin size={13} aria-hidden="true" /> {job.location}
                </p>
              </Reveal>

              <span
                className={`absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 md:left-[28%] ${job.current ? "border-accent bg-accent shadow-[0_0_0_6px_var(--accent-soft)]" : "border-line-strong bg-elevated"}`}
                aria-hidden="true"
              />

              <Reveal delay={0.05} className="md:pl-12">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">{job.title}</h3>
                  {job.current && (
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">Current</span>
                  )}
                </div>
                <p className="mt-1 text-lg font-medium text-muted">{job.company}</p>
                <p className="mt-4 max-w-2xl leading-7 text-fg/85">{job.summary}</p>

                <ul className="mt-5 max-w-2xl space-y-2.5 text-[0.95rem] leading-7 text-muted">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.7rem] h-1 w-3 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>


                {job.projectIds && (
                  <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-subtle">Projects:</span>
                    {job.projectIds.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => openProject(id)}
                        className="group inline-flex items-center gap-1 rounded-full px-2 py-1 text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {getProject(id).shortTitle}
                        <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
