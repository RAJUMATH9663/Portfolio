import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// AbstractShape removed as requested
const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const yImage = useTransform(scrollY, [0, 1000], [0, 100]);
  const scaleImage = useTransform(scrollY, [0, 500], [1, 1.05]);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 z-0 bg-bg pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
        
        {/* Left: Typography */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="lg:col-span-7 flex flex-col items-start justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p className="font-mono text-detail text-textMuted tracking-[0.2em] mb-6 uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-accent"></span>
              Software & AI Engineer
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-display text-textMain mb-12"
          >
            BUILDING DIGITAL<br />
            EXPERIENCES<br />
            <span className="text-textMuted italic font-light tracking-tighter">THAT MOVE.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a href="#projects" className="btn-primary" data-cursor="hover">
              VIEW WORK
            </a>
            <a href="#contact" className="btn-outline" data-cursor="hover">
              LET'S CONNECT
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Portrait Image */}
        <motion.div 
          style={{ y: yImage, scale: scaleImage }}
          className="hidden lg:flex lg:col-span-5 h-[70vh] justify-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: [0.8, 0, 0.2, 1], delay: 0.6 }}
            className="relative w-full max-w-[420px] h-full rounded-[2rem] overflow-hidden"
          >
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-10 opacity-80" />
            
            {/* Image */}
            <img 
              src="/profile.jpeg" 
              alt="Rajashekhar I. Matapati" 
              className="absolute inset-0 w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-cinematic"
              data-cursor="hover"
            />
            
            {/* Floating Detail Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute bottom-10 left-[-2rem] z-20 glass px-6 py-4 rounded-xl flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <div>
                <p className="text-xs font-mono text-textMuted uppercase tracking-wider mb-1">Status</p>
                <p className="text-sm font-medium text-textMain">Available for Opportunities</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="absolute bottom-12 left-6 md:left-12 z-10 flex flex-col items-start gap-4"
      >
        <span className="font-mono text-[10px] text-textMuted tracking-[0.2em] uppercase origin-left rotate-90 translate-y-12 mb-16">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-textMuted to-transparent ml-[5px]"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
