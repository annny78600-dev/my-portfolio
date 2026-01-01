import React, { useState } from 'react';
import { Drawer, IconButton, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { motion } from 'framer-motion';
import { useTheme } from '../context/themeContext';

const navItems = ['Home', 'Skills', 'Experience', 'Projects', 'Contact'];

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  return (
    <header className="w-full z-[999] py-3 px-4 sm:px-6 md:px-8 fixed top-0 bg-white dark:bg-black/80 shadow-md dark:shadow-none backdrop-blur-md transition-all duration-300">
      <div className="flex justify-between items-center w-full">

        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="/anila-logo-light.png"
            alt="Logo Light"
            className="h-[55px] block dark:hidden"
          />
          <img
            src="/anila-logo-1.png"
            alt="Logo Dark"
            className="h-[55px] hidden dark:block"
          />
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
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-500"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
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
              <MenuIcon />
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
          className: 'bg-white dark:bg-black text-black dark:text-white w-3/4 sm:w-1/2 transition-all duration-300',
        }}
      >
        <div className="flex justify-end p-4">
          <IconButton onClick={toggleDrawer(false)} className="text-black dark:text-white">
            <CloseIcon />
          </IconButton>
        </div>

        {/* 📌 This is your mobile nav */}
        <div className="flex flex-col gap-6 p-6">
          {navItems.map((item) => (
            <div
              key={item}
              className={`text-lg font-medium cursor-pointer ${active === item ? 'text-blue-500' : ''}`}
              onClick={() => {
                setActive(item);
                setIsDrawerOpen(false); 
                const section = document.getElementById(item.toLowerCase());
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item}
              {active === item && (
                <motion.div
                  layoutId="underline"
                  className="h-[2px] w-full bg-blue-500 mt-1"
                />
              )}
            </div>
          ))}
        </div>
      </Drawer>

    </header>
  );
};

export default Navbar;
