import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Globe,
  Github,
  ArrowRight,
  Target,
  Eye,
  Heart,
  CheckCircle,
  Award,
  Users,
  Zap,
  Shield,
  Code2,
  Layers,
  Rocket,
  MessageSquare,
  Coffee,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionWrapper from "../components/common/SectionWrapper";
import Button from "../components/common/Button";

/**
 * @file About.jsx
 * @version 2.0.2
 * @description Enterprise-grade About Page for Vornix Developers.
 * Fixes: Resolved excessive whitespace between sections and optimized mobile spacing.
 */

// --- DATA CONFIGURATION ---

const TEAM_MEMBERS = [
  {
    name: "Viral Maru",
    role: "Frontend Developer",
    bio: "A performance-obsessed developer crafting pixel-perfect, interactive user interfaces and robust server-side logic.",
    image: "/images/team/viral-maru.jpg",
    skills: [
      "HTML, CSS & JS/TypeScript",
      "React / Next.js",
      "GraphQL / REST APIs",
      "Tailwind CSS / Framer Motion",
      "Git & Version Control"
    ],

    socials: {
      linkedin: "https://www.linkedin.com/in/viral-maru-671119375",
      instagram: "https://www.instagram.com/viralmaru004/",
      portfolio: "https://personal-portfolio-website-eight-cyan.vercel.app/?",
      github: "https://github.com/Viral-cyber",
    },
  },
  {
    name: "Omkar Deshmukh",
    role: "Backend Developer",
    bio: "Expert in distributed systems, security protocols, and data-driven architectural decisions.",
    image: "/images/team/omkar-deshmukh.jpg",
    skills: [
      "Node.js / Express.js",
      "Python / Django / Flask",
      "SQL / NoSQL Databases",
      "REST & GraphQL APIs",
      "Authentication & Deployment",
      "Git & Version Control"
    ],

    socials: {
      linkedin: "https://www.linkedin.com/in/omkar-deshmukh-om001/",
      instagram: "https://www.instagram.com/_omkarr_001/",
      portfolio: "https://omkar.design",
      github: "https://github.com/OmkarDeshmukh001",
    },
  },
  {
    name: "Naitik Kushwaha",
    role: "Full Stack Developer",
    bio: "Visionary architect specializing in scalable enterprise solutions and high-performance system design with over 8 years of industry experience.",
    image: "/images/team/naitik-kushwaha.jpg",
    skills: [
      "HTML, CSS & JS/TypeScript",
      "React / Next.js",
      "Node.js / Express.js / Django",
      "SQL / NoSQL Databases",
      "REST & GraphQL APIs",
      "Git & Deployment Basics"
    ],

    socials: {
      linkedin: "https://www.linkedin.com/in/naitik-kushwaha",
      instagram: "https://www.instagram.com/mr_naitik_maurya",
      portfolio: "https://naitik-portfolio-1.onrender.com/",
      github: "https://github.com/NAITIKK682",
    },
  },

  {
    name: "Rakhmaji Gawade",
    role: "UI/UX & Database",
    bio: "Logic-driven creative focused on human-centric design systems that bridge the gap between technical complexity and intuitive utility.",
    image: "/images/team/rakhmaji-gawade.jpg",
skills: [
  "Figma / Adobe XD (UI/UX Design)",
  "Wireframing & Prototyping",
  "Responsive Design",
  "SQL & NoSQL Databases"
],

    socials: {
      linkedin: "https://www.linkedin.com/in/rakhamaji-gawade-1a2b1b29a",
      instagram: "https://www.instagram.com/_rakhamaji_xlv_/",
      portfolio: "https://rakhmaji.studio",
      github: "https://github.com/45rakhamaji",
    },
  },
];

const TIMELINE = [
  {
    year: "2025",
    title: "The Genesis",
    desc: "Vornix was founded by a focused team of engineers with a mission to build scalable, high-performance digital products for modern startups.",
  },
  {
    year: "2026",
    title: "Early Growth",
    desc: "Delivered production-ready web, AI, and SaaS solutions while building long-term partnerships with early-stage and mid-scale businesses.",
  },
  {
    year: "2027",
    title: "Expansion & Trust",
    desc: "Expanded service offerings globally with advanced UI/UX systems, cloud-native architectures, and data-driven platforms.",
  },
  {
    year: "2028",
    title: "Innovation & Leadership",
    desc: "Leading innovation in AI-powered applications, automation systems, and next-generation web experiences.",
  },
];

const TECH_STACK = [
  // Frontend
  "HTML5",
  "CSS3",
  "JavaScript (ES6+)",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",

  // Backend
  "Node.js",
  "Express.js",
  "Python",
  "FastAPI",
  "Django",

  // Databases
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "SQLite",

  // DevOps & Cloud
  "Docker",
  "Kubernetes",
  "AWS",
  "Vercel",
  "Netlify",
  "Render",

  // Tools & APIs
  "Git",
  "GitHub",
  "REST API",
  "GraphQL",
  "JWT Auth",

  // AI / ML
  "Machine Learning",
  "NLP",
  "OpenAI API",
];

