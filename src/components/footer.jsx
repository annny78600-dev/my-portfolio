import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center bg-white/30 dark:bg-black/60 backdrop-blur-md z-20 transition-all duration-300">
      <p className="text-sm text-gray-700 dark:text-gray-400">
        © {new Date().getFullYear()} Anila Iqbal — Frontend Developer.

      </p>
    </footer>
  );
};

export default Footer;
