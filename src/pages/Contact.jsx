/* ##############################################################################
#                                                                              #
#   🛑 DANGER ZONE: DATA COLLECTION API INTEGRATION                            #
#   -------------------------------------------------------                    #
#                                                                              #
#   THIS PAGE IS RESPONSIBLE FOR USER LEAD GENERATION.                         #
#   MODES: GOOGLE SHEETS (SHEETDB) & EMAIL (FORMSUBMIT)                        #
#                                                                              #
#   DO NOT EDIT:                                                               #
#   1. API ENDPOINTS                                                           #
#   2. FORM STATE KEYS (NAME, EMAIL, MESSAGE, ETC.)                            #
#   3. SUBMISSION LOGIC                                                        #
#                                                                              #
#   BREAKING THIS CODE WILL RESULT IN LOSS OF CUSTOMER DATA.                   #
#                                                                              #
##############################################################################
*/

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiInstagram,
  FiMessageSquare,
  FiClock,
  FiShield,
} from "react-icons/fi";
import SectionWrapper from "../components/common/SectionWrapper";
import Button from "../components/common/Button";

/**
 * 🚀 ENTERPRISE-GRADE CONTACT INTERFACE (V3.0)
 * FEATURES:
 * - Multi-stage Form Validation
 * - Success/Error Feedback UI
 * - Interactive FAQ Accordion
 * - Dynamic SVG Backgrounds
 * - Social Integration & Time-Zone Logic
 */

/* ================= DATA STRUCTURES ================= */

const CONTACT_METHODS = [
  {
    title: "Email Us",
    value: "vornixdevelopers@gmail.com",
    desc: "Our response time is typically < 2 hours.",
    icon: <FiMail />,
    gradient: "from-blue-500 to-indigo-600",
    action: "mailto:vornixdevelopers@gmail.com",
  },
  {
    title: "Call Us",
    value: "8948866980 / 7972569918",
    desc: "Available Mon-Fri, 9am - 6pm IST.",
    icon: <FiPhone />,
    gradient: "from-purple-500 to-pink-600",
    action: "tel:+918948866980,+917972569918",
  },
  {
    title: "Office",
    value: "Vasai East, Maharashtra",
    desc: "Visit us for a coffee & tech talk.",
    icon: <FiMapPin />,
    gradient: "from-orange-500 to-red-600",
    action: "#",
  },
];

const FAQS = [
  {
    q: "How fast can we start a project?",
    a: "After the initial consultation, we can typically kick off technical discovery within 48 hours.",
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDA)?",
    a: "Yes, we prioritize intellectual property. We sign NDAs before any deep technical discussions.",
  },
  {
    q: "What is your typical budget range?",
    a: "We handle everything from MVP builds (₹50k+) to enterprise ecosystems (₹5L+). We tailor solutions to your scale.",
  },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    icon: <FiLinkedin />,
    color: "hover:text-blue-500",
    url: "https://www.linkedin.com/in/vornix-developers/",
  },
  {
    name: "Github",
    icon: <FiGithub />,
    color: "hover:text-slate-400",
    url: "https://github.com/vornixdevelopers",
  },
  {
    name: "Twitter",
    icon: <FiTwitter />,
    color: "hover:text-sky-400",
    url: "https://twitter.com/yourhandle",
  },
  {
    name: "Instagram",
    icon: <FiInstagram />,
    color: "hover:text-pink-500",
    url: "https://www.instagram.com/vornixdevelopers/",
  },
];

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ================= MAIN COMPONENT ================= */

