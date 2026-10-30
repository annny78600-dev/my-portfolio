import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Navbar from '../navbar';
import ParallaxHero from '../ParallaxHero';
import GradientASCII from '../GradientASCII';

const Banner = () => {
    const contentRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const copyRef = useRef(null);
    const actionsRef = useRef(null);

    useGSAP(() => {
        if (document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

            intro
                .from(eyebrowRef.current, { y: 24, autoAlpha: 0, duration: 0.65 })
                .from(titleRef.current, { yPercent: 110, autoAlpha: 0, duration: 1.05 }, '-=0.25')
                .from(copyRef.current, { y: 28, autoAlpha: 0, duration: 0.7 }, '-=0.45')
                .from(actionsRef.current, { y: 22, autoAlpha: 0, duration: 0.6 }, '-=0.35');

    }, { scope: contentRef });

    return (
        <ParallaxHero className="bg-[#10110f] text-white">
            <Navbar />

            <div className="pointer-events-none absolute inset-0 z-0">
                <GradientASCII
                    colors={["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"]}
                    shape="horizon"
                    characters=" =+xX0S8#@"
                    cellSize={18}
                    density={0.8}
                    glyphOpacity={0.85}
                    glow={0.2}
                    depthOfField={0}
                    flicker={0.2}
                    softness={0.5}
                    scale={1}
                    flow={0.5}
                    speed={1}
                    gradientOpacity={0.9}
                    grain={0.08}
                    variation={0}
                    mouseInteraction
                    scrambleRadius={0.1}
                    clickEffect="wave"
                    intro
                    lightMode={false}
                    className="opacity-80"
                />
            </div>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#10110f]/80 via-[#10110f]/55 to-[#10110f]/35" />
            <div className="absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-[#10110f] to-transparent" />

            <div ref={contentRef} className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24">
                <div ref={eyebrowRef} className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f3a06f]">
                    <span className="h-px w-10 bg-[#f3a06f]" />
                    React / Next.js Developer
                </div>
                <h1 ref={titleRef} className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[5.8rem] xl:text-[6.5rem]">
                    I build thoughtful React and Next.js products.
                </h1>
                <p ref={copyRef} className="mt-8 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                    3+ years building responsive applications, dashboards, and SaaS platforms. I bring strong frontend experience and growing end-to-end Next.js work across APIs, data models, CRM workflows, and integrations.
                </p>
                <div ref={actionsRef} className="mt-10 flex flex-wrap gap-4">
                    <a href="#projects" className="inline-flex items-center gap-3 bg-[#f3a06f] px-5 py-3 text-sm font-semibold text-[#10110f] transition-transform hover:-translate-y-1">
                        Explore selected work <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                    <a href="#contact" className="inline-flex items-center gap-3 border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">
                        Start a conversation <ArrowDownRight size={17} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </ParallaxHero>
    );
};

export default Banner;
