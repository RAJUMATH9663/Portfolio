import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FaPython, FaReact, FaDocker, FaDatabase, FaAws, FaGitAlt, FaServer, FaPhp, FaWordpress, FaLaravel
} from 'react-icons/fa';
import {
  SiLangchain, SiKubernetes,
  SiPostgresql, SiMongodb, SiMysql, SiJavascript,
} from 'react-icons/si';

const categories = [
  {
    title: 'Programming',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.3)',
    icon: <FaPython className="text-4xl" />,
    skills: [
      { name: 'Python', level: 92, icon: <FaPython /> },
      { name: 'PHP', level: 88, icon: <FaPhp /> },
      { name: 'JavaScript', level: 85, icon: <SiJavascript /> },
      { name: 'SQL', level: 85, icon: <FaDatabase /> },
    ],
  },
  {
    title: 'Frameworks & CMS',
    color: 'from-cyan-500 to-blue-600',
    glow: 'rgba(34,211,238,0.3)',
    icon: <FaLaravel className="text-4xl" />,
    skills: [
      { name: 'Django', level: 90, icon: <FaServer /> },
      { name: 'Laravel', level: 85, icon: <FaLaravel /> },
      { name: 'React', level: 75, icon: <FaReact /> },
      { name: 'WordPress', level: 80, icon: <FaWordpress /> },
    ],
  },
  {
    title: 'Database & Cloud',
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.3)',
    icon: <FaDatabase className="text-4xl" />,
    skills: [
      { name: 'MySQL', level: 90, icon: <SiMysql /> },
      { name: 'PostgreSQL', level: 82, icon: <SiPostgresql /> },
      { name: 'MongoDB', level: 75, icon: <SiMongodb /> },
      { name: 'AWS / Azure', level: 70, icon: <FaAws /> },
    ],
  },
  {
    title: 'DevOps & QA',
    color: 'from-orange-500 to-rose-600',
    glow: 'rgba(249,115,22,0.3)',
    icon: <FaDocker className="text-4xl" />,
    skills: [
      { name: 'Docker', level: 80, icon: <FaDocker /> },
      { name: 'Git / GitHub', level: 90, icon: <FaGitAlt /> },
      { name: 'Manual QA', level: 85, icon: null },
      { name: 'LangChain', level: 88, icon: <SiLangchain /> },
    ],
  },
];

const SkillBar = ({ name, level, icon, delay, gradientClass }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col gap-2 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-textMuted group-hover:text-textMain transition-colors">
          {icon && <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>}
          {name}
        </div>
        <span className="text-xs font-mono text-textFaint group-hover:text-textMuted transition-colors">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
        <motion.div
          className={`h-full origin-left bg-gradient-to-r ${gradientClass}`}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : {}}
          transition={{ duration: 1.4, delay, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
    </div>
  );
};

const TiltCard = ({ cat, idx }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.12, duration: 0.6 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="bg-surface border border-border hover:border-accent/30 rounded-2xl p-6 flex flex-col gap-6 shadow-xl hover:shadow-2xl hover:shadow-accent/10 group relative"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"
        style={{ transform: "translateZ(1px)" }} 
      />
      
      {/* Card header */}
      <div className="flex flex-col gap-4" style={{ transform: "translateZ(30px)" }}>
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
          style={{ boxShadow: `0 8px 24px ${cat.glow}` }}
        >
          {cat.icon}
        </div>
        <h3 className="text-xl font-bold text-textMain">{cat.title}</h3>
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-5" style={{ transform: "translateZ(20px)" }}>
        {cat.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            {...skill}
            delay={idx * 0.1 + i * 0.15}
            gradientClass={cat.color}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-28 bg-bgAlt overflow-hidden" style={{ perspective: 1200 }}>
      <div className="absolute right-0 top-0 w-96 h-96 bg-cyan/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">What I Know</p>
          <h2 className="section-title text-textMain mb-4">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="mx-auto w-20 h-0.5 bg-gradient-to-r from-accent to-cyan rounded-full" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" style={{ perspective: 1000 }}>
          {categories.map((cat, idx) => (
            <TiltCard key={cat.title} cat={cat} idx={idx} />
          ))}
        </div>

        {/* Tech logos strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 w-full overflow-hidden flex relative"
        >
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bgAlt to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bgAlt to-transparent z-10 pointer-events-none" />

          {/* Marquee Content */}
          <div className="flex w-max animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 px-2">
                {[
                  'Python', 'PHP', 'Django', 'Laravel', 'React', 'WordPress', 'QA', 'LangChain', 'LangGraph',
                  'Neo4j', 'Docker', 'MySQL', 'AWS', 'PostgreSQL',
                  'MongoDB', 'Ragas', 'Opik', 'Git',
                ].map((tech, j) => (
                  <span key={`${i}-${j}`} className="tech-chip cursor-default flex-shrink-0">
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