const COMPANY_VALUES = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Precision Mission",
    text: "To empower global brands by building high-performance digital foundations that drive exponential growth.",
    color: "from-indigo-500 to-indigo-700",
    shadow: "shadow-indigo-200",
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Future Vision",
    text: "To be the global benchmark for technical excellence and creative ingenuity in the software landscape.",
    color: "from-cyan-400 to-cyan-600",
    shadow: "shadow-cyan-200",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Core Values",
    text: "Rooted in absolute transparency, continuous learning, and a relentless obsession with quality-first engineering.",
    color: "from-purple-500 to-purple-700",
    shadow: "shadow-purple-200",
  },
];

// --- ANIMATION VARIANTS ---

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// --- SUB-COMPONENTS ---

const TeamMemberCard = ({ member }) => {
  return (
    <motion.div variants={FADE_UP} className="group">
      {/* Stabilized Image Container to prevent square-flicker bug */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-100 aspect-[3/4] shadow-sm transform-gpu will-change-transform group-hover:shadow-2xl transition-all duration-700">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transform-gpu scale-100 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500">
          <SocialAction
            href={member.socials.linkedin}
            icon={<Linkedin size={20} />}
          />
          <SocialAction
            href={member.socials.instagram}
            icon={<Instagram size={20} />}
          />
          <SocialAction
            href={member.socials.github}
            icon={<Github size={20} />}
          />
          <SocialAction
            href={member.socials.portfolio}
            icon={<Globe size={20} />}
          />
        </div>
      </div>

      <div className="mt-8 text-center sm:text-left px-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h4 className="text-2xl font-montserrat font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
            {member.name}
          </h4>
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-tighter rounded-full self-start sm:self-center">
            {member.role}
          </span>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-4 italic">
          "{member.bio}"
        </p>

        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {member.skills.map((skill, i) => (
            <span
              key={i}
              className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 group-hover:border-indigo-100 group-hover:text-indigo-400 transition-colors"
            >
              #{skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SocialAction = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.15, backgroundColor: "#4f46e5", color: "#fff" }}
    whileTap={{ scale: 0.9 }}
    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl flex items-center justify-center transition-all shadow-xl"
  >
    {icon}
  </motion.a>
);

const TechMarquee = () => (
  <div className="py-12 bg-slate-900 overflow-hidden relative">
    <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent z-10" />
    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent z-10" />
    <motion.div
      animate={{ x: [0, -2000] }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap gap-16 items-center"
    >
      {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
        <span
          key={i}
          className="text-slate-700 text-4xl md:text-6xl font-montserrat font-black uppercase tracking-tighter hover:text-indigo-500 transition-colors cursor-default"
        >
          {tech}
        </span>
      ))}
    </motion.div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function About() {
  const containerRef = useRef(null);

  return (
    <div
      className="bg-white font-poppins selection:bg-indigo-600 selection:text-white"
      ref={containerRef}
    >
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-50/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-50/50 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
        </div>

        <SectionWrapper className="relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-xl border border-slate-100 text-indigo-600 text-[11px] font-black uppercase tracking-[0.3em] mb-10"
            >
              <Sparkles className="w-4 h-4" /> Vornix Developers Collective
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-9xl font-montserrat font-black leading-[0.95] mb-10 text-slate-900 tracking-tight"
            >
              Building the <br />
              <span className="mt-3 inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                Unimagined.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12"
            >
              We are a team of logic-driven engineers and human-centric
              designers building resilient digital products that define global
              market leaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <Link to="/contact">
                <button className="px-12 py-6 bg-slate-900 text-white rounded-full font-black text-lg hover:bg-indigo-600 transition-all hover:shadow-2xl hover:shadow-indigo-200 active:scale-95">
                  Start Building
                </button>
              </Link>
              <button className="px-12 py-6 bg-white text-slate-900 border-2 border-slate-100 rounded-full font-black text-lg hover:border-indigo-600 transition-all">
                Our Story
              </button>
            </motion.div>
          </div>
        </SectionWrapper>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-600 to-transparent" />
        </motion.div>
      </section>

      {/* 2. BRAND STORY SECTION */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <SectionWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={STAGGER_CONTAINER}
                className="space-y-8"
              >
                {/* FIXED TAG BELOW: Using motion.h2 correctly */}
                <motion.h2
                  variants={FADE_UP}
                  className="text-4xl md:text-6xl font-montserrat font-black text-slate-900 leading-tight"
                >
                  Where Logic Meets <br />
                  <span className="text-indigo-600 italic">Creativity.</span>
                </motion.h2>
                <motion.div
                  variants={FADE_UP}
                  className="w-24 h-2 bg-indigo-600 rounded-full"
                />
                <motion.p
                  variants={FADE_UP}
                  className="text-slate-600 text-xl leading-relaxed max-w-2xl"
                >
                  Vornix Developers started as a specialized task force for
                  high-stakes software engineering. Today, we are the primary
                  technical partner for brands that demand pixel perfection and
                  uncompromising performance.
                </motion.p>
                <motion.div
                  variants={FADE_UP}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8"
                >
                  {[
                    { label: "Uptime", val: "95%" },
                    { label: "Partners", val: "5+" },
                    { label: "LOC", val: "250k" },
                    { label: "Growth", val: "100%" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-3xl font-montserrat font-black text-slate-900">
                        {stat.val}
                      </p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Vornix Team Collaboration"
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600 rounded-full blur-[80px] opacity-20" />
            </motion.div>
          </div>
        </SectionWrapper>
      </section>

      {/* 3. TECH MARQUEE */}
      <TechMarquee />

      {/* 4. MISSION & PHILOSOPHY */}
      <section className="py-16 md:py-24 bg-white">
        <SectionWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-montserrat font-black text-slate-900 mb-6 tracking-tighter">
              Our North Star
            </h2>
            <p className="text-slate-500 text-lg md:text-xl">
              Engineering solutions that solve tomorrow's problems, today.
            </p>
          </div>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {COMPANY_VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                variants={FADE_UP}
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative group overflow-hidden"
              >
                <div
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${val.color} text-white flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {val.icon}
                </div>
                <h3 className="text-3xl font-montserrat font-black text-slate-900 mb-4 tracking-tighter">
                  {val.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-lg">
                  {val.text}
                </p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl translate-x-10 -translate-y-10 group-hover:bg-indigo-100 transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>
      </section>

      {/* 5. TEAM: THE COLLECTIVE */}
      <section className="py-16 md:py-24 bg-slate-50/80 border-y border-slate-100">
        <SectionWrapper>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-10">
            <div className="max-w-3xl">
              <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.4em] mb-4 block">
                Engineers & Creators
              </span>
              <h2 className="text-5xl md:text-8xl font-montserrat font-black text-slate-900 tracking-tighter">
                Meet the <span className="text-indigo-600">Collective.</span>
              </h2>
            </div>
            <p className="text-slate-500 text-xl max-w-sm font-light leading-relaxed">
              Hand-picked specialists driven by an obsession for clean code and
              intuitive design.
            </p>
          </div>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16"
          >
            {TEAM_MEMBERS.map((member, idx) => (
              <TeamMemberCard key={idx} member={member} />
            ))}
          </motion.div>
        </SectionWrapper>
      </section>

      {/* 6. TIMELINE SECTION */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <SectionWrapper>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-montserrat font-black text-slate-900 mb-4 tracking-tighter">
              Our Evolution
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 hidden md:block" />
            <div className="space-y-24">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-6xl font-montserrat font-black text-indigo-50/80 block mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-3xl font-montserrat font-black text-slate-900 mb-4 tracking-tighter">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 border-8 border-white shadow-xl z-10" />
                    <div className="absolute w-12 h-12 bg-indigo-100 rounded-full animate-ping opacity-50" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* 7. METHODOLOGY SECTION */}
      <section className="py-16 md:py-24 bg-slate-900">
        <SectionWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-7xl font-montserrat font-black text-white mb-12 tracking-tighter leading-none">
                Our <span className="text-indigo-400">Method.</span>
              </h2>
              <div className="space-y-10">
                {[
                  {
                    icon: <MessageSquare />,
                    title: "01. Discovery",
                    desc: "Deep dive into business logic and user pain points.",
                  },
                  {
                    icon: <Layers />,
                    title: "02. Architecture",
                    desc: "Building scalable system blueprints before writing a line of code.",
                  },
                  {
                    icon: <Code2 />,
                    title: "03. Development",
                    desc: "Iterative, quality-first engineering with constant QA.",
                  },
                  {
                    icon: <Rocket />,
                    title: "04. Launch",
                    desc: "Seamless deployment with 24/7 performance monitoring.",
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xl mb-1">
                        {step.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative p-8 md:p-16 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[4rem] shadow-3xl text-center"
            >
              <Coffee className="w-16 h-16 text-white/20 mx-auto mb-8" />
              <p className="text-2xl md:text-4xl font-light italic text-white leading-relaxed mb-12">
                "We don't just ship features; we engineer competitive
                advantages."
              </p>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md mb-4 flex items-center justify-center overflow-hidden border border-white/20">
                  <img
                    src="/images/imp/methodlogo.jpg"
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white font-black text-lg">Team</p>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">
                  {" "}
                  @ Vornix Developers
                </p>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="py-24 md:py-40 relative">
        <SectionWrapper>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-5xl mx-auto"
          >
            <h2 className="text-5xl md:text-9xl font-montserrat font-black text-slate-900 mb-10 tracking-tighter leading-[0.9]">
              Ready to <br /> <span className="text-indigo-600">Level Up?</span>
            </h2>
            <p className="text-slate-500 text-xl md:text-3xl mb-16 font-light">
              Join the elite group of brands scaling with Vornix technology.
            </p>
            <Link to="/contact">
              <button className="bg-slate-900 text-white px-16 py-8 rounded-full font-black text-2xl hover:bg-indigo-600 transition-all hover:shadow-3xl hover:shadow-indigo-200 group flex items-center gap-6 mx-auto">
                Secure Your Roadmap{" "}
                <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </SectionWrapper>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[80%] h-[80%] bg-indigo-50/50 rounded-full blur-[160px]" />
      </section>
    </div>
  );
}