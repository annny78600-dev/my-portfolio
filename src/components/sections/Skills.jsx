import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { skillGroups } from "../../data/skills";

const spans = { frontend: "lg:col-span-2", delivery: "lg:col-span-2" };

const trackSpotlight = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
};

const Skills = () => (
  <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden border-t border-line bg-bg py-24 sm:py-32">
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-24">
      <SectionHeading index="03" eyebrow="Skills & stack" id="skills-title" title="A frontend core, with the reach to ship the whole feature.">
        React.js and Next.js are where I'm strongest. API work, data, integrations, and deployment are where I've grown most over the last year.
      </SectionHeading>
    </div>

    <div className="mx-auto grid max-w-[1440px] gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-24">
      {skillGroups.map((group, index) => (
        <Reveal
          key={group.id}
          delay={(index % 3) * 0.06}
          onPointerMove={trackSpotlight}
          className={`group relative overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent/50 sm:p-8 ${spans[group.id] ?? ""}`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), var(--accent-soft), transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">{group.note}</span>
            </div>
            <h3 className="mt-10 text-2xl font-semibold tracking-[-0.02em] text-fg">{group.title}</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill} className="rounded-full border border-line bg-bg/40 px-3 py-1.5 text-sm text-muted transition-colors group-hover:text-fg">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Skills;
