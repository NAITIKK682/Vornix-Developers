import React from 'react'
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from '../components/home/Hero'
import ServicesPreview from '../components/home/ServicesPreview'
import TechStack from '../components/home/TechStack'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'
import CTA from '../components/home/CTA'

export default function Home(){
  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-[1000]"
        style={{ scaleX }}
      />

      <div className="pt-1.5">
        <Hero />
        <ServicesPreview />
        <TechStack />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </div>
    </div>
  )
}