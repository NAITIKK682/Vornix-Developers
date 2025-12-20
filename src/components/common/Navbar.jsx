import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/contact', label: 'Contact' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full h-20">
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg rounded-2xl border border-white/40'
            : 'bg-transparent'
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-14' : 'h-16'}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-[110]">
            <div className="w-24 md:w-28">
              <img
                src="/images/logo.png"
                alt="Vornix"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="flex flex-col leading-none border-l border-slate-200 pl-2">
              <span className="font-black text-slate-900 text-xs md:text-base uppercase">
                Vornix
              </span>
              <span className="text-[7px] md:text-[9px] text-orange-600 font-bold uppercase tracking-widest">
                Developers
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-bold rounded-lg transition ${
                    isActive
                      ? 'text-orange-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden sm:block">
              <Button size="sm">Get a Quote</Button>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-xl bg-slate-100"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl md:hidden"
          >
            <div className="p-3 flex flex-col gap-1">
              {links.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="px-5 py-3 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
