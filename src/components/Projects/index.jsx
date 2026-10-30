import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AccordionGallery from "./AccordionGallery";

const projects = [
  {
    label: "Pronto Case Cash",
    category: "Legal & medical funding",
    description: "React interface, Joi validation, Laravel API integration, and a 30–40% backend contribution.",
    technologies: "React.js · Material UI · Laravel · MySQL",
    image: "/pronto.png",
    alt: "Pronto Case Cash project website preview",
    link: "https://prontocasecash.com/",
  },
  {
    label: "We Are Appointments",
    category: "B2B appointments",
    description: "Reusable dashboard components, REST API integration, agent and meeting CRUD, and responsive layouts.",
    technologies: "React.js · Tailwind CSS · JavaScript · REST APIs",
    image: "/appointments.png",
    alt: "We Are Appointments dashboard preview",
    link: "https://weareappointments.com/",
  },
  {
    label: "Sofie",
    category: "Mentorship platform",
    description: "Signup, approval, matching, profile, and session workflows for mentors and mentees.",
    technologies: "React.js · Tailwind CSS · REST APIs · Git",
    image: "/sofie.png",
    alt: "Sofie mentorship platform preview",
    link: "https://sofie.devwepro.com/",
  },
  {
    label: "WePro Solutions",
    category: "Corporate website redesign",
    description: "A seven-day redesign using reusable React components and responsive layouts.",
    technologies: "React.js · Tailwind CSS · JavaScript · HTML5",
    image: "/wepro.png",
    alt: "WePro Solutions corporate website preview",
    link: "https://weproinc.devwepro.com/",
  },
  {
    label: "Kwikpic",
    category: "AI-driven photo sharing",
    description: "React and Material UI components, dynamic gallery rendering, and responsive UI improvements.",
    technologies: "React.js · Material UI · JavaScript · REST APIs",
    image: "/kwikpic.png",
    alt: "Kwikpic photo gallery preview",
    link: "https://kwikpic.in/",
  },
  {
    label: "Abatement & Remediation",
    category: "Service quote website",
    description: "Frontend layout, content, and responsive updates based on client requirements and feedback.",
    technologies: "HTML5 · CSS3 · JavaScript · Material UI",
    image: "/abatement.png",
    alt: "Abatement and Remediation service quote website preview",
    link: "https://quote.abatementandremediation.com/",
  },
];

const ProjectGrid = () => {
  const navigate = useNavigate();

  return (
    <section id="projects" className="overflow-hidden bg-[#f2f0e9] px-6 py-24 text-[#171814] transition-colors duration-300 dark:bg-[#191b18] dark:text-[#f4f2e9] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#ce6339]">Selected work</p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">Products are where the layers meet.</h2>
          </div>
          <button type="button" onClick={() => navigate("/projects")} className="inline-flex w-fit shrink-0 items-center gap-2 border-b border-[#ce6339] pb-2 text-sm font-semibold text-[#a84425] transition-colors hover:text-[#ce6339] dark:text-[#f3a06f]">
            Explore all projects <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>

        <AccordionGallery
          items={projects}
          defaultIndex={2}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#f3a06f"
          overlayColor="#171814"
          textColor="#f4f2e9"
          grayscale
          showLabels
          duration={0.6}
          ease="power3.out"
          parallax={0.5}
          tilt={8}
          stagger={0.06}
          height={460}
          gap={10}
          radius={16}
          orientation="horizontal"
        />
        <p className="mt-5 text-xs leading-5 text-[#171814]/55 dark:text-[#f4f2e9]/50">Select a panel to open the project website. Use the detailed project list for contribution notes and technology stacks.</p>
      </div>
    </section>
  );
};

export default ProjectGrid;