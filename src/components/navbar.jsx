import React, { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Drawer, IconButton, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../context/themeContext';

const navItems = ['Home', 'Skills', 'Projects', 'Automation', 'Experience', 'Contact'];

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  return (
    <motion.header
      animate={{
        y: hidden && !isDrawerOpen ? -140 : 0,
        opacity: hidden && !isDrawerOpen ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-[99%] lg:w-full z-[999] py-3 px-4 sm:px-6 md:px-8 fixed top-0 bg-[#f2f0e9]/90 dark:bg-[#191b18]/90 text-[#171814] dark:text-[#f4f2e9] shadow-md dark:shadow-none backdrop-blur-md"
    >
      <div className="flex justify-between items-center w-full">

        {/* Left: Logo */}
        <div className="flex items-center">
          <div className="flex items-center gap-2" aria-label="Anila Iqbal">
            <span className="font-mono text-3xl leading-none text-[#ce6339]" aria-hidden="true">&#123;</span>
            <span className="font-semibold leading-none tracking-[-0.04em]">
              <span className="block text-base">Anila</span>
              <span className="block text-base">Iqbal</span>
            </span>
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm md:text-base font-medium">
          {navItems.map((item) => (
            <div
              key={item}
              className="relative cursor-pointer"
              onClick={() => {
                setActive(item);
                const section = document.getElementById(item.toLowerCase());
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span
                className={
                  active === item
                    ? 'font-bold text-black dark:text-white'
                    : 'text-gray-900 dark:text-gray-300'
                }
              >
                {item}
              </span>
              {active === item && (
                <div className="absolute bottom-1 left-0 h-[2px] w-full bg-[#ce6339]" />
              )}
            </div>
          ))}
        </nav>

        {/* Right: Theme toggle + mobile menu */}
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Theme Toggle */}
          <Tooltip title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                padding: '5px 11px'
              }}
              className="p-2 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? <SunnyIcon /> : <DarkModeIcon />}
            </button>
          </Tooltip>

          {/* Mobile Drawer Icon */}
          <div className="md:hidden">
            <IconButton onClick={toggleDrawer(true)} className="text-black dark:text-white">
              <MenuIcon  className="text-black dark:text-white"/>
            </IconButton>
          </div>
        </div>
      </div>

      {/* Drawer for Mobile Nav */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme === "dark" ? "#000" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          },
          className: 'bg-white dark:bg-black text-black dark:text-white w-3/4 sm:w-1/2 transition-all duration-300',

        }}

      >
        
        <div className="flex justify-end p-4">
          <IconButton onClick={toggleDrawer(false)} className="text-black dark:text-white">
            <CloseIcon className="text-black dark:text-white"/>
          </IconButton>
        </div>

        {/*  mobile nav */}
        <div className="flex flex-col gap-6 p-6">
          {navItems.map((item) => (
            <div
              key={item}
              className={`text-lg font-medium cursor-pointer ${active === item ? 'text-[#ce6339]' : ''}`}
              onClick={() => {
                setActive(item);
                setIsDrawerOpen(false); 
                const section = document.getElementById(item.toLowerCase());
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item}
              {active === item && (
                <div className="mt-1 h-[2px] w-full bg-[#ce6339]" />
              )}
            </div>
          ))}
        </div>
      </Drawer>

    </motion.header>
  );
};

export default Navbar;
