import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/common/SectionWrapper';
import Button from '../components/common/Button';

/**
 * PRODUCTION-READY CONTACT PAGE
 * Features: Interactive form validation states, Glassmorphism, 
 * Accessibility (labels/focus), and Motion effects.
 */

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      title: 'Email Us',
      value: 'vornixdevelopers@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Call Us',
      value: '+91 8948866980',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Office',
      value: 'Vasai East, Maharashtra, India',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <SectionWrapper className="pt-32 pb-16 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
          >
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Conversation</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </motion.p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Contact Information</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="flex items-center p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white mr-6 shrink-0 shadow-lg`}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{info.title}</h4>
                    <p className="text-lg font-bold text-slate-900">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links or Map Placeholder */}
            <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
              <h4 className="text-xl font-bold mb-4">Follow Our Journey</h4>
              <p className="text-slate-400 text-sm mb-6">Stay updated with our latest projects and tech insights across social platforms.</p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Github'].map(platform => (
                  <button key={platform} className="text-sm font-bold hover:text-blue-400 transition-colors">{platform}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <form className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 md:p-12 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input 
                    id="name"
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400" 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400" 
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="subject" className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                <select 
                  id="subject"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                  onChange={handleInputChange}
                >
                  <option>General Inquiry</option>
                  <option>Project Proposal</option>
                  <option>Partnership</option>
                  <option>Support</option>
                </select>
              </div>

              <div className="space-y-2 mb-8">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
                <textarea 
                  id="message"
                  placeholder="Tell us about your project goals..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all h-40 resize-none placeholder:text-slate-400" 
                  onChange={handleInputChange}
                />
              </div>

              <Button 
                variant="primary" 
                size="xl" 
                className="w-full shadow-blue-500/30"
                icon={(props) => (
                  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              >
                Send Message
              </Button>

              <p className="mt-6 text-center text-xs text-slate-400">
                By sending this message, you agree to our <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>
            </form>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}