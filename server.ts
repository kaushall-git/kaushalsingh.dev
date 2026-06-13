import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini client lazily to avoid crashing on launch if key is missing.
let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI Chat companion will be unavailable.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

app.use(express.json());

// API route first: proxy chat queries to Gemini API
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
       res.status(400).json({ error: "Message is required" });
       return;
    }

    const ai = getGeminiClient();
    if (!ai) {
       res.status(503).json({
        error: "AI Chat Service is currently unavailable. (GEMINI_API_KEY is missing on the server)",
        isConfigured: false
      });
      return;
    }

    const systemInstruction = `
You are a highly capable AI portfolio assistant representing Kaushal Singh Chamyal, an exceptional Data Analyst, Zoho Consultant, and SaaS Operations Associate.
Your purpose is to answer questions about Kaushal's professional career, background, skills, projects, and work ethic.

Here is Kaushal's official resume/profile information:
------
ABOUT KAUSHAL:
- Professional Name: Kaushal Singh Chamyal
- Location: India (Open to Remote & Onsite Opportunities globally).
- Tagline: "Transforming data into actionable business insights through analytics, automation, and intelligent systems."
- Bio: A Computer Science graduate passionate about Data Analytics, Business Intelligence, SaaS Automation, CRM Systems, and Product Development. Expert at translating heavy, disconnected databases into beautiful, actionable dashboards and automated operational workflows.
- Contact Email: itskaushal11@gmail.com
- Github: https://github.com/kaushall-git
- Linkedin: https://linkedin.com/in/itskaushal11

CORE SKILLS:
1. Data Analytics: Python (Pandas, NumPy, Matplotlib), SQL, Power BI, Tableau, Excel, Data Cleaning, Data Visualization, Business Intelligence (BI).
2. CRM & Automation: Zoho CRM, Zoho Analytics, Zoho Creator, Zoho Books, SaaS Workflow Automation, Lead Routing & automation triggers.
3. Development / Tools: Flutter, Firebase, Google Maps API, Git, GitHub, VS Code, Hostinger, Wix Studio setups.

WORK HISTORY & SIMULATION RECORD:
1. Tech for Social Good / Appo [June 2025 – Present]
   * Role: SaaS Automation & Founder's Office Associate
   * Work: Manage Zoho One ecosystem, build custom CRM automation/workflows, create dashboards using Zoho Analytics, clean corporate sheets, support leadership with scalable SaaS operations.
2. Deloitte Data Analytics Simulation:
   * Work: Trend Analysis, Tableau Dashboard Creation, Forensic Data Analysis, Business Insights Generation.
3. PwC Switzerland Simulation:
   * Work: Power BI KPI Dashboard Development, Data Storytelling, Business Reporting, Visualization Design.
4. Anudip Foundation:
   * Work: Data Cleaning, SQL Database Analysis, Python Analytics, Data Visualization.

KEY PROJECTS:
1. Bus Mitra (Smart Transportation Platform):
   - What it is: A real-time bus tracking and municipal management platform.
   - Stack: Flutter, Firebase, Google Maps API.
   - Features: Real-time map tracking, QR ticketing, route planning, online ticketing.
   - Impact: 100+ simulated users, 90%+ tracking accuracy. Research publication formally accepted!
2. Aura Music (AI-music Player):
   - What it is: A beautiful, responsive music player inspired by Apple Music.
   - Star properties: Custom authentication, AI playlist generation, personalized suggestions, cinematic player controls.
   - Stack: Vibe coding, prompt engineering, React, Framer Motion.
3. Ecommerce analysis (Python script):
   - Sales analysis, customer lifetime metrics, MySQL integration, Jupyter Notebooks.
4. Driver Drowsiness Detector (Python/OpenCV/Dlib):
   - Fatigue landmark triggers, real-time alert triggers, safety automation.
5. Sales & Business Dashboard (Power BI):
   - Revenue streams tracking, Custom DAX formulas, interactive KPI visualizers.

EDUCATION:
- Computer Science Graduate (Bachelor of Science). Special focus on Business Intelligence (BI), Data Science operations, and Automated Workflows.

CERTIFICATIONS EARNED:
- Data Analysis with Python (FreeCodeCamp/IBM)
- Machine Learning with Python (Cognitive Class)
- Data Analytics & Visualization Job Simulation (Accenture/Forage)
- Power BI Virtual Experience (PwC Switzerland/Forage)
- Data Analytics professional Simulation (Deloitte/Forage)
- Software Engineering simulation (JPMorgan Chase/Forage)

GUIDELINES FOR YOUR RESPONSES:
1. Speak of "Kaushal" in the third person. Keep the tone natural, professional, helpful, confident, and business-focused (like a world-class enterprise SaaS assistant).
2. Emphasize business impact (e.g., how analytics and automation save company operations time and uncover hidden revenue).
3. If asked for direct personal credentials or sensitive details not listed, politely guide the user to download his resume or contact him directly at itskaushal11@gmail.com.
4. Be structured, utilizing markdown lists and formatting flags. Keeping responses brief but value-packed is highly appreciated.
------
`;

    // Map history to the required format if provided, otherwise create a new chat
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Populate past conversational turns if any, using standard sendMessage
    if (history && Array.isArray(history) && history.length > 0) {
      // Standard chat history playout or direct call can be simplified.
      // For simplicity, we can feed the previous contexts or send direct prompt.
      // Let's format the prompts nicely combined, or carry out a normal conversation:
      // Note: chat.sendMessage can be executed. But we can also make a single prompt representing the history!
      // This is extremely robust and avoids state mismatch issues.
      let formattedPrompt = "";
      if (history.length > 0) {
         formattedPrompt += "Keep context of our past chat history:\n";
         history.forEach((turn: any) => {
            const roleName = turn.role === "user" ? "Visitor" : "Kaushal AI";
            formattedPrompt += `${roleName}: ${turn.parts?.[0]?.text || turn.text || ""}\n`;
         });
      }
      formattedPrompt += `\nVisitor: ${message}\nKaushal AI:`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      
      res.json({ text: response.text });
    } else {
      const response = await chat.sendMessage({
        message: message,
      });
      res.status(200).json({ text: response.text });
    }
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Setup Vite Dev server or Production static serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Let's serve index.html for SPA router on any unmatched route
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server loaded in ${process.env.NODE_ENV || "development"} mode.`);
    console.log(`Server successfully listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
