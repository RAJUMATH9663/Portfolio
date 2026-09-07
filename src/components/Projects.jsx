import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    id: 1,
    title: 'AI Data Intelligence Platform',
    category: 'AI / Backend',
    featured: true,
    emoji: '🧠',
    desc: 'Multi-agent AI system with Natural Language Querying over structured data. Features a Predictive Dashboard with real-time insights, powered by a knowledge graph backend.',
    longDesc: 'Built a sophisticated multi-agent pipeline using LangGraph for orchestration, Neo4j for the knowledge graph, and OpenRouter for LLM routing. Integrated Ragas for evaluation and Opik for observability.',
    tech: ['LangGraph', 'Neo4j', 'OpenRouter', 'Ragas', 'Opik', 'Python'],
    color: 'from-violet-600/20 to-purple-900/20',
    border: 'border-violet-500/20',
    accent: '#7c3aed',
    github: 'https://github.com/RajashekharMatapati/ai-data-intelligence-platform',
  },
  {
    id: 2,
    title: 'Smart Home Services Management System',
    category: 'Full-Stack',
    featured: false,
    emoji: '🏠',
    desc: 'Built a full-stack Home Services web application with a Python backend and an HTML/CSS frontend to manage service provider listings and customer bookings.',
    longDesc: 'Engineered a comprehensive platform for home services. Implemented secure payment processing to handle customer transactions, managed provider listings, and built a seamless booking flow.',
    tech: ['Python', 'Django', 'MySQL', 'HTML/CSS'],
    color: 'from-cyan-600/20 to-blue-900/20',
    border: 'border-cyan-500/20',
    accent: '#0891b2',
    github: 'https://github.com/RajashekharMatapati/smart-home-services',
  },
  {
    id: 3,
    title: 'NXRA Digital',
    category: 'Full-Stack',
    featured: false,
    emoji: '🌐',
    desc: 'Company website for a digital solutions agency offering web development, AI solutions, branding, and digital marketing.',
    longDesc: 'Developed a modern, responsive website as a freelancer for NXRA Digital. Focused on clean UI/UX and integrated various AI solutions marketing pages.',
    tech: ['Web Development', 'AI Solutions', 'Branding'],
    color: 'from-emerald-600/20 to-teal-900/20',
    border: 'border-emerald-500/20',
    accent: '#059669',
    github: 'https://github.com/RajashekharMatapati/nxra-digital',
  },
];

const filters = ['All', 'AI / Backend', 'Backend', 'Full-Stack'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.from(headerRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 85%',
      },
    });
  });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="absolute left-1/2 top-20 w-[500px] h-[500px] -translate-x-1/2 bg-accent/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">What I've Built</p>
          <h2 className="section-title text-textMain mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="mx-auto w-20 h-0.5 bg-gradient-to-r from-accent to-cyan rounded-full mb-6" />
          <p className="text-textMuted max-w-md mx-auto">
            A curated selection from <span className="text-textMain font-semibold">25+ backend and full-stack projects</span> I've built and shipped.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-accent text-white shadow-glow-accent'
                  : 'glass border border-border text-textMuted hover:text-textMain hover:border-accent/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative rounded-2xl overflow-hidden border ${project.border} cursor-pointer group`}
                style={{
                  background: `linear-gradient(135deg, ${project.color})`,
                }}
                onClick={() => setExpanded(expanded === project.id ? null : project.id)}
              >
                {/* Shine overlay */}
                <div className="absolute inset-0 bg-card-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-7">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{project.emoji}</span>
                      {project.featured && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                          <FaStar className="text-gold text-xs" /> Featured
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-textFaint glass px-3 py-1 rounded-full border border-border">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-textMain mb-3 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-textMuted text-sm leading-relaxed mb-5">{project.desc}</p>

                  {/* Expanded desc */}
                  <AnimatePresence>
                    {expanded === project.id && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-textFaint text-sm leading-relaxed mb-5 overflow-hidden"
                      >
                        {project.longDesc}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="tech-chip">{t}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm font-semibold text-textMuted hover:text-white transition-colors"
                    >
                      <FaGithub className="text-lg" /> GitHub
                    </a>
                    <span className="text-textFaint text-xs ml-auto">
                      {expanded === project.id ? 'Click to collapse ▲' : 'Click for details ▼'}
                    </span>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div
                  className="h-1 w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* More projects CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/RajashekharMatapati"
            target="_blank"
            rel="noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <FaGithub className="text-xl" />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
