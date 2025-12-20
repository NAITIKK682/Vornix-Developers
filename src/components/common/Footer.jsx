import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiInstagram, FiArrowRight, FiMail } from 'react-icons/fi';
import Button from './Button';

export default function Footer() {
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Our Services', to: '/services' },
        { label: 'Case Studies', to: '/portfolio' },
        { label: 'Contact', to: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Web Development', to: '/services' },
        { label: 'AI Solutions', to: '/services' },
        { label: 'Brand Identity', to: '/services' },
        { label: 'Cloud Architecture', to: '/services' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', to: '#' },
        { label: 'Terms of Service', to: '#' },
        { label: 'Cookie Policy', to: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/vornix-developers/', color: 'hover:bg-blue-600', label: 'LinkedIn' },
    { icon: <FiTwitter />, href: '#', color: 'hover:bg-sky-500', label: 'Twitter' },
    { icon: <FiInstagram />, href: 'https://www.instagram.com/vornixdevelopers/', color: 'hover:bg-pink-600', label: 'Instagram' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <footer className="relative bg-[#0F172A] pt-24 pb-12 overflow-hidden text-slate-300">
      {/* Premium Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8">
              <img
                src="/images/logo.png"
                alt="Vornix Developers"
                className="h-10 w-auto object-contain brightness-0 invert" // Makes black logo white
              />
            </Link>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
              Architecting the next generation of digital experiences. We combine technical 
              rigor with creative strategy to build products that scale.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-xl transition-all duration-300 border border-slate-700/50 backdrop-blur-sm ${social.color} hover:text-white`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((section, i) => (
            <motion.div key={i} variants={itemVariants} className="lg:col-span-1">
              <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-[0.2em] mb-8">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.to}
                      className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                    >
                      <FiArrowRight className="w-0 group-hover:w-4 transition-all opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-2" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-[0.2em] mb-8">
              Stay Synced
            </h4>
            <p className="text-slate-400 text-sm mb-6">
              Insights on AI and Web Dev delivered to your inbox.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-white"
                />
              </div>
              <Button variant="primary" fullWidth className="bg-indigo-600 hover:bg-indigo-500 rounded-xl py-3 shadow-lg shadow-indigo-500/20">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} <span className="text-white font-bold">Vornix Developers</span>. 
              Built for the bold.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Node: Active</span>
            </div>
            <Link to="/contact" className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-cyan-400 transition-colors">
              Priority Support
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}