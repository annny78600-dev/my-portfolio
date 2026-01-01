import React from "react";
import { motion } from "framer-motion";
import {
  Code2, Layout, Braces, FileCode, FileText, Layers, ServerCog,
  Paintbrush2, Component, CloudLightning, Cpu, GitBranch
} from "lucide-react";

const skills = [
  { name: "ReactJS", percent: 90, icon: <Layout /> },
  { name: "NextJS", percent: 80, icon: <Layers /> },
  { name: "JavaScript", percent: 85, icon: <FileCode /> },
  { name: "TypeScript", percent: 80, icon: <Braces /> },
  { name: "HTML", percent: 95, icon: <FileText /> },
  { name: "CSS", percent: 90, icon: <Paintbrush2 /> },
  { name: "Tailwind CSS", percent: 90, icon: <Component /> },
  { name: "Material UI", percent: 85, icon: <Layout /> },
  { name: "Ant Design", percent: 80, icon: <Component /> },
  { name: "Bootstrap", percent: 85, icon: <Layers /> },
  { name: "Firebase", percent: 75, icon: <CloudLightning /> },
];


const softSkills = [
  "Problem Solving",
  "Testing & Debugging",
];

const SkillCircle = ({ name, percent, icon }) => {
  const radius = 50;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  return (
    <div className="flex flex-col items-center w-28">
      <svg height={radius * 2} width={radius * 2} className="mb-2">
        <circle
          stroke="#d1d5db"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke="purple"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          whileInView={{
            strokeDashoffset: (1 - percent / 100) * circumference,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-sm font-bold fill-black dark:fill-white"
        >
          {percent}%
        </text>
      </svg>
      <div className="text-sm text-black dark:text-white flex items-center gap-1 text-center">
        <span className="text-xl">{icon}</span> {name}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <>
      {/* SVG Divider */}
      <svg
        className="w-full h-[100px] rotate-180 mt-[-5.5%] text-white dark:text-black"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,160L60,144C120,128,240,96,360,101.3C480,107,600,149,720,170.7C840,192,960,192,1080,186.7C1200,181,1320,171,1380,165.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>

      <section
        id="skills"
        className="bg-white dark:bg-black py-10 mb-10 transition-colors duration-300"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          My Skills
        </h2>

        {/* Technical Skills */}
        <div className="flex flex-wrap gap-8 justify-center mb-10">
          {skills.map((skill, index) => (
            <SkillCircle key={index} {...skill} />
          ))}
        </div>

        {/* Soft Skills */}
        <div className="text-center mt-6">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-2 text-capitialize">
            Other Strengths
          </h3>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-700 dark:text-gray-300">
            {softSkills.map((skill, i) => (
              <span
                key={i}
                className="border border-purple-400 px-3 py-1 rounded-full dark:border-purple-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
