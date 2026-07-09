import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const experiences = [
  {
    role: 'AI Engineer (Project)',
    company: 'Self / Open Source',
    period: '2023 – Present',
    type: 'Project',
    color: 'accent',
    points: [
      'Architected a multi-agent AI pipeline using LangGraph with tool-calling, memory, and state management',
      'Integrated Neo4j knowledge graphs for entity relationship querying via natural language',
      'Implemented evaluation using Ragas and observability with Opik for production-grade AI systems',
      'Utilized OpenRouter for LLM abstraction across multiple model providers',
    ],
  },
  {
    role: 'Backend Developer (Project)',
    company: 'Academic / Freelance',
    period: '2022 – 2023',
    type: 'Backend',
    color: 'cyan',
    points: [
      'Designed and built RESTful APIs with Django REST Framework for data-driven dashboards',
      'Implemented real-time alerts with Celery + Redis for IT Infrastructure Monitoring System',
      'Managed relational database schemas in MySQL and PostgreSQL for production use',
      'Containerized applications with Docker for consistent dev/prod environments',
    ],
  },
  {
    role: 'Full-Stack Developer (Project)',
    company: 'Academic',
    period: '2021 – 2022',
    type: 'Full-Stack',
    color: 'gold',
    points: [
      'Built a Tourism Information System with Django backend and vanilla JavaScript frontend',
      'Implemented session-based authentication, role-based permissions, and admin panel',
      'Integrated interactive maps and image gallery for location-based content',
      'Deployed with Nginx and Gunicorn on Linux server',
    ],
  },
];

const colorMap = {
  accent: { dot: 'bg-accent', border: 'border-accent/40', badge: 'bg-accent/10 text-accent border-accent/20' },
  cyan: { dot: 'bg-cyan', border: 'border-cyan/40', badge: 'bg-cyan/10 text-cyan border-cyan/20' },
  gold: { dot: 'bg-gold', border: 'border-gold/40', badge: 'bg-gold/10 text-gold border-gold/20' },
};

const Experience = () => {
  return (
    <section id="experience" className="relative py-28 bg-bgAlt overflow-hidden">
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-gold/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">Track Record</p>
          <h2 className="section-title text-textMain mb-4">
            Experience & <span className="gradient-text">Journey</span>
          </h2>
          <div className="mx-auto w-20 h-0.5 bg-gradient-to-r from-accent to-cyan rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative h-[800px]">
          {/* Center line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-cyan to-transparent hidden md:block" />

          <ScrollStack useWindowScroll={false}>
            {experiences.map((exp, i) => {
              const c = colorMap[exp.color];
              return (
                <ScrollStackItem key={i}>
                  <div
                    className="md:pl-20 relative w-full"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-6 w-12 h-12 rounded-full border ${c.border} bg-bg flex items-center justify-center hidden md:flex`}>
                      <div className={`w-4 h-4 rounded-full ${c.dot}`} style={{ boxShadow: `0 0 12px currentColor` }} />
                    </div>

                    {/* Card */}
                    <div className="glass-card rounded-2xl p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                        <div>
                          <h3 className="text-xl font-bold text-textMain">{exp.role}</h3>
                          <p className="text-textMuted mt-1">{exp.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="font-mono text-xs text-textFaint glass border border-border px-3 py-1.5 rounded-full">
                            {exp.period}
                          </span>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.badge}`}>
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      <ul className="flex flex-col gap-3">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="flex items-start gap-3 text-textMuted text-sm leading-relaxed">
                            <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${c.dot}`} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
};

export default Experience;
