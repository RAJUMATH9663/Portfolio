import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaPython, FaReact, FaDocker, FaDatabase, FaAws, FaGitAlt, FaServer,
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
      { name: 'JavaScript', level: 80, icon: <SiJavascript /> },
      { name: 'SQL', level: 85, icon: <FaDatabase /> },
      { name: 'C / C#', level: 70, icon: null },
    ],
  },
  {
    title: 'AI & Frameworks',
    color: 'from-cyan-500 to-blue-600',
    glow: 'rgba(34,211,238,0.3)',
    icon: <SiLangchain className="text-4xl" />,
    skills: [
      { name: 'LangChain', level: 88, icon: <SiLangchain /> },
      { name: 'LangGraph', level: 85, icon: null },
      { name: 'Django', level: 90, icon: <FaServer /> },
      { name: 'React', level: 75, icon: <FaReact /> },
    ],
  },
  {
    title: 'Database & Cloud',
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.3)',
    icon: <FaDatabase className="text-4xl" />,
    skills: [
      { name: 'PostgreSQL', level: 82, icon: <SiPostgresql /> },
      { name: 'MySQL', level: 85, icon: <SiMysql /> },
      { name: 'MongoDB', level: 75, icon: <SiMongodb /> },
      { name: 'AWS / Azure', level: 70, icon: <FaAws /> },
    ],
  },
  {
    title: 'DevOps & Tools',
    color: 'from-orange-500 to-rose-600',
    glow: 'rgba(249,115,22,0.3)',
    icon: <FaDocker className="text-4xl" />,
    skills: [
      { name: 'Docker', level: 80, icon: <FaDocker /> },
      { name: 'Kubernetes', level: 68, icon: <SiKubernetes /> },
      { name: 'Git / GitHub', level: 90, icon: <FaGitAlt /> },
      { name: 'Neo4j', level: 82, icon: <FaDatabase /> },
    ],
  },
];

const SkillBar = ({ name, level, icon, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-textMuted">
          {icon && <span className="text-base opacity-70">{icon}</span>}
          {name}
        </div>
        <span className="text-xs font-mono text-textFaint">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : {}}
          transition={{ duration: 1.4, delay, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-28 bg-bgAlt overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 flex flex-col gap-6"
            >
              {/* Card header */}
              <div className="flex flex-col gap-3">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg`}
                  style={{ boxShadow: `0 8px 24px ${cat.glow}` }}
                >
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-textMain">{cat.title}</h3>
              </div>

              {/* Skill bars */}
              <div className="flex flex-col gap-4">
                {cat.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    delay={idx * 0.1 + i * 0.15}
                  />
                ))}
              </div>
            </motion.div>
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
                  'Python', 'Django', 'React', 'LangChain', 'LangGraph',
                  'Neo4j', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL',
                  'MongoDB', 'Ragas', 'Opik', 'Nginx', 'Git',
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
