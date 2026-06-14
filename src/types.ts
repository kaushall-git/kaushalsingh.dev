export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "analytics" | "automation" | "product" | "all";
  tags: string[];
  features?: string[];
  highlights?: string[];
  githubUrl?: string;
  liveUrl?: string;
  impact?: string;
}

export interface Skill {
  name: string;
  category: "analytics" | "automation" | "tools";
  level: number; // Percent out of 100
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location?: string;
  description: string[];
  isEducation?: boolean;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface Certificate {
  title: string;
  issuer: string;
  credentialUrl?: string;
  color: string;
  image?: string;
  description?: string;
  year?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatarSeed: string;
}

export interface ShowcaseDashboard {
  title: string;
  platform: "Power BI" | "Tableau" | "Zoho Analytics";
  imagePrompt: string; // Thematic parameters used for custom container styles
  metrics: string[];
}
