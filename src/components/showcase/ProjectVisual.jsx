import { useState } from "react";

const monogram = (name) =>
  name
    .split(/[\s&—-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

// Designed stand-in for projects without a public screenshot: an abstract product UI
// tinted with the project's hue, so cards never show a broken or unrelated image.
const Fallback = ({ project, compact }) => {
  const hue = project.hue ?? 265;
  const isDashboard = project.categories?.includes("dashboard");
  const isWebsite = project.categories?.includes("website");
  const tone = (l, a = 1) => `hsl(${hue} 70% ${l}% / ${a})`;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${tone(42, 0.55)}, transparent 55%), radial-gradient(90% 80% at 0% 100%, ${tone(30, 0.45)}, transparent 60%), #0a0812`,
      }}
      aria-hidden="true"
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div
        className={`absolute rounded-xl border border-white/10 bg-[#0d0b16]/85 shadow-2xl backdrop-blur-sm ${compact ? "inset-x-[10%] top-[16%] bottom-[-8%]" : "inset-x-[8%] top-[14%] bottom-[-6%]"}`}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-3 h-2 w-1/3 rounded-full bg-white/10" />
        </div>
        {isWebsite ? (
          <div className="flex h-full flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <span className="h-2 w-12 rounded-full" style={{ background: tone(72, 0.85) }} />
              <span className="flex gap-2">
                {[0, 1, 2].map((index) => <span key={index} className="h-1.5 w-6 rounded-full bg-white/15" />)}
              </span>
            </div>
            <div className="mt-2 space-y-2">
              <span className="block h-3.5 w-3/4 rounded-full bg-white/80" />
              <span className="block h-3.5 w-1/2 rounded-full" style={{ background: tone(70, 0.9) }} />
              <span className="block h-1.5 w-2/3 rounded-full bg-white/15" />
            </div>
            <span className="h-4 w-20 rounded-full" style={{ background: tone(62, 0.9) }} />
            <div className="mt-auto grid grid-cols-3 gap-2 pb-6">
              {[0, 1, 2].map((index) => (
                <div key={index} className="aspect-[4/3] rounded-md border border-white/10" style={{ background: `linear-gradient(160deg, ${tone(40 + index * 8, 0.35)}, transparent)` }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full gap-3 p-3">
            {isDashboard && (
              <div className="hidden w-[22%] flex-col gap-2 sm:flex">
                {[70, 55, 80, 45, 60].map((width, index) => (
                  <span key={index} className="h-2 rounded-full" style={{ width: `${width}%`, background: index === 1 ? tone(70, 0.8) : "rgba(255,255,255,0.12)" }} />
                ))}
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="rounded-md border border-white/10 bg-white/[0.04] p-2">
                    <span className="block h-1.5 w-1/2 rounded-full bg-white/15" />
                    <span className="mt-2 block h-3 w-3/4 rounded-full" style={{ background: tone(68 - index * 8, 0.75) }} />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 items-end gap-1.5 rounded-md border border-white/10 bg-white/[0.03] p-3">
                {[40, 62, 48, 75, 58, 86, 66, 92, 70].map((height, index) => (
                  <span key={index} className="flex-1 rounded-t-sm" style={{ height: `${height * 0.55}%`, background: `linear-gradient(to top, ${tone(45, 0.35)}, ${tone(72, 0.85)})` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <span
        className="absolute left-4 top-3 font-mono text-[0.65rem] tracking-[0.2em] text-white/50"
      >
        {monogram(project.shortTitle ?? project.title)}
      </span>
    </div>
  );
};

const ProjectVisual = ({ project, className = "", compact = false, eager = false }) => {
  const [failed, setFailed] = useState(false);
  const showImage = project.image && !failed;

  return (
    <div className={`relative overflow-hidden bg-[#0a0812] ${className}`}>
      {showImage ? (
        <img
          src={project.image}
          alt={`${project.shortTitle} website preview`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <Fallback project={project} compact={compact} />
      )}
    </div>
  );
};

export default ProjectVisual;
