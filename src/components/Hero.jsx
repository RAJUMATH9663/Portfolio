
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import { ScalesContainer } from "@/components/ui/scales";
import { BackgroundGradient } from "@/components/ui/background-gradient";


const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/RajashekharMatapati', label: 'GitHub', color: 'hover:text-white' },
  { icon: FaLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: FaEnvelope, href: 'mailto:rajumthpt@gmail.com', label: 'Email', color: 'hover:text-rose-400' },
];

const stats = [
  { value: '25+', label: 'Projects Built' },
  { value: '8.67', label: 'CGPA (BCA)' },
  { value: '3+', label: 'Years Coding' },
];

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center grid-bg overflow-hidden">


      {/* Radial gradient blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">

          {/* ── Left ── */}
          <div className="flex flex-col gap-8">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start"
            >
              <div className="glow-dot" />
              <span className="text-sm font-medium text-textMuted glass px-4 py-1.5 rounded-full border border-border">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="text-accent font-mono text-sm tracking-widest mb-3 uppercase">Hello, I'm</p>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-textMain leading-[1.05] tracking-tight">
                Rajashekhar
                <br />
                <span className="gradient-text">I. Matapati</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-3xl font-semibold text-textMuted"
            >
              I'm a{' '}
              <span className="text-accentLight font-bold">
                <Typewriter
                  words={[
                    'Software Engineer',
                    'QA Engineer',
                    'Full Stack Developer',
                    'Python Developer',
                    'PHP & Laravel Developer',
                    'AI Engineer',
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={65}
                  deleteSpeed={40}
                  delaySpeed={1800}
                />
              </span>
            </motion.h2>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-textMuted text-lg leading-relaxed max-w-[520px]"
            >
              Detail-oriented Full Stack Developer and QA Engineer delivering 25+ projects spanning full-stack web development, AI/ML systems, and IT infrastructure. Proven track record building production apps with <span className="text-textMain font-semibold">Python, Django, PHP, Laravel, WordPress, and MySQL</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#projects" className="btn-primary flex items-center gap-2">
                <span>View Projects</span>
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="/resume.pdf" download className="btn-outline flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </a>
            </motion.div>

            {/* Social + Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col gap-6"
            >
              {/* Socials */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-border" />
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-textFaint ${color} transition-colors duration-200 text-xl`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              {/* Mini stats */}
              <div className="flex gap-8">
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-3xl font-black gradient-text">{value}</p>
                    <p className="text-xs text-textFaint font-medium mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Profile Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex h-[380px] lg:h-[560px] relative items-center justify-center mt-10 lg:mt-0"
          >
            <div className="w-full max-w-sm relative group">
              <BackgroundGradient className="rounded-[2rem] bg-black p-1">
                {/* Image container */}
                <ScalesContainer
                  orientation="diagonal"
                  size={8}
                  containerClassName="relative aspect-[3/4] rounded-[1.8rem] overflow-hidden shadow-2xl bg-bgAlt/50 glass"
                >
                  <img 
                    src="/profile.jpeg" 
                    alt="Rajashekhar Matapati" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                </ScalesContainer>
              </BackgroundGradient>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col items-center gap-2 pb-8"
        >
          <span className="text-xs text-textFaint font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowDown className="text-textFaint text-sm" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