export default function Contact() {
  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // State Management
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "", // Added Phone Number to state
    subject: "General Inquiry",
    message: "",
    company: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [activeFaq, setActiveFaq] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Tracking Logic for Background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      // 2. Direct API endpoints for Vite/React setup
      const sheetDbUrl = "https://sheetdb.io/api/v1/bcwcf7943nr07";
      const formSubmitUrl = "https://formsubmit.co/ajax/vornixdevelopers@gmail.com";

      // 3. Parallel fetch calls to Google Sheets and Email
      const [sheetRes, emailRes] = await Promise.all([
        fetch(sheetDbUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [formState] }), // formState includes phone now
        }),
        fetch(formSubmitUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        })
      ]);

      if (!sheetRes.ok || !emailRes.ok) {
        throw new Error("Service failed");
      }

      // 4. WhatsApp redirect logic
      const whatsappMsg = `*New Inquiry from Vornix*%0A*Name:* ${formState.name}%0A*Email:* ${formState.email}%0A*Phone:* ${formState.phone}%0A*Subject:* ${formState.subject}%0A*Message:* ${formState.message}`;
      window.open(`https://wa.me/918948866980?text=${whatsappMsg}`, '_blank');

      // 5. Final success state
      setStatus("success");
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
        company: "",
      });

      // Return to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);

    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white font-poppins selection:bg-indigo-100 relative">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-[1000]"
        style={{ scaleX }}
      />

      {/* 1. INTERACTIVE BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ x: mousePos.x / 20, y: mousePos.y / 20 }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"
        />
        <motion.div
          animate={{ x: -mousePos.x / 25, y: -mousePos.y / 25 }}
          className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[50%] bg-purple-50 rounded-full blur-[100px] opacity-50"
        />
      </div>

      <div className="pt-1.5">
        {/* 2. HERO SECTION */}
        <section className="relative pt-40 pb-20 z-10">
          <SectionWrapper>
            <div className="max-w-5xl mx-auto text-center px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Currently Accepting Projects
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]"
              >
                Let’s build the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  next big thing.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
              >
                Have an idea? We have the engineering power. Reach out and let’s
                turn your vision into a production-grade reality.
              </motion.p>
            </div>
          </SectionWrapper>
        </section>

        {/* 3. MAIN CONTACT GRID */}
        <SectionWrapper className="pb-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
            {/* LEFT COLUMN: INFO & TRUST */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-10"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
                  Direct Channels
                </h3>
                {CONTACT_METHODS.map((info, idx) => (
                  <motion.a
                    href={info.action}
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex items-center p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white mr-6 shrink-0 shadow-lg group-hover:rotate-6 transition-transform`}
                    >
                      <span className="text-2xl">{info.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {info.title}
                      </h4>
                      <p className="text-lg font-black text-slate-900 tracking-tight">
                        {info.value}
                      </p>
                      <p className="text-xs text-slate-400 font-medium mt-1">
                        {info.desc}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Availability Widget */}
              <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-white/10 text-blue-400">
                      <FiClock />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">
                      Availability
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Global Operations</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    We work across IST, EST, and GMT timezones to ensure seamless
                    delivery for our international partners.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.name}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl bg-white/5 border border-white/10 ${link.color} transition-all hover:bg-white/10 text-xl`}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <FiShield className="text-blue-600 text-2xl" />
                  <span className="text-sm font-bold text-slate-900">
                    Your data is secure with Vornix.
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  We use 256-bit encryption for all project inquiries and follow
                  strict GDPR guidelines for data handling.
                </p>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: THE FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] p-8 md:p-14 relative overflow-hidden">
                {/* Form Status Overlays */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mb-6"
                      >
                        <FiCheckCircle />
                      </motion.div>
                      <h3 className="text-3xl font-black text-slate-900 mb-2">
                        Message Received!
                      </h3>
                      <p className="text-slate-500 font-medium">
                        Our team has been notified. Check your inbox for a
                        confirmation shortly.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-8 rounded-2xl"
                        onClick={() => setStatus("idle")}
                      >
                        Send Another
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="relative z-10">
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                      Project Brief
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">
                      Fill out the details below and we’ll get back to you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2 group">
                      <label
                        htmlFor="name"
                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          required
                          id="name"
                          type="text"
                          value={formState.name}
                          placeholder="John Doe"
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-300 font-bold"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 group">
                      <label
                        htmlFor="email"
                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors"
                      >
                        Email Address
                      </label>
                      <input
                        required
                        id="email"
                        type="email"
                        value={formState.email}
                        placeholder="john@vornix.com"
                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-300 font-bold"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Added Phone Number & Company in same row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2 group">
                      <label
                        htmlFor="phone"
                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formState.phone}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 transition-all font-bold placeholder:text-slate-300"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="company"
                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                      >
                        Company (Optional)
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formState.company}
                        placeholder="Acme Corp"
                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 transition-all font-bold placeholder:text-slate-300"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Inquiry Type now full width or own section */}
                  <div className="mb-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                      >
                        Inquiry Type
                      </label>
                      <select
                        id="subject"
                        value={formState.subject}
                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 transition-all font-bold appearance-none cursor-pointer"
                        onChange={handleInputChange}
                      >
                        <option>General Inquiry</option>
                        <option>Web Development</option>
                        <option>AI/ML Integration</option>
                        <option>UI/UX Design</option>
                        <option>Marketing Strategy</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 mb-10">
                    <label
                      htmlFor="message"
                      className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                    >
                      Project Details
                    </label>
                    <textarea
                      required
                      id="message"
                      value={formState.message}
                      placeholder="Describe your goals, challenges, and timeline..."
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 transition-all h-44 resize-none font-medium leading-relaxed placeholder:text-slate-300"
                      onChange={handleInputChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    variant="primary"
                    size="xl"
                    className={`w-full py-6 rounded-2xl shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 transition-all ${
                      status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {status === "loading" ? (
                      <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Proposal <FiSend />
                      </>
                    )}
                  </Button>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-center text-red-500 text-xs font-bold uppercase tracking-widest"
                    >
                      Something went wrong. Please check your network.
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* 4. FAQ SECTION (NEW) */}
        <section className="py-24 bg-slate-50/50">
          <SectionWrapper>
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-16">
                <FiMessageSquare className="text-4xl text-blue-600 mx-auto mb-4" />
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                  Quick Answers
                </h2>
                <p className="text-slate-500 font-medium">
                  Common questions before starting a partnership.
                </p>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full px-8 py-6 text-left flex justify-between items-center group"
                    >
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: activeFaq === i ? 180 : 0 }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <div className="px-8 pb-8 text-slate-500 leading-relaxed font-medium">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </section>

        {/* 5. GOOGLE MAPS - VASAI, MAHARASHTRA */}
        <section className="h-[400px] w-full bg-slate-200 relative overflow-hidden group">
          <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-all duration-700 pointer-events-none" />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60264.09346430348!2d72.78446219800666!3d19.25629969634925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0e6e8c7512d%3A0x6b840134446b3060!2sVasai-Virar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703258756987!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Vornix Location - Vasai"
          />
        </section>
      </div>
    </div>
  );
}