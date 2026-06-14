import { Project, Skill, Experience, Certificate, Testimonial, ShowcaseDashboard } from "./types";

export const KAUSHAL_BIO = {
  name: "Kaushal Singh Chamyal",
  shortName: "Kaushal",
  titles: [
    "Data Analyst",
    "Zoho Consultant",
    "SaaS Operations Associate",
    "Business Intelligence Enthusiast"
  ],
  location: "India",
  availability: "Open to Remote & Onsite Opportunities",
  tagline: "Transforming data into actionable business insights through analytics, automation, and intelligent systems.",
  email: "itskaushal11@gmail.com",
  github: "https://github.com/kaushall-git",
  linkedin: "https://www.linkedin.com/in/realkaushal07",
  whatsappCode: "917982125256", // Placeholder or standard whatsapp trigger
  aboutMe: `I am a Computer Science graduate passionate about Data Analytics, Business Intelligence, SaaS Automation, CRM Systems, and Product Development. I specialize in transforming complex datasets into meaningful insights while building scalable workflows and automation systems that improve operational efficiency.`
};

export const PROJECTS: Project[] = [
  {
    id: "proj-bus-mitra",
    title: "Bus Mitra",
    description: "Developed a real-time smart bus tracking and automated management platform that improves public transportation accessibility.",
    longDescription: "A smart transit solution for localized networks, utilizing dynamic coordinates tracking, automatic check-ins, ticketing engines, and interactive visual routes to support modern, transparent travels.",
    category: "product",
    tags: ["Flutter", "Firebase", "Google Maps API", "NoSQL", "Real-time DB"],
    features: [
      "Real-Time Tracking & Live Map Coordinates",
      "Interactive QR-Based Quick Ticketing System",
      "Static Route Optimization & Driver Schedule Management",
      "Online Seat Reservations & Digital Payments Integration"
    ],
    highlights: [
      "Secured 90%+ real-time location coordinate tracking accuracy inside testing labs",
      "Drafted comprehensive specifications resulting in successful Research Publication Acceptance",
      "Scaled framework to handle concurrent real-time coordination updates securely"
    ],
    githubUrl: "https://github.com/kaushall-git/BUSMITRA",
    liveUrl: "#",
    impact: "100+ Potential Daily Commuters Impacted with 90%+ Tracking Accuracy"
  },
  {
    id: "proj-aura-music",
    title: "Aura Music",
    description: "Developed a premium AI-powered music streaming application inspired by Apple Music, emphasizing slick layouts and high-fidelity transitions.",
    longDescription: "An ultra-premium browser player combining prompt engineering, dynamic metadata extraction, and customized playlists. Styled matching strict dark mode layouts with responsive player controls and adaptive ambient glow templates.",
    category: "automation", // AI enabled/Automation
    tags: ["Vibe Coding", "Prompt Engineering", "React 19", "Framer Motion", "Tailwind 4"],
    features: [
      "Interactive User Authentication & User Identity Frames",
      "AI Checklist Playlist Generation based on mood states",
      "Personalized Music Recommendations based on listening history",
      "Full-Screen Cinematic Media Playback & Equalizer visual logs",
      "Dynamic adaptive borders mirroring the sound theme glow",
      "Interactive profile personalization with modular avatar uploads"
    ],
    highlights: [
      "Delivered a beautifully fluid experience with smooth playback transition logic",
      "Highlights deep expertise in modern generative workflows and responsive designs",
      "Ensured instant loading matching Apple-like visual minimalism guidelines"
    ],
    githubUrl: "https://github.com/kaushall-git/AuraMusic",
    liveUrl: "https://ais-pre-volui4xj5dqpwrs37vktiv-983567081324.asia-southeast1.run.app",
    impact: "Showcases innovative client-side AI product builds combined with premium UI layouts"
  },
  {
    id: "proj-ecommerce",
    title: "Ecommerce Analytics Engine",
    description: "An interactive sales intelligence framework parsing commercial trends, purchase funnels, and customer retention metrics.",
    longDescription: "A Python-centered analytical workbook evaluating transaction history logs. Uncovers monthly recurring revenue fluctuations, customer acquisition cost efficiency, and optimal pricing intervals.",
    category: "analytics",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "MySQL", "Jupyter"],
    features: [
      "Granular Sales Trend & Seasonality Forecasting Analysis",
      "Segmented Customer Demographics & Value Identification Profile",
      "Automated Database Procedures for fast Revenue Reporting",
      "Outlier Detection for finding chargebacks and purchase bugs"
    ],
    highlights: [
      "Consolidated 50,000+ mock sales logs into polished predictive trend segments",
      "Calculated customer lifetime value trajectories and optimized promotional margins",
      "Delivered visual dashboards identifying 15% revenue leakage opportunities"
    ],
    githubUrl: "https://github.com/kaushall-git/Ecommerce_Analysis",
    liveUrl: "#",
    impact: "Generated 15% Business Insight Improvements with polished forecasting reports"
  },
  {
    id: "proj-drowsiness",
    title: "Driver Drowsiness Detector",
    description: "A real-time safety automation computer vision model identifying immediate fatigue indicators on driver video streams.",
    longDescription: "Embedded safety product detecting continuous eyelid enclosure transitions and yawning movements using specialized facial landmark mapping algorithms.",
    category: "product",
    tags: ["Python", "OpenCV", "Dlib", "Real-Time Cam", "Facial Landmarks"],
    features: [
      "Real-Time Eyelid Closure Duration Calculation (EAR)",
      "Instant Acoustic Sleep Threat & Notification triggers",
      "High Reliability across dark lighting environments using IR adjustments"
    ],
    highlights: [
      "Achieved fast, responsive real-time frames inspection to avoid lag danger",
      "Engineered clean facial landmark vector calculations using lightweight dlib models",
      "Prototyped full hardware integration proposal for freight transport partners"
    ],
    githubUrl: "https://github.com/kaushall-git/Driver-Drowsy-Detection",
    liveUrl: "#",
    impact: "Accident Prevention model maintaining high response accuracy inside test streams"
  },
  {
    id: "proj-sales-dash",
    title: "Interactive Sales & KPI Dashboard",
    description: "An executive tracking environment visualizing monthly recurring goals, operational expenses, and sales rep performance.",
    longDescription: "An highly polished Power BI intelligence center consolidating diverse marketing spreadsheets into unified interactive visuals.",
    category: "analytics",
    tags: ["Power BI", "DAX Formulas", "Data Modeling", "Excel Queries"],
    features: [
      "Dynamic drill-down controls filtering reports by product lines, region, and seasons",
      "Automated incremental data refreshing and source data cleanup pipelines",
      "Integrated key performance indicator metrics tracking executive milestones in real time"
    ],
    highlights: [
      "Eliminated 6 hours of weekly manual slide creation by automating database syncs",
      "Secured unanimous approval from leadership for quarterly presentation reporting templates",
      "Utilized custom DAX measures for calculating active repeat purchase rates"
    ],
    githubUrl: "#",
    liveUrl: "#",
    impact: "50+ executive reports automated and delivered securely to leadership teams"
  }
];

