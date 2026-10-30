import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3, label: "years of experience" },
  { value: 8, label: "selected projects" },
  { value: 3, label: "current product projects" },
];

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const statRefs = useRef([]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.from(contentRef.current.children, {
      y: 50,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true },
    });

    gsap.to(imageRef.current, {
      yPercent: 24,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    statRefs.current.forEach((stat) => {
      const target = Number(stat.dataset.value);
      const counter = { value: 0 };
      gsap.to(counter, {
        value: target,
        duration: 1.2,
        ease: "power2.out",
        snap: { value: 1 },
        scrollTrigger: { trigger: stat, start: "top 85%", once: true },
        onUpdate: () => { stat.textContent = Math.round(counter.value); },
      });
    });
  }, { scope: containerRef });

  const handlePointerMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !cardRef.current) return;

    const bounds = cardRef.current.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, y: 0, duration: 0.55, ease: "power3.out", overwrite: true });
  };

  return (
    <section ref={containerRef} id="about" className="stacked-section relative min-h-screen overflow-hidden bg-[#171814] px-6 py-24 text-[#f4f2e9] sm:px-10 lg:px-16">
      <div className="absolute inset-0 h-[125%] -top-[12%] opacity-20">
        <img ref={imageRef} src="/lapatop_timeline.avif" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[#171814]/85" />
      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.52fr)] lg:items-end lg:gap-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#f3a06f]">About Anila</p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">React / Next.js Developer building useful products from interface to API.</h2>
            <p className="mt-8 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">I have 3+ years of experience building responsive web applications, admin portals, dashboards, and SaaS platforms. My core work spans React, Next.js, TypeScript, Redux Toolkit, reusable components, REST APIs, responsive UI, and frontend performance. In my current role, I have also worked on Next.js API routes, Prisma schemas and relations, webhooks, CRM workflows, and deployment for an end-to-end project.</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">Based in Mohali, Punjab, India. I use Cursor and Claude Code to support development and debugging, and have integrated AI calling workflows without building or training language models.</p>
          </div>

          <div ref={cardRef} onMouseMove={handlePointerMove} onMouseLeave={handlePointerLeave} className="relative overflow-hidden border border-white/20 bg-white/10 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:p-9">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24),transparent_36%,rgba(243,160,111,0.12))]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f3a06f]">Working principle</p>
              <p className="mt-8 text-2xl font-medium leading-tight text-white sm:text-3xl">Build clear interfaces, then make the workflows behind them dependable.</p>
              <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-4 text-xs uppercase tracking-[0.16em] text-white/50"><span>Interface</span><span>Systems</span><span>Motion</span></div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-[#171814]/90 p-7 sm:p-9"><p ref={(element) => { statRefs.current[index] = element; }} data-value={stat.value} className="text-5xl font-semibold tracking-[-0.04em] text-[#f3a06f]">0</p><p className="mt-2 text-sm text-white/55">{stat.label}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
