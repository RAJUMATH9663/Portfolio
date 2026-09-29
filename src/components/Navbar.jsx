import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section tracking logic
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the middle of the screen
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-normal ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand */}
        <a 
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="font-mono text-xl font-bold tracking-tighter text-textMain relative z-10"
          data-cursor="hover"
        >
          RM<span className="text-accent">.</span>
        </a>

        {/* Desktop Links */}
        <div 
          className={`hidden md:flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-normal ${
            scrolled ? 'glass border border-border shadow-2xl' : 'bg-transparent border border-transparent'
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-mono uppercase tracking-widest transition-colors duration-micro ${
                  isActive ? 'text-bg' : 'text-textMuted hover:text-textMain'
                }`}
                data-cursor="hover"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-textMain rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* CTA (optional right side) */}
        <a 
          href="#contact" 
          onClick={(e) => handleClick(e, '#contact')}
          className="hidden md:flex text-sm font-mono text-textMain uppercase tracking-widest border border-border px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-colors duration-micro"
          data-cursor="hover"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
