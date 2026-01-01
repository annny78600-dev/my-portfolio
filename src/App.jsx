import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import ContactForm from './components/contact';
import Skills from './components/myskills';
import TimelineSection from './components/timelinesection';
import ProjectPage from './components/Projects/ProjectCard';
import ProjectGrid from './components/Projects';
import Footer from './components/footer';
import AnimatedCursor from "react-animated-cursor";
import ProjectDetails from './components/Projects/ProjectDetails';
import ThemeToggle from './components/ThemeToggle';
import { useState } from 'react';
import { ThemeProvider, useTheme } from './context/themeContext';
import BackToTop from './components/backtoTop';



function App() {
   const { theme } = useTheme();
  return (
    <>
        <AnimatedCursor
          innerSize={11}
          outerSize={34}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={false}
          outerStyle={{

            backgroundColor: theme === "dark" ? 'rgba(255, 255, 255, 0.15)':"#9333ea2e",
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            borderRadius: '50%',
          }}
          innerStyle={{
            backgroundColor: theme ==="dark" ? '#fff':"purple",
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
                  <HomePage theme={theme} />
                  <Skills />
                  <ProjectGrid />
                  <TimelineSection />
                  <ContactForm />
                   <BackToTop/>
                  <Footer />
                </>
              }
            />
            <Route path="/projects" element={<ProjectDetails />} />
          </Routes>
        </Router>

    </>

  );
}

export default App;
