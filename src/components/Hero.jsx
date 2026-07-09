import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import ProfileCard from './ProfileCard';

const AnimatedSphere = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
        />
      </Sphere>
      {/* Inner glow sphere */}
      <Sphere args={[1.15, 32, 32]}>
        <MeshDistortMaterial
          color="#22d3ee"
          attach="material"
          distort={0.3}
          speed={1.5}
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>
    </Float>
  );
};

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/', label: 'GitHub', color: 'hover:text-white' },
  { icon: FaLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: FaEnvelope, href: 'mailto:rajashekhar@example.com', label: 'Email', color: 'hover:text-rose-400' },
];

const stats = [
  { value: '25+', label: 'Projects Built' },
  { value: '8.55', label: 'CGPA (BCA)' },
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
                  words={['Software Engineer', 'AI Engineer', 'Backend Developer', 'Problem Solver']}
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
              Passionate Software Engineer with a <span className="text-textMain font-semibold">BCA (CGPA 8.55)</span> and experience building
              AI-powered applications, backend systems, and full-stack web solutions. I love turning complex
              engineering problems into elegant, scalable solutions.
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

          {/* ── Right: Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="hidden lg:flex h-[560px] relative items-center justify-center"
          >
            <div className="w-full max-w-sm">
              <ProfileCard
                name="Rajashekhar"
                title="Software Engineer"
                handle="rajashekhar"
                status="Available"
                contactText="Contact Me"
                avatarUrl="/profile.jpeg" 
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowColor="rgba(125, 190, 255, 0.67)"
                behindGlowEnabled={true}
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              />
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
