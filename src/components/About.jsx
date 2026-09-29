import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const about = {
  quote: "Technology should not only work. It should create an experience.",
  description1: "I'm a Software Engineer and QA Engineer from Basavan Bagewadi, Karnataka, India. I hold a Bachelor of Computer Applications (BCA) with a stellar CGPA of 8.67. My passion lies at the intersection of AI, full-stack development, and quality assurance — crafting intelligent systems that solve real-world problems.",
  description2: "From building AI agents with LangGraph and knowledge graphs with Neo4j, to designing scalable Laravel/Django applications and leading UAT validation cycles — I'm always exploring the frontier of what's possible with modern tech.",
  stats: [
    { label: 'EDUCATION', value: 'BCA (8.67 CGPA)' },
    { label: 'LOCATION', value: 'Basavan Bagewadi, IN' },
    { label: 'FOCUS', value: 'Full-Stack & QA' },
    { label: 'LANGUAGES', value: 'Python, PHP, JS, SQL' },
  ]
};

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Split quote into words for animation
  const words = about.quote.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-48 bg-bg overflow-hidden w-full">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-2 h-2 rounded-full bg-accent" />
          <p className="font-mono text-detail text-textMuted uppercase tracking-widest">About</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left: Editorial Typography */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* Word-by-word Quote Reveal */}
            <motion.h2 
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-bold text-textMain tracking-tight"
            >
              {words.map((word, index) => (
                <motion.span
                  variants={child}
                  key={index}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* Sub-description with subtle parallax */}
            <motion.div 
              style={{ y }}
              className="flex flex-col gap-8 max-w-2xl"
            >
              <p className="text-body text-textMuted leading-relaxed">
                {about.description1}
              </p>
              <p className="text-body text-textMuted leading-relaxed">
                {about.description2}
              </p>
              
              <div className="pt-8">
                <a href="/resume.pdf" download className="btn-outline">
                  DOWNLOAD RESUME
                </a>
              </div>
            </motion.div>

          </div>

          {/* Right: Stats Grid */}
          <div className="lg:col-span-3 lg:col-start-10 mt-12 lg:mt-0">
            <div className="flex flex-col border-t border-border">
              {about.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="py-8 border-b border-border flex flex-col gap-2 group hover:bg-surfaceHover transition-colors duration-normal -mx-6 px-6"
                >
                  <p className="font-mono text-[10px] text-textMuted tracking-[0.2em] group-hover:text-accent transition-colors duration-micro">
                    {stat.label}
                  </p>
                  <p className="text-xl font-medium text-textMain tracking-tight">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
