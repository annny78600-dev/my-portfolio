import { motion as Motion, useReducedMotion, useSpring } from "framer-motion";

// Pulls its child gently toward a mouse pointer. Inert for touch/pen and reduced motion.
const Magnetic = ({ children, strength = 0.3, className = "" }) => {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduce) return <span className={`inline-flex ${className}`}>{children}</span>;

  const onPointerMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.span style={{ x, y }} onPointerMove={onPointerMove} onPointerLeave={reset} className={`inline-flex ${className}`}>
      {children}
    </Motion.span>
  );
};

export default Magnetic;
