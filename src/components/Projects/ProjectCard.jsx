import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({ project }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className="bg-white dark:bg-[#191b18]
                 text-black dark:text-white 
                 rounded-2xl overflow-hidden 
                 shadow-lg 
                 border border-gray-200 dark:border-white/15 
                 transition-colors duration-300"
    >
      <div className="relative h-52 overflow-hidden bg-[#191b18] sm:h-60">
        {project.image && !imageFailed ? (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-end bg-[linear-gradient(135deg,#191b18_5%,#352753_100%)] p-6">
            <span className="max-w-[14ch] text-3xl font-semibold leading-tight text-white/85">{project.title}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h2 className="text-2xl font-bold">{project.title}</h2>
        <p className="text-sm font-medium text-[#ce6339] dark:text-[#f3a06f]">
          {project.duration ? `${project.duration} · ` : ""}{project.role}
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {project.description}
        </p>

        {/* Contributions */}
        {project.contributions && (
          <>
            <h3 className="mt-4 font-semibold text-[#ce6339] dark:text-[#f3a06f]">My Contributions:</h3>
            <ul className="list-none space-y-2 text-sm">
              {project.contributions.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#ce6339] dark:text-[#f3a06f] mt-1">&#9656;</span>
                  <span className="text-gray-800 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Tech Stack */}
        <div className="mt-4">
          <h4 className="text-[#ce6339] dark:text-[#f3a06f] font-semibold">Tech Stack:</h4>
          <ul className="flex flex-wrap gap-2 text-sm">
            {project.techStack.map((tech, i) => (
              <li key={i} className="rounded border border-black/10 px-2.5 py-1 text-gray-800 dark:border-white/15 dark:text-gray-300">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Highlights */}
        {project.highlights && (
          <div className="mt-4">
            <h4 className="text-[#ce6339] dark:text-[#f3a06f] font-semibold">Highlights:</h4>
            <ul className="list-none space-y-2 text-sm">
              {project.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#ce6339] dark:text-[#f3a06f] mt-1">&#9656;</span>
                  <span className="text-gray-800 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instances (for Multi-Tenant Platforms) */}
        {project?.instances && project?.instances?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-[#ce6339] dark:text-[#f3a06f] font-semibold">
              Live Instances:
            </h4>

            <div className="flex flex-wrap gap-2 mt-2">
              {project.instances.map((instance, i) => (
                <a
                  key={i}
                  href={instance.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm rounded-full
                            bg-[#f7ded2] text-[#a84425]
                              dark:bg-[#3b241b] dark:text-[#f3a06f]
                              hover:bg-[#f0c5b3] dark:hover:bg-[#533022]
                            transition-colors duration-200"
                >
                  {instance.name}
                </a>
              ))}
            </div>
          </div>
        )}


        {/* Website link */}
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[#a84425] dark:text-[#f3a06f] hover:underline text-sm"
          >
            <span className="inline-flex items-center gap-2">Visit Website <ArrowUpRight size={15} aria-hidden="true" /></span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