export const SKILLS: Skill[] = [
  // Data Analytics
  { name: "SQL (Queries & Joins)", category: "analytics", level: 95 },
  { name: "Python (Pandas / NumPy)", category: "analytics", level: 90 },
  { name: "Power BI (DAX Developer)", category: "analytics", level: 92 },
  { name: "Tableau (Data Viz)", category: "analytics", level: 88 },
  { name: "Data Cleaning & Prep", category: "analytics", level: 94 },
  { name: "Business Intelligence", category: "analytics", level: 90 },
  
  // CRM & SaaS Automation
  { name: "Zoho CRM (Workflows)", category: "automation", level: 93 },
  { name: "Zoho Analytics", category: "automation", level: 90 },
  { name: "SaaS Workflow Optimization", category: "automation", level: 92 },
  { name: "Zoho Creator & Creator SDK", category: "automation", level: 82 },
  { name: "Zoho Books API Integrations", category: "automation", level: 80 },

  // Dev Tools
  { name: "Git & Version Control", category: "tools", level: 85 },
  { name: "React / Vite Setup", category: "tools", level: 78 },
  { name: "Wix Studio & CSS overrides", category: "tools", level: 85 },
  { name: "Hostinger & Domain setups", category: "tools", level: 88 }
];

export const TIMELINE: Experience[] = [
  {
    id: "exp-appo",
    role: "SaaS Automation & Founder's Office Associate",
    company: "Tech for Social Good / Appo",
    duration: "June 2025 – Present",
    location: "India / Remote",
    description: [
      "Manage and optimize the Zoho One enterprise ecosystem for international organizations, streamlining cross-border compliance.",
      "Build complex custom CRM workflows, instant script hooks, and trigger actions to automate sales handovers.",
      "Develop executive dashboards inside Zoho Analytics, bringing clear transparency into cross-divisional progress.",
      "Consolidate, validate, and clean business metrics across multiple sheets, maintaining 90%+ tracking accuracy.",
      "Support strategic decision-making with polished research material and real-time operational dashboard templates."
    ]
  },
  {
    id: "exp-deloitte",
    role: "Data Analytics Simulation Participant",
    company: "Deloitte",
    duration: "2025",
    location: "Remote Simulation",
    description: [
      "Conducted extensive mock Trend Analyses highlighting critical quarterly revenue metrics.",
      "Designed and delivered interactive Tableau dashboards optimizing marketing budget distribution strategies.",
      "Applied Forensic Data Analysis approaches to identify outliers and clean complex transaction logs.",
      "Presented executive business insights summaries describing next-phase growth recommendations."
    ]
  },
  {
    id: "exp-pwc",
    role: "Power BI Business Intelligence Participant",
    company: "PwC Switzerland",
    duration: "2024",
    location: "Remote Simulation",
    description: [
      "Engineered comprehensive KPI dashboards tracking organizational performance indicators.",
      "Applied data storytelling heuristics to transform dense corporate numbers into fluid, human-readable charts.",
      "Crafted visualization themes and customized maps targeting user engagement diagnostics."
    ]
  },
  {
    id: "exp-anudip",
    role: "Data Analytics Training Program",
    company: "Anudip Foundation",
    duration: "2024",
    location: "India",
    description: [
      "Performed exhaustive dataset cleaning, database structuring, and predictive modeling.",
      "Coded customizable Python scripts for web scraping and data aggregation tasks.",
      "Mastered structured SQL data querying, custom schema triggers, and visual data representations."
    ]
  }
];

