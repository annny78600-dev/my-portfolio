import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Pronto Case Cash – Legal & Medical Funding Platform",
    website: "https://prontocasecash.com",
    duration: "Jan 2024 – Present",
    role: "Full Stack Developer (Frontend Focus)",
    image: "/pronto.png",
    description: `Pronto Case Cash is a U.S.-based funding platform that provides pre-settlement advances to personal injury clients, with fully digital case processing and fund disbursement.`,
    contributions: [
      "Developed UI using ReactJS, MUI, and Bootstrap",
      "Form validation with Joi",
      "Integrated frontend with Laravel APIs",
      "Contributed 30–40% to backend with Laravel",
    ],
    techStack: ["ReactJS", "MUI", "Bootstrap", "Joi", "Laravel", "MySQL"],
    highlights: [
      "Fully online and fast funding process",
      "Digital case handling",
      "Cross-functional team collaboration",
    ],
  },
  {
    title: "Wepro Solutions – Corporate Website Redesign",
    website: "https://weproinc.devwepro.com",
    duration: "7 Days",
    role: "Frontend Developer",
    image: "/wepro.png",
    description:
      "Redesigned and rebuilt the Wepro corporate site with ReactJS and Tailwind CSS, focusing on modern UI/UX and performance.",
    contributions: [
      "Built responsive UI with Tailwind CSS",
      "Converted to ReactJS for reusability",
      "Optimized for performance and mobile",
    ],
    techStack: ["ReactJS", "Tailwind CSS", "JavaScript", "HTML5"],
    highlights: [
      "Completed in 7 days",
      "Modern UI with fast loading",
      "Stakeholder collaboration",
    ],
  },
  {
    id: 3,
    title: "We Are Appointments",
    website: "https://weareappointments.com",
    role: "Frontend Developer",
    duration: "April 2025 – June 2025",
    description: `A B2B platform that helps real estate agents get confirmed and exclusive appointments with real customers, instead of random or shared leads.`,
    contributions: [
      "Built reusable UI components for dashboard",
      "API integration using fetch",
      "CRUD for agent records and meetings",
      "Responsive design implementation"
    ],
    techStack: ["ReactJS", "Tailwind CSS", "JavaScript", "HTML5", "REST APIs"],
    image: "/appointments.png",
  },
  {
    id: 4,
    title: "Sofie – Mentorship Platform",
    website: "https://sofie.devwepro.com",
    role: "Frontend Developer",
    duration: "March 2024 - June 2024 ",
    description: `A platform connecting mentors with entrepreneurs using a proprietary matching algorithm. Built to support seamless onboarding and session management.`,
    contributions: [
      "Created sign-up, approval, and matching UI flows",
      "Built CRUD features for profiles and sessions",
      "Integrated APIs using fetch",
      "Designed responsive dashboards for mentors/mentees"
    ],
    techStack: ["ReactJS", "Tailwind CSS", "JavaScript", "RESTful APIs", "Git"],
    image: "/sofie.png",
  },
  {
  title: "ApprovalCube – Multi-Tenant Approval & Workflow Platform",
  website: "https://platform.approvalcube.com/admin/login",
  duration: "Ongoing (Client-Based Work)",
  role: "Frontend Developer",
  image: "/approvalcube.png",
  description: `ApprovalCube is a multi-tenant SaaS platform that allows organizations to manage approval workflows, permissions, and instance-level configurations. A central admin platform controls multiple client-specific instances using a shared codebase with dynamic customization.`,
  contributions: [
    "Worked on the core frontend of the ApprovalCube admin platform",
    "Implemented role-based permissions to control page and tab visibility",
    "Built instance-level configuration handling (branding, colors, logos)",
    "Handled dynamic UI changes based on client-specific requirements",
    "Maintained and customized multiple live client instances using a shared codebase",
  ],
  techStack: ["ReactJS", "JavaScript", "MUI", "REST APIs","SCSS","Bootstrap"],
  highlights: [
    "Multi-tenant architecture with shared frontend codebase",
    "Instance-level theming (logo, primary/secondary colors)",
    "Role & permission-based UI rendering",
    "Scalable SaaS frontend design",
  ],
  instances: [
    {
      name: "New Future Legal Funding",
      url: "https://newfuturelegalfunding.approvalcube.com/login",
    },
    {
      name: "ALF",
      url: "https://alf.approvalcube.com/login",
    },
    {
      name: "PrimeCare",
      url: "https://primecare.approvalcube.com/login",
    },
    {
      name: "Ovecus",
      url: "https://ovecus.approvalcube.com/login",
    },
  ],
  },
  {
  title: "Abatement & Remediation – Service Quote Website",
  website: "https://quote.abatementandremediation.com",
  duration: "Approx. 1 Month (Task-Based)",
  role: "Frontend Developer",
  image: "/abatement.png",
  description: `A service-focused website designed to capture customer leads and quote requests for abatement and remediation services. The platform emphasizes clear service presentation, trust-building content, and conversion-focused UI.`,
  contributions: [
    "Worked on frontend tasks based on client requirements",
    "Implemented UI updates and layout adjustments",
    "Improved responsiveness across desktop and mobile devices",
    "Made content and styling changes as requested by client",
  ],
  techStack: ["HTML5", "CSS3", "JavaScript","MUI"],
  highlights: [
    "Conversion-focused service pages",
    "Responsive lead generation forms",
    "Task-based client collaboration",
  ],
  },
  {
  title: "Kwikpic – AI-Driven Photo Sharing Platform",
  website: "https://kwikpic.in",
  duration: "Feb 2024 – May 2024",
  role: "Frontend Developer",
  image: "/kwikpic.png", 
  description: `Kwikpic is a community-driven AI photo sharing platform that enables users to create private groups for events and share high-quality pictures effortlessly without cluttering their gallery.`,
  contributions: [
    "Designed and developed new UI components using ReactJS and MUI",
    "Improved existing components and fixed UI/UX bugs",
    "Worked on frontend logic for dynamic photo gallery rendering",
    "Collaborated closely with the design team for responsive layouts",
  ],
  techStack: ["ReactJS", "MUI", "JavaScript", "REST APIs"],
  highlights: [
    "AI-enhanced smart photo sharing",
    "Responsive and user-friendly design",
    "Seamless mobile and desktop experience",
  ],
},
{
  title: "ClearRx – e-Prescription Platform for Doctors",
  website: "https://www.clearrx.in",
  duration: "june 2024 – August 2024",
  role: "Frontend Developer",
  image: "/clearrx.png",
  description: `ClearRx is a medical platform that enables doctors to generate and send e-prescriptions directly to patients via WhatsApp, streamlining the prescription process with speed and efficiency.`,
  contributions: [
    "Built and styled user interfaces using ReactJS and MUI",
    "Implemented forms for prescription creation and patient data input",
    "Integrated frontend with backend APIs to enable real-time WhatsApp sharing",
    "Ensured responsive UI across multiple devices",
  ],
  techStack: ["ReactJS", "MUI", "JavaScript", "REST APIs"],
  highlights: [
    "Fast and efficient e-prescription generation",
    "Direct prescription delivery via WhatsApp",
    "Improved doctor-patient communication flow",
  ],
}


];

export default function ProjectDetails() {
  return (
    <div className="grid md:grid-cols-2 gap-8 p-6 bg-white dark:bg-black transition-colors duration-300">
      {projects.map((p, i) => (
        <ProjectCard key={i} project={p} />
      ))}
    </div>
  );
}
