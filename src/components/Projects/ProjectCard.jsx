import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gradient-to-br dark:from-purple-900 dark:to-black 
                 text-black dark:text-white 
                 rounded-2xl overflow-hidden 
                 shadow-lg 
                 border border-gray-200 dark:border-purple-800 
                 transition-colors duration-300"
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-60 object-cover"
      />

      {/* Content */}
      <div className="p-6 space-y-3">
        <h2 className="text-2xl font-bold">{project.title}</h2>
        <p className="text-sm text-purple-600 dark:text-purple-400">
          {project.duration} | {project.role}
        </p>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {project.description}
        </p>

        {/* Contributions */}
        {project.contributions && (
          <>
            <h3 className="mt-4 font-semibold text-purple-600 dark:text-purple-300">My Contributions:</h3>
            <ul className="list-none space-y-2 text-sm">
              {project.contributions.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-500 dark:text-purple-400 mt-1">➤</span>
                  <span className="text-gray-800 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Tech Stack */}
        <div className="mt-4">
          <h4 className="text-purple-600 dark:text-purple-300 font-semibold">Tech Stack:</h4>
          <ul className="list-none space-y-2 text-sm">
            {project.techStack.map((tech, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-purple-500 dark:text-purple-400 mt-1">➤</span>
                <span className="text-gray-800 dark:text-gray-300">{tech}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Highlights */}
        {project.highlights && (
          <div className="mt-4">
            <h4 className="text-purple-600 dark:text-purple-300 font-semibold">Highlights:</h4>
            <ul className="list-none space-y-2 text-sm">
              {project.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-500 dark:text-purple-400 mt-1">➤</span>
                  <span className="text-gray-800 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instances (for Multi-Tenant Platforms) */}
        {project?.instances && project?.instances?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-purple-600 dark:text-purple-300 font-semibold">
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
                            bg-purple-100 text-purple-700
                            dark:bg-purple-900 dark:text-purple-300
                            hover:bg-purple-200 dark:hover:bg-purple-800
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
            className="mt-4 inline-block text-purple-700 dark:text-purple-400 hover:underline text-sm"
          >
            🔗 Visit Website
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
