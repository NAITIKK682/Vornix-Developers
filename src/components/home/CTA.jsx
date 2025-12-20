import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../common/Button'

export default function CTA(){
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {staggerChildren: 0.15}
    }
  }

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6}}
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative bg-gradient-to-br from-primary via-accent1 to-accent2 rounded-2xl overflow-hidden shadow-lg"
          initial={{opacity: 0, scale: 0.95}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
        >
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{duration: 10, repeat: Infinity, repeatType: 'reverse'}}
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
            }}
          />

          {/* Content */}
          <motion.div
            className="relative px-6 md:px-12 py-16 md:py-20 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wide mb-4">
                Ready to transform your digital presence?
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mt-4"
            >
              Let's Build Something <span className="block mt-2 text-white/90">Amazing Together</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Whether you need a stunning website, powerful AI integration, or complete brand transformation, our team is ready to bring your vision to life.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            >
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  Get a Free Quote
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-8 text-sm text-white/70"
            >
              Get a response within 24 hours • No obligation • Free consultation
            </motion.p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{y: [0, 30, 0]}}
            transition={{duration: 6, repeat: Infinity}}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{y: [0, -30, 0]}}
            transition={{duration: 6, repeat: Infinity, delay: 1}}
          />
        </motion.div>
      </div>
    </section>
  )
}
