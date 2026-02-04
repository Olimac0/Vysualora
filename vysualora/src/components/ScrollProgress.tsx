import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 40,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-500 origin-left z-[9999] shadow-[0_0_20px_rgba(124,58,237,0.5)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;