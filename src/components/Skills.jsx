import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: ["Python", "PHP", "SQL", "JavaScript", "R", "C", "C#", "Django", "Flask", "Laravel", "React", "Vite"]
  },
  {
    title: "Web & CMS",
    skills: ["HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "WordPress", "WooCommerce", "Elementor"]
  },
  {
    title: "AI, ML & Data Science",
    skills: ["LangChain", "LangGraph", "OpenRouter", "Ragas", "Opik", "Neo4j", "Databricks", "Pandas", "NumPy", "Scikit-learn", "Redis"]
  },
  {
    title: "Databases & Cloud",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle", "AWS", "Azure", "Vercel"]
  },
  {
    title: "QA & Testing",
    skills: ["White/Black Box", "SQL Validation", "Code Reviews", "Manual Testing", "UAT", "Bug Reporting"]
  },
  {
    title: "DevOps & SysAdmin",
    skills: ["Docker", "Kubernetes", "Nginx", "CI/CD", "Hardware Troubleshooting", "Virtualization", "GitHub"]
  },
  {
    title: "Tools & Methodologies",
    skills: ["Power BI", "Tableau", "Agile (Scrum)", "SDLC", "VS Code", "Postman", "XAMPP", "Snyk"]
  }
];

// Flattens all skills for the infinite marquees
const allSkills = skillCategories.flatMap(cat => cat.skills);

const MarqueeRow = ({ items, direction = 1, speed = 40 }) => {
  return (
    <div className="flex w-full overflow-hidden relative border-y border-border/20 py-6 -my-[1px]">
      <motion.div
        initial={{ x: direction === 1 ? 0 : "-50%" }}
        animate={{ x: direction === 1 ? "-50%" : 0 }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="flex w-max gap-12 px-6 items-center"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12 group cursor-default">
            <span className="font-heading text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-tighter text-transparent bg-clip-text transition-colors duration-normal hover:text-accent" style={{ WebkitTextStroke: '1px var(--tw-colors-border)' }}>
              {item}
            </span>
            <div className="w-3 h-3 rounded-full bg-accent/20 group-hover:bg-accent transition-colors duration-normal" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const CategoryCard = ({ category, idx }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y }}
      className="flex flex-col gap-6 p-8 rounded-3xl glass border border-border hover:border-accent/30 transition-colors duration-normal group"
    >
      <h3 className="text-2xl font-bold text-textMain tracking-tight">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span 
            key={skill} 
            className="px-4 py-2 text-sm font-mono tracking-widest text-textMuted uppercase border border-border rounded-full group-hover:bg-surfaceHover transition-colors duration-micro hover:!bg-accent hover:!text-white hover:!border-accent cursor-crosshair"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative pt-32 pb-0 bg-bg overflow-hidden w-full">
      
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <p className="font-mono text-detail text-textMuted uppercase tracking-widest">Capabilities</p>
          </div>
          <h2 className="text-section text-textMain tracking-tighter">
            COMPLETE <span className="text-accent italic font-light">ARSENAL.</span>
          </h2>
        </motion.div>
      </div>

      {/* Bento Grid Layout for Categories */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <CategoryCard key={cat.title} category={cat} idx={idx} />
          ))}
        </div>
      </div>

      {/* Massive Lapping Marquees */}
      <div className="relative flex flex-col w-full rotate-[-3deg] scale-[1.15] overflow-hidden bg-bg py-20 shadow-none border-y border-border/20">
        
        {/* Soft gradient masks for the edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
        
        <MarqueeRow items={allSkills.slice(0, 15)} direction={1} speed={60} />
        <MarqueeRow items={allSkills.slice(15, 30)} direction={-1} speed={75} />
        <MarqueeRow items={allSkills.slice(30, 45)} direction={1} speed={55} />
        <MarqueeRow items={allSkills.slice(45)} direction={-1} speed={80} />
      </div>

    </section>
  );
};

export default Skills;
