import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Pronto Case Cash",
    src: "/pronto.png",
  },
  {
    id: 4,
    title: "Sofie",
    src: "/sofie.png",
  },
  {
    id: 2,
    title: "Wepro Solutions",
    src: "/wepro.png",
  },
  // {
  //   id: 3,
  //   title: "We Are Appointments",
  //   src: "/appointments.png",
  // },
];

const ProjectGrid = () => {
  const navigate = useNavigate();

  return (
    <section id="projects" className="bg-white text-black dark:bg-black dark:text-white min-h-screen p-8 transition-colors duration-300 ">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <p className="uppercase text-purple-600 dark:text-purple-400 tracking-widest">Works & Portfolio</p>
        <h2 className="text-3xl font-bold">My Projects</h2>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {/* Image */}
            <img
              src={project.src}
              alt={project.title}
              className="w-full h-64 object-cover rounded-xl group-hover:[filter:blur(1px)]"
            />

            {/* Title Hover Overlay */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center">
              <div className="transition-all duration-500 ease-in-out transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 w-full">
                <div className="font-semibold uppercase bg-purple-500/40 dark:bg-[#8000803b] text-white text-center py-3 rounded-b-xl">
                  {project.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-12">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/projects")}
          style={{
                  border: '1px solid purple',
                  backgroundColor: 'rgb(147 51 234)',
                  borer:"none",
                  color: 'white'
                }}
          className="py-2 rounded font-semibold transition duration-300"
          // className="bg-purple-700 hover:bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg transition"
        >
          View All Projects
        </motion.button>
      </div>
    </section>
  );
};

export default ProjectGrid;
