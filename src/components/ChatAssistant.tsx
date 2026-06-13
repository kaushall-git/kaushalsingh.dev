import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, User, Send, Sparkles, RefreshCw, SendHorizontal, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";
import { CHAT_SUGGESTIONS } from "../data";

export default function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hi there! I'm Kaushal's AI Assistant. Ask me anything about Kaushal's skills, projects, employment history, or availability! Choose a suggest chip below or type your own question.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMsg(null);
    const userMessage: ChatMessage = {
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Map existing messages to history format
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: history,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to get AI response.");
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        role: "model",
        text: data.text || "I was unable to formulate a response. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorMsg(err.message || "Something went wrong. Let's try that again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        text: "Conversation restarted. I'm ready to tell you more about Kaushal! Ask me about their current role, project experience, or stack.",
        timestamp: new Date(),
      },
    ]);
    setErrorMsg(null);
  };

  return (
    <div id="ai-assistant-container" className="flex flex-col h-[520px] rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/30">
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5 leading-none">
              Kaushal's Companion AI
              <span className="inline-flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active model: gemini-3.5-flash"></span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">POWERED BY GEMINI-3.5-FLASH</span>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all font-mono text-xs flex items-center gap-1 border border-slate-800"
          title="Reset chat"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((m, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  m.role === "user"
                    ? "bg-indigo-500/15 border-indigo-400/30 text-indigo-400"
                    : "bg-teal-500/15 border-teal-400/30 text-teal-400"
                }`}
              >
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "bg-indigo-600/90 text-white rounded-tr-none border border-indigo-500/40"
                    : "bg-slate-850 text-slate-200 rounded-tl-none border border-slate-800"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed prose prose-invert prose-sm">
                  {m.text}
                </div>
                <div
                  className={`text-[10px] mt-1 font-mono ${
                    m.role === "user" ? "text-indigo-200 text-right" : "text-slate-500 text-left"
                  }`}
                >
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-850 rounded-2xl rounded-tl-none border border-slate-800 px-4 py-3 flex items-center space-x-1.5">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-300"></span>
            </div>
          </motion.div>
        )}

        {/* Error */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-red-200 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && !isLoading && (
        <div className="px-5 py-2 border-t border-slate-850 bg-slate-950/20">
          <p className="text-[11px] text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Suggested Questions</p>
          <div className="flex flex-wrap gap-1.5">
            {CHAT_SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s)}
                className="text-xs px-2.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/85 text-slate-300 hover:text-white border border-slate-800 transition-all text-left"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Kaushal's assistant anything..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all font-sans"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 transition-all shadow-lg hover:shadow-teal-500/15"
        >
          <SendHorizontal className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
