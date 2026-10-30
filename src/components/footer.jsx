import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      gsap.from(footerRef.current, {
        yPercent: 35,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 94%', once: true },
      });
    }, footerRef);

    return () => context.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative z-20 w-full border-t border-white/10 bg-[#171814] px-6 py-10 text-center text-[#f4f2e9] sm:px-10">
      <p className="text-sm text-white/55">
        © {new Date().getFullYear()} Anila Iqbal — React / Next.js Developer.
      </p>
    </footer>
  );
};

export default Footer;
