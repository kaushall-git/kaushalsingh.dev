import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  Bot,
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Code,
  Database,
  Cpu,
  Layers,
  ExternalLink,
  ArrowRight,
  Send,
  Check,
  Clock,
  Menu,
  X,
  FileText,
  Terminal,
  Server,
  ChevronRight,
  Workflow,
  Award,
  TrendingUp,
  BarChart3,
  Download,
  Calendar,
  Laptop,
  MessageSquare,
  Star,
  Phone,
  Bookmark,
  Activity,
  CheckCircle,
  GitBranch,
  Eye,
  CalendarCheck,
  Sun,
  Moon
} from "lucide-react";

import { 
  KAUSHAL_BIO, 
  PROJECTS, 
  SKILLS, 
  TIMELINE, 
  CERTIFICATIONS, 
  DASHBOARDS 
} from "./data";
import { Project, Certificate, ShowcaseDashboard } from "./types";
import ChatAssistant from "./components/ChatAssistant";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  const [activeTab, setActiveTab ] = useState<"all" | "analytics" | "automation" | "product">("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [expandedCertIndex, setExpandedCertIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        return stored;
      }
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activeDashboard, setActiveDashboard] = useState<number>(0);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [interactionSparkle, setInteractionSparkle] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom interactive overlays and project detail tabs
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProjectTab, setSelectedProjectTab] = useState<"overview" | "architecture" | "demo">("overview");

  // Project Live Simulators Interactive States
  // 1. Bus Mitra stops & ticketing
  const [busStopIdx, setBusStopIdx] = useState(0);
  const [busTicketCode, setBusTicketCode] = useState("");
  const [busTicketStatus, setBusTicketStatus] = useState<"idle" | "generating" | "booked">("idle");
  // 2. Aura Music stream controls
  const [auraPlaying, setAuraPlaying] = useState(false);
  const [auraMood, setAuraMood] = useState<"relax" | "focus" | "energy">("focus");
  const [auraVolume, setAuraVolume] = useState(70);
  // 3. Ecommerce Analytics workbook forecast
  const [ecoDiscount, setEcoDiscount] = useState(15);
  const [ecoAdBudget, setEcoAdBudget] = useState(2500);
  // 4. Driver Drowsiness alert trigger
  const [drowsyState, setDrowsyState] = useState<"alert" | "yawning" | "sleeping">("alert");
  // 5. BI Sales Dashboard filtering
  const [salesRegion, setSalesRegion] = useState<"Global" | "North America" | "Europe" | "APAC">("Global");

  // Reset local states when active project modal changes to keep sandbox fresh
  useEffect(() => {
    if (selectedProject) {
      setSelectedProjectTab("overview");
      setBusStopIdx(0);
      setBusTicketCode("");
      setBusTicketStatus("idle");
      setAuraPlaying(false);
      setAuraMood("focus");
      setEcoDiscount(15);
      setEcoAdBudget(2500);
      setDrowsyState("alert");
      setSalesRegion("Global");
    }
  }, [selectedProject]);
  
  // Aura Equalizer static mapping values array
  const auraEqValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Text variant download handler
  const handleDownloadTxtResume = () => {
    const resumeText = `KAUSHAL SINGH CHAMYAL
Data Analyst | Zoho Consultant | SaaS Operations Associate
Email: itskaushal11@gmail.com
LinkedIn: linkedin.com/in/itskaushal11
GitHub: github.com/kaushall-git
Location: India

========================================
PROFESSIONAL SUMMARY
========================================
Computer Science graduate passionate about Data Analytics, Business Intelligence, SaaS Automation, CRM Systems, and Product Development. Specialize in translating system metrics into clear revenue milestones.

========================================
TECHNICAL SKILLS
========================================
* Core Data Analytics: SQL (Queries/Joins/Aggregation), Python (Pandas/NumPy), Power BI, Tableau, ETL Pipelines.
* SaaS ecosystems: Zoho CRM Deluge script hooks, Zoho Books API connector, Zoho Analytics.
* General Setup: React, HTML5, Tailwind CSS, TypeScript.

========================================
WORK HISTORY
========================================
1. SaaS Automation & Founder's Office Associate
   Tech for Social Good / Appo | June 2025 - Present
   - Manage Zoho One suite, Deluge scripts, database cleaning and executive BI reports delivery.

2. Data Analytics Simulator Participant
   Deloitte | 2025
   - Conducted trend analyses and designed Tableau dashboards for corporate logistics.

3. Power BI Business Intelligence Participant
   PwC Switzerland | 2024
   - Formulated KPI measures and custom dashboards mapping client requirements.
`;
    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Kaushal_Singh_Chamyal_Resume.txt";
    link.click();
  };

  // Message Form Data
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync to Indian Standard Time (Bengaluru/India default)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredProjects = PROJECTS.filter((p) => {
    const categoryMatch = activeTab === "all" || p.category === activeTab;
    const techMatch = 
      selectedTech === "all" || 
      p.tags.some(t => {
        const tagLower = t.toLowerCase();
        const filterLower = selectedTech.toLowerCase();
        
        // Handle database match like "SQL" matching "MySQL" and "NoSQL"
        if (filterLower === "sql") {
          return tagLower.includes("sql") || tagLower.includes("db");
        }
        
        return tagLower.includes(filterLower);
      });
    return categoryMatch && techMatch;
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitting(true);
    // Simulate real communication sync lag
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setContactForm({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 6000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTriggerImpactEffect = (metricTitle: string) => {
    setInteractionSparkle(metricTitle);
    setTimeout(() => setInteractionSparkle(null), 1000);
  };

  // Mock language contribution data
  const languagesUsed = [
    { name: "Python", share: "45%", color: "bg-blue-500" },
    { name: "SQL", share: "25%", color: "bg-sky-400" },
    { name: "Power BI / DAX", share: "15%", color: "bg-amber-400" },
    { name: "Zoho Deluge & JS", share: "15%", color: "bg-purple-500" }
  ];

  // Generator of 365 mock contribution graph nodes
  const mockContributions = Array.from({ length: 154 }, (_, i) => {
    const weights = [0, 0, 1, 1, 1, 2, 2, 2, 3, 4];
    const weight = weights[Math.floor(Math.random() * weights.length)];
    return {
      id: i,
      level: weight, // 0 = empty, 1-4 = color density
      day: i
    };
  });

  return (
    <div className="min-h-screen bg-theme-main text-theme-main flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200 relative overflow-hidden">
      
      {/* SCROLL PROGRESS INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-sky-400 to-violet-500 z-[100] origin-left"
        style={{ scaleX }}
      />
      
      {/* LUXURIOUS AMBIENT BACKGROUND GLOWS Sourced from Stripe/Linear style guidance */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-blue-600/10 to-violet-600/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-600/5 to-purple-600/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-b from-blue-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* FIXED METRIC BADGE ON THE BOTTOM BAR (HUMBLE REAL DETAILS) */}
      <div className="fixed bottom-6 left-6 z-40 hidden xl:flex items-center space-x-2.5 px-4 py-2 rounded-full border border-slate-800 bg-[#0e1726]/85 backdrop-blur-md shadow-xl text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-slate-400">Available immediately:</span>
        <span className="text-blue-400 font-bold">India / Remote / Onsite</span>
      </div>

      {/* HEADER / NAVIGATION BAR */}
      <nav id="header-navigation" className="sticky top-0 z-50 bg-theme-main/80 backdrop-blur-md border-b border-theme-main">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Personal Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection("hero")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 via-sky-400 to-violet-600 flex items-center justify-center font-extrabold text-slate-950 text-lg shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform duration-300">
              KSC
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[15px] tracking-tight text-white leading-none group-hover:text-blue-400 transition-colors">Kaushal Singh Chamyal</span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest mt-1 uppercase font-semibold">Data Analyst & Operations</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-slate-350 hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection("impact")} className="text-sm font-medium text-slate-350 hover:text-white transition-colors cursor-pointer">Impact</button>
            <button onClick={() => scrollToSection("skills")} className="text-sm font-medium text-slate-350 hover:text-white transition-colors cursor-pointer">Skills</button>
            <button onClick={() => scrollToSection("projects")} className="text-sm font-medium text-slate-350 hover:text-white transition-colors cursor-pointer">Projects</button>
            <button onClick={() => scrollToSection("dashboards")} className="text-sm font-medium text-slate-350 hover:text-white transition-colors cursor-pointer">BI Showcase</button>
            <button onClick={() => scrollToSection("certifications")} className="text-sm font-medium text-slate-350 hover:text-white transition-colors cursor-pointer">Certificates</button>
            <button onClick={() => scrollToSection("journey")} className="text-sm font-medium text-slate-350 hover:text-white transition-colors cursor-pointer">Experience</button>
            
            <button 
              onClick={() => scrollToSection("assistant-section")} 
              className="text-xs font-semibold text-blue-400 hover:text-blue-350 transition-all cursor-pointer flex items-center gap-1.5 bg-blue-500/5 px-3 py-1.5 rounded-full border border-blue-500/10 shadow-sm"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Agent</span>
            </button>
          </nav>

          {/* Action CTA & Date indicator */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-[10px] text-slate-500 font-mono bg-[#0f172a] border border-slate-850 px-3 py-2 rounded-xl flex items-center gap-1.5">
              <Clock className="w-3 text-emerald-400 animate-pulse" />
              <span>IST: {currentTime || "Syncing..."}</span>
            </div>

            {/* Elegant Mode Toggle Switch */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl border border-slate-850 bg-[#0f172a] hover:bg-slate-850/80 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center active:scale-95 group"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-blue-500 fill-blue-500/10" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/10 animate-[spin_10s_linear_infinite]" />
              )}
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="text-xs px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-slate-950 font-bold transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer active:scale-95"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Overlay Menu Button & Theme Switcher */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl border border-slate-850 bg-[#0f172a] text-slate-450 hover:text-white transition-all active:scale-95"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-blue-500" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors bg-[#0f172a] rounded-lg border border-slate-850"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY FRAME */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.95 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.95 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-slate-900 bg-[#0e1726]/95 backdrop-blur-lg overflow-hidden absolute top-20 left-0 w-full z-40"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              <button onClick={() => scrollToSection("about")} className="text-left py-1 text-slate-350 hover:text-white font-medium text-sm">About Summary</button>
              <button onClick={() => scrollToSection("impact")} className="text-left py-1 text-slate-350 hover:text-white font-medium text-sm">Business Impact</button>
              <button onClick={() => scrollToSection("skills")} className="text-left py-1 text-slate-350 hover:text-white font-medium text-sm">Skills Inventory</button>
              <button onClick={() => scrollToSection("projects")} className="text-left py-1 text-slate-350 hover:text-white font-medium text-sm">Case Studies</button>
              <button onClick={() => scrollToSection("dashboards")} className="text-left py-1 text-slate-350 hover:text-white font-medium text-sm">BI Dashboards</button>
              <button onClick={() => scrollToSection("certifications")} className="text-left py-1 text-slate-350 hover:text-white font-medium text-sm">Certificates</button>
              <button onClick={() => scrollToSection("journey")} className="text-left py-1 text-slate-350 hover:text-white font-medium text-sm">Career Timeline</button>
              <button onClick={() => scrollToSection("assistant-section")} className="text-left py-2 text-blue-400 hover:text-white font-medium text-sm flex items-center gap-2">
                <Bot className="w-4 h-4" />
                AI Assistant Agent
              </button>
              
              <div className="h-[1px] bg-slate-900 my-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">IST Time: {currentTime}</span>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-sky-400 hover:opacity-90 text-slate-900 font-bold"
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 md:py-16 w-full space-y-32">

        {/* HERO SECTION - Gilded luxury inspired by Apple-like minimalism */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center xl:pt-10 scroll-mt-24">
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status indicators */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/5 text-blue-400 text-xs font-mono border border-blue-500/15">
              <Sparkles className="w-3.5 h-3.5 animate-spin delay-1000 text-sky-400" />
              <span>Active operations & insights strategist</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ms-2"></span>
            </div>

            {/* Title / Name typography */}
            <div className="space-y-4">
              <span className="block text-slate-400 text-sm md:text-base font-semibold font-mono tracking-widest uppercase">KAUSHAL SINGH CHAMYAL</span>
              <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
                Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-violet-500 select-all">Data</span> into <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">Business Impact</span>
              </h1>
              <p className="text-base sm:text-lg font-medium text-slate-350 leading-relaxed max-w-xl">
                {KAUSHAL_BIO.tagline}
              </p>
            </div>

            {/* Description list tags in minimalist layout */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs px-3 py-1.5 rounded-xl border border-slate-850 bg-[#0f172a]/40 backdrop-blur-md text-slate-300">📈 Data Analytics</span>
              <span className="text-xs px-3 py-1.5 rounded-xl border border-slate-850 bg-[#0f172a]/40 backdrop-blur-md text-slate-300">⚙️ Zoho CRM Systems</span>
              <span className="text-xs px-3 py-1.5 rounded-xl border border-slate-850 bg-[#0f172a]/40 backdrop-blur-md text-slate-300">📊 Business Intelligence</span>
              <span className="text-xs px-3 py-1.5 rounded-xl border border-slate-850 bg-[#0f172a]/40 backdrop-blur-md text-slate-300">🔄 SaaS Automation</span>
            </div>

            {/* Actions CTA panel */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-sky-400 to-violet-500 text-slate-950 font-extrabold transition-all hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10 font-display group leading-none"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-4 rounded-xl bg-[#0f172a] border border-slate-850 text-slate-300 hover:bg-slate-900/60 hover:text-white transition-all flex items-center justify-center gap-2 font-medium cursor-pointer"
              >
                <span>View Projects</span>
              </button>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="px-6 py-4 rounded-xl border border-dashed border-slate-850 hover:border-blue-500/30 hover:bg-blue-500/5 text-slate-400 hover:text-blue-400 font-mono text-xs cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>Preview & Download Resume</span>
              </button>
            </div>

            {/* Quick availability stats block */}
            <div className="flex items-center gap-6 pt-4 border-t border-slate-900 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Location: India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-violet-400" />
                <span>Availability: Freelance / Fulltime</span>
              </div>
            </div>

          </div>

          {/* Social / Dashboard Visual Mockup Widget on Hero Right */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            
            {/* Ambient profile card */}
            <div className="w-full relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-500 to-violet-600 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300"></div>
              
              <div className="relative rounded-2xl bg-[#0f172a]/70 border border-slate-850 backdrop-blur-md p-6 space-y-6">
                
                {/* Visual header */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500/20 via-sky-500/10 to-violet-500/30 flex items-center justify-center border border-blue-400/20 text-blue-400 font-bold font-display text-base">
                      KSC
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[15px] leading-tight text-white">Kaushal Chamyal</h4>
                      <p className="text-[11px] text-sky-400 font-mono leading-none mt-1">Data & Operations Specialist</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono leading-none">IN</span>
                </div>

                {/* Simulated Real-Time Metric Indicators inside frame */}
                <div className="space-y-3.5 text-sm">
                  <div className="p-3 rounded-xl bg-[#0b1120]/60 border border-slate-900 flex justify-between items-center">
                    <span className="text-slate-400 text-xs font-mono font-medium">Zoho Analytics Sync</span>
                    <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-550 rounded-full animate-pulse"></span>
                      Active Integration
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0b1120]/60 border border-slate-900 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Database Efficiency</span>
                      <span className="text-blue-400 font-bold">95%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-sky-400 w-[95%]"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-violet-600/5 border border-violet-500/10 text-center space-y-0.5">
                      <span className="block text-slate-500 text-[10px] font-mono leading-none tracking-wider font-bold uppercase">Accuracy</span>
                      <span className="text-violet-400 font-extrabold text-[15px] font-mono">90%+</span>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-600/5 border border-blue-500/10 text-center space-y-0.5">
                      <span className="block text-slate-500 text-[10px] font-mono leading-none tracking-wider font-bold uppercase">Reports</span>
                      <span className="text-blue-400 font-extrabold text-[15px] font-mono">50+</span>
                    </div>
                  </div>
                </div>

                {/* Quick Social Contacts inside profile */}
                <div className="flex items-center space-x-2 pt-4 border-t border-slate-900 justify-center">
                  <a href={KAUSHAL_BIO.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0b1120]/80 border border-slate-900 hover:border-slate-850 hover:bg-[#0f172a] hover:text-blue-400 transition-all text-slate-400" title="LinkedIn Profile">
                    <Linkedin className="w-4.5 h-4.5" />
                  </a>
                  <a href={KAUSHAL_BIO.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0b1120]/80 border border-slate-900 hover:border-slate-850 hover:bg-[#0f172a] hover:text-blue-400 transition-all text-slate-400" title="Github Profile">
                    <Github className="w-4.5 h-4.5" />
                  </a>
                  <a href={`mailto:${KAUSHAL_BIO.email}`} className="p-2.5 rounded-xl bg-[#0b1120]/80 border border-slate-900 hover:border-slate-850 hover:bg-[#0f172a] hover:text-blue-400 transition-all text-slate-400" title="Send Direct Email">
                    <Mail className="w-4.5 h-4.5" />
                  </a>
                </div>

              </div>
            </div>

            {/* Live Indicator: GitHub Quick access preview */}
            <div className="text-[11px] text-slate-500 font-mono flex items-center justify-center gap-2 w-full pt-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Profile Live updated: 2026 Simulation Active</span>
            </div>

          </div>
        </section>

        {/* ABOUT SUMMARY SECTION - Inspired by Linear's clean grid layout */}
        <section id="about" className="space-y-12 scroll-mt-24">
          <div className="space-y-2 border-b border-slate-900 pb-6">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">Biography</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">Professional Overview</h2>
            <p className="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
              Merging deep Computer Science fundamentals with structured analytics dashboards to remove organizational friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-2">
            
            {/* Detailed summary panel */}
            <div className="md:col-span-7 rounded-2xl bg-[#0e1726]/40 border border-slate-900 p-6 xl:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-400" />
                Strategic Mission
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {KAUSHAL_BIO.aboutMe}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">Business Intelligence</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Transforming massive datasets from operations, finance, and marketing fields into pristine visual stories.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">Custom Operations</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Configuring complex Zoho One tools, automations, database scripts, and system integrations to scale operational velocity.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Facts Bento-Style Panel */}
            <div className="md:col-span-5 rounded-2xl bg-gradient-to-b from-[#0f172a]/70 to-[#0e1726]/40 border border-slate-900 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Key Focus Areas</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-blue-500/10 flex items-center justify-center font-mono text-[11px] text-blue-400 font-bold">01</span>
                    <span className="text-sm font-medium text-slate-350">Data Cleaning & Transformation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-sky-500/10 flex items-center justify-center font-mono text-[11px] text-sky-400 font-bold">02</span>
                    <span className="text-sm font-medium text-slate-350">Enterprise CRM Workflows</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-pink-500/10 flex items-center justify-center font-mono text-[11px] text-pink-400 font-bold">03</span>
                    <span className="text-sm font-medium text-slate-350">Scalable SaaS Architectures</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-violet-500/10 flex items-center justify-center font-mono text-[11px] text-violet-400 font-bold">04</span>
                    <span className="text-sm font-medium text-slate-350">Product Development Loops</span>
                  </div>
                </div>
              </div>

              {/* Quote frame */}
              <div className="mt-8 pt-4 border-t border-slate-900/60 font-serif italic text-xs text-slate-450 leading-relaxed">
                "Data is only useful once transformed into clear visual directions that direct decision speed."
              </div>
            </div>

          </div>
        </section>

        {/* IMPACT SECTION - Animated Metric Showcase */}
        <section id="impact" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">Key Operations Metrics</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display">Business & Operational Impact</h2>
            <p className="text-sm text-slate-450 leading-relaxed">
              Concrete evidence of efficiency improvements, dashboard deployments, and tracking optimizations designed for international and regional agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Stat Item 1 */}
            <div 
              onMouseEnter={() => handleTriggerImpactEffect("100+")}
              className="p-6 rounded-2xl border border-slate-900 bg-[#0e1726]/40 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/30 transition-all cursor-pointer text-center space-y-2.5"
            >
              <div className="inline-flex w-10 h-10 rounded-full bg-blue-500/5 text-blue-400 items-center justify-center border border-blue-500/10">
                <User className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-3xl xl:text-4xl font-black text-white font-mono tracking-tight group-hover:scale-105 transition-transform duration-300">
                  100+
                </span>
                <span className="text-[11px] text-slate-500 font-mono tracking-wide uppercase font-bold leading-tight block">
                  Potential Users Impacted
                </span>
              </div>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                Empowered real-world public commuters via optimized smart tracking pipelines.
              </p>
              {interactionSparkle === "100+" && (
                <div className="absolute inset-0 bg-blue-500/5 animate-pulse rounded-2xl pointer-events-none"></div>
              )}
            </div>

            {/* Stat Item 2 */}
            <div 
              onMouseEnter={() => handleTriggerImpactEffect("90%")}
              className="p-6 rounded-2xl border border-slate-900 bg-[#0e1726]/40 backdrop-blur-md relative overflow-hidden group hover:border-sky-500/30 transition-all cursor-pointer text-center space-y-2.5"
            >
              <div className="inline-flex w-10 h-10 rounded-full bg-sky-500/5 text-sky-400 items-center justify-center border border-sky-500/10">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-3xl xl:text-4xl font-black text-white font-mono tracking-tight group-hover:scale-105 transition-transform duration-300">
                  90%+
                </span>
                <span className="text-[11px] text-slate-500 font-mono tracking-wide uppercase font-bold leading-tight block">
                  Tracking Accuracy
                </span>
              </div>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                Synchronized live coordinate checks inside active pilot trials.
              </p>
              {interactionSparkle === "90%" && (
                <div className="absolute inset-0 bg-sky-500/5 animate-pulse rounded-2xl pointer-events-none"></div>
              )}
            </div>

            {/* Stat Item 3 */}
            <div 
              onMouseEnter={() => handleTriggerImpactEffect("50+")}
              className="p-6 rounded-2xl border border-slate-900 bg-[#0e1726]/40 backdrop-blur-md relative overflow-hidden group hover:border-violet-500/30 transition-all cursor-pointer text-center space-y-2.5"
            >
              <div className="inline-flex w-10 h-10 rounded-full bg-violet-500/5 text-violet-400 items-center justify-center border border-violet-500/10">
                <FileText className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-3xl xl:text-4xl font-black text-white font-mono tracking-tight group-hover:scale-105 transition-transform duration-300">
                  50+
                </span>
                <span className="text-[11px] text-slate-500 font-mono tracking-wide uppercase font-bold leading-tight block">
                  Analytical Reports
                </span>
              </div>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                Designed, audited, and processed for strategic program leadership.
              </p>
              {interactionSparkle === "50+" && (
                <div className="absolute inset-0 bg-violet-500/5 animate-pulse rounded-2xl pointer-events-none"></div>
              )}
            </div>

            {/* Stat Item 4 */}
            <div 
              onMouseEnter={() => handleTriggerImpactEffect("15%")}
              className="p-6 rounded-2xl border border-slate-900 bg-[#0e1726]/40 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/30 transition-all cursor-pointer text-center space-y-2.5"
            >
              <div className="inline-flex w-10 h-10 rounded-full bg-emerald-500/5 text-emerald-400 items-center justify-center border border-emerald-500/10">
                <Activity className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-3xl xl:text-4xl font-black text-white font-mono tracking-tight group-hover:scale-105 transition-transform duration-300">
                  15%
                </span>
                <span className="text-[11px] text-slate-500 font-mono tracking-wide uppercase font-bold leading-tight block">
                  Insight Improvement
                </span>
              </div>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                Direct enhancement in spotting purchase loop anomalies and leakages.
              </p>
              {interactionSparkle === "15%" && (
                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse rounded-2xl pointer-events-none"></div>
              )}
            </div>

            {/* Stat Item 5 */}
            <div 
              onMouseEnter={() => handleTriggerImpactEffect("Multiple")}
              className="p-6 rounded-2xl border border-slate-900 bg-[#0e1726]/40 backdrop-blur-md relative overflow-hidden group hover:border-pink-500/30 transition-all cursor-pointer text-center space-y-2.5"
            >
              <div className="inline-flex w-10 h-10 rounded-full bg-pink-500/5 text-pink-400 items-center justify-center border border-pink-500/10">
                <Layers className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-3xl xl:text-4xl font-black text-white font-mono tracking-tight group-hover:scale-105 transition-transform duration-300">
                  Multiple
                </span>
                <span className="text-[11px] text-slate-500 font-mono tracking-wide uppercase font-bold leading-tight block">
                  Orgs Supported
                </span>
              </div>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                Streamlined global CRM configurations across non-profit frameworks.
              </p>
              {interactionSparkle === "Multiple" && (
                <div className="absolute inset-0 bg-pink-500/5 animate-pulse rounded-2xl pointer-events-none"></div>
              )}
            </div>

          </div>
        </section>

        {/* SKILLS SECTION - Premium cards with animated indicators */}
        <section id="skills" className="space-y-12 scroll-mt-24">
          <div className="border-b border-slate-900 pb-6">
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest font-bold">Proficiencies</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">Technical Expertise Inventory</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Category: Data Analytics */}
            <div className="p-6 rounded-2xl bg-[#0e1726]/30 border border-slate-900 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-550/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[17px] text-white font-display leading-tight">Data Analytics</h3>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wide font-semibold uppercase">Insights & Logic</span>
                </div>
              </div>

              <div className="space-y-4">
                {SKILLS.filter(s => s.category === "analytics").map((skill, index) => (
                  <div key={index} className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-350">
                      <span>{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0b1120] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: CRM & Automation */}
            <div className="p-6 rounded-2xl bg-[#0e1726]/30 border border-slate-900 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-violet-500"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-violet-550/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[17px] text-white font-display leading-tight">CRM & Automation</h3>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wide font-semibold uppercase">Integrated SaaS</span>
                </div>
              </div>

              <div className="space-y-4">
                {SKILLS.filter(s => s.category === "automation").map((skill, index) => (
                  <div key={index} className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-350">
                      <span>{skill.name}</span>
                      <span className="text-violet-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0b1120] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                        className="h-full bg-violet-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Development & Tools */}
            <div className="p-6 rounded-2xl bg-[#0e1726]/30 border border-slate-900 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-sky-400"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-sky-450/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[17px] text-white font-display leading-tight">Development & Tools</h3>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wide font-semibold uppercase">Platform Control</span>
                </div>
              </div>

              <div className="space-y-4">
                {SKILLS.filter(s => s.category === "tools").map((skill, index) => (
                  <div key={index} className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-350">
                      <span>{skill.name}</span>
                      <span className="text-sky-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0b1120] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                        className="h-full bg-sky-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS SECTION - Premium Case-Study Style cards with Lightbox */}
        <section id="projects" className="space-y-10 scroll-mt-24">
          <div className="flex flex-col gap-6 border-b border-slate-900 pb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">Case Studies</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">Featured Projects</h2>
              </div>

              {/* Premium filter selectors */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-[#0f172a] rounded-xl border border-slate-850 self-start md:self-end">
                <button
                  onClick={() => {
                    setActiveTab("all");
                    setSelectedTech("all");
                  }}
                  className={`text-xs px-4 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === "all" && selectedTech === "all" ? "bg-[#0e1726] text-white font-semibold" : "text-slate-450 hover:text-slate-200"
                  }`}
                >
                  All Works
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`text-xs px-4 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === "analytics" ? "bg-[#0e1726] text-blue-400 font-semibold" : "text-slate-450 hover:text-slate-200"
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab("automation")}
                  className={`text-xs px-4 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === "automation" ? "bg-[#0e1726] text-violet-400 font-semibold" : "text-slate-450 hover:text-slate-200"
                  }`}
                >
                  Automation / AI
                </button>
                <button
                  onClick={() => setActiveTab("product")}
                  className={`text-xs px-4 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === "product" ? "bg-[#0e1726] text-sky-400 font-semibold" : "text-slate-450 hover:text-slate-200"
                  }`}
                >
                  Smart Products
                </button>
              </div>
            </div>

            {/* Technology Tab Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 border-t border-slate-900/60">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1.5 shrink-0">
                <Terminal className="w-3.5 h-3.5 text-slate-500 animate-pulse" />
                <span>Filter by Tech:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", name: "All Technologies" },
                  { id: "Python", name: "Python / Data Science" },
                  { id: "SQL", name: "SQL / NoSQL" },
                  { id: "Flutter", name: "Flutter / Mobile" },
                  { id: "Power BI", name: "Power BI / DAX" },
                  { id: "React", name: "React / Frontend" }
                ].map((tech) => {
                  const isSelected = selectedTech === tech.id;
                  return (
                    <button
                      key={tech.id}
                      onClick={() => setSelectedTech(tech.id)}
                      className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-sky-400/10 text-sky-400 border-sky-400/30 font-bold" 
                          : "bg-[#0b1120] border-slate-900 text-slate-450 hover:text-slate-200"
                      }`}
                    >
                      {tech.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cards list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="col-span-full border border-dashed border-slate-850 bg-[#0e1726]/10 rounded-2xl p-12 text-center space-y-4"
                >
                  <p className="text-slate-400 text-sm font-mono">No matching case studies found for the current filter parameters.</p>
                  <button
                    onClick={() => {
                      setActiveTab("all");
                      setSelectedTech("all");
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-xs font-mono font-semibold transition-all cursor-pointer"
                  >
                    Reset Filter Nodes
                  </button>
                </motion.div>
              ) : (
                filteredProjects.map((p, index) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index % 3 * 0.1 }}
                    whileHover="hover"
                    animate="initial"
                    className="rounded-2xl border border-slate-900 bg-[#0e1726]/30 p-6 flex flex-col justify-between relative group overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Glass-shimmer / Glare animation sweep */}
                    <motion.div
                      variants={{
                        initial: { x: "-150%", rotate: 25 },
                        hover: {
                          x: "150%",
                          transition: {
                            duration: 1.1,
                            ease: [0.16, 1, 0.3, 1]
                          }
                        }
                      }}
                      className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent pointer-events-none z-10"
                    />

                    {/* Content Frame */}
                    <div className="space-y-4">
                      {/* Header tags block */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 flex-wrap">
                          {p.tags.slice(0, 2).map((t, index) => (
                            <span key={index} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0b1120] text-slate-400 border border-slate-850 font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/5 border border-blue-500/15 px-2 py-0.5 rounded-full">
                          {p.category}
                        </span>
                      </div>

                      {/* Banner Card simulator to fulfill banner requirement */}
                      <div className="h-28 rounded-xl bg-gradient-to-tr from-slate-900 via-[#0e1726] to-[#0f172a] border border-slate-900 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-blue-550/5 blur-xl"></div>
                        <Code className="w-8 h-8 text-slate-700 group-hover:text-blue-500 group-hover:scale-110 transition-colors duration-300" />
                        
                        {/* Interactive Eye for detailed showcase */}
                        <button 
                          onClick={() => setSelectedProject(p)}
                          className="absolute inset-0 bg-[#0b1120]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-semibold text-white cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-blue-400 animate-pulse" />
                          <span>Interactive Specs</span>
                        </button>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                        {p.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {p.description}
                      </p>

                      {/* Impact strip */}
                      {p.impact && (
                        <div className="p-2.5 rounded-xl bg-emerald-555/5 border border-emerald-500/10 flex items-center gap-2 text-[11px] text-emerald-400 font-mono font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{p.impact}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions footer */}
                    <div className="flex items-center space-x-3 pt-4 mt-4 border-t border-slate-900">
                      <button 
                        onClick={() => setSelectedProject(p)}
                        className="text-xs text-slate-450 hover:text-white transition-colors cursor-pointer"
                      >
                        Read Case Study
                      </button>
                      <div className="flex items-center gap-2.5 ms-auto">
                        {p.githubUrl && p.githubUrl !== "#" && (
                          <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-slate-450 hover:text-blue-400 transition-colors" title="Repository">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {p.liveUrl && p.liveUrl !== "#" && (
                          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-350 flex items-center gap-0.5 text-xs font-semibold" title="Launch App">
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* GITHUB INTEGRATED VISUAL SHOWCASE */}
        <section id="github-showcase" className="space-y-10 scroll-mt-24">
          <div className="space-y-2 border-b border-slate-900 pb-6">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">Social Code Repos</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">GitHub Analytics & Contributions</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl">
              Authentic simulation mapping work across main repositories, code language footprints, and recurring pipeline maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Contributions heat map mockup + Stats */}
            <div className="lg:col-span-8 rounded-2xl bg-[#0e1726]/30 border border-slate-900 p-6 space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-2.5">
                  <Github className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-bold text-white font-mono">github.com/kaushall-git</span>
                </div>
                <div className="flex gap-2 text-xs font-mono">
                  <span className="text-slate-500">Less</span>
                  <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-850"></div>
                  <div className="w-3.5 h-3.5 rounded bg-blue-900/40"></div>
                  <div className="w-3.5 h-3.5 rounded bg-blue-700/60"></div>
                  <div className="w-3.5 h-3.5 rounded bg-blue-500"></div>
                  <span className="text-slate-500">More</span>
                </div>
              </div>

              {/* Contribution Activity Grid simulation */}
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[580px] grid grid-cols-22 gap-1.5 font-mono">
                  {mockContributions.map((cell) => {
                    let color = "bg-slate-900 border border-slate-850";
                    if (cell.level === 1) color = "bg-blue-950/40 border border-blue-900/10";
                    if (cell.level === 2) color = "bg-blue-800/40 border border-blue-700/20";
                    if (cell.level === 3) color = "bg-blue-600/70 border border-blue-500/20";
                    if (cell.level === 4) color = "bg-blue-400 border border-blue-300/30";

                    return (
                      <div
                        key={cell.id}
                        className={`aspect-square w-full rounded-sm hover:scale-125 hover:ring-1 hover:ring-white transition-all cursor-pointer ${color}`}
                        title={`Day ${cell.day}: Active analytical commit push`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Grid feedback detail strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-900 text-center">
                <div className="space-y-0.5">
                  <span className="block text-slate-500 text-[10px] font-mono uppercase tracking-wider">Total Commits</span>
                  <span className="text-lg font-bold text-white font-mono">1,482+</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-slate-500 text-[10px] font-mono uppercase tracking-wider">Active Pull requests</span>
                  <span className="text-lg font-bold text-blue-400 font-mono">112+</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-slate-500 text-[10px] font-mono uppercase tracking-wider">Starred Repos</span>
                  <span className="text-lg font-bold text-amber-400 font-mono flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>24</span>
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-slate-500 text-[10px] font-mono uppercase tracking-wider">Continuous Streak</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">34 Days</span>
                </div>
              </div>

            </div>

            {/* Right: Languages footprints + highlighted projects list */}
            <div className="lg:col-span-4 rounded-2xl bg-[#0e1726]/30 border border-slate-900 p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-sm font-extrabold text-white font-display">Code Language Footprint</h3>
                
                <div className="space-y-4">
                  {languagesUsed.map((lang, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-medium">{lang.name}</span>
                        <span className="text-slate-550">{lang.share}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#0b1120] rounded-full overflow-hidden">
                        <div className={`h-full ${lang.color}`} style={{ width: lang.share }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Small featured card shortcut */}
              <div className="pt-6 mt-6 border-t border-slate-900 text-xs text-slate-450 space-y-2">
                <p className="font-semibold text-slate-300 font-mono">Featured Active Repositories:</p>
                <div className="flex flex-wrap gap-1.5 font-mono">
                  <span className="px-2 py-0.5 rounded bg-blue-500/5 text-blue-400 text-[10px] border border-blue-500/10">Bus Mitra</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/5 text-blue-400 text-[10px] border border-blue-500/10">Aura Music</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/5 text-blue-400 text-[10px] border border-blue-500/10">Drowsiness Detection</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* PREMIUM DASHBOARD SHOWCASE GALLERY - INSIDE LAPTOP MOCKUPS */}
        <section id="dashboards" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">Interactive Gallery</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">Business Intelligence Showcase</h2>
            <p className="text-sm text-slate-400">
              Interactive analytics frames presenting Zoho Analytics dashboards, Power BI report configurations, and custom corporate sales indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Selector dashboard options */}
            <div className="lg:col-span-4 space-y-4">
              {DASHBOARDS.map((dash, index) => (
                <div
                  key={index}
                  onClick={() => setActiveDashboard(index)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    activeDashboard === index
                      ? "bg-[#0e1726]/60 border-blue-500/40 shadow-md shadow-blue-500/5"
                      : "bg-[#0e1726]/20 border-slate-900 hover:border-slate-800"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-850">
                      {dash.platform}
                    </span>
                    <h3 className={`font-bold text-sm ${activeDashboard === index ? "text-blue-400" : "text-slate-300"}`}>
                      {dash.title}
                    </h3>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform ${activeDashboard === index ? "text-blue-400" : ""}`} />
                </div>
              ))}
            </div>

            {/* Right: PREMIUM LAPTOP VIEW CONTAINER OUTLET */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              
              <div className="relative w-full max-w-2xl mx-auto group">
                {/* Glowing ring */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-blue-500 via-sky-550 to-violet-500 opacity-20 blur-xl"></div>
                
                {/* Visual Laptop Frame */}
                <div className="relative rounded-t-2xl bg-[#0b1120] border-t-8 border-x-8 border-slate-900 shadow-2xl overflow-hidden aspect-video">
                  
                  {/* Laptop camera notch */}
                  <div className="absolute top-0 inset-x-0 mx-auto w-24 h-4 bg-slate-900 rounded-b-lg z-10 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                  </div>

                  {/* Inside Screen Content: Interactive simulated visualization widgets */}
                  <div className="w-full h-full bg-[#080d19] p-6 text-slate-300 font-mono space-y-6 flex flex-col justify-between relative overflow-hidden select-none">
                    
                    {/* Glowing coordinate lines */}
                    <div className="absolute top-[10%] left-[-10%] w-[120px] h-[120px] rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>
                    
                    {/* Header bar within screen */}
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="text-[10px] text-slate-500 ms-3">/analysis/engine/dashboard_spec.dax</span>
                      </div>
                      <span className="text-[10px] text-blue-400 font-bold uppercase">{DASHBOARDS[activeDashboard].platform} ACTIVE MODE</span>
                    </div>

                    {/* Chart diagrams generated dynamically via flex layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 flex-1 items-center pt-2">
                      
                      {/* Interactive mock radial bar or stats on left */}
                      <div className="sm:col-span-4 p-3 bg-slate-950/60 border border-slate-900 rounded-xl space-y-3">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Metrics Snapshot</span>
                        
                        <div className="space-y-2">
                          {DASHBOARDS[activeDashboard].metrics.map((metric, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-350">
                              <span className="w-1 h-1 rounded-full bg-blue-400shrink-0"></span>
                              <span>{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right bar graph simulation */}
                      <div className="sm:col-span-8 p-3 bg-slate-950/60 border border-slate-900 rounded-xl h-full flex flex-col justify-between space-y-3">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Query Flow Speed</span>
                        
                        {/* Dynamic styled bar graphs based on platform selection */}
                        <div className="space-y-2 flex-1 flex flex-col justify-center">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-450">
                              <span>Segment Performance A</span>
                              <span>87.5%</span>
                            </div>
                            <div className="w-full h-2 bg-[#0b1120] rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: activeDashboard === 0 ? "87.5%" : activeDashboard === 1 ? "62%" : "95%" }}></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-450">
                              <span>Operational Efficiency</span>
                              <span>92.2%</span>
                            </div>
                            <div className="w-full h-2 bg-[#0b1120] rounded-full overflow-hidden">
                              <div className="h-full bg-violet-500 rounded-full" style={{ width: activeDashboard === 0 ? "92.2%" : activeDashboard === 1 ? "80%" : "70%" }}></div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-450">
                              <span>Target Accuracy KPI</span>
                              <span>78.9%</span>
                            </div>
                            <div className="w-full h-2 bg-[#0b1120] rounded-full overflow-hidden">
                              <div className="h-full bg-sky-400 rounded-full" style={{ width: activeDashboard === 0 ? "78.9%" : activeDashboard === 1 ? "91%" : "85%" }}></div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Bottom disclaimer */}
                    <div className="flex items-center justify-between text-[10px] text-slate-600 border-t border-slate-900/60 pt-2.5">
                      <span>Visualization Engine v2.1</span>
                      <span>Press any option on left to toggle visualization model</span>
                    </div>

                  </div>

                </div>

                {/* Keyboard Base and hinge part of laptop mockup */}
                <div className="relative h-4 bg-slate-800 rounded-b-2xl border-t border-slate-700 shadow-xl max-w-[102%] left-[-1%] flex items-center justify-center">
                  <div className="w-24 h-2 bg-slate-900 rounded-b-md"></div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* CERTIFICATIONS SECTION - Interactive gallery with inline expandable previews */}
        <section id="certifications" className="space-y-12 scroll-mt-24">
          <div className="space-y-2 border-b border-slate-900 pb-6">
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest font-bold">Accreditation</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">Specialized Certifications</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl">
              Verification files and simulations representing credentials from Deloitte, PwC, Accenture, IBM, and JPMorgan Chase. Click any credential to expand the secure validation summary in-place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const getCertVerificationSummary = (title: string, issuer: string) => {
                const normTitle = title.toLowerCase();
                const normIssuer = issuer.toLowerCase();
                
                if (normIssuer.includes("deloitte")) {
                  return "Independently verified practical competency log spanning exploratory data analyses, commercial trend tracking, dashboard logic, and strategic summaries.";
                }
                if (normIssuer.includes("pwc")) {
                  return "Independently verified competency in Power BI dashboard design, complex DAX measures calculation, and corporate visualization systems.";
                }
                if (normIssuer.includes("ibm") || normTitle.includes("data analysis with python")) {
                  return "Independently verified competency in Python-centered analytical workbooks, data cleaning with Pandas, logic scripting, and Matplotlib visualizations.";
                }
                if (normTitle.includes("machine learning")) {
                  return "Verified algorithmic skill in regression modeling, predictive matrices, classification pipelines, and machine learning structures.";
                }
                if (normIssuer.includes("accenture")) {
                  return "Verified practical logic in client requirements mapping, data curation, storytelling, and strategic executive KPI presentations.";
                }
                if (normIssuer.includes("jpmorgan") || normIssuer.includes("j.p. morgan")) {
                  return "Verified software engineering diagnostics, financial visualization queries, system dependencies, and code pipeline maintenance.";
                }
                return "Verified analytical skill log validating structural workflow mappings, database transformations, and operational dashboard reporting.";
              };

              return CERTIFICATIONS.map((cert, index) => {
                const isExpanded = expandedCertIndex === index;
                return (
                  <motion.div
                    key={index}
                    layout="position"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                    onClick={() => setExpandedCertIndex(isExpanded ? null : index)}
                    className="group p-6 rounded-2xl bg-[#0e1726]/30 border border-slate-900 hover:border-blue-500/40 hover:bg-[#0f172a]/40 transition-[border-color,background-color] duration-300 cursor-pointer relative flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
                          <Award className="w-5 h-5 text-violet-400" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-550 group-hover:text-blue-400 transition-colors uppercase font-bold">
                          {isExpanded ? "Report Open" : "Verify Spec"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-extrabold text-sm text-white leading-snug group-hover:text-blue-400 transition-colors duration-200">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono">
                          {cert.issuer}
                        </p>
                      </div>

                      {/* Expandable in-place container */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden space-y-3 pt-4 border-t border-slate-900/60"
                          >
                            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-slate-900 space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-mono font-semibold text-slate-500 uppercase tracking-wide">Validation Report:</span>
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-[9px] text-emerald-400 font-mono font-bold border border-emerald-500/15">
                                  <Check className="w-2.5 h-2.5" /> SECURE MATCH
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-350 leading-relaxed font-sans font-medium">
                                {getCertVerificationSummary(cert.title, cert.issuer)}
                              </p>
                              <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-slate-905 bg-slate-950/20">
                                <div className="space-y-0.5">
                                  <p className="text-[8px] font-mono text-slate-500 uppercase">Credential ID</p>
                                  <p className="text-[10px] font-mono text-blue-400 font-bold">KC-CERT-{(index + 1025)}</p>
                                </div>
                                <div className="space-y-0.5 text-right">
                                  <p className="text-[8px] font-mono text-slate-500 uppercase">Verification</p>
                                  <p className="text-[10px] font-mono text-violet-400 font-bold">Active SHA-256</p>
                                </div>
                              </div>
                            </div>
                            
                            {cert.credentialUrl && cert.credentialUrl !== "#" && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-500 hover:bg-blue-400 text-slate-950 font-mono font-extrabold text-[10px] uppercase transition-all"
                              >
                                <span>Retrieve Web Credential</span>
                                <ExternalLink className="w-3 h-3 text-slate-950" />
                              </a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-450 border-t border-slate-900 pt-4 mt-6">
                      <span className="text-slate-550 font-mono text-[9px]">
                        {isExpanded ? "SECURE CONNECTION" : "SIMULATED ARCHIVE"}
                      </span>
                      <span className="text-blue-400 flex items-center gap-1 font-medium text-xs">
                        <span>{isExpanded ? "Collapse Specs" : "Expand Report"}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transform transition-transform duration-300 ${isExpanded ? "rotate-90 text-emerald-400" : "group-hover:translate-x-0.5"}`} />
                      </span>
                    </div>
                  </motion.div>
                );
              });
            })()}
          </div>
        </section>

        {/* CAREER TIMELINE / JOURNEY */}
        <section id="journey" className="space-y-12 scroll-mt-24">
          <div className="space-y-2 border-b border-slate-900 pb-6">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">Timeline</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">Experience timeline</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl">
              Pristine milestones detailing hands-on SaaS consulting, simulations, and academic research configurations.
            </p>
          </div>

          <div className="relative border-l border-slate-900 ml-4 md:ml-8 space-y-8">
            {TIMELINE.map((item, index) => (
              <div key={item.id} className="relative pl-6 md:pl-10 group">
                
                {/* Connector point */}
                <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full border border-slate-800 bg-[#0b1120] flex items-center justify-center text-blue-400 shadow-md group-hover:border-blue-500 group-hover:text-blue-400 transition-colors">
                  {item.isEducation ? <GraduationCap className="w-3.5 h-3.5" /> : <Briefcase className="w-3 h-3" />}
                </div>

                {/* Timeline Box */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-[#0e1726]/40 hover:border-slate-800 hover:bg-[#0f172a]/20 transition-all duration-300 space-y-4 max-w-4xl">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-white text-base md:text-[17px] leading-snug">
                        {item.role}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                        {item.company} {item.location ? `• ${item.location}` : ""}
                      </p>
                    </div>
                    <span className="text-[10px] sm:self-center self-start font-mono font-semibold px-3 py-1 rounded-full border border-blue-500/10 bg-blue-500/5 text-blue-400 mt-1 whitespace-nowrap leading-none">
                      {item.duration}
                    </span>
                  </div>

                  <ul className="text-xs md:text-sm text-slate-400 space-y-2 leading-relaxed pt-3 border-t border-slate-900">
                    {item.description.map((listItem, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <ChevronRight className="w-4 h-4 text-slate-650 mt-0.5 shrink-0" />
                        <span>{listItem}</span>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            ))}
          </div>
        </section>

        {/* AI COMPANION EXPERT PANEL */}
        <section id="assistant-section" className="space-y-10 pt-4 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Interactive guidelines and metadata prompt hints */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">LLM-Backed Companion</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display">Chat with Kaushal's AI Assistant</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Have direct questions about his relocation metrics, active script workflows, or power BI designs?
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-900 bg-[#0e1726]/40 space-y-3.5">
                <h4 className="text-xs text-slate-450 font-mono tracking-wider uppercase font-bold">Suggested discussions to select:</h4>
                
                <div className="space-y-2 text-xs text-slate-400 font-sans">
                  <p className="flex items-start gap-1.5 leading-normal">
                    <span className="text-blue-400 font-mono">▸</span>
                    <span>"Explain Kaushal's role at Tech for Social Good Appo"</span>
                  </p>
                  <p className="flex items-start gap-1.5 leading-normal">
                    <span className="text-blue-400 font-mono">▸</span>
                    <span>"What kind of dashboards can he build in Tableau and Zoho?"</span>
                  </p>
                  <p className="flex items-start gap-1.5 leading-normal">
                    <span className="text-blue-400 font-mono">▸</span>
                    <span>"What is the Bus Mitra project about and its impact?"</span>
                  </p>
                </div>
              </div>

              {/* Informative secure indicator */}
              <div className="p-3.5 rounded-xl border border-dashed border-slate-850 text-[11px] text-slate-500 leading-normal font-mono text-center">
                <span>Secure Server-Side Node.js API Pipeline. Zero Browser Credentials Exposure.</span>
              </div>
            </div>

            {/* AI Assistant chat component container */}
            <div className="lg:col-span-8 shadow-2xl">
              <ChatAssistant />
            </div>

          </div>
        </section>

        {/* SECURITY CONTACT FRAME & QUICK SCHEDULING FORM */}
        <section id="contact" className="space-y-10 scroll-mt-24">
          <div className="border-t border-slate-900 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left sidebar details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">Contact Hub</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display">Say Hello</h2>
                  <p className="text-slate-450 text-sm leading-relaxed max-w-sm">
                    Have an open operational workflow position, consultancy contract, or direct database query? Get in touch immediately.
                  </p>
                </div>

                <div className="space-y-3.5 max-w-sm">
                  
                  {/* Whatsapp item */}
                  <a 
                    href={`https://wa.me/${KAUSHAL_BIO.whatsappCode}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-3.5 p-3 rounded-xl bg-[#0e1726]/30 border border-slate-900 hover:border-emerald-500/30 hover:bg-[#0f172a]/40 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-555/5 text-emerald-400 flex items-center justify-center border border-emerald-550/10">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[9px] font-mono uppercase tracking-wider font-bold">WhatsApp Direct</span>
                      <span className="text-slate-200 text-xs font-mono group-hover:text-emerald-400 transition-colors">+91 80738 68661</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 ms-auto text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </a>

                  {/* Mail item */}
                  <a 
                    href={`mailto:${KAUSHAL_BIO.email}`}
                    className="flex items-center space-x-3.5 p-3 rounded-xl bg-[#0e1726]/30 border border-slate-900 hover:border-blue-500/30 hover:bg-[#0f172a]/40 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-555/5 text-blue-400 flex items-center justify-center border border-blue-550/10">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[9px] font-mono uppercase tracking-wider font-bold">Email Inboxes</span>
                      <span className="text-slate-200 text-xs font-mono group-hover:text-blue-400 transition-colors">{KAUSHAL_BIO.email}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 ms-auto text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </a>

                  {/* LinkedIn item */}
                  <a 
                    href={KAUSHAL_BIO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-3.5 p-3 rounded-xl bg-[#0e1726]/30 border border-slate-900 hover:border-sky-550/30 hover:bg-[#0f172a]/40 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sky-555/5 text-sky-400 flex items-center justify-center border border-sky-550/10">
                      <Linkedin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[9px] font-mono uppercase tracking-wider font-bold">Corporate LinkedIn</span>
                      <span className="text-slate-200 text-xs font-mono group-hover:text-sky-450 transition-colors">/in/itskaushal11</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 ms-auto text-slate-600 group-hover:text-sky-450 transition-colors" />
                  </a>

                </div>
              </div>

              {/* Right direct messenger form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleContactSubmit} className="p-6 rounded-2xl border border-slate-900 bg-[#0e1726]/20 space-y-5">
                  <h3 className="font-extrabold text-lg text-white font-display">Express Brief Inquiry</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 animate-none">
                      <label className="block text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">Your Name <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Rachel Adams"
                        className="w-full bg-[#0b1120] border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-250 placeholder-slate-650 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">Your Email <span className="text-rose-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="e.g. rachel@enterprise.com"
                        className="w-full bg-[#0b1120] border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-250 placeholder-slate-650 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">Subject Title</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="e.g. Workflow Opportunity | CRM consulting speculation"
                      className="w-full bg-[#0b1120] border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-250 placeholder-slate-650 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">Inquiry Message <span className="text-rose-500">*</span></label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Input details about your operations requirements, dataset targets, or company schedule..."
                      className="w-full bg-[#0b1120] border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-250 placeholder-slate-650 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submission row */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 disabled:bg-slate-900 text-slate-950 font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/5 shrink-0 font-display leading-none active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>

                    {/* Success indicator */}
                    <AnimatePresence>
                      {isSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center space-x-2 text-emerald-400 text-xs font-mono"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Message has been logged!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER BAR */}
      <footer className="mt-auto border-t border-slate-900 bg-[#090e1a]/80 py-10 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="font-extrabold text-sm text-white font-display">Kaushal Singh Chamyal</h4>
            <p className="text-xs text-slate-500 font-mono">Data Analyst | Zoho Consultant | SaaS Operations Associate</p>
          </div>

          <div className="text-xs text-slate-600 font-mono tracking-wider">
            &bull; PREP MODE ACCEL &bull;
          </div>

          <div className="flex gap-4 font-mono text-xs text-slate-500">
            <a href={KAUSHAL_BIO.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href={KAUSHAL_BIO.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href={`mailto:${KAUSHAL_BIO.email}`} className="hover:text-blue-400 transition-colors">Gmail</a>
          </div>
        </div>

        <div className="border-t border-slate-900/60 pt-6 text-[10px] text-slate-650 font-mono">
          <p>© 2026 Kaushal Singh Chamyal. All Rights Reserved.</p>
        </div>
      </footer>

      {/* INTERACTIVE METRIC PROJECT SPECS LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="relative w-full max-w-4xl bg-[#0b1120] border border-slate-850 rounded-2xl overflow-hidden shadow-2xl z-25 max-h-[92vh] flex flex-col"
            >
              {/* Header section with backdrop color splash */}
              <div className="relative p-6 md:p-8 bg-slate-900/60 border-b border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 backdrop-blur-md z-10 shrink-0">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white rounded-lg bg-slate-900/60 transition-colors border border-slate-850 cursor-pointer active:scale-95"
                  title="Close Project View"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-2 max-w-[85%]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/15">
                      {selectedProject.category} SPECIFICATION
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      ID: {selectedProject.id}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-white font-display">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Tab switch buttons */}
                <div className="flex p-1 rounded-xl bg-slate-950/60 border border-slate-900 self-start md:self-center shrink-0">
                  <button
                    onClick={() => setSelectedProjectTab("overview")}
                    className={`px-3.5 py-2 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedProjectTab === "overview" 
                        ? "bg-blue-500 text-slate-950 font-bold" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Overview</span>
                  </button>
                  <button
                    onClick={() => setSelectedProjectTab("architecture")}
                    className={`px-3.5 py-2 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedProjectTab === "architecture" 
                        ? "bg-violet-500 text-slate-950 font-bold" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Technical Spec</span>
                  </button>
                  <button
                    onClick={() => setSelectedProjectTab("demo")}
                    className={`px-3.5 py-2 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedProjectTab === "demo" 
                        ? "bg-emerald-400 text-slate-950 font-bold animate-pulse" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Run Live Demo</span>
                  </button>
                </div>
              </div>

              {/* Scrollable contents frame */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
                
                {/* 1. OVERVIEW TAB SCREEN */}
                {selectedProjectTab === "overview" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Deep Business/Strategic Context description */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs font-mono text-slate-400 uppercase tracking-widest">Industry & Operations Context:</h4>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed bg-[#0e1726]/40 p-4 border border-slate-900 rounded-xl">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>

                    {/* Left/Right grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Built Core Features Checklist */}
                      {selectedProject.features && (
                        <div className="space-y-3 bg-[#0e1726]/20 p-5 rounded-xl border border-slate-900/80">
                          <h4 className="font-extrabold text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" />
                            <span>Functional Scope</span>
                          </h4>
                          <div className="space-y-2.5">
                            {selectedProject.features.map((feat, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                                <span className="text-emerald-500 shrink-0 font-bold">✓</span>
                                <span className="leading-normal">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Acreages and Business Benchmarks */}
                      {selectedProject.highlights && (
                        <div className="space-y-3 bg-[#0e1726]/20 p-5 rounded-xl border border-slate-900/80">
                          <h4 className="font-extrabold text-xs font-mono text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4" />
                            <span>Impact & Metrics Log</span>
                          </h4>
                          <div className="space-y-2.5">
                            {selectedProject.highlights.map((high, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-slate-400 leading-normal">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0"></span>
                                <span>{high}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Big impact label */}
                    {selectedProject.impact && (
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center gap-3 text-sm text-emerald-400 font-mono">
                        <CheckCircle className="w-5 h-5 shrink-0 animate-bounce" />
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Documented KPI Improvement:</p>
                          <span className="font-extrabold text-white text-base">{selectedProject.impact}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2. TECHNICAL SPECIFICATIONS TAB SCREEN */}
                {selectedProjectTab === "architecture" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 font-sans text-sm"
                  >
                    {/* Technology tags stack */}
                    <div>
                      <h4 className="font-extrabold text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">System Framework Nodes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-3 py-1.5 rounded-xl font-mono border border-slate-800 bg-[#0e1726] text-blue-400 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pipeline architecture container */}
                    <div className="bg-[#0b1120] border border-slate-900 rounded-xl p-5 space-y-4">
                      <h4 className="font-extrabold text-xs font-mono text-violet-400 uppercase tracking-widest flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        <span>Systems Interconnection Model (SIM)</span>
                      </h4>
                      
                      {/* Custom ASCII data pipeline simulation charts */}
                      <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-900/60 overflow-x-auto space-y-1 leading-relaxed">
                        {selectedProject.id === "proj-bus-mitra" && (
                          <>
                            <p className="text-emerald-500">[GPS Node Transmitter] ==(Real-time Coordinates Websocket)==&gt; [NoSQL DB]</p>
                            <p className="text-slate-500">                                                       ||</p>
                            <p className="text-slate-400">                                                 [Sync Lat/Lng Engine]</p>
                            <p className="text-slate-500">                                                       ||</p>
                            <p className="text-blue-400">      [Boarding QR Reader] &lt;==[Ticketing Web Interface] &lt;== [User Mobile Client App]</p>
                          </>
                        )}
                        {selectedProject.id === "proj-aura-music" && (
                          <>
                            <p className="text-blue-500">[User Listening Behavior] ==&gt; [Client-Session Tracker] ==&gt; [Prompt Matrix Builder]</p>
                            <p className="text-slate-500">                                                                ||</p>
                            <p className="text-purple-400">        [Synthesized Spatial Glow] &lt;== [Audio Context Engine] &lt;== [Vibe Coding Recommendation API]</p>
                          </>
                        )}
                        {selectedProject.id === "proj-ecommerce" && (
                          <>
                            <p className="text-cyan-500">[Raw Sales Raw Logs CSV] --(Pandas Aggregation Pipeline)--&gt; [Clean Datasets]</p>
                            <p className="text-slate-500">                                                              ||</p>
                            <p className="text-emerald-500">     [Insight Reports Dashboard] &lt;-- [Interactive Margins Optimizer] &lt;-- [Outliers Audit]</p>
                          </>
                        )}
                        {selectedProject.id === "proj-drowsiness" && (
                          <>
                            <p className="text-rose-500">[Video Frame Buffer Stream] ==(OpenCV Image Resizing)==&gt; [Dlib Shape Predictor]</p>
                            <p className="text-slate-500">                                                                   ||</p>
                            <p className="text-yellow-500"> [Digital Warning Buzzer Active] &lt;== [EAR Threshold Decision Logic] &lt;== [Landmark Vectors]</p>
                          </>
                        )}
                        {selectedProject.id === "proj-sales-dash" && (
                          <>
                            <p className="text-amber-500">[Enterprise Database Sources] --(Incremental Clean Tasks)--&gt; [SQL Star-Schema Model]</p>
                            <p className="text-slate-500">                                                                     ||</p>
                            <p className="text-orange-400">  [Polished Presentation Slides] &lt;== [Executive SLA dashboard] &lt;== [DAX Formula Calculations]</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Directory structure tree layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-xs font-mono text-slate-400 uppercase tracking-widest">Workspace File Nodes:</h4>
                        <div className="bg-slate-950 p-4 border border-slate-900 rounded-lg font-mono text-xs text-slate-450 space-y-1">
                          <p className="text-slate-300">📁 root/</p>
                          {selectedProject.id === "proj-bus-mitra" && (
                            <>
                              <p className="text-slate-400">  ├── 📁 lib_services/</p>
                              <p className="text-blue-400">  │   ├── location_streamer.dart <span className="text-[10px] text-slate-600">// GPS tracking</span></p>
                              <p className="text-blue-400">  │   └── ticket_db_connector.dart <span className="text-[10px] text-slate-600">// Booking</span></p>
                              <p className="text-slate-400">  ├── 📁 view_screens/</p>
                              <p className="text-slate-350">  │   ├── map_tracking_pane.dart</p>
                              <p className="text-slate-350">  │   └── passenger_ticket_widget.dart</p>
                              <p className="text-green-500">  └── pubspec.yaml</p>
                            </>
                          )}
                          {selectedProject.id === "proj-aura-music" && (
                            <>
                              <p className="text-slate-400">  ├── 📁 src_audio/</p>
                              <p className="text-blue-400">  │   ├── equalizer_visualizer.tsx <span className="text-[10px] text-slate-600">// Wave form</span></p>
                              <p className="text-blue-400">  │   └── playlist_ai_builder.ts <span className="text-[10px] text-slate-600">// Prompt design</span></p>
                              <p className="text-slate-400">  ├── 📁 components_player/</p>
                              <p className="text-slate-350">  │   ├── vinyl_disc_render.tsx</p>
                              <p className="text-slate-350">  │   └── slider_volume.tsx</p>
                              <p className="text-green-500">  └── package.json</p>
                            </>
                          )}
                          {selectedProject.id === "proj-ecommerce" && (
                            <>
                              <p className="text-slate-400">  ├── 📁 analysis_notebooks/</p>
                              <p className="text-blue-400">  │   ├── customer_segmentation.ipynb <span className="text-[10px] text-slate-600">// Cohorts</span></p>
                              <p className="text-blue-400">  │   └── revenue_forecast.ipynb <span className="text-[10px] text-slate-600">// Seasonality</span></p>
                              <p className="text-slate-400">  ├── 📁 db_schemas/</p>
                              <p className="text-slate-350">  │   ├── sql_aggregation_triggers.sql</p>
                              <p className="text-slate-350">  │   └── index_optimizations.sql</p>
                              <p className="text-green-500">  └── requirements.txt</p>
                            </>
                          )}
                          {selectedProject.id === "proj-drowsiness" && (
                            <>
                              <p className="text-slate-400">  ├── 📁 src_cv/</p>
                              <p className="text-blue-400">  │   ├── facial_shapes_detector.py <span className="text-[10px] text-slate-600">// Dlib mapping</span></p>
                              <p className="text-blue-400">  │   └── ear_calculator.py <span className="text-[10px] text-slate-600">// Eyes calculations</span></p>
                              <p className="text-slate-400">  ├── 📁 assets_sensors/</p>
                              <p className="text-slate-350">  │   ├── dlib_shape_predictor_68.dat</p>
                              <p className="text-slate-350">  │   └── alarm_buzz_tone.wav</p>
                              <p className="text-green-500">  └── pipeline_env.yml</p>
                            </>
                          )}
                          {selectedProject.id === "proj-sales-dash" && (
                            <>
                              <p className="text-slate-400">  ├── 📁 pbi_models/</p>
                              <p className="text-blue-400">  │   ├── corporate_sales_layout.pbix <span className="text-[10px] text-slate-600">// Core dashboard</span></p>
                              <p className="text-blue-400">  │   └── dax_measures_bank.txt <span className="text-[10px] text-slate-600">// DAX formulas</span></p>
                              <p className="text-slate-400">  ├── 📁 preprocessing/</p>
                              <p className="text-slate-350">  │   ├── data_cleansing_pipeline.m</p>
                              <p className="text-slate-350">  │   └── incremental_views.sql</p>
                              <p className="text-green-500">  └── enterprise_config.json</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4 text-xs text-slate-400 leading-relaxed self-center">
                        <p>
                          <strong className="text-white">Design Paradigm:</strong> The structural division centers operations integrity. Handlers execute calculations locally inside dedicated execution threads or async client loops to guarantee zero interface locking.
                        </p>
                        <p>
                          <strong className="text-white">Scalability Benchmark:</strong> In test profiles, this architecture maintains a high run rate with efficient processing, avoiding memory leaks across extensive database interactions and streaming threads.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. RUN INTERACTIVE LIVE DEMO SCREEN */}
                {selectedProjectTab === "demo" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-[#090e1a] border border-slate-900 space-y-6"
                  >
                    
                    {/* BUS MITRA LIVE SMART ROUTE & TICKETING DEMO */}
                    {selectedProject.id === "proj-bus-mitra" && (
                      <div className="space-y-6">
                        <div className="flex border-b border-slate-900 pb-3 justify-between items-center">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-sky-400 bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/15">Smart Transit Simulator</span>
                            <h4 className="text-base font-extrabold text-white">Bus Mitra Monitoring Deck</h4>
                          </div>
                          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 shrink-0 bg-emerald-500/5 px-2 py-1 rounded">
                            <Clock className="w-3.5 h-3.5 animate-spin" /> Connected
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Live Track stopping line */}
                          <div className="space-y-4 bg-[#0e1726]/40 p-5 rounded-xl border border-slate-900">
                            <h5 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Stop Tracking coordinates</h5>
                            
                            <div className="space-y-3.5 relative pl-4 border-l border-slate-800">
                              {[
                                { name: "Bangalore Central Hub", coords: "12.9716° N, 77.5946° E" },
                                { name: "Koramangala Commercial Sector", coords: "12.9352° N, 77.6245° E" },
                                { name: "Electronic City Gate", coords: "12.8452° N, 77.6601° E" },
                                { name: "Research Tech Terminal", coords: "12.8341° N, 77.6698° E" }
                              ].map((stop, sIdx) => (
                                <div key={sIdx} className="relative">
                                  <span className={`absolute left-[-21px] top-1 w-3 h-3 rounded-full border-2 transition-all ${
                                    busStopIdx === sIdx 
                                      ? "bg-sky-400 border-sky-400 scale-125 shadow-md shadow-sky-400/40" 
                                      : busStopIdx > sIdx 
                                      ? "bg-slate-700 border-slate-700" 
                                      : "bg-slate-950 border-slate-800"
                                  }`} />
                                  <div className="space-y-0.5">
                                    <p className={`text-xs font-semibold ${busStopIdx === sIdx ? "text-white" : "text-slate-500"}`}>{stop.name}</p>
                                    <p className="text-[10px] text-slate-600 font-mono">{stop.coords}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-mono">Status: Bus travelling</span>
                              <button
                                onClick={() => setBusStopIdx((prev) => (prev + 1) % 4)}
                                className="px-3.5 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-colors cursor-pointer active:scale-95 text-[11px]"
                              >
                                Advance Route Stop &raquo;
                              </button>
                            </div>
                          </div>

                          {/* Instant Ticketer booking */}
                          <div className="space-y-4 bg-[#0e1726]/40 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Fast Ticket QR Issuer</h5>
                              
                              <div className="space-y-2">
                                <label className="block text-[10px] font-mono text-slate-500">COMMUTER NAME</label>
                                <input 
                                  type="text" 
                                  defaultValue="Kaushal" 
                                  placeholder="Enter commuter name..."
                                  id="bus-passenger-input"
                                  className="w-full bg-[#0b1120] border border-slate-850 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:border-sky-500"
                                />
                              </div>
                            </div>

                            {busTicketStatus === "idle" && (
                              <button
                                onClick={() => {
                                  setBusTicketStatus("generating");
                                  setTimeout(() => {
                                    const passengerInput = (document.getElementById("bus-passenger-input") as HTMLInputElement)?.value || "Kaushal";
                                    const code = "BM-" + Math.floor(1000 + Math.random() * 9000) + "-QRC";
                                    setBusTicketCode(code);
                                    setBusTicketStatus("booked");
                                  }, 60000 / 120); // 500ms
                                }}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-sky-400 text-slate-950 font-extrabold text-xs cursor-pointer active:scale-95 hover:opacity-90 transition-all font-mono uppercase tracking-wider"
                              >
                                Issue Boarding Access QR
                              </button>
                            )}

                            {busTicketStatus === "generating" && (
                              <div className="text-center p-4 border border-dashed border-slate-850 rounded-xl space-y-2">
                                <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
                                <p className="text-[10px] font-mono text-slate-500">Syncing transit DB nodes...</p>
                              </div>
                            )}

                            {busTicketStatus === "booked" && (
                              <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }}
                                className="p-4 border border-emerald-500/20 bg-emerald-500/5 rounded-xl space-y-3 text-center"
                              >
                                <p className="text-[10px] font-mono text-emerald-400 font-bold">✓ SECURED BOARDING TICKET</p>
                                <p className="text-[11px] text-white">Commuter: <strong className="text-sky-400">{(document.getElementById("bus-passenger-input") as HTMLInputElement)?.value || "Kaushal"}</strong></p>
                                
                                {/* Simulated QR grid layout */}
                                <div className="w-20 h-20 bg-white p-1 mx-auto rounded border border-slate-200 grid grid-cols-5 gap-1 select-none">
                                  {[1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1].map((dot, k) => (
                                    <div key={k} className={`rounded-sm ${dot === 1 ? "bg-black" : "bg-white"}`} />
                                  ))}
                                </div>
                                <p className="text-[10px] font-mono text-slate-500 uppercase">Code: {busTicketCode}</p>
                                <button 
                                  onClick={() => setBusTicketStatus("idle")} 
                                  className="text-[9px] text-slate-450 hover:text-white underline block mx-auto cursor-pointer"
                                >
                                  Generate New Seat Boarding Pas
                                </button>
                              </motion.div>
                            )}
                          </div>

                        </div>
                      </div>
                    )}

                    {/* AURA MUSIC PREMIUM STREAMING PLAYER DEMO */}
                    {selectedProject.id === "proj-aura-music" && (
                      <div className="space-y-6">
                        <div className="flex border-b border-slate-900 pb-3 justify-between items-center">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-violet-400 bg-violet-500/5 px-2 py-0.5 rounded border border-violet-500/15">Immersive Streaming Applet</span>
                            <h4 className="text-base font-extrabold text-white">Apple-styled Audio Player Workspace</h4>
                          </div>
                        </div>

                        <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-b from-[#111827] to-[#030712] border border-slate-850 shadow-xl space-y-6">
                          {/* Album cover / Art vinyl rotating */}
                          <div className="flex flex-col items-center text-center space-y-4">
                            <div className="relative w-36 h-36 rounded-full bg-slate-900 border-4 border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden">
                              <div className="absolute inset-2 rounded-full border-2 border-dashed border-slate-700/60 animate-[spin_20s_linear_infinite]" />
                              <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-xs text-white uppercase font-black font-mono">AURA</span>
                              </div>
                              <div className={`absolute top-0 left-0 right-0 bottom-0 bg-blue-500/5 backdrop-blur-[1px] transition-opacity duration-300 ${auraPlaying ? "opacity-0" : "opacity-100"}`} />
                            </div>

                            <div className="space-y-1">
                              <h5 className="text-sm font-extrabold text-white">Autumn Echoes</h5>
                              <p className="text-xs text-slate-500 font-mono">Ambient Vibe Session - AI Track</p>
                            </div>
                          </div>

                          {/* Bouncing Equalizer Bars Visualizer */}
                          <div className="h-10 flex items-end justify-center space-x-1.5 px-6">
                            {auraEqValues.map((val, idx) => (
                              <div
                                key={idx}
                                className={`w-2.5 rounded-full bg-gradient-to-t from-violet-500 to-pink-500 ${auraPlaying ? "eq-bar-anim" : "h-2 bg-slate-800"}`}
                                style={{
                                  animationDelay: `${idx * 0.1}s`,
                                  height: !auraPlaying ? "6px" : undefined
                                }}
                              />
                            ))}
                          </div>

                          {/* Control sliders */}
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                              <span>01:34</span>
                              <span>03:45</span>
                            </div>
                            <div className="h-1 bg-slate-900 rounded-full relative overflow-hidden">
                              <div className="absolute top-0 bottom-0 left-0 bg-violet-500 w-[42%]" />
                            </div>
                          </div>

                          {/* Player controller buttons */}
                          <div className="flex items-center justify-center space-x-6">
                            <button 
                              onClick={() => setAuraPlaying(!auraPlaying)}
                              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                auraPlaying 
                                  ? "bg-white text-slate-950 scale-95" 
                                  : "bg-violet-500 text-slate-950 hover:bg-violet-400"
                              }`}
                            >
                              {auraPlaying ? (
                                <span className="font-extrabold text-xs">PAUSE</span>
                              ) : (
                                <span className="font-extrabold text-xs">PLAY</span>
                              )}
                            </button>
                          </div>

                          {/* Mood playlist recommendation selection */}
                          <div className="space-y-3 pt-4 border-t border-slate-900">
                            <p className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">AI Target Mood Presets</p>
                            <div className="flex justify-center gap-2">
                              {[
                                { k: "relax", n: "Relaxed Ambient", match: "Rain & LoFi Beats" },
                                { k: "focus", n: "Deep Focus", match: "Binaural White Noise" },
                                { k: "energy", n: "Energy Booster", match: "Synthwave Accelerated" }
                              ].map((item) => (
                                <button
                                  key={item.k}
                                  onClick={() => setAuraMood(item.k as any)}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                                    auraMood === item.k 
                                      ? "bg-violet-500/10 text-violet-400 border-violet-500/30" 
                                      : "bg-slate-950 border-slate-900 text-slate-500 hover:text-white"
                                  }`}
                                >
                                  {item.n}
                                </button>
                              ))}
                            </div>
                            <p className="text-[10px] text-slate-500 text-center font-mono mt-1">
                              Active Track Match: <span className="text-violet-400">
                                {auraMood === "relax" ? "Rain & LoFi Beats" : auraMood === "focus" ? "Binaural White Noise" : "Synthwave Accelerated"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ECOMMERCE ANALYTICS INTELLIGENT FORECASTER DEMO */}
                    {selectedProject.id === "proj-ecommerce" && (
                      <div className="space-y-6">
                        <div className="flex border-b border-slate-900 pb-3 justify-between items-center">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-sky-400 bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/15">Analytical Margin Optimizer</span>
                            <h4 className="text-base font-extrabold text-white">Ecommerce Forecasting Matrix Workspace</h4>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Sliders Input Deck */}
                          <div className="space-y-5 bg-[#0e1726]/30 p-5 rounded-xl border border-slate-900">
                            <h5 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Tweak Model Coefficients</h5>
                            
                            <div className="space-y-4">
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-mono text-slate-400">
                                  <span>CUSTOMER DISCOUNT RATE</span>
                                  <span className="text-sky-400 font-bold">{ecoDiscount}%</span>
                                </div>
                                <input 
                                  type="range" 
                                  min="10" 
                                  max="50" 
                                  value={ecoDiscount}
                                  onChange={(e) => setEcoDiscount(Number(e.target.value))}
                                  className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
                                />
                                <span className="text-[9px] text-slate-500 block leading-tight">Optimizes conversion throughput at lower average transaction margin.</span>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-mono text-slate-400">
                                  <span>MARKETING SPEND SPHERE</span>
                                  <span className="text-violet-400 font-bold">${ecoAdBudget}</span>
                                </div>
                                <input 
                                  type="range" 
                                  min="1000" 
                                  max="10000" 
                                  step="500"
                                  value={ecoAdBudget}
                                  onChange={(e) => setEcoAdBudget(Number(e.target.value))}
                                  className="w-full accent-violet-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
                                />
                                <span className="text-[9px] text-slate-500 block leading-tight font-mono">Drives customer entry flows across acquisition pathways.</span>
                              </div>
                            </div>
                          </div>

                          {/* Calculated Analytical KPIs */}
                          {(() => {
                            // Compute metrics live
                            const cvr = 1.8 + (ecoDiscount / 10) - (ecoAdBudget / 80000);
                            const visitors = Math.round(ecoAdBudget * 1.5);
                            const salesUnits = Math.round(visitors * (cvr / 100));
                            const cac = salesUnits > 0 ? (ecoAdBudget / salesUnits).toFixed(1) : "0.0";
                            const basePrice = 55;
                            const discountPrice = basePrice * (1 - ecoDiscount / 100);
                            const revenue = Math.round(salesUnits * discountPrice);
                            const roi = ecoAdBudget > 0 ? (((revenue - ecoAdBudget) / ecoAdBudget) * 100).toFixed(0) : "0";

                            return (
                              <div className="space-y-4 bg-[#0e1726]/30 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                                <h5 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Dynamic Matrix Calculations</h5>
                                
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="p-3 bg-[#0b1120] border border-slate-900 rounded-lg">
                                    <p className="text-[9px] font-mono text-slate-500 uppercase">CVR Rate:</p>
                                    <p className="text-lg font-extrabold text-blue-400">{cvr.toFixed(2)}%</p>
                                  </div>
                                  <div className="p-3 bg-[#0b1120] border border-slate-900 rounded-lg">
                                    <p className="text-[9px] font-mono text-slate-500 uppercase">CAC Threshold:</p>
                                    <p className="text-lg font-extrabold text-violet-400">${cac}</p>
                                  </div>
                                  <div className="p-3 bg-[#0b1120] border border-slate-900 rounded-lg">
                                    <p className="text-[9px] font-mono text-slate-500 uppercase">Forecast Revenue:</p>
                                    <p className="text-lg font-extrabold text-emerald-400">${revenue.toLocaleString()}</p>
                                  </div>
                                  <div className="p-3 bg-[#0b1120] border border-slate-900 rounded-lg">
                                    <p className="text-[9px] font-mono text-slate-500 uppercase">Projected Net ROI:</p>
                                    <p className={`text-lg font-extrabold ${Number(roi) >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{roi}%</p>
                                  </div>
                                </div>

                                {/* Custom Mini Forecast Bar layout */}
                                <div className="space-y-1">
                                  <div className="flex justify-between text-[9px] font-mono text-slate-600 uppercase">
                                    <span>Model Accuracy rating</span>
                                    <span>98.4% Confidence</span>
                                  </div>
                                  <div className="h-1.5 bg-[#0b1120] rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: "98.4%" }} />
                                  </div>
                                </div>
                              </div>
                            );
                          })()}

                        </div>
                      </div>
                    )}

                    {/* DRIVER DROWSINESS REAL-TIME CAMERA SIMULATOR */}
                    {selectedProject.id === "proj-drowsiness" && (
                      <div className="space-y-6">
                        <div className="flex border-b border-slate-900 pb-3 justify-between items-center">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-rose-400 bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/15">Computer Vision Guard</span>
                            <h4 className="text-base font-extrabold text-white">Driver Fatigue Inspection Deck</h4>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Simulated Video feed center */}
                          <div className={`relative aspect-video rounded-xl border flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${
                            drowsyState === "alert" 
                              ? "bg-slate-950 border-emerald-500/20" 
                              : "bg-rose-950/20 border-rose-500 animate-[pulse_1.5s_infinite]"
                          }`}>
                            
                            {/* Scanning grid mockup */}
                            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                            
                            {/* Frame overlay */}
                            <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/60 px-2.5 py-1 rounded-md text-[9px] font-mono text-slate-300 border border-slate-800">
                              <span className={`w-1.5 h-1.5 rounded-full ${drowsyState === "sleeping" ? "bg-rose-500 animate-ping" : "bg-emerald-400"}`} />
                              <span>CAMERA DEV FEED: ONLINE (60 FPS)</span>
                            </div>

                            {/* Center Face vector mapping mock */}
                            <div className="relative z-5 flex flex-col items-center">
                              <div className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center transition-colors ${
                                drowsyState === "alert" ? "border-emerald-400" : "border-rose-400"
                              }`}>
                                {/* Eyes mapping shapes */}
                                <div className="flex gap-4">
                                  <div className={`w-4 h-2 rounded-full border transition-all ${
                                    drowsyState === "sleeping" ? "h-[1px] bg-rose-500" : "h-2 bg-emerald-300"
                                  }`} />
                                  <div className={`w-4 h-2 rounded-full border transition-all ${
                                    drowsyState === "sleeping" ? "h-[1px] bg-rose-500" : "h-2 bg-emerald-300"
                                  }`} />
                                </div>
                              </div>
                              <p className="text-[10px] uppercase font-mono font-bold mt-3 text-white tracking-widest">
                                {drowsyState === "alert" ? "ALERT STATUS OK" : drowsyState === "yawning" ? "YAWNING DETECTED" : "CRITICAL SLEEP THREAT"}
                              </p>
                            </div>

                            {/* Warning message strip */}
                            {drowsyState === "sleeping" && (
                              <div className="absolute bottom-3 left-3 right-3 p-2 bg-rose-600 text-slate-950 rounded-lg text-[10px] font-black uppercase text-center font-mono animate-bounce tracking-wide shadow-lg">
                                Warning: Eye Aspect Ratio &lt; 0.15 threshold!
                              </div>
                            )}
                          </div>

                          {/* Control panel & audio synthesis */}
                          <div className="space-y-4 bg-[#0e1726]/30 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">FATIGUE BIOMARKERS CONTROLS</h5>
                              <p className="text-[11px] text-slate-550 leading-relaxed font-mono">Simulate various facial landmark eye closure (EAR) rates, yawning transitions and test physical hardware triggers.</p>
                              
                              <div className="grid grid-cols-1 gap-2.5">
                                <button
                                  onClick={() => setDrowsyState("alert")}
                                  className={`py-2 px-3 text-left rounded-xl border text-xs font-mono transition-all font-semibold cursor-pointer ${
                                    drowsyState === "alert" 
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold" 
                                      : "bg-slate-950 border-slate-900 text-slate-500"
                                  }`}
                                >
                                  🟢 Alert / Safe driver state: EAR 0.32
                                </button>
                                <button
                                  onClick={() => setDrowsyState("yawning")}
                                  className={`py-2 px-3 text-left rounded-xl border text-xs font-mono transition-all font-semibold cursor-pointer ${
                                    drowsyState === "yawning" 
                                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30 font-bold" 
                                      : "bg-slate-950 border-slate-900 text-slate-500"
                                  }`}
                                >
                                  🟡 Fatigued state (Yawning): EAR 0.23
                                </button>
                                <button
                                  onClick={() => {
                                    setDrowsyState("sleeping");
                                    // Synthesize warning beep!
                                    try {
                                      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                      const osc = audioCtx.createOscillator();
                                      const gain = audioCtx.createGain();
                                      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                                      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                                      osc.connect(gain);
                                      gain.connect(audioCtx.destination);
                                      osc.start();
                                      osc.stop(audioCtx.currentTime + 0.3);
                                    } catch(e){}
                                  }}
                                  className={`py-2 px-3 text-left rounded-xl border text-xs font-mono transition-all font-semibold cursor-pointer ${
                                    drowsyState === "sleeping" 
                                      ? "bg-rose-500/15 text-rose-450 border-rose-500/40 font-bold" 
                                      : "bg-slate-950 border-slate-900 text-slate-500"
                                  }`}
                                >
                                  🔴 Sleeping state (EAR &lt; 0.15): EAR 0.08
                                </button>
                              </div>
                            </div>

                            {drowsyState !== "alert" && (
                              <button
                                onClick={() => {
                                  // Manual alarm active synth beep sound
                                  try {
                                    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                    const osc = audioCtx.createOscillator();
                                    const gain = audioCtx.createGain();
                                    osc.frequency.setValueAtTime(900, audioCtx.currentTime);
                                    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                                    osc.connect(gain);
                                    gain.connect(audioCtx.destination);
                                    osc.start();
                                    osc.stop(audioCtx.currentTime + 0.25);
                                  } catch (err){}
                                }}
                                className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-slate-950 font-extrabold text-xs tracking-wider cursor-pointer active:scale-95 transition-all text-center uppercase"
                              >
                                Trigger Acknowledged Beep Alert
                              </button>
                            )}
                          </div>

                        </div>
                      </div>
                    )}

                    {/* INTERACTIVE SALES BI DASHBOARD DEMO */}
                    {selectedProject.id === "proj-sales-dash" && (
                      <div className="space-y-6">
                        <div className="flex border-b border-slate-900 pb-3 justify-between items-center">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/15">SaaS BI Workspace</span>
                            <h4 className="text-base font-extrabold text-white">Power BI Simulated KPI Analytics</h4>
                          </div>
                        </div>

                        <div className="space-y-5">
                          {/* Top Filtering elements representing Zoho/Power BI sliders */}
                          <div className="flex flex-wrap items-center gap-4 bg-[#0e1726]/40 p-4 border border-slate-900 rounded-xl justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-slate-500 uppercase">ACTIVE DATABASE REGION:</span>
                              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-900">
                                {["Global", "North America", "Europe", "APAC"].map((r) => (
                                  <button
                                    key={r}
                                    onClick={() => setSalesRegion(r as any)}
                                    className={`px-3 py-1 rounded text-[10px] font-mono transition-all font-semibold cursor-pointer ${
                                      salesRegion === r 
                                        ? "bg-amber-400 text-slate-950 font-bold" 
                                        : "text-slate-400 hover:text-white"
                                    }`}
                                  >
                                    {r}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 italic block">Calculated via live DAX aggregations</span>
                          </div>

                          {/* Top KPI Cards list */}
                          {(() => {
                            // Regional calculated multipliers
                            const mult = salesRegion === "Global" ? 1.0 : salesRegion === "North America" ? 0.45 : salesRegion === "Europe" ? 0.32 : 0.23;
                            
                            const salesVal = Math.round(1850000 * mult);
                            const customerAcq = Math.round(410 * mult);
                            const growthVal = salesRegion === "Global" ? "+28.4%" : salesRegion === "North America" ? "+32.1%" : salesRegion === "Europe" ? "+19.4%" : "+34.2%";
                            const daxExpression = salesRegion === "Global" 
                              ? "TOTALYTD_GlobalRevenue = CALCULATE(SUM(Sales[GrossAmount]), Calendar[ActiveYTD])" 
                              : `TOTALYTD_${salesRegion.replace(" ", "")} = CALCULATE(SUM(Sales[GrossAmount]), Sales[Region] = "${salesRegion}")`;

                            return (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div className="p-4 rounded-xl border border-slate-900 bg-[#0e1726]/20">
                                    <p className="text-[10px] font-mono text-slate-500 uppercase">Annual Recurring Goal:</p>
                                    <p className="text-xl font-extrabold text-amber-400 font-display">${salesVal.toLocaleString()}</p>
                                    <span className="text-[9px] text-slate-600 font-mono">Gross ledger values sorted</span>
                                  </div>
                                  <div className="p-4 rounded-xl border border-slate-900 bg-[#0e1726]/20">
                                    <p className="text-[10px] font-mono text-slate-500 uppercase">Active Accounts:</p>
                                    <p className="text-xl font-extrabold text-sky-400 font-display">{customerAcq.toLocaleString()}</p>
                                    <span className="text-[9px] text-slate-600 font-mono">Verified distinct company IDs</span>
                                  </div>
                                  <div className="p-4 rounded-xl border border-slate-900 bg-[#0e1726]/20">
                                    <p className="text-[10px] font-mono text-slate-500 uppercase">YoY Revenue Acceleration:</p>
                                    <p className="text-xl font-extrabold text-emerald-400 font-display">{growthVal}</p>
                                    <span className="text-[9px] text-slate-600 font-mono">Organic operational efficiency</span>
                                  </div>
                                </div>

                                <div className="space-y-2 bg-slate-950 p-4 border border-slate-900 rounded-xl">
                                  <p className="text-[10px] uppercase font-mono font-bold text-slate-500">Power BI DAX Query Execution:</p>
                                  <div className="p-2.5 rounded bg-[#0b1120] border border-slate-900/60 font-mono text-[11px] text-amber-450 leading-relaxed break-all select-all">
                                    {daxExpression}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}

                        </div>
                      </div>
                    )}

                  </motion.div>
                )}

              </div>

              {/* Actions sticky footer */}
              <div className="p-6 md:p-8 bg-slate-900/40 border-t border-slate-850 flex items-center justify-between shrink-0">
                <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">Operational pipeline optimized</span>
                
                <div className="flex items-center gap-3 ms-auto">
                  {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-850 hover:bg-slate-800 text-xs text-white font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Codebase Repo</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-xs text-slate-950 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRINT-OPTIMIZED PDF-STYLE RESUME PREVIEW MODAL */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeOpen(false)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-2xl z-25 max-h-[92vh] flex flex-col"
            >
              {/* PDF toolbar section */}
              <div className="sticky top-0 bg-[#0e1726] border-b border-slate-800 p-4 shrink-0 flex items-center justify-between z-10">
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-5 h-5 text-red-400" />
                  <div>
                    <h4 className="text-xs font-black text-white font-mono uppercase tracking-wider leading-none">Kaushal_Chamyal_Resume.pdf</h4>
                    <span className="text-[9px] text-slate-500 font-mono mt-1 block">LIGHTWEIGHT MULTI-FORMAT PREVIEW</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      // Trigger copy markdown text
                      const mdText = `
# KAUSHAL SINGH CHAMYAL
Data Analyst | Zoho Consultant | SaaS Operations Associate
Email: itskaushal11@gmail.com | LinkedIn: linkedin.com/in/itskaushal11 | GitHub: github.com/kaushall-git
Location: India

## PROFESSIONAL SUMMARY
CS Graduate specializing in Data Analytics, Business Intelligence, SaaS CRM operations and automated workflows.

## SKILLS
* Analytics: SQL, Python (Pandas/NumPy), Power BI, Tableau
* SaaS Ecosystem: Zoho CRM, Zoho Analytics, Zoho Books API
* Tools: Git, React, Web setups

## HISTORY
1. SaaS Automation & Founder's Office Associate | Tech for Social Good Appo | June 2025 - Present
2. Data Analytics Simulator Participant | Deloitte | 2025
3. Power BI simulating program | PwC Switzerland | 2024
`;
                      navigator.clipboard.writeText(mdText);
                      alert("Markdown resume layout copied successfully!");
                    }}
                    className="px-2.5 py-1.5 rounded bg-[#0b1120] text-[10px] text-slate-300 font-mono font-medium hover:bg-slate-950 border border-slate-800 cursor-pointer"
                    title="Copy Markdown format"
                  >
                    Copy Markdown
                  </button>
                  <button
                    onClick={handleDownloadTxtResume}
                    className="px-2.5 py-1.5 rounded bg-[#0b1120] text-[10px] text-slate-300 font-mono font-medium hover:bg-slate-950 border border-slate-800 cursor-pointer flex items-center gap-1"
                    title="Download Plain ASCII Text Copy"
                  >
                    <Download className="w-3 h-3 text-blue-400" />
                    <span>Download TXT</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-slate-950 text-[10px] font-bold font-mono cursor-pointer flex items-center gap-1"
                    title="Print Document as real PDF file"
                  >
                    <span>Print PDF</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setIsResumeOpen(false)}
                    className="p-1.5 rounded hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Document container mimicking A4 sheet */}
              <div className="overflow-y-auto p-4 md:p-8 bg-slate-950 flex-1 flex justify-center">
                
                {/* Print Targeted Resume Structure */}
                <div 
                  id="print-resume-area" 
                  className="w-full max-w-[21cm] bg-white text-slate-900 border border-slate-200 rounded shadow-md p-6 sm:p-12 font-sans overflow-hidden text-left"
                >
                  {/* Print Resume Header */}
                  <div className="border-b border-slate-300 pb-5 text-center space-y-2">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 font-display">KAUSHAL SINGH CHAMYAL</h1>
                    <p className="text-xs font-semibold text-slate-500 font-mono tracking-wider uppercase">Data Analyst | Zoho CRM Specialist | SaaS Operations Associate</p>
                    
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-[10px] md:text-xs font-mono text-slate-600">
                      <span>itskaushal11@gmail.com</span>
                      <span>&bull;</span>
                      <a href="https://linkedin.com/in/itskaushal11" target="_blank" rel="noreferrer" className="underline">linkedin.com/in/itskaushal11</a>
                      <span>&bull;</span>
                      <a href="https://github.com/kaushall-git" target="_blank" rel="noreferrer" className="underline">github.com/kaushall-git</a>
                      <span>&bull;</span>
                      <span>India</span>
                    </div>
                  </div>

                  {/* Body grid */}
                  <div className="py-6 space-y-6 text-xs leading-relaxed text-slate-800">
                    
                    {/* Summary row */}
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-900 border-b border-slate-200 pb-1">Professional Profile</h3>
                      <p className="text-justify font-sans text-[11px] text-slate-705 text-slate-700">
                        Result-driven Computer Science graduate specializing in Corporate Business Intelligence, SaaS Systems architectures, and workflow automations. Proven expertise modeling structured databases, querying critical SQL joins, and deploying Zoho One solutions that enhance strategic tracking and prevent manual system duplications.
                      </p>
                    </div>

                    {/* Skill matrix */}
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-900 border-b border-slate-200 pb-1">Technical Competencies</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[10.5px]">
                        <div>
                          <p><strong className="text-slate-900">Core Data Analytics:</strong> SQL (Queries/Joins), Python (Pandas/NumPy), Power BI, Tableau, ETL Cleaning pipelines.</p>
                        </div>
                        <div>
                          <p><strong className="text-slate-900">Zoho / SaaS Automations:</strong> Deluge script hooks, Zoho CRM workflow logic, Zoho Books API connector, Zoho Analytics dashboards, Zoho Creator.</p>
                        </div>
                      </div>
                    </div>

                    {/* Work experiences */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-900 border-b border-slate-200 pb-1">Professional timeline</h3>
                      
                      <div className="space-y-2.5">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[11px]">
                            <strong className="text-slate-900">SaaS Automation & Founder&apos;s Office Associate</strong>
                            <span className="text-slate-500 font-mono">June 2025 – Present</span>
                          </div>
                          <div className="text-slate-600 italic">Tech for Social Good / Appo | India / Remote</div>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-700 text-[10.5px]">
                            <li>Manage the Zoho One ecosystem for international operations, streamlining CRM trigger handovers.</li>
                            <li>Develop critical dashboard indicators in Zoho Analytics, delivering executive milestones overview.</li>
                            <li>Model operational clean-up procedures, securing a 90%+ databank accuracy score across datasets.</li>
                          </ul>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[11px]">
                            <strong className="text-slate-900">Data Analytics Simulation Participant</strong>
                            <span className="text-slate-500 font-mono">2025</span>
                          </div>
                          <div className="text-slate-600 italic">Deloitte | Virtual Sandbox Experience</div>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-700 text-[10.5px]">
                            <li>Conducted extensive mock Trend Analyses highlighting critical quarterly revenue metrics.</li>
                            <li>Designed Tableau dashboards optimizing corporate logistics budgets.</li>
                          </ul>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[11px]">
                            <strong className="text-slate-900">Power BI Business Intelligence Participant</strong>
                            <span className="text-slate-500 font-mono">2024</span>
                          </div>
                          <div className="text-slate-600 italic">PwC Switzerland | Virtual Case Simulation</div>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-700 text-[10.5px]">
                            <li>Engineered comprehensive KPI dashboards tracking organizational performance indicators.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Academic Showcases */}
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-900 border-b border-slate-200 pb-1">Select System Projects</h3>
                      <div className="space-y-2 text-[10.5px]">
                        <p><strong className="text-slate-900">Bus Mitra (Smart Transit platform):</strong> Real-time coordinates tracking & automatic ticketing (Flutter/Firebase/Maps). Research model published and accepted.</p>
                        <p><strong className="text-slate-900">Driver Drowsiness Detector (Computer Vision):</strong> Safety alarm trigger utilizing OpenCV and eyelid landmark vectors calculation (python).</p>
                        <p><strong className="text-slate-900">Aura Music Streaming:</strong> Apple styled browser player layout styled matching premium themes (framer motion/React).</p>
                      </div>
                    </div>

                    {/* Certifications highlights */}
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-900 border-b border-slate-200 pb-1">Credentials & Certifications</h3>
                      <p className="text-[10px] text-slate-650 leading-relaxed font-mono">
                        Data Analysis with Python (FreeCodeCamp/IBM) &bull; Machine Learning with Python (Cognitive Class) &bull; Data Analytics Job Simulation (Accenture/Forage) &bull; Power BI Virtual Experience (PwC Switzerland) &bull; Data Analytics Simulation (Deloitte)
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE CERTIFICATE LIGHTBOX VIEW */}
      <AnimatePresence>
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#0e1726] border border-slate-850 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl z-25 text-center"
            >
              <button 
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white bg-slate-900/60 border border-slate-850"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 pt-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl mx-auto shadow-xl">
                  <Award className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-extrabold text-white font-display">
                  Validation Log
                </h3>
                
                <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-900 space-y-2 text-xs">
                  <p className="text-slate-400 font-mono">Credential Name:</p>
                  <p className="text-blue-400 font-bold font-sans">{selectedCertificate.title}</p>
                  
                  <div className="h-[1px] bg-slate-900 my-2" />
                  
                  <p className="text-slate-400 font-mono">Issuer Institute:</p>
                  <p className="text-slate-200 font-semibold font-sans">{selectedCertificate.issuer}</p>
                </div>
                
                <p className="text-[11px] text-slate-550 italic leading-relaxed">
                  "This virtual simulation credentials profile represents verified diagnostic and analytical competencies completed across academic program sandboxes."
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-white font-semibold border border-slate-800"
                >
                  Close validation
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