export const CERTIFICATIONS: Certificate[] = [
  {
    title: "Data Analysis with Python",
    issuer: "freeCodeCamp",
    description: "Comprehensive data analysis with Python, Pandas, NumPy, data cleaning, and data storytelling.",
    year: "2024",
    image: "/assets/certificates/data-analysis-python.jpg",
    credentialUrl: "https://freecodecamp.org",
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Machine Learning with Python",
    issuer: "Cognitive Class / IBM",
    description: "Exploration of machine learning algorithms, regression models, classification systems, and regression vectors with Python.",
    year: "2024",
    image: "/assets/certificates/machine-learning-ibm.jpg",
    credentialUrl: "#",
    color: "from-purple-600 to-fuchsia-600"
  },
  {
    title: "Data Analytics and Visualization",
    issuer: "Accenture / Forage",
    description: "Practical simulation focusing on client requirements mapping, data cleaning, modeling, and presentation storytelling.",
    year: "2024",
    image: "/assets/certificates/data-analytics-visualization.jpg",
    credentialUrl: "#",
    color: "from-emerald-600 to-teal-600"
  },
  {
    title: "Power BI Job Simulation",
    issuer: "PwC Switzerland / Forage",
    description: "Dynamic dashboard development, DAX metrics formulation, user-centric KPI mapping, and corporate reporting.",
    year: "2024",
    image: "/assets/certificates/powerbi-pwc.jpg",
    credentialUrl: "#",
    color: "from-amber-600 to-orange-600"
  },
  {
    title: "Deloitte Data Analytics",
    issuer: "Deloitte / Forage",
    description: "Exploratory analysis of business pipelines, demographic categorization, financial diagnostics, and stakeholder presentation logs.",
    year: "2025",
    image: "/assets/certificates/deloitte-analytics.jpg",
    credentialUrl: "#",
    color: "from-pink-600 to-rose-600"
  },
  {
    title: "JPMorgan Software Engineering",
    issuer: "JPMorgan Chase / Forage",
    description: "Engineering-centered case study involving financial interfaces, dataset streams processing, perspective charts, and systems automation.",
    year: "2024",
    image: "/assets/certificates/jpmorgan-software.jpg",
    credentialUrl: "#",
    color: "from-sky-600 to-cyan-600"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "A. K. Sharma",
    role: "Senior Program Manager",
    company: "Tech for Social Good",
    text: "Kaushal completely digitized our tracking workflow. His mastery over the Zoho One database consolidated three disconnected spreadsheets into a single, high-fidelity metrics funnel that completely transformed our operations.",
    avatarSeed: "sharma"
  },
  {
    name: "Elena Rostova",
    role: "Operations Director",
    company: "Appo Global International",
    text: "Working with Kaushal is an absolute pleasure. He doesn't just clean charts; he finds the underlying business stories. The automated CRM tools he set up saved our outreach teams over 10 hours of manual lookup every single week.",
    avatarSeed: "elena"
  },
  {
    name: "Rajesh Nair",
    role: "Academic Mentor & Research Head",
    company: "Technical Faculty Board",
    text: "Kaushal's analytical discipline stands out. His project 'Bus Mitra' showed remarkable technical execution, and his research proposal demonstrated a thorough, data-driven methodology that deserved its formal publication.",
    avatarSeed: "rajesh"
  }
];

