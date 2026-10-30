import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';
import Header from './components/layout/Header';
import LineSidebar from './components/layout/LineSidebar';
import Footer from './components/layout/Footer';
import BackToTop from './components/layout/BackToTop';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import FeaturedWork from './components/sections/FeaturedWork';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import ProjectsPage from './pages/ProjectsPage';
import { ProjectDialogProvider } from './components/showcase/ProjectDialog';
import { sections } from './data/profile';
import useActiveSection from './hooks/useActiveSection';
import useTabChange from './hooks/useTabChange';

const sectionIds = sections.map((section) => section.id);

function HomePage() {
  const active = useActiveSection(sectionIds);

  return (
    <>
      <Header sections={sections} active={active} />
      <LineSidebar sections={sections} active={active} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <FeaturedWork />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

function SmoothScroll({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <ReactLenis root options={{ duration: 1.1, smoothWheel: true, anchors: { offset: -72 } }}>
      {children}
    </ReactLenis>
  );
}

function App() {
  useTabChange();

  return (
    <SmoothScroll>
      <a href="#main" className="skip-link">Skip to content</a>
      <ProjectDialogProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ProjectDialogProvider>
    </SmoothScroll>
  );
}

export default App;
