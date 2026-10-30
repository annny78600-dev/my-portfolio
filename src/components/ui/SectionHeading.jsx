import Reveal from "./Reveal";

const SectionHeading = ({ index, eyebrow, title, children, id, align = "split" }) => (
  <div className={`mb-14 grid gap-6 sm:mb-16 ${align === "split" ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] lg:items-end lg:gap-16" : ""}`}>
    <Reveal>
      <p className="eyebrow mb-5 flex items-center gap-3">
        {index && <span className="text-subtle">{index}</span>}
        <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="max-w-4xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-6xl">
        {title}
      </h2>
    </Reveal>
    {children && (
      <Reveal delay={0.1} className="max-w-xl text-base leading-7 text-muted">
        {children}
      </Reveal>
    )}
  </div>
);

export default SectionHeading;
