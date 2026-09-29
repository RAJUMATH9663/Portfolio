import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    });
  };

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[800px] w-full bg-bg overflow-hidden flex flex-col justify-end"
    >
      {/* Interactive Background glow based on mouse */}
      <motion.div 
        animate={{ 
          x: mousePosition.x * 0.1, 
          y: mousePosition.y * 0.1 
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 400 }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-accent opacity-5 blur-[120px]" />
      </motion.div>

      {/* Noise Texture */}
      <div className="absolute inset-0 noise opacity-50 z-0" />

      <motion.div 
        style={{ y, scale, opacity }}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center flex-grow"
      >
        <div className="text-center flex flex-col items-center max-w-5xl w-full">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
            <p className="font-mono text-detail text-textMuted uppercase tracking-widest">Connect</p>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-black text-textMain tracking-tighter uppercase mb-16"
          >
            Let's build<br />
            <span className="italic text-textMuted font-light">something</span><br />
            extraordinary.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <a 
              href="mailto:rajumthpt@gmail.com" 
              className="btn-primary px-12 py-6 text-sm hover:bg-accent hover:text-bg transition-colors duration-normal"
              data-cursor="hover"
            >
              EMAIL ME
            </a>
            <a 
              href="https://linkedin.com/in/rajashekhar-matapati-4b5909244" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-outline px-12 py-6 text-sm"
              data-cursor="hover"
            >
              LINKEDIN
            </a>
            <a 
              href="https://github.com/RAJUMATH9663" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-outline px-12 py-6 text-sm"
              data-cursor="hover"
            >
              GITHUB
            </a>
          </motion.div>

        </div>
      </motion.div>

      {/* Cinematic Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 w-full border-t border-border mt-auto"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-sm text-textMuted uppercase tracking-widest">
            © {new Date().getFullYear()} Rajashekhar I. Matapati
          </p>
          
          <div className="flex items-center gap-8">
            <p className="font-mono text-sm text-textMuted uppercase tracking-widest hidden md:block">
              Basavan Bagewadi, Karnataka, India
            </p>
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-3 font-mono text-sm text-textMain uppercase tracking-widest hover:text-accent transition-colors"
              data-cursor="hover"
            >
              <span>BACK TO TOP</span>
              <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                ↑
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
