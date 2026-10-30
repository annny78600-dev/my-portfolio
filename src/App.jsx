import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef } from 'react';
import HomePage from './components/homepage';
import About from './components/about';
import ContactForm from './components/contact';
import Skills from './components/myskills';
import Automation from './components/automation';
import TimelineSection from './components/timelinesection';
import ProjectGrid from './components/Projects';
import Footer from './components/footer';
import AnimatedCursor from "react-animated-cursor";
import ProjectDetails from './components/Projects/ProjectDetails';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { useTheme } from './context/themeContext';
import BackToTop from './components/backtoTop';
import useTabChange from './hooks/useTabChange';

gsap.registerPlugin(ScrollTrigger);

function LenisScrollSync() {
  const lenis = useLenis();

  useGSAP(() => {
    if (!lenis) return undefined;

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time) => lenis.raf(time * 1000);

    lenis.on('scroll', updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
    };
  }, [lenis]);

  return null;
}

function StackedSections({ children }) {
  const stackRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const media = gsap.matchMedia();

    media.add('(min-width: 768px)', () => {
      const sections = gsap.utils.toArray('.stacked-section', stackRef.current);

      sections.forEach((section, index) => {
        if (index === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });
    });

    return () => media.revert();
  }, { scope: stackRef });

  return <div ref={stackRef}>{children}</div>;
}


function App() {
   const { theme } = useTheme();
    useTabChange();
  return (
    <ReactLenis root autoRaf={false} options={{ duration: 1.15, smoothWheel: true, syncTouch: false, anchors: true }}>
      <LenisScrollSync />
        <AnimatedCursor
          innerSize={11}
          outerSize={34}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={false}
          outerStyle={{

            backgroundColor: theme === "dark" ? 'rgba(243, 160, 111, 0.18)':"rgba(206, 99, 57, 0.18)",
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            borderRadius: '50%',
          }}
          innerStyle={{
            backgroundColor: theme ==="dark" ? '#f3a06f':"#ce6339",
          }}
          clickables={[
            'a',
            'button',
            '.link',
            'input[type="submit"]',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="button"]',
            'input[type="reset"]',
            'input[type="checkbox"]',
            'input[type="radio"]',
            'label',
            'select',
            'textarea',
          ]}
        />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <StackedSections>
                    <HomePage theme={theme} />
                    <About />
                    <Skills />
                    <ProjectGrid />
                    <Automation />
                  </StackedSections>
                  <TimelineSection />
                  <ContactForm />
                  <BackToTop />
                  <Footer />
                </>
              }
            />
            <Route path="/projects" element={<ProjectDetails />} />
          </Routes>
        </Router>

    </ReactLenis>

  );
}

export default App;
