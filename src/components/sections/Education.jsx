import { GraduationCap } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { education } from "../../data/profile";

const Education = () => (
  <section id="education" aria-labelledby="education-title" className="relative border-t border-line bg-elevated py-24 sm:py-32">
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-24">
      <SectionHeading index="06" eyebrow="Education" id="education-title" title="Computer applications, then constant practice." />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {education.map((item, index) => (
          <Reveal
            key={item.degree}
            delay={index * 0.08}
            className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 ${item.primary ? "border-accent/40 bg-surface" : "border-line bg-surface/60"}`}
          >
            {item.primary && <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />}
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{item.period}</span>
                {item.primary && <GraduationCap size={22} className="text-accent" aria-hidden="true" />}
              </div>
              <h3 className={`mt-10 font-semibold tracking-[-0.025em] text-fg ${item.primary ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{item.degree}</h3>
              <p className="mt-3 text-muted">{item.institution}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
