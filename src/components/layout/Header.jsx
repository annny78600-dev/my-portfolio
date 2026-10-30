import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/themeContext";
import { profile } from "../../data/profile";

const Logo = () => (
  <a href="#home" className="group inline-flex items-baseline gap-1 font-display text-lg font-semibold tracking-[-0.03em] text-fg" aria-label="Anila Iqbal, back to top">
    <span className="font-mono text-accent transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true">{"{"}</span>
    Anila Iqbal
    <span className="font-mono text-accent transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">{"}"}</span>
  </a>
);

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
};

const MobileMenu = ({ sections, active, onClose }) => {
  const reduce = useReducedMotion();
  const firstLinkRef = useRef(null);

  useEffect(() => {
    firstLinkRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <Motion.div
      id="mobile-menu"
      className="fixed inset-0 z-[1000] flex flex-col bg-bg/95 px-5 pb-10 pt-24 backdrop-blur-xl sm:px-8 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
    >
      <nav aria-label="Mobile navigation" className="flex-1">
        <ol className="space-y-1">
          {sections.map((section, index) => (
            <Motion.li
              key={section.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.04 * index, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={`#${section.id}`}
                onClick={onClose}
                className={`flex items-baseline gap-4 py-2 font-display text-4xl font-semibold tracking-[-0.03em] transition-colors sm:text-5xl ${active === section.id ? "text-accent" : "text-fg hover:text-accent"}`}
              >
                <span className="font-mono text-xs text-subtle" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {section.label}
              </a>
            </Motion.li>
          ))}
        </ol>
      </nav>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-muted">
        <a href={`mailto:${profile.email}`} className="hover:text-accent">{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
      </div>
    </Motion.div>
  );
};

const Header = ({ sections, active }) => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 240);
    setScrolled(current > 24);
  });

  useEffect(() => {
    if (!menuOpen) return undefined;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  return (
    <>
      <Motion.header
        animate={{ y: hidden && !menuOpen ? -96 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[1100] transition-[background-color,border-color] duration-300 ${scrolled && !menuOpen ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-24">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent hover:text-on-accent sm:inline-flex"
            >
              Let&apos;s talk
            </a>
            <ThemeButton />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </Motion.header>
      <AnimatePresence>
        {menuOpen && <MobileMenu sections={sections} active={active} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
