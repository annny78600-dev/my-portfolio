import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: "March 2026 – Present",
    title: "Software Developer",
    company: "Base2Brand Infotech",
    location: "Mohali, Punjab",
    desc: "Frontend development and end-to-end project work across Next.js APIs, Prisma data models, webhooks, CRM workflows, and deployment.",
    projects: [
      {
        title: "B2B Campus Exam Portal & Integrated Lead CRM",
        role: "End-to-End Developer",
        technologies: "Next.js, TypeScript, Prisma ORM, API Routes, Webhooks",
        details: [
          "Developed and maintained modules for students, courses, teachers, assignments, notes, examinations, placements, staff management, and communication workflows.",
          "Worked on Prisma schemas and relational models, Next.js API routes, frontend features, and deployment.",
          "Implemented branch-level data visibility and role-based access control.",
          "Built CRM workflows for lead assignment, follow-ups, and lead status tracking.",
          "Integrated campaign data and Callyzer call-tracking events using webhooks.",
          "Integrated OmniDimension AI calling workflows to re-engage older leads and connect interested leads with assigned counsellors.",
        ],
      },
      {
        title: "JDP Admin Portal",
        role: "Primarily Frontend Developer",
        technologies: "Next.js, React, TypeScript, Redux Toolkit, Supabase, Firebase",
        details: [
          "Built frontend modules for jobs, workforce management, timesheets, supplier orders, invoicing, analytics, and approval workflows.",
          "Implemented PDF invoices, Supabase Realtime notifications, Firebase Cloud Messaging, Google Maps GPS tracking features, and role-based UI access.",
        ],
      },
      {
        title: "ProRev — Vehicle Repair Management Platform",
        role: "Frontend Developer with Next.js BFF/API Work",
        technologies: "Next.js, React, TypeScript, Material UI, REST APIs",
        details: [
          "Built a multi-role SaaS dashboard for jobs, vehicles, technicians, insurance pricing, and technician pay.",
          "Implemented PDF invoices, CSV import/export, and browser-based VIN barcode scanning using Dynamsoft WebAssembly and ZXing.",
          "Built Next.js API routes as a Backend-for-Frontend layer over a separate REST API backend.",
        ],
      },
    ],
  },
  {
    year: "January 2024 – December 2025",
    title: "React JS Developer",
    company: "WePro Solution",
    location: "Mohali, Punjab",
    desc: [
      "Developed React applications using TypeScript, Redux, and REST APIs.",
      "Implemented authentication and role-based UI logic integrated with Laravel APIs.",
      "Worked on frontend performance optimization using memoization, lazy loading, and code splitting.",
    ],
  },
  {
    year: "November 2022 – November 2023",
    title: "Associate Frontend Engineer",
    company: "Zestgeek Solutions",
    location: "Mohali, Punjab",
    desc: [
      "Built reusable React.js and Next.js components.",
      "Used TypeScript, reusable hooks, and modular architecture.",
      "Collaborated with designers and backend engineers in Agile workflows.",
    ],
  },
  {
    year: "July 2022 – October 2022",
    title: "Frontend Trainee",
    company: "Zenid Infotech",
    location: "Mohali, Punjab",
    desc: [
      "Developed interactive UI features using HTML, CSS, and React.",
      "Assisted with debugging and fixing frontend issues.",
    ],
  },
];

const education = [
  { year: "2019 – 2022", degree: "Bachelor of Computer Applications (BCA)", institution: "Guru Nanak Dev University, India" },
  { year: "2018 - 2019", degree: "+2", institution: "KMRD Jain College, Malerkotla" },
];

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const visualRef = useRef(null);
  const itemRefs = useRef([]);
  const educationRefs = useRef([]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.from([...itemRefs.current, ...educationRefs.current], {
      y: 100,
      autoAlpha: 0,
      stagger: 0.14,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
    });

    gsap.fromTo(visualRef.current, { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" }, {
      autoAlpha: 1,
      clipPath: "inset(0 0 0% 0)",
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: { trigger: visualRef.current, start: "top 82%", once: true },
    });

    gsap.to(imageRef.current, {
      yPercent: 14,
      scale: 1.12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="experience" className="stacked-section min-h-screen bg-[#f2f0e9] px-6 py-24 text-[#171814] transition-colors duration-300 dark:bg-[#191b18] dark:text-[#f4f2e9] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#ce6339]">Experience</p>
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">A practice built across products, teams, and systems.</h2>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_0.85fr] lg:gap-20">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#ce6339]">Experience</p>
            <div className="border-t border-black/15 dark:border-white/15">
              {experiences.map((exp, index) => (
                <article ref={(element) => { itemRefs.current[index] = element; }} key={exp.title} className="grid gap-5 border-b border-black/15 py-7 dark:border-white/15 sm:grid-cols-[0.65fr_1fr] sm:gap-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ce6339]">{exp.year}</p>
                  <div>
                    <h3 className="text-xl font-semibold leading-tight">{exp.title}</h3>
                    <p className="mt-2 text-sm text-black/55 dark:text-white/55">{exp.company} / {exp.location}</p>
                    {Array.isArray(exp.desc) ? <ul className="mt-4 space-y-2 text-sm leading-6 text-black/65 dark:text-white/65">{exp.desc.map((item) => <li key={item} className="flex gap-2"><span className="text-[#ce6339]" aria-hidden="true">›</span><span>{item}</span></li>)}</ul> : <p className="mt-4 max-w-xl text-sm leading-6 text-black/65 dark:text-white/65">{exp.desc}</p>}
                    {exp.projects?.map((project) => (
                      <div key={project.title} className="mt-7 border-l-2 border-[#ce6339]/50 pl-4 sm:pl-5">
                        <h4 className="text-base font-semibold leading-snug">{project.title}</h4>
                        <p className="mt-2 text-xs font-medium text-[#a84425] dark:text-[#f3a06f]">{project.role}</p>
                        <p className="mt-1 text-xs leading-5 text-black/50 dark:text-white/50">{project.technologies}</p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-black/65 dark:text-white/65">{project.details.map((item) => <li key={item} className="flex gap-2"><span className="text-[#ce6339]" aria-hidden="true">›</span><span>{item}</span></li>)}</ul>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
          <div ref={visualRef} className="group relative mb-14 h-64 overflow-hidden border border-black/15 bg-[#171814] dark:border-white/15 sm:h-80">
            <img ref={imageRef} src="/lapatop_timeline.avif" alt="Laptop showing a product workflow" className="h-[125%] w-full object-cover grayscale transition duration-700 group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171814]/80 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3a06f]">Built through iteration</p>
          </div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#ce6339]">Education</p>
          <div className="border-t border-black/15 dark:border-white/15">
            {education.map((edu, index) => <article ref={(element) => { educationRefs.current[index] = element; }} key={edu.degree} className="border-b border-black/15 py-7 dark:border-white/15"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/45">{edu.year}</p><h3 className="mt-3 text-xl font-semibold leading-tight">{edu.degree}</h3><p className="mt-2 text-sm text-black/55 dark:text-white/55">{edu.institution}</p></article>)}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
