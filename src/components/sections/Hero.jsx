import { lazy, Suspense, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import OrbFallback from "../hero/OrbFallback";
import { profile } from "../../data/profile";

// The shader lives in its own chunk so it never blocks first paint.
const ChromeOrb = lazy(() => import("../hero/ChromeOrb"));

const headline = ["Building", "digital", "experiences."];

const KineticLine = ({ word, accent }) => (
  <span className={`block overflow-hidden pb-[0.04em] ${accent ? "text-accent" : ""}`} aria-hidden="true">
    {[...word].map((char, index) => (
      <span key={index} data-char className="inline-block will-change-transform">
        {char}
      </span>
    ))}
  </span>
);

const Hero = () => {
  const sectionRef = useRef(null);
  const curtainRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const still = (from, to) => (reduce ? [from, from] : [from, to]);
  const textY = useTransform(scrollYProgress, [0, 1], still(0, -90));
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], still(1, 0));
  const orbY = useTransform(scrollYProgress, [0, 1], still(0, 140));
  const orbScale = useTransform(scrollYProgress, [0, 1], still(1, 0.78));
  const orbOpacity = useTransform(scrollYProgress, [0, 0.9], still(1, 0.15));

  useGSAP(() => {
    if (reduce) return;
    gsap.timeline({ defaults: { ease: "power4.out" } })
      .to(curtainRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => {
          if (curtainRef.current) curtainRef.current.style.display = "none";
        },
      })
      .from("[data-orb]", { scale: 0.65, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, 0.35)
      .from("[data-char]", { yPercent: 115, duration: 1, stagger: 0.022 }, 0.45)
      .from("[data-fade]", { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" }, "-=0.55");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="home" aria-label="Introduction" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-bg">
      {!reduce && (
        <div ref={curtainRef} className="fixed inset-0 z-[1150] bg-[#060509]" style={{ clipPath: "inset(0% 0% 0% 0%)" }} aria-hidden="true" />
      )}
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-8 pt-24 sm:px-8 lg:px-24">
        <div data-fade className="flex items-center justify-end gap-4 whitespace-nowrap border-b border-line pb-4 sm:justify-between font-mono text-[0.68rem] uppercase tracking-[0.18em] text-subtle">
          <span className="hidden sm:inline">Portfolio / {new Date().getFullYear()}</span>
          <span className="inline-flex items-center gap-2 text-right text-fg">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for opportunities
          </span>
        </div>

        <div className="grid flex-1 items-center gap-2 py-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-6 lg:py-10">
          <Motion.div
            style={{ y: orbY, scale: orbScale, opacity: orbOpacity }}
            className="relative order-first mx-auto w-[min(80vw,400px)] md:w-[min(72vw,580px)] lg:order-last lg:-mr-[14%] lg:w-[128%] lg:max-w-[840px]"
          >
            <div data-orb className="aspect-square w-full">
              <Suspense fallback={<OrbFallback className="h-full w-full" />}>
                <ChromeOrb className="h-full w-full" />
              </Suspense>
            </div>
          </Motion.div>

          <Motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10">
            <p
              aria-label="Building digital experiences."
              className="font-display text-[clamp(2.7rem,9.5vw,5rem)] font-semibold lg:text-[clamp(3rem,6vw,6.4rem)] uppercase leading-[0.9] tracking-[-0.045em] text-fg"
            >
              {headline.map((word, index) => (
                <KineticLine key={word} word={word} accent={index === headline.length - 1} />
              ))}
            </p>

            <h1 data-fade className="mt-8 flex flex-wrap items-baseline gap-x-3 font-display text-xl font-medium tracking-[-0.02em] text-fg sm:text-2xl">
              {profile.name}
              <span className="text-subtle" aria-hidden="true">·</span>
              <span className="text-muted">{profile.headline}</span>
            </h1>
            <p data-fade className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-subtle sm:text-[0.78rem]">
              React.js · Next.js · TypeScript · Product Development
            </p>

            <div data-fade className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#featured"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-shadow duration-300 hover:shadow-[0_10px_40px_-8px_var(--accent)]"
                >
                  Explore projects
                  <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  Let&apos;s talk
                </a>
              </Magnetic>
            </div>
          </Motion.div>
        </div>

        <div data-fade className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.16em] text-subtle">
          <a href="#about" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
            <ArrowDown size={14} className="animate-bounce motion-reduce:animate-none" aria-hidden="true" /> Scroll to explore
          </a>
          <span className="hidden lg:[@media(pointer:fine)]:inline">Move your cursor — the surface reacts</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
