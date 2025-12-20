import React from 'react'
import { motion } from 'framer-motion'

export default function ServiceCard({icon, title, children, variant = 'default'}){
  const variants = {
    default: 'bg-white border border-slate-100',
    outlined: 'bg-slate-50 border border-slate-200',
    gradient: 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100'
  }

  return (
    <motion.div
      whileHover={{scale: 1.04, shadowScale: 1.1}}
      whileTap={{scale: 0.98}}
      className={`${variants[variant]} rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300 p-6 cursor-default group`}
    >
      <div className="flex items-start gap-4">
        <motion.div
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent1/10 flex items-center justify-center text-primary flex-shrink-0"
          whileHover={{scale: 1.12}}
          transition={{type: 'spring', stiffness: 400, damping: 10}}
        >
          {icon}
        </motion.div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 text-sm md:text-base group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">{children}</p>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-accent1/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={{opacity: 0}}
        whileHover={{opacity: 0.5}}
      />
    </motion.div>
  )
}
