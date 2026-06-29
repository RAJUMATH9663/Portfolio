import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowRight } from 'react-icons/fa';

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'rajashekhar@example.com',
    href: 'mailto:rajashekhar@example.com',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'Vijayapura, Karnataka, India',
    href: null,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: FaPhone,
    label: 'Availability',
    value: 'Open to remote & on-site roles',
    href: null,
    color: 'text-cyan',
    bg: 'bg-cyan/10 border-cyan/20',
  },
];

const socials = [
  { icon: FaGithub, href: 'https://github.com/', label: 'GitHub', color: 'hover:border-white hover:text-white' },
  { icon: FaLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn', color: 'hover:border-blue-400 hover:text-blue-400' },
  { icon: FaEnvelope, href: 'mailto:rajashekhar@example.com', label: 'Email', color: 'hover:border-rose-400 hover:text-rose-400' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent'
  const formRef = useRef(null);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/rajumthpt@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New Portfolio Message from ${form.name}`
        })
      });
      
      if (response.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus(null);
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus(null);
      alert('Error sending message. Please try again later.');
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 top-10 w-64 h-64 bg-cyan/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="section-title text-textMain mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="mx-auto w-20 h-0.5 bg-gradient-to-r from-accent to-cyan rounded-full mb-6" />
          <p className="text-textMuted max-w-lg mx-auto">
            Looking for a Backend or AI Engineer? Let's discuss how my experience can bring value to your team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                <div key={label} className={`flex items-center gap-4 rounded-xl border p-4 ${bg} glass`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>
                    <Icon className={`${color} text-lg`} />
                  </div>
                  <div>
                    <p className="text-xs text-textFaint font-semibold uppercase tracking-wide">{label}</p>
                    {href
                      ? <a href={href} className={`${color} font-medium hover:opacity-80 transition-opacity`}>{value}</a>
                      : <p className="text-textMain font-medium">{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div>
              <p className="text-textFaint text-sm font-semibold uppercase tracking-widest mb-4">Follow Me</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`w-12 h-12 rounded-xl glass border border-border text-textFaint flex items-center justify-center text-xl transition-all duration-300 ${color}`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="glow-dot" />
                <p className="text-textMain font-bold">Currently Available</p>
              </div>
              <p className="text-textMuted text-sm leading-relaxed">
                I'm actively looking for Backend / AI Engineer roles. Open to remote, hybrid, and on-site
                opportunities across India and globally.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 flex flex-col gap-5">
              <h3 className="text-xl font-bold text-textMain mb-2">Send a Message</h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-textFaint font-semibold uppercase tracking-wide" htmlFor="contact-name">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-textMain placeholder-textFaint outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-textFaint font-semibold uppercase tracking-wide" htmlFor="contact-email">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-textMain placeholder-textFaint outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-textFaint font-semibold uppercase tracking-wide" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the role or project..."
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-textMain placeholder-textFaint outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/10 transition-all resize-none text-sm"
                />
              </div>

              {status === 'sent' ? (
                <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <span className="text-xl">✅</span>
                  <p className="text-sm font-medium">Message sent! I'll get back to you soon.</p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                  {status !== 'sending' && <FaArrowRight className="relative z-10" />}
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-textFaint text-sm font-mono">
            © 2026 <span className="gradient-text font-bold">Rajashekhar I. Matapati</span>. All rights reserved.
          </p>
          <p className="text-textFaint text-xs">Crafted with React + Vite + Three.js ✨</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
