import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    year: "Jan 2024 - Present",
    title: "React JS Developer",
    company: "WePro Solution",
    location: "Mohali, Punjab",
    desc: "Building modern web apps with ReactJS, TypeScript, Redux, Tailwind, Bootstrap, and MUI. Collaborate with backend teams to deliver features on time."
  },
  {
    year: "Nov 2022 - Nov 2023",
    title: "Associate Frontend Engineer",
    company: "Zestgeek Solutions",
    location: "Mohali, Punjab",
    desc: "Created dynamic user interfaces with ReactJS, NextJS, and TypeScript. Focused on responsive and performant frontend solutions."
  },
  {
    year: "July 2022 - Oct 2022",
    title: "Frontend Trainee",
    company: "Zenid Infotech",
    location: "Mohali, Punjab",
    desc: "Enhanced skills in HTML, CSS, ReactJS while working on dynamic frontend features."
  }
];

const education = [
  {
    year: "2019 - 2022",
    degree: "Bachelor of Computer Applications",
    institution: "Guru Nanak Dev University"
  },
  {
    year: "2018 - 2019",
    degree: "+2",
    institution: "KMRD Jain College, Malerkotla"
  }
];

const TimelineSection = () => {
  return (
    <div id="experience" className="bg-white text-black dark:bg-black dark:text-white py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        
        {/* Experience */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <p className="text-purple-600 dark:text-purple-400 font-semibold">{exp.year}</p>
                <p className="font-bold">{exp.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.company} — {exp.location}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <p className="text-purple-600 dark:text-purple-400 font-semibold">{edu.year}</p>
                <p className="font-bold">{edu.degree}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image + Note */}
        <motion.div
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full h-56 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
            <img
              className="rounded-xl h-full object-cover w-full"
              src="./lapatop_timeline.avif"
              alt="Timeline Visual"
            />
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
            Transforming ideas into interactive and engaging web solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineSection;
