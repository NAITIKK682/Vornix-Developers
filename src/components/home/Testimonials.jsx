import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';

/**
 * PREMIUM TESTIMONIALS COMPONENT
 * Features: Indian Persona-based Social Proof, Fluid Spring Animations,
 * Auto-playing Carousel, and Responsive Design.
 */

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'CEO, BharatTech Solutions',
    quote: 'Vornix transformed our digital workflow. The Three.js integration they built for our product showcase increased our user engagement by 140%. Truly world-class engineering.',
    image: '/images/testimonials/aarav.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Priya Iyer',
    role: 'Product Lead, FinDhara',
    quote: 'The attention to detail in the UI/UX is unmatched. They understood the nuances of the Indian fintech market and delivered a platform that is both beautiful and highly functional.',
    image: '/images/testimonials/priya.jpg',
    rating: 5
  },
  {
    id: 3,
    name: 'Vikram Malhotra',
    role: 'Founder, UrbanKala',
    quote: 'Working with the Vornix team was a seamless experience. They didn\'t just write code; they acted as strategic partners in scaling our e-commerce architecture.',
    image: '/images/testimonials/vikram.jpg',
    rating: 5
  }
];

const StarRating = ({ count }) => (
  <div className="flex gap-1 mb-6">
    {[...Array(count)].map((_, i) => (
      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextStep, 6000);
    return () => clearInterval(timer);
  }, [nextStep]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <SectionWrapper className="bg-slate-50 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase"
          >
            Social Proof
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight"
          >
            Voice of Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Partners</span>
          </motion.h2>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Illustration or Quote Icon */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="relative">
              <div className="absolute -top-10 -left-10 text-slate-200 opacity-50">
                <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9125 16 16.0171 16H19.0171C19.5694 16 20.0171 15.5523 20.0171 15V9C20.0171 8.44772 19.5694 8 19.0171 8H16.0171C14.9125 8 14.0171 7.10457 14.0171 6V5C14.0171 3.89543 14.9125 3 16.0171 3H19.0171C21.2262 3 23.0171 4.79086 23.0171 7V15C23.0171 18.3137 20.3308 21 17.0171 21H14.0171ZM1 21L1 18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C1.89543 8 1 7.10457 1 6V5C1 3.89543 1.89543 3 3 3H6C8.20914 3 10 4.79086 10 7V15C10 18.3137 7.31371 21 4 21H1Z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 leading-tight relative z-10">
                Don't just take our word for it. Hear it from the <span className="text-blue-600">visionaries</span> we build for.
              </h3>
            </div>
          </div>

          {/* Right Side: Carousel Card */}
          <div className="lg:col-span-8 relative">
            <div className="relative min-h-[450px] md:min-h-[400px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 }
                  }}
                  className="absolute w-full"
                >
                  <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 p-8 md:p-14 border border-slate-100">
                    <StarRating count={TESTIMONIALS[index].rating} />
                    
                    <blockquote className="mb-10">
                      <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium italic">
                        "{TESTIMONIALS[index].quote}"
                      </p>
                    </blockquote>

                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                          <img 
                            src={TESTIMONIALS[index].image} 
                            alt={TESTIMONIALS[index].name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${TESTIMONIALS[index].name}&background=0D8ABC&color=fff`;
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{TESTIMONIALS[index].name}</h4>
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{TESTIMONIALS[index].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-12 lg:ml-14">
              <div className="flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-300 group"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextStep}
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-300 group"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Progress Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}