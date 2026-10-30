import { useState } from "react";
import { AnimatePresence, motion as Motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (value) => setVisible(value > window.innerHeight));

  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <Motion.button
          type="button"
          onClick={toTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-5 right-5 z-[900] inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-elevated/80 text-fg shadow-soft backdrop-blur-md transition-colors hover:text-accent sm:bottom-8 sm:right-8"
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <Motion.circle cx="24" cy="24" r="22" fill="none" stroke="var(--accent)" strokeWidth="1.5" style={{ pathLength: scrollYProgress }} />
          </svg>
          <ArrowUp size={18} aria-hidden="true" />
        </Motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
