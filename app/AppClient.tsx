'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  BarChart3, Cpu, Briefcase, ChevronRight, 
  Mail, Github, Linkedin, Trophy, Zap, 
  Gauge, X, ArrowUpRight, Menu,
  Calendar, MapPin, Building2, Send, Clock, Flame
} from 'lucide-react';

/**
 * VISUAL THEME: CLAIRE OBSCUR x FIRE FORCE
 * Updated with TypeScript Fixes for Framer Motion Variants
 */

const App = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const socialLinks = {
    linkedin: "https://linkedin.com/in/bismareza81",
    github: "https://github.com/bismareza81",
    email: "mailto:bismareza@outlook.com"
  };

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const experiences = [
    {
      company: "Ayaskara Nisita Synergy",
      role: "Research and Development Supervisor",
      period: "Feb 2025 - Present",
      location: "Jakarta, Indonesia",
      description: "Overseeing and directing research and development activities within the consulting firm, ensuring efficiency and high-impact project delivery.",
      highlights: [
        "Monitors timelines, budgets, and resources for R&D projects to ensure compliance.",
        "Conducts trend analysis and market research to spot potential innovation opportunities.",
        "Anticipates client demands through rigorous data-driven forecasting."
      ]
    },
    {
      company: "Ayaskara Nisita Synergy",
      role: "Data Analyst",
      period: "Jan 2023 - Jun 2025",
      location: "Jakarta, Indonesia",
      description: "Explored complex datasets to identify patterns and inform business strategies through statistical modeling and visualization.",
      highlights: [
        "Gathered data from various sources ensuring accuracy and integrity throughout the lifecycle.",
        "Utilized statistical tools to identify trends informing business growth strategies.",
        "Prepared comprehensive reports and presentations communicating deep analytical insights."
      ]
    },
    {
      company: "Superintending Company of Indonesia",
      role: "Project Management Officer",
      period: "Jun 2019 - Dec 2022",
      location: "Jakarta, Indonesia",
      description: "Developed comprehensive project plans and tracked performance metrics for large-scale operations and strategic stakeholders.",
      highlights: [
        "Developed management plans outlining timelines, budgets, and resource allocations.",
        "Identified potential risks and developed mitigation strategies to minimize impact.",
        "Tracked performance against metrics and prepared regular status reports for stakeholders."
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Weather & Environmental Monitoring",
      description: "An interactive web application providing real-time weather monitoring tailored for forest management using dynamic visualization tools.",
      tech: ["Python", "Streamlit", "OpenWeatherMapAPI"],
      image: "https://images.unsplash.com/photo-1630260667842-830a17d12ec9?q=80&w=800",
      link: "https://forestweathermonicon.streamlit.app/"
    },
    {
      id: 2,
      title: "Googie Chatbot",
      description: "An intuitive AI-powered conversational platform featuring real-time chat capabilities and customizable response generation.",
      tech: ["Typescript", "Netlify", "Gemini API"],
      image: "https://plus.unsplash.com/premium_photo-1726550550053-6e5f7190f1bf?q=80&w=800",
      link: "https://googiechatbot.netlify.app/"
    },
    {
      id: 3,
      title: "Pocket Qur'an (ID)",
      description: "A digital companion for spiritual growth with high-resolution text, multilingual translations, and audio recitations.",
      tech: ["Javascript", "Netlify", "E-Qur'an.id API"],
      image: "https://images.unsplash.com/photo-1576764402988-7143f9cca90a?q=80&w=800",
      link: "https://pocketquran.netlify.app/"
    },
    {
      id:4,
      title: "Ultimate Tender Crawler",
      description: "A high-performance automation engine designed to eliminate the manual grind of monitoring government and private sector procurement portals. Built for speed and precision, it transforms fragmented bid listings into a unified, actionable data stream, ensuring you never miss a high-value opportunity",
      tech: ["n8n", "Telegram", "E-Qur'an.id API"],
      image: "https://plus.unsplash.com/premium_photo-1681010317789-68f31df3b9b0?q=80&w=800",
      link: "https://n8n.data-collect.id/workflow/KWMiZDFTqG-Q2D4n7IekK"
    },
  ];

  const expertiseData = [
    { 
      category: "Data Visualization", 
      icon: <BarChart3 className="w-5 h-5" />,
      achievements: [
        "Developing operational dashboards using Looker / Tableau.",
        "Building near real-time visualizations for asset monitoring.",
        "Optimizing queries to improve dashboard rendering performance."
      ]
    },
    { 
      category: "Artificial Intelligence", 
      icon: <Cpu className="w-5 h-5" />,
      achievements: [
        "Developing machine learning models for specific business use cases.",
        "Performing feature engineering and interpreting model results.",
        "Integrating model outputs into internal stakeholder dashboards."
      ]
    },
    { 
      category: "Business Analysis", 
      icon: <Briefcase className="w-5 h-5" />,
      achievements: [
        "Analyzing business processes for data transformation initiatives.",
        "Generating insights for operational efficiency and cost reduction.",
        "Acting as a bridge between business units and technical teams."
      ]
    }
  ];

  // Fix for TS2322: Add 'as const' to ensure literal types for transitions
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const menuVariants: Variants = {
    open: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 300, damping: 30 } as const 
    },
    closed: { 
      opacity: 0, 
      x: "100%", 
      transition: { type: "spring", stiffness: 300, damping: 30 } as const 
    }
  };

  if (!mounted) return null;

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {['home', 'works', 'experience', 'expertise', 'contact'].map((item) => (
        <button 
          key={item}
          onClick={() => {
            setActiveSection(item);
            if (mobile) setIsMenuOpen(false);
          }}
          className={`hover:text-[#FF4D00] transition-all relative uppercase tracking-[0.3em] font-black text-[10px] md:text-[11px] ${
            activeSection === item ? 'text-white' : 'text-gray-500'
          } ${mobile ? 'py-4 text-center w-full text-base border-b border-white/5' : ''}`}
        >
          {item}
          {!mobile && activeSection === item && (
            <motion.div layoutId="navline" className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF4D00]" />
          )}
        </button>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E0E0E0] font-sans selection:bg-[#FF4D00] selection:text-white overflow-x-hidden">
      {/* Background Data Grid Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(#FF4D00 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: "100%" }} 
        className="h-1 bg-linear-to-r from-[#FF4D00] to-[#FFAA00] fixed top-0 z-60 shadow-[0_0_20px_#FF4D00]" 
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-[#FF4D00] flex items-center justify-center relative overflow-hidden group-hover:bg-[#FF4D00] transition-all">
               <Flame className="w-5 h-5 md:w-6 md:h-6 text-[#FF4D00] group-hover:text-white transition-colors z-10" />
            </div>
            <div className="flex flex-col">
                <span className="font-black tracking-tighter text-lg md:text-xl uppercase leading-none">Bisma<span className="text-[#FF4D00]">.</span>Reza</span>
                <span className="text-[7px] md:text-[8px] font-mono tracking-[0.4em] text-gray-500 uppercase">Analysis Engine</span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 lg:gap-10 items-center">
            <NavItems />
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <div className="hidden lg:flex flex-col items-end font-mono text-[9px] text-gray-500 border-l border-white/10 pl-6">
            <div className="flex items-center gap-2 text-white">
                <Clock className="w-3 h-3 text-[#FF4D00]" />
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </div>
            <div className="uppercase tracking-widest mt-1">
                {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="closed" animate="open" exit="closed" variants={menuVariants}
            className="fixed inset-0 z-55 bg-[#0D0D0D] pt-24 px-6 md:hidden flex flex-col items-center"
          >
            <NavItems mobile />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32 md:pt-48 pb-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.section 
              key="home" initial="hidden" animate="visible" exit="hidden" 
              variants={staggerContainer} 
              className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center min-h-[60vh]"
            >
              <motion.div variants={fadeUp} className="order-2 lg:order-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 text-[#FF4D00] text-[9px] md:text-[10px] font-black uppercase mb-6 md:mb-10 tracking-[0.4em]">
                  <Gauge className="w-3 h-3 md:w-4 md:h-4" /> Data Storyteller // Active
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] mb-8 md:mb-12 italic tracking-tighter text-white">
                  IGNITE <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF4D00] to-[#FFAA00]">INSIGHTS.</span>
                </h1>
                <p className="text-gray-400 text-base md:text-lg mb-10 md:mb-12 max-w-xl leading-relaxed font-light border-l-4 border-[#FF4D00] pl-6 md:pl-8 mx-auto lg:mx-0 text-left">
                  I am a Business Analyst and R&D Supervisor specialized in architecting data-driven growth. I transform raw complexity into tactical precision.
                </p>
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                  <button 
                    onClick={() => setActiveSection('works')} 
                    className="w-full sm:w-auto px-10 py-5 bg-[#FF4D00] text-white font-black flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all group uppercase tracking-widest text-xs relative overflow-hidden"
                  >
                    <span className="relative z-10">Execute Deployment</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                  </button>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUp} className="relative group order-1 lg:order-2 max-w-[320px] sm:max-w-100 mx-auto lg:w-full">
                <div className="relative aspect-3/4 border-10 md:border-16 border-[#1A1A1B] shadow-2xl overflow-hidden bg-gray-900">
                    <img 
                      src="https://lh3.googleusercontent.com/d/14Xzl3jk6jKtsA5ITaPkQZkcILlqv-QHp" 
                      alt="Bisma Reza" 
                      className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000 scale-105" 
                    />
                </div>
              </motion.div>
            </motion.section>
          )}

          {activeSection === 'works' && (
            <motion.section key="works" initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-16 md:mb-24 border-b-2 md:border-b-4 border-white/5 pb-8 md:pb-12">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-white">Active <span className="text-[#FF4D00]">Deployments</span></h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mb-20">
                {projects.map((project) => (
                  <motion.div key={project.id} variants={fadeUp} className="bg-[#151515] border border-white/5 group flex flex-col hover:border-[#FF4D00]/50 transition-all">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="p-6 md:p-10 flex flex-col grow">
                      <h3 className="text-xl md:text-2xl font-black uppercase italic mb-3 text-white">{project.title}</h3>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-8 grow font-light">{project.description}</p>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between text-[9px] md:text-[10px] font-black uppercase italic tracking-widest bg-white/5 p-4 md:p-5 group-hover:bg-[#FF4D00] group-hover:text-white transition-all">
                        Launch Protocol <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'experience' && (
            <motion.section key="experience" initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-16 md:mb-24 border-b-2 md:border-b-4 border-white/5 pb-8 md:pb-12 text-left">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-white">Professional <span className="text-[#FF4D00]">History</span></h2>
              </motion.div>
              <div className="space-y-12 md:space-y-16">
                {experiences.map((exp, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-[#151515] p-6 md:p-12 border-l-4 md:border-l-8 border-[#FF4D00] group transition-all">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-8 mb-8 md:mb-12">
                      <div>
                        <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white leading-tight">{exp.company}</h3>
                        <h4 className="text-sm md:text-xl font-bold text-[#FF4D00] uppercase tracking-widest bg-white/5 inline-block px-3 py-1 mt-2">{exp.role}</h4>
                      </div>
                      <div className="flex flex-col md:items-end gap-3 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <div className="flex items-center gap-2 bg-white/5 px-3 md:px-4 py-2 border border-white/10 text-white w-fit">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 text-[#FF4D00]" /> {exp.period}
                        </div>
                        <div className="flex items-center gap-2 w-fit"><MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#FF4D00]" /> {exp.location}</div>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-8 md:mb-12 max-w-4xl text-sm md:text-lg leading-relaxed font-light italic">{exp.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                      {exp.highlights.map((highlight, j) => (
                        <div key={j} className="flex gap-3 items-start bg-white/5 p-4 md:p-6 border-b-2 border-transparent group-hover:border-[#FF4D00] transition-all">
                          <Zap className="w-4 h-4 text-[#FF4D00] shrink-0 mt-1" />
                          <p className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-wide">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'expertise' && (
            <motion.section key="expertise" initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-16 md:mb-24 border-b-2 md:border-b-4 border-white/5 pb-8 md:pb-12 text-left">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-white">Technical <span className="text-[#FF4D00]">Manifest</span></h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                {expertiseData.map((skill, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-[#151515] p-8 md:p-12 border-l-4 md:border-l-8 border-[#FF4D00] group transition-all">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 flex items-center justify-center mb-6 md:mb-10 border-b-4 border-[#FF4D00]">
                      {skill.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-8 text-white tracking-tighter">{skill.category}</h3>
                    <div className="space-y-6">
                      {skill.achievements.map((ach, j) => (
                        <div key={j} className="flex gap-3 items-start">
                          <Trophy className="w-5 h-5 text-[#FF4D00] shrink-0 mt-1" />
                          <p className="text-[11px] md:text-sm text-gray-400 font-bold uppercase tracking-wide">{ach}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* SECTION: CONTACT */}
          {activeSection === 'contact' && (
            <motion.section 
              key="contact"
              initial="hidden" animate="visible" exit="hidden" 
              variants={staggerContainer}
            >
                <motion.div variants={fadeUp} className="mb-16 md:mb-24 border-b-2 md:border-b-4 border-white/5 pb-8 md:pb-12 text-left">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-white">Get to Know <span className="text-[#FF4D00]">Me</span></h2>
                    <p className="text-gray-500 mt-4 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em]">Establish Communication Bridge</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    <motion.div variants={fadeUp}>
                        <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-6 md:mb-8 text-white tracking-tight">Open <span className="text-[#FF4D00]">Channels</span></h3>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-light italic border-l-2 border-white/10 pl-6 md:pl-8">
                          Every great partnership begins with a simple hello; let’s break the ice and start chatting about how can i support your business goals
                        </p>
                        <div className="space-y-4 md:space-y-6">
                            <a href={socialLinks.email} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white/5 border border-white/5 hover:border-[#FF4D00]/50 transition-all">
                                <Mail className="w-6 h-6 md:w-8 md:h-8 text-[#FF4D00]" />
                                <div className="overflow-hidden">
                                    <div className="text-[8px] md:text-[10px] text-gray-500 uppercase font-black tracking-widest">Email Endpoint</div>
                                    <div className="text-white font-bold text-xs md:text-base wrap-break-word">bismareza@outlook.com</div>
                                </div>
                            </a>
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white/5 border border-white/5 hover:border-[#FF4D00]/50 transition-all">
                                <Linkedin className="w-6 h-6 md:w-8 md:h-8 text-[#FF4D00]" />
                                <div className="overflow-hidden">
                                    <div className="text-[8px] md:text-[10px] text-gray-500 uppercase font-black tracking-widest">Digital ID</div>
                                    <div className="text-white font-bold text-xs md:text-base wrap-break-word">linkedin.com/in/bismareza81</div>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="bg-[#151515] p-6 md:p-12 border-t-8 border-[#FF4D00]">
                        <form className="space-y-6 md:space-y-8">
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Identifier</label>
                                <input type="text" placeholder="NAME / ORGANIZATION" className="w-full bg-black/50 border border-white/10 p-4 md:p-5 text-white outline-none focus:border-[#FF4D00] transition-colors font-mono text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Context</label>
                                <textarea rows={4} placeholder="DESCRIBE THE NEEDS..." className="w-full bg-black/50 border border-white/10 p-4 md:p-5 text-white outline-none focus:border-[#FF4D00] transition-colors font-mono text-sm resize-none"></textarea>
                            </div>
                            <button type="button" className="w-full bg-[#FF4D00] text-white py-4 md:py-6 font-black uppercase italic tracking-[0.5em] text-xs flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all">
                                SEND <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0D0D0D] border-t border-white/5 py-16 md:py-32 px-4 sm:px-6 mt-20 md:mt-40 relative overflow-hidden">
        <div className="absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 p-6 md:p-10 opacity-5 select-none text-[10rem] md:text-[20rem] font-black italic text-white pointer-events-none">
          💬
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-12 md:gap-16 relative z-10">
          <div className="text-center md:text-left w-full">
            <h4 className="text-[#FF4D00] font-black italic text-4xl md:text-6xl mb-6 md:mb-8 uppercase tracking-tighter">「 ✦ يَتْبَع ✦ 」</h4>
            <p className="text-gray-500 max-w-sm mb-8 md:mb-12 text-xs md:text-sm font-light italic leading-relaxed mx-auto md:mx-0">
                Made with 💗 from Bisma Reza.
            </p>
            <div className="flex gap-8 justify-center md:justify-start">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FF4D00] transition-colors">
                <Linkedin className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FF4D00] transition-colors">
                <Github className="w-6 h-6 md:w-8 md:h-8" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4 md:gap-6 w-full">
            <div className="w-24 md:w-32 h-1 md:h-2 bg-[#FF4D00]" />
            <p className="text-[7px] md:text-[9px] font-mono font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-gray-700 text-center md:text-right">
                [BISMA REZA] ©2026 // All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;