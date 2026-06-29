import { motion } from 'framer-motion';

const about = {
  description: `I'm a Software Engineer and AI enthusiast from Vijayapura, Karnataka, India. I hold a Bachelor of Computer Applications (BCA) with a stellar CGPA of 8.55. My passion lies at the intersection of AI and backend engineering — crafting intelligent systems that solve real-world problems.`,
  traits: [
    { emoji: '🎓', title: 'Education', desc: 'BCA | CGPA 8.55' },
    { emoji: '📍', title: 'Location', desc: 'Vijayapura, Karnataka' },
    { emoji: '💼', title: 'Focus', desc: 'AI & Backend Engineering' },
    { emoji: '🌐', title: 'Languages', desc: 'Python, JavaScript, SQL, C' },
  ],
  timeline: [
    { year: '2026', event: 'Completed BCA with CGPA 8.55' },
    { year: '2025', event: 'Built AI Data Intelligence Platform' },
    { year: '2025', event: 'Developed IT Infrastructure Monitor' },
    { year: '2025', event: 'First full-stack project: Tourism App' },
  ],
};

const About = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Background blur */}
      <div className="absolute -left-40 top-20 w-96 h-96 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className="section-title text-textMain mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="mx-auto w-20 h-0.5 bg-gradient-to-r from-accent to-cyan rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <p className="text-textMuted text-lg leading-relaxed">{about.description}</p>

            <p className="text-textMuted text-lg leading-relaxed">
              From building <span className="text-textMain font-semibold">AI agents with LangGraph</span> and knowledge graphs
              with Neo4j, to designing scalable Django APIs and monitoring infrastructure dashboards — I'm always
              exploring the frontier of what's possible with modern tech.
            </p>

            {/* Trait cards */}
            <div className="grid grid-cols-2 gap-4">
              {about.traits.map((trait, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="glass-card rounded-xl p-4 flex items-center gap-3"
                >
                  <span className="text-2xl">{trait.emoji}</span>
                  <div>
                    <p className="text-xs text-textFaint font-semibold uppercase tracking-wide">{trait.title}</p>
                    <p className="text-textMain font-medium text-sm mt-0.5">{trait.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-bold text-textMain mb-8">My Journey</h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-cyan to-transparent" />

              <div className="flex flex-col gap-8">
                {about.timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex gap-6 items-start"
                  >
                    {/* Dot */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full border border-accent/40 bg-bgAlt flex items-center justify-center z-10 relative">
                        <div className="w-3 h-3 rounded-full bg-accent shadow-glow-accent" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="glass-card rounded-xl p-4 flex-1">
                      <p className="text-xs font-mono text-accent tracking-widest mb-1">{item.year}</p>
                      <p className="text-textMain font-medium">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10"
            >
              <a href="/resume.pdf" download className="btn-primary inline-flex items-center gap-2">
                <span>Download Full Resume</span>
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
