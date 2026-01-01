import React from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  return (
    <div id="contact" className="relative">
      <div className="min-h-screen flex items-center justify-center px-4 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Left Side */}
          <motion.div
            className="space-y-6 text-center md:text-left"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <h2 className="text-purple-500 font-semibold text-lg">CONTACT</h2>
            <h1 className="text-4xl font-bold">Get In Touch</h1>
            <div>
              <h3 className="font-semibold text-lg">Contact Information</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Phase 5, Sector 59, Mohali, India
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Email:{" "}
                <a
                  href="mailto:anilaiqbal2121@gmail.com"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  anilaiqbal2121@gmail.com
                </a>
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/anila-iqbal-570814247"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  anila-iqbal-570814247
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="bg-white dark:bg-black border border-gray-300 dark:border-purple-500 p-6 rounded-lg shadow-lg"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center md:text-left">Send a Message</h3>
            <form
              className="space-y-4"
              action="https://formspree.io/f/your-form-id"
              method="POST"
            >
              <motion.input
                type="text"
                name="name"
                placeholder="Name"
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-purple-500 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <motion.input
                type="email"
                name="email"
                placeholder="Email"
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-purple-500 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <motion.textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-purple-500 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></motion.textarea>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  border: "1px solid purple",
                  backgroundColor: "rgb(147 51 234)",
                  color: "white"
                }}
                className="w-full py-2 rounded font-semibold transition duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;
