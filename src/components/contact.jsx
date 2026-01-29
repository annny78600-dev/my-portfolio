import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formspree.io/f/mgoykkzk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response) {
        toast.success("Message sent successfully", {
          position: "top-right",
          autoClose: 3000,
        });

        setStatus("success");
        e.target.reset();
      } else {
        toast.error("Failed to send message", {
          position: "top-right",
          autoClose: 3000,
        });

        setStatus("error");
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
      });

      setStatus("error");
    }
  };

  return (
    <div id="contact" className="relative">
      {/* Toast Notifications */}
      <ToastContainer
        theme="dark"
        newestOnTop
        closeOnClick
        pauseOnHover
      />

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
            transition={{ duration: 1, delay: 0.2 }}
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
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
              Send a Message
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <motion.input
                type="text"
                name="name"
                placeholder="Name"
                required
                whileFocus={{ scale: 1.01 }}
                className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-purple-500 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <motion.input
                type="email"
                name="email"
                placeholder="Email"
                required
                whileFocus={{ scale: 1.01 }}
                className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-purple-500 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <motion.textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                required
                whileFocus={{ scale: 1.01 }}
                className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-purple-500 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: status === "loading" ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 rounded font-semibold transition duration-300
                disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  border: "1px solid purple",
                  backgroundColor: "rgb(147 51 234)",
                  color: "white",
                }}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;
