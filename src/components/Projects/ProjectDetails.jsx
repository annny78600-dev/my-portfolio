import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "B2B Campus — Exam Portal & Lead CRM",
    role: "Full-Stack Developer",
    description: "An exam portal and CRM platform for managing courses, students, teachers, assignments, examinations, placement activities, staff, and leads.",
    contributions: [
      "Developed and maintained the platform across frontend and backend.",
      "Implemented role-based access and branch-specific data visibility.",
      "Worked with database schemas, queries, and API integrations.",
      "Integrated call-tracking webhooks to display call updates and related lead information.",
      "Integrated automated AI calling workflows using OmniDimension for lead follow-ups.",
    ],
    techStack: ["Next.js", "TypeScript", "Prisma", "REST APIs", "Webhooks", "OmniDimension"],
  },
  {
    title: "JDP Electrical — Admin Portal",
    role: "Frontend Developer",
    description: "An administrative portal for managing jobs, field staff, timesheets, suppliers, orders, invoicing, and approvals.",
    contributions: [
      "Built and maintained frontend features using reusable components.",
      "Developed responsive interfaces for operational workflows.",
      "Worked with state management, notifications, and API integrations.",
      "Contributed to invoice and supplier-related workflows.",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Supabase", "Firebase"],
  },
  {
    title: "ProRev — Vehicle Repair Management Platform",
    role: "Frontend Developer",
    description: "A vehicle repair management platform with interfaces for managing repair-related workflows.",
    contributions: [
      "Developed and maintained frontend components and user interfaces.",
      "Implemented responsive layouts and reusable UI elements.",
      "Integrated APIs and contributed to Next.js BFF/API functionality where applicable.",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Material UI", "REST APIs", "Dynamsoft WebAssembly", "ZXing"],
  },
  {
    title: "Pronto Case Cash — Legal & Medical Funding Platform",
    website: "https://prontocasecash.com/",
    role: "Full Stack Developer (Frontend Focus)",
    image: "/pronto.png",
    description: "A legal and medical funding platform with digital case processing and funding workflows.",
    contributions: [
      "Developed the interface using React.js, Material UI, and Bootstrap",
      "Implemented form validation with Joi",
      "Integrated the frontend with Laravel APIs",
      "Contributed approximately 30–40% to backend development using Laravel and MySQL",
    ],
    techStack: ["React.js", "Material UI", "Bootstrap", "Joi", "Laravel", "MySQL"],
  },
  {
    title: "WePro Solutions — Corporate Website Redesign",
    website: "https://weproinc.devwepro.com/",
    duration: "7 days",
    role: "Frontend Developer",
    image: "/wepro.png",
    description: "A corporate website redesign rebuilt with reusable React components and responsive layouts.",
    contributions: [
      "Rebuilt the website using reusable React components",
      "Developed responsive layouts with Tailwind CSS",
      "Completed the redesign in 7 days",
    ],
    techStack: ["React.js", "Tailwind CSS", "JavaScript", "HTML5"],
  },
  {
    id: 3,
    title: "We Are Appointments",
    website: "https://weareappointments.com/",
    role: "Frontend Developer",
    duration: "April 2025 – June 2025",
    description: "A B2B appointment platform with dashboards for managing agents and meetings.",
    contributions: [
      "Built reusable dashboard components",
      "Integrated REST APIs using fetch",
      "Implemented CRUD functionality for agent records and meetings",
      "Developed responsive layouts",
    ],
    techStack: ["React.js", "Tailwind CSS", "JavaScript", "REST APIs"],
    image: "/appointments.png",
  },
  {
    id: 4,
    title: "Sofie — Mentorship Platform",
    website: "https://sofie.devwepro.com/",
    role: "Frontend Developer",
    duration: "March 2024 – June 2024",
    description: "A mentorship platform with onboarding, approval, matching, profile, and session workflows.",
    contributions: [
      "Developed signup, approval, and matching UI flows",
      "Built CRUD features for profiles and sessions",
      "Integrated APIs using fetch",
      "Created responsive dashboards for mentors and mentees",
    ],
    techStack: ["React.js", "Tailwind CSS", "JavaScript", "REST APIs", "Git"],
    image: "/sofie.png",
  },
  {
    title: "ApprovalCube — Multi-Tenant Approval & Workflow Platform",
    website: "https://platform.approvalcube.com/admin/login",
    role: "Frontend Developer",
    image: "/approvalcube.png",
    description: "A multi-tenant SaaS admin platform with approval workflows and client-specific configuration, maintained through a shared frontend codebase.",
    contributions: [
      "Worked on the core frontend of the admin platform",
      "Implemented role-based permissions for page and tab visibility",
      "Built instance-level branding and configuration, including logos and color themes",
      "Maintained and customized four client instances using a shared frontend codebase",
    ],
    techStack: ["React.js", "JavaScript", "Material UI", "REST APIs", "SCSS", "Bootstrap"],
    instances: [
      { name: "New Future Legal Funding", url: "https://newfuturelegalfunding.approvalcube.com/login" },
      { name: "ALF", url: "https://alf.approvalcube.com/login" },
      { name: "PrimeCare", url: "https://primecare.approvalcube.com/login" },
      { name: "Ovecus", url: "https://ovecus.approvalcube.com/login" },
    ],
  },
  {
    title: "Abatement & Remediation — Service Quote Website",
    website: "https://quote.abatementandremediation.com/",
    role: "Frontend Developer",
    image: "/abatement.png",
    description: "A service quote website updated to meet client requirements across desktop and mobile layouts.",
    contributions: [
      "Implemented frontend tasks and layout updates based on client requirements",
      "Improved responsive behavior across desktop and mobile devices",
      "Updated content and UI based on feedback",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Material UI"],
  },
  {
    title: "Kwikpic — AI-Driven Photo Sharing Platform",
    website: "https://kwikpic.in/",
    duration: "February 2024 – May 2024",
    role: "Frontend Developer",
    image: "/kwikpic.png",
    description: "A photo-sharing platform with dynamic galleries and private event groups.",
    contributions: [
      "Developed React and Material UI components",
      "Improved existing components and fixed UI/UX issues",
      "Worked on dynamic photo gallery rendering",
      "Collaborated with designers on responsive layouts",
    ],
    techStack: ["React.js", "Material UI", "JavaScript", "REST APIs"],
  },
  {
    title: "ClearRx — e-Prescription Platform",
    website: "https://www.clearrx.in/",
    duration: "June 2024 – August 2024",
    role: "Frontend Developer",
    image: "/clearrx.png",
    description: "An e-prescription platform with prescription creation, patient data, and WhatsApp sharing workflows.",
    contributions: [
      "Built UI components and forms for prescriptions and patient data",
      "Integrated frontend APIs for prescription workflows and WhatsApp sharing",
      "Improved responsive behavior across devices",
    ],
    techStack: ["React.js", "Material UI", "JavaScript", "REST APIs"],
  },
];

export default function ProjectDetails() {
  return (
    <div className="grid md:grid-cols-2 gap-8 p-6 bg-white dark:bg-black transition-colors duration-300">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
