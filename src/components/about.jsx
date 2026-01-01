import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
  <section id="about" className="py-16 px-4 text-center text-white">
    <motion.h2
      className="text-4xl font-bold mb-4"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      About Me
    </motion.h2>
    <motion.p
      className="text-lg max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      I'm a passionate frontend developer focused on crafting clean, user-friendly experiences using React, Next.js, and beautiful UI/UX principles.
    </motion.p>
  </section>
);

export default About;
