import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Braces, Database, ShieldCheck, PlugZap, Wrench, PanelsTopLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    number: "01",
    title: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "SQL", "HTML5", "CSS3"],
    icon: <Braces size={22} aria-hidden="true" />,
  },
  {
    number: "02",
    title: "Frontend",
    skills: ["React.js", "Next.js App Router", "React Hooks", "Redux Toolkit", "Tailwind CSS", "Material UI", "shadcn/ui", "Ant Design", "Bootstrap", "SCSS"],
    icon: <PanelsTopLeft size={22} aria-hidden="true" />,
  },
  {
    number: "03",
    title: "API & database work",
    skills: ["Next.js API Routes", "REST APIs", "Prisma ORM", "Relational schema design", "Supabase", "Webhooks"],
    icon: <Database size={22} aria-hidden="true" />,
  },
  {
    number: "04",
    title: "Authentication & architecture",
    skills: ["Authentication", "Authorization", "RBAC", "Multi-tenant applications", "Backend-for-Frontend (BFF)"],
    icon: <ShieldCheck size={22} aria-hidden="true" />,
  },
  {
    number: "05",
    title: "Integrations",
    skills: ["Supabase Realtime", "Firebase Cloud Messaging", "Gmail API", "Google Maps", "Callyzer", "OmniDimension", "AWS S3"],
    icon: <PlugZap size={22} aria-hidden="true" />,
  },
  {
    number: "06",
    title: "Tools",
    skills: ["Git", "GitHub", "GitHub Actions", "Axios", "Recharts", "Cursor", "Claude Code"],
    icon: <Wrench size={22} aria-hidden="true" />,
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const leftCardsRef = useRef([]);
  const rightCardsRef = useRef([]);
  const revealRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.to(backgroundRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.from(revealRef.current.children, {
      y: 80,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 72%",
        once: true,
      },
    });

    gsap.from(revealRef.current.querySelectorAll("[data-skill-card]"), {
      y: 80,
      autoAlpha: 0,
      stagger: 0.14,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 68%",
        once: true,
      },
    });

    leftCardsRef.current.forEach((card) => {
      gsap.to(card, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    rightCardsRef.current.forEach((card) => {
      gsap.to(card, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, { scope: sectionRef });

  const handleCardEnter = (card) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(card, { scale: 1.03, y: -8, duration: 0.35, ease: "power2.out", overwrite: "auto" });
  };

  const handleCardLeave = (card) => {
    gsap.to(card, { scale: 1, y: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
  };

  return (
    <section ref={sectionRef} id="skills" className="stacked-section relative min-h-screen overflow-hidden bg-[#0d0d0d] px-6 py-28 text-[#f4f2e9] sm:px-10 lg:px-16">
      <div ref={backgroundRef} className="pointer-events-none absolute -top-[12%] inset-x-0 h-[125%] opacity-20">
        <img src="/lapatop_timeline.avif" alt="" className="h-full w-full object-cover grayscale" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(243,160,111,0.12),transparent_24%),radial-gradient(circle_at_85%_75%,rgba(111,164,170,0.14),transparent_26%),linear-gradient(180deg,rgba(13,13,13,0.82),#0d0d0d_88%)]" />

      <div ref={revealRef} className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#f3a06f]">How I contribute</p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">A practical toolkit across the frontend and its integrations.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/60">My day-to-day strengths are frontend engineering, API integration, data modeling, access control, and product workflows.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
          {skillGroups.map((capability, index) => {
            const isLeft = index % 2 === 0;
            return (
              <article
                key={capability.number}
                data-skill-card
                ref={(element) => {
                  if (isLeft) leftCardsRef.current[index] = element;
                  else rightCardsRef.current[index] = element;
                }}
                onMouseEnter={(event) => handleCardEnter(event.currentTarget)}
                onMouseLeave={(event) => handleCardLeave(event.currentTarget)}
                className={`group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-md transition-[border-color,box-shadow] duration-500 hover:border-[#f3a06f]/70 hover:shadow-[0_28px_90px_rgba(243,160,111,0.14)] sm:p-8 ${isLeft ? "xl:translate-y-8" : ""}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.13),transparent_35%,rgba(243,160,111,0.05))] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-10 flex items-center justify-between text-[#f3a06f]"><span className="text-sm font-semibold">{capability.number}</span><span>{capability.icon}</span></div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">{capability.title}</h3>
                </div>
                <div className="relative mt-8 flex flex-wrap gap-2 border-t border-white/15 pt-5">
                  {capability.skills.map((skill) => <span key={skill} className="border border-white/15 px-2.5 py-1.5 text-xs leading-4 text-white/65">{skill}</span>)}
                  <ArrowUpRight className="ml-auto self-end text-[#f3a06f] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={18} aria-hidden="true" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
