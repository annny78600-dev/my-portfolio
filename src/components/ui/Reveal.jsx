import { motion, useReducedMotion } from "framer-motion";

// Fades and lifts content into view once. Static when the user prefers reduced motion.
const Reveal = ({ as = "div", children, delay = 0, y = 28, className = "", ...rest }) => {
  const reduce = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
