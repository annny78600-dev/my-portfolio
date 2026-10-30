import { useEffect, useRef } from "react";
import { animate, motion as Motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "../ui/Reveal";
import { experience } from "../../data/experience";
import { projects } from "../../data/projects";

const statement =
  "I started out building React interfaces. Today I ship Next.js products end to end — from the screen people use to the API, the data, and the server it runs on.";

// Each word brightens as the statement scrolls through the viewport.
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <Motion.span style={{ opacity }} className="inline">{children} </Motion.span>;
};

const ScrollStatement = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = statement.split(" ");

  return (
    <p ref={ref} className="max-w-5xl font-display text-[clamp(1.9rem,4.2vw,3.9rem)] font-medium leading-[1.12] tracking-[-0.03em] text-fg">
      {reduce
        ? statement
        : words.map((word, index) => (
            <Word key={index} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
              {word}
            </Word>
          ))}
    </p>
  );
};

const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || !ref.current) return undefined;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, suffix, value]);

  return <span ref={ref}>{`${value}${suffix}`}</span>;
};

const stats = [
  { value: 3, suffix: "+", label: "Years of professional experience" },
  { value: projects.length, label: "Projects across products and clients" },
  { value: experience.length, label: "Companies, from trainee to Software Developer" },
];

const About = () => {
  return (
    <section id="about" aria-labelledby="about-title" className="relative border-t border-line bg-bg py-24 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-24">
        <p className="eyebrow mb-10 flex items-center gap-3">
          <span className="text-subtle">01</span>
          <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
          <span id="about-title">About</span>
        </p>

        <ScrollStatement />

        <div className="mt-20 grid gap-14 border-t border-line pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="space-y-6 text-lg leading-8 text-muted">
            <Reveal as="p">
              My first years were frontend-focused: dashboards, admin panels, onboarding flows, and websites for products in legal funding, healthcare, real estate, and SaaS, built mostly with React, Material UI, Tailwind CSS, and Redux.
            </Reveal>
            <Reveal as="p" delay={0.06}>
              At Base2Brand Infotech my role widened. Alongside the interface I work on route handlers, Prisma models, role-based access, messaging integrations, and production deployments, while frontend craft stays at the centre of what I do.
            </Reveal>
          </div>

          <dl className="grid gap-px self-start overflow-hidden rounded-3xl border border-line bg-line">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-6 bg-bg px-7 py-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="contents">
                  <span className="w-28 shrink-0 font-display text-5xl font-semibold tracking-[-0.05em] text-fg sm:text-6xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm text-muted">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
