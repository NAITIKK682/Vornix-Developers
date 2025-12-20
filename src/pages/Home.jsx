import React from 'react'
import Hero from '../components/home/Hero'
import ServicesPreview from '../components/home/ServicesPreview'
import TechStack from '../components/home/TechStack'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'
import CTA from '../components/home/CTA'

export default function Home(){
  return (
    <div>
      <Hero />
      <ServicesPreview />
      <TechStack />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </div>
  )
}
