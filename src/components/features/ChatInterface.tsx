"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react"; // Ensure you have lucide-react or use generic icons

interface ChatInterfaceProps {
  filePath: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface({ filePath }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I've loaded your data. Ask me anything about it." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: filePath,
          query: userMessage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I encountered an error analyzing the data." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-xl bg-slate-50 dark:bg-slate-900 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b bg-white dark:bg-slate-800 rounded-t-xl">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          Data Chat Agent
        </h2>
        <p className="text-xs text-gray-500 truncate">Source: {filePath}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-slate-700 p-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
              <span className="text-xs text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            placeholder="E.g., Which product sold the most?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}