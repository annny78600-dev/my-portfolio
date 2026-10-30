import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, X } from "lucide-react";
import { getProject } from "../../data/projects";
import ProjectVisual from "./ProjectVisual";

const ProjectDialogContext = createContext({ openProject: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const useProjectDialog = () => useContext(ProjectDialogContext);

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const List = ({ title, items }) => (
  <div>
    <h3 className="eyebrow mb-4">{title}</h3>
    <ul className="space-y-3 text-[0.95rem] leading-7 text-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Dialog = ({ project, onClose }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)];
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <Motion.div
      className="fixed inset-0 z-[1200] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <Motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        data-lenis-prevent
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-elevated text-fg shadow-soft sm:rounded-3xl"
        initial={reduce ? false : { y: 48, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 32, opacity: 0, scale: 0.98 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
          aria-label="Close project details"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <ProjectVisual project={project} className="aspect-[16/9] w-full sm:aspect-[16/7]" eager />

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">{project.scope}</span>
            <span className="rounded-full border border-line px-3 py-1 text-muted">{project.role}</span>
            <span className="rounded-full border border-line px-3 py-1 text-muted">{project.period}</span>
          </div>
          <h2 id="project-dialog-title" className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
            {project.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">{project.description}</p>

          {(project.website || project.instances) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
                >
                  Visit website <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {project.instances?.map((instance) => (
                <a
                  key={instance.url}
                  href={instance.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                >
                  {instance.name} <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only">(client instance, opens in a new tab)</span>
                </a>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-10 md:grid-cols-[1.25fr_0.75fr]">
            <List title="My contributions" items={project.contributions} />
            <div className="space-y-10">
              {project.architecture && <List title="Architecture" items={project.architecture} />}
              {project.highlights && <List title="Highlights" items={project.highlights} />}
              <div>
                <h3 className="eyebrow mb-4">Tech stack</h3>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
};

export const ProjectDialogProvider = ({ children }) => {
  const [activeId, setActiveId] = useState(null);
  const returnFocusRef = useRef(null);
  const lenis = useLenis();
  const project = activeId ? getProject(activeId) : null;

  const openProject = useCallback((id) => {
    returnFocusRef.current = document.activeElement;
    setActiveId(id);
  }, []);

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!project) return undefined;
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = previous;
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [project, lenis]);

  const value = useMemo(() => ({ openProject }), [openProject]);

  return (
    <ProjectDialogContext.Provider value={value}>
      {children}
      <AnimatePresence>{project && <Dialog key={project.id} project={project} onClose={close} />}</AnimatePresence>
    </ProjectDialogContext.Provider>
  );
};
