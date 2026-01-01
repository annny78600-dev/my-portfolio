// components/BackToTop.jsx
import React, { useEffect, useState } from 'react';
import { ArrowUpCircle } from 'lucide-react';
import { useTheme } from '../context/themeContext';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  

  useEffect(() => {
    const banner = document.getElementById('home');
    const bannerHeight = banner?.offsetHeight || 400;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > bannerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <button
        title='Back To Top'
        style={{
            background: "none",
            border: "none",
            outline: "none",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            padding: '5px 11px',
            color:theme === "dark" ? "white" : "purple"
          }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
           >
            <ArrowUpCircle size={28} />
      </button>
    )
  );
};

export default BackToTop;