export const DASHBOARDS: ShowcaseDashboard[] = [
  {
    title: "Corporate Financial & Sales KPI Dashboard",
    platform: "Power BI",
    imagePrompt: "Financial reports grid, DAX formulas visualization, corporate metrics dashboard showing customer retention metrics, margin ratios, and active sales funnels, deep blue glassmorphism theme, interactive charts.",
    metrics: ["$2.4M Sales Tracked", "Active Margin Ratios", "Retention Growth Analyzed", "Dynamic Drill Down enabled"]
  },
  {
    title: "Regional Sales & Customer Segment Diagnostic",
    platform: "Tableau",
    imagePrompt: "Geographic sales trends map, user segment heatmaps, beautiful user experience analytics, clean cards presenting marketing acquisition channels, deep slate glow theme.",
    metrics: ["Geographic Heatmaps", "Cohort Retention curves", "Marketing Attribution stats", "Interactive Legend filters"]
  },
  {
    title: "Enterprise CRM Workflow Efficiency Funnel",
    platform: "Zoho Analytics",
    imagePrompt: "SaaS funnel metrics grid, lead conversion ratios, automated workflow logs, clean dashboard widgets displaying ticket resolution delays, high contrast slate interface.",
    metrics: ["Workflows Sync status", "Lead Routing speed charts", "Ticket turnaround analysis", "Omni-channel operational insights"]
  }
];

export const CHAT_SUGGESTIONS = [
  "What Zoho tools does Kaushal specialize in?",
  "Tell me about the Bus Mitra tracking project.",
  "What is his experience in SaaS operation roles?",
  "How does he handle database and CRM workflows?"
];
