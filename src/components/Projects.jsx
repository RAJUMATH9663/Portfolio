import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: '01',
    title: 'AI Data Intelligence Platform',
    category: 'AI / Backend',
    featured: true,
    emoji: '🧠',
    desc: 'Engineered an AI-driven analytics system for natural language querying over graph-structured data using Neo4j; orchestrated multi-agent LangGraph workflows.',
    tech: ['LangGraph', 'Neo4j', 'OpenRouter', 'Ragas', 'Opik'],
    github: 'https://github.com/RAJUMATH9663',
  },
  {
    id: '02',
    title: 'DevOps Control Center',
    category: 'DevOps / Full-Stack',
    featured: false,
    emoji: '⚙️',
    desc: 'Developed a DevOps platform automating infrastructure, deployment, and routine operational tasks using a TypeScript frontend and Python backend.',
    tech: ['TypeScript', 'Python', 'HCL', 'Shell', 'PowerShell'],
    github: 'https://github.com/RAJUMATH9663',
  },
  {
    id: '03',
    title: 'BUSIGO Route App',
    category: 'Mobile / Backend',
    featured: false,
    emoji: '🚌',
    desc: 'Developed a cross-platform bus route and schedule search app. Managed bus routes, city locations, and fares via Firebase Cloud Firestore.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/RAJUMATH9663',
  },
  {
    id: '04',
    title: 'Smart Home Services',
    category: 'Full-Stack',
    featured: false,
    emoji: '🏠',
    desc: 'Built a full-stack Home Services web application to manage service provider listings and customer bookings with secure payment processing.',
    tech: ['Python', 'Django', 'MySQL', 'HTML/CSS'],
    github: 'https://github.com/RAJUMATH9663',
  },
];

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // For 4 items, the track needs to move left by (number_of_items - 1) * 100vw -> 3 * 100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} id="projects" className="relative h-[400vh] bg-bg w-full">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Background Track Title */}
        <div className="absolute top-12 left-12 z-20">
          <p className="font-mono text-detail text-textMuted uppercase tracking-widest flex items-center gap-4">
            <span className="w-8 h-px bg-accent"></span>
            Selected Work
          </p>
        </div>

        <motion.div style={{ x }} className="flex gap-0 w-[400vw]">
          {projects.map((project, index) => {
            return <ProjectCard project={project} key={project.id} index={index} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center p-6 md:p-24 relative overflow-hidden flex-shrink-0 group">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full max-w-[1440px] items-center">
        
        {/* Left: Image / Visual Preview */}
        <div 
          className="relative w-full aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden glass border border-border group-hover:border-white/10 transition-colors duration-cinematic"
          data-cursor="project"
        >
          {/* Subtle image scaling effect on hover */}
          <div className="absolute inset-0 bg-surfaceHover opacity-50 group-hover:opacity-0 transition-opacity duration-normal z-10" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-bg to-surface group-hover:scale-105 transition-transform duration-cinematic">
            <span className="text-[120px] filter drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-cinematic opacity-80 group-hover:opacity-100">
              {project.emoji}
            </span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-6 left-6 z-20">
              <span className="px-4 py-2 bg-accent/20 backdrop-blur-md text-accent border border-accent/20 rounded-full text-xs font-mono uppercase tracking-widest">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xl text-accent">
              {project.id}
            </p>
            <h3 className="text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] font-bold text-textMain tracking-tight">
              {project.title}
            </h3>
            <p className="font-mono text-detail text-textMuted uppercase tracking-wider">
              {project.category}
            </p>
          </div>

          <p className="text-body text-textMuted leading-relaxed max-w-xl">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.tech.map((t) => (
              <span 
                key={t} 
                className="px-4 py-2 text-xs font-mono tracking-widest text-textMuted uppercase border border-border rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="pt-8">
            <a 
              href={project.github}
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center gap-4 text-textMain font-mono text-sm tracking-widest uppercase hover:text-accent transition-colors duration-micro"
              data-cursor="hover"
            >
              <span>View Source</span>
              <span className="w-12 h-px bg-border group-hover:bg-accent group-hover:w-20 transition-all duration-normal" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;
