'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import { 
  BarChart3, Cpu, Briefcase, ChevronRight, 
  Github, Linkedin, Trophy, Zap, 
  Gauge, X, ArrowUpRight, Menu,
  Calendar, MapPin, Send, Clock, Flame
} from 'lucide-react';

/**
 * VISUAL THEME: NEO-BRUTALISM x LIGNE CLAIRE (TINTIN)
 * Key features: Flat colors, thick black borders, hard offset shadows, high legibility.
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
        "Monitors timelines, budgets, and resources for R&D projects.",
        "Conducts trend analysis and market research.",
        "Anticipates client demands through rigorous data forecasting."
      ]
    },
    {
      company: "Ayaskara Nisita Synergy",
      role: "Data Analyst",
      period: "Jan 2023 - Jun 2025",
      location: "Jakarta, Indonesia",
      description: "Explored complex datasets to identify patterns and inform business strategies through statistical modeling and visualization.",
      highlights: [
        "Gathered data from various sources ensuring accuracy.",
        "Utilized statistical tools to identify growth trends.",
        "Prepared comprehensive reports and analytical insights."
      ]
    },
    {
      company: "Superintending Company of Indonesia",
      role: "Project Management Officer",
      period: "Jun 2019 - Dec 2022",
      location: "Jakarta, Indonesia",
      description: "Developed comprehensive project plans and tracked performance metrics for large-scale operations and strategic stakeholders.",
      highlights: [
        "Developed management plans for timelines and budgets.",
        "Identified risks and developed mitigation strategies.",
        "Tracked performance against metrics for stakeholders."
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Weather & Environmental",
      description: "Interactive web application providing real-time weather monitoring tailored for forest management.",
      tech: ["Python", "Streamlit", "OpenWeatherMap"],
      image: "https://images.unsplash.com/photo-1630260667842-830a17d12ec9?q=80&w=800",
      link: "https://forestweathermonicon.streamlit.app/"
    },
    {
      id: 2,
      title: "Googie Chatbot",
      description: "Intuitive AI-powered conversational platform featuring real-time chat capabilities and custom responses.",
      tech: ["Typescript", "Netlify", "Gemini API"],
      image: "https://plus.unsplash.com/premium_photo-1726550550053-6e5f7190f1bf?q=80&w=800",
      link: "https://googiechatbot.netlify.app/"
    },
    {
      id: 3,
      title: "Pocket Qur'an (ID)",
      description: "Digital companion for spiritual growth with high-resolution text, multilingual translations, and audio.",
      tech: ["Javascript", "Netlify", "E-Qur'an API"],
      image: "https://images.unsplash.com/photo-1576764402988-7143f9cca90a?q=80&w=800",
      link: "https://pocketquran.netlify.app/"
    },
    {
      id: 4,
      title: "Tender Crawler",
      description: "High-performance automation engine to monitor government and private sector procurement portals.",
      tech: ["n8n", "Telegram", "Automation"],
      image: "https://plus.unsplash.com/premium_photo-1681010317789-68f31df3b9b0?q=80&w=800",
      link: "https://n8n.data-collect.id/workflow/KWMiZDFTqG-Q2D4n7IekK"
    },
  ];

  const expertiseData = [
    { 
      category: "Data Viz", 
      icon: <BarChart3 className="w-8 h-8" />,
      color: "bg-[#FFD600]", // Mustard Yellow
      achievements: [
        "Operational dashboards using Looker / Tableau.",
        "Near real-time visualizations for asset monitoring.",
        "Query optimization to improve rendering."
      ]
    },
    { 
      category: "AI & ML", 
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-[#4BA3E3]", // Tintin Blue
      achievements: [
        "Developing machine learning models for business.",
        "Performing feature engineering & interpretation.",
        "Integrating model outputs into dashboards."
      ]
    },
    { 
      category: "Biz Analysis", 
      icon: <Briefcase className="w-8 h-8" />,
      color: "bg-[#E32636]", // Tintin Red
      achievements: [
        "Analyzing business processes for transformation.",
        "Generating insights for operational efficiency.",
        "Bridging business units and technical teams."
      ]
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const menuVariants = {
    open: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring" as const, stiffness: 300, damping: 30 } 
    },
    closed: { 
      opacity: 0, 
      x: 400, 
      transition: { type: "spring" as const, stiffness: 300, damping: 30 } 
    }
  };

  if (!mounted) return null;

  const NavItems = ({ mobile = false }) => (
    <>
      {['home', 'works', 'experience', 'expertise', 'contact'].map((item) => (
        <button 
          key={item}
          onClick={() => {
            setActiveSection(item);
            if (mobile) setIsMenuOpen(false);
          }}
          className={`relative uppercase tracking-[0.2em] font-black text-sm transition-all duration-200 ${
            mobile ? 'py-4 text-center w-full text-xl border-b-4 border-black' : 'px-2 py-1'
          } ${activeSection === item ? 'text-black' : 'text-gray-500 hover:text-black hover:-translate-y-1'}`}
        >
          {item}
          {!mobile && activeSection === item && (
            <motion.div layoutId="navline" className="absolute bottom-0 left-0 w-full h-1.5 bg-[#E32636] border-black border-t-2 border-b-2" />
          )}
        </button>
      ))}
    </>
  );

  return (
    // Background: Cream/Off-white paper look
    <div className="min-h-screen bg-[#FDF8ED] text-black font-sans selection:bg-[#E32636] selection:text-white overflow-x-hidden">
      
      {/* Subtle Halftone/Dot Grid Background typical of comics */}
      <div className="fixed inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: `radial-gradient(#000 2px, transparent 2px)`, backgroundSize: '32px 32px' }} />

      {/* Solid Line Scroll Indicator */}
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: "100%" }} 
        className="h-2 bg-[#E32636] border-b-2 border-black fixed top-0 z-50" 
      />

      {/* Navigation - Ligne Claire Style (Thick borders, solid background) */}
      <nav className="fixed top-2 left-0 w-full z-40 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] h-20 flex items-center justify-between px-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveSection('home')}>
            <div className="w-10 h-10 border-4 border-black bg-[#FFD600] flex items-center justify-center group-hover:bg-[#E32636] transition-colors">
               <Flame className="w-6 h-6 text-black" strokeWidth={3} />
            </div>
            <div className="flex flex-col">
                <span className="font-black tracking-tighter text-2xl uppercase leading-none">Bisma<span className="text-[#E32636]">.</span>Reza</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-black uppercase">Business Analyst</span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <NavItems />
          </div>

          <button className="md:hidden text-black border-4 border-black p-1 bg-white hover:bg-[#FFD600]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X strokeWidth={3} /> : <Menu strokeWidth={3} />}
          </button>

          <div className="hidden lg:flex flex-col items-end font-bold text-xs text-black border-l-4 border-black pl-6">
            <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#4BA3E3]" strokeWidth={3} />
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
            className="fixed inset-0 z-30 bg-[#FDF8ED] pt-32 px-6 md:hidden flex flex-col items-center"
          >
            <NavItems mobile />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-36 md:pt-48 pb-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          
          {/* HOME SECTION */}
          {activeSection === 'home' && (
            <motion.section 
              key="home" initial="hidden" animate="visible" exit="hidden" 
              variants={staggerContainer} 
              className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center min-h-[60vh]"
            >
              <motion.div variants={fadeUp} className="order-2 lg:order-1 text-center lg:text-left">
                {/* Badge Brutalist */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD600] border-4 border-black shadow-[4px_4px_0px_0px_#000] text-black text-xs md:text-sm font-black uppercase mb-8 md:mb-10 tracking-[0.2em]">
                  <Gauge className="w-4 h-4" strokeWidth={3} /> Data Storyteller // Active
                </div>
                
                {/* Heading Minimalist & Brutalist */}
                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] mb-8 md:mb-12 tracking-tighter text-black uppercase">
                  Ignite <br />
                  <span className="inline-block bg-[#E32636] text-white px-2 mt-2 border-4 border-black shadow-[6px_6px_0px_0px_#000] -rotate-2">
                    Insights.
                  </span>
                </h1>
                
                <p className="text-black text-base md:text-xl mb-10 md:mb-12 max-w-xl font-bold border-l-8 border-[#4BA3E3] pl-6 md:pl-8 mx-auto lg:mx-0 text-left leading-snug">
                  I am a Business Analyst and R&D Supervisor specialized in architecting data-driven growth. I transform raw complexity into tactical precision.
                </p>
                
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                  <button 
                    onClick={() => setActiveSection('works')} 
                    className="w-full sm:w-auto px-10 py-5 bg-white border-4 border-black text-black font-black flex items-center justify-center gap-4 hover:bg-[#FFD600] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] transition-all group uppercase tracking-widest text-sm relative"
                  >
                    <span>Execute Deployment</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                  </button>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUp} className="relative group order-1 lg:order-2 w-full max-w-[400px] mx-auto">
                {/* Image Container Ligne Claire */}
                <div className="relative aspect-[4/5] bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000] overflow-hidden group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:shadow-[16px_16px_0px_0px_#000] transition-all duration-300">
                    <img 
                      src="https://lh3.googleusercontent.com/pw/AP1GczMYJvnEAxk0pXlfFJHPKYmLyUGFAkviAst0iD266IGL3OSDcjTV42HaDNKKGyC1YHxsyTSlqxHcY2cD3NBrg9w0LfA70ZDesWDK4VFohZD1xzjZgFY=w377-h494" // Placeholder for realism in preview, replace with your URL
                      alt="Bisma Reza" 
                      className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#E32636]/20 to-transparent mix-blend-multiply pointer-events-none"></div>
                </div>
              </motion.div>
            </motion.section>
          )}

          {/* WORKS SECTION */}
          {activeSection === 'works' && (
            <motion.section key="works" initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-12 md:mb-20 border-b-8 border-black pb-6 inline-block">
                <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-black">Active <span className="text-[#4BA3E3]">Deployments</span></h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-12 mb-20">
                {projects.map((project) => (
                  <motion.div key={project.id} variants={fadeUp} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] group flex flex-col hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-300">
                    <div className="relative aspect-video border-b-4 border-black overflow-hidden bg-gray-100">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 contrast-125 transition-all duration-500" />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map(t => (
                          <span key={t} className="text-[10px] font-black uppercase tracking-widest bg-[#FDF8ED] border-2 border-black px-2 py-1">{t}</span>
                        ))}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black uppercase mb-3 text-black">{project.title}</h3>
                      <p className="text-black text-sm md:text-base leading-relaxed mb-8 grow font-bold">{project.description}</p>
                      
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between text-sm font-black uppercase tracking-widest bg-[#FFD600] border-4 border-black p-4 group-hover:bg-[#E32636] group-hover:text-white transition-colors">
                        Launch Protocol <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* EXPERIENCE SECTION */}
          {activeSection === 'experience' && (
            <motion.section key="experience" initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-12 md:mb-20 border-b-8 border-black pb-6 inline-block">
                <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-black">Professional <span className="text-[#E32636]">History</span></h2>
              </motion.div>
              
              <div className="space-y-12">
                {experiences.map((exp, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-white p-6 md:p-10 border-4 border-black shadow-[8px_8px_0px_0px_#000] relative">
                    {/* Decorative node */}
                    <div className="absolute -left-4 -top-4 w-8 h-8 bg-[#FFD600] border-4 border-black shadow-[2px_2px_0px_0px_#000] hidden md:block"></div>

                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 mb-8">
                      <div>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none mb-3">{exp.company}</h3>
                        <div className="inline-block bg-[#4BA3E3] border-4 border-black text-white px-4 py-2 text-sm md:text-lg font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000]">
                          {exp.role}
                        </div>
                      </div>
                      <div className="flex flex-wrap xl:flex-col items-start xl:items-end gap-3 text-xs md:text-sm font-black uppercase tracking-widest text-black">
                        <div className="flex items-center gap-2 bg-[#FDF8ED] border-2 border-black px-3 py-2 shadow-[2px_2px_0px_0px_#000]">
                          <Calendar className="w-4 h-4 text-[#E32636]" strokeWidth={3} /> {exp.period}
                        </div>
                        <div className="flex items-center gap-2 bg-[#FDF8ED] border-2 border-black px-3 py-2 shadow-[2px_2px_0px_0px_#000]">
                          <MapPin className="w-4 h-4 text-[#E32636]" strokeWidth={3} /> {exp.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-black mb-8 max-w-4xl text-base md:text-xl font-bold border-l-4 border-black pl-4 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {exp.highlights.map((highlight, j) => (
                        <div key={j} className="flex gap-3 items-start bg-[#FDF8ED] border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                          <Zap className="w-5 h-5 text-[#E32636] shrink-0 mt-0.5" strokeWidth={3} />
                          <p className="text-xs md:text-sm font-bold text-black uppercase tracking-wide leading-snug">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* EXPERTISE SECTION */}
          {activeSection === 'expertise' && (
            <motion.section key="expertise" initial="hidden" animate="visible" exit="hidden" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-12 md:mb-20 border-b-8 border-black pb-6 inline-block">
                <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-black">Technical <span className="text-[#FFD600]">Manifest</span></h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {expertiseData.map((skill, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col h-full hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-300">
                    <div className={`w-16 h-16 ${skill.color} border-4 border-black flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_#000] text-black`}>
                      {skill.icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase mb-6 text-black tracking-tighter leading-none">{skill.category}</h3>
                    <div className="space-y-4 grow">
                      {skill.achievements.map((ach, j) => (
                        <div key={j} className="flex gap-3 items-start border-b-2 border-dashed border-black/20 pb-4 last:border-0">
                          <Trophy className="w-5 h-5 text-black shrink-0 mt-0.5" strokeWidth={3} />
                          <p className="text-sm md:text-base text-black font-bold leading-snug">{ach}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* CONTACT SECTION (Completed) */}
          {activeSection === 'contact' && (
            <motion.section key="contact" initial="hidden" animate="visible" exit="hidden" variants={staggerContainer} className="max-w-4xl mx-auto">
              <motion.div variants={fadeUp} className="mb-12 border-b-8 border-black pb-6 inline-block text-center md:text-left">
                <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-black">Establish <span className="text-[#4BA3E3]">Link</span></h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Email Box */}
                <motion.a variants={fadeUp} href={socialLinks.email} className="bg-[#E32636] p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:translate-x-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all group block">
                  <div className="flex justify-between items-center text-white mb-6">
                    <Send className="w-12 h-12" strokeWidth={2} />
                    <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black uppercase text-white mb-2">Email</h3>
                  <p className="text-white/90 font-bold font-mono text-sm">bismareza@outlook.com</p>
                </motion.a>

                {/* LinkedIn Box */}
                <motion.a variants={fadeUp} href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="bg-[#4BA3E3] p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:translate-x-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all group block">
                  <div className="flex justify-between items-center text-white mb-6">
                    <Linkedin className="w-12 h-12" strokeWidth={2} />
                    <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black uppercase text-white mb-2">LinkedIn</h3>
                  <p className="text-white/90 font-bold font-mono text-sm">/in/bismareza81</p>
                </motion.a>

                {/* GitHub Box */}
                <motion.a variants={fadeUp} href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="bg-[#FFD600] p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:translate-x-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all group block md:col-span-2">
                  <div className="flex justify-between items-center text-black mb-6">
                    <Github className="w-12 h-12" strokeWidth={2} />
                    <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black uppercase text-black mb-2">GitHub</h3>
                  <p className="text-black/80 font-bold font-mono text-sm">github.com/bismareza81</p>
                </motion.a>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;