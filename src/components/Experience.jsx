import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    year: '2026 - Present',
    role: 'Software Engineer & QA',
    company: 'V G Parekh',
    description: 'Designing and maintaining full-stack web apps using PHP, Laravel, WordPress, and MySQL. Leading UAT validation and custom plugin development for complex booking systems.',
    technologies: ['PHP', 'Laravel', 'WordPress', 'MySQL', 'QA'],
  },
  {
    year: 'Jan 2026 - Feb 2026',
    role: 'Software Development Intern',
    company: 'Digital Dreams',
    description: 'Diagnosed and resolved backend performance bottlenecks in Django and Flask applications. Refactored relational schemas to eliminate redundancy and improve data integrity.',
    technologies: ['Python', 'Django', 'Flask', 'SQL'],
  },
];

const ExperienceItem = ({ exp, index }) => {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 90%", "end 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);
  const x = useTransform(scrollYProgress, [0, 0.2], [-50, 0]);

  return (
    <motion.div 
      ref={itemRef}
      style={{ opacity }}
      className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-20 border-t border-border group"
    >
      {/* Year & Timeline Line */}
      <div className="md:col-span-3 flex flex-col items-start gap-4">
        <motion.p 
          style={{ x }}
          className="font-mono text-detail text-textMuted tracking-widest uppercase"
        >
          {exp.year}
        </motion.p>
        <div className="w-full h-px bg-border group-hover:bg-accent transition-colors duration-normal mt-4 hidden md:block" />
      </div>

      {/* Content */}
      <div className="md:col-span-9 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-bold text-textMain tracking-tight mb-2">
            {exp.role}
          </h3>
          <p className="text-xl text-accent font-medium tracking-wide">
            {exp.company}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-body text-textMuted max-w-3xl leading-relaxed"
        >
          {exp.description}
        </motion.p>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-3 mt-4"
        >
          {exp.technologies.map((tech, i) => (
            <span 
              key={i} 
              className="px-4 py-2 text-xs font-mono tracking-widest text-textMuted uppercase border border-border rounded-full hover:bg-surfaceHover hover:text-textMain transition-colors duration-micro"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative py-32 md:py-48 bg-bg overflow-hidden w-full">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-32"
        >
          <div className="w-2 h-2 rounded-full bg-accent" />
          <p className="font-mono text-detail text-textMuted uppercase tracking-widest">Experience</p>
        </motion.div>

        {/* Experience List */}
        <div className="flex flex-col border-b border-border">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} exp={exp} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
