import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProjectCard } from '../components/sections/Projects';
import Footer from '../components/layout/Footer';
import { projects } from '../data/projects';

// Standalone archive at /projects (kept so existing links to this URL continue to work).
const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main id="main" className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 sm:px-8 lg:px-24">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
          <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
        </Link>
        <p className="eyebrow mt-14">Project archive</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-fg sm:text-7xl">All projects</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          {projects.length} projects by Anila Iqbal, from end-to-end Next.js platforms to frontend-focused React applications and websites.
        </p>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </main>
      <Footer linkPrefix="/" />
    </>
  );
};

export default ProjectsPage;
