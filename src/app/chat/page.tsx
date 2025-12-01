"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"; // Ensure you have this hook or use your own toast logic
import {
  UploadCloud,
  File as FileIcon,
  Trash2,
  Loader2,
  Bot,
  Send,
  User,
  MessageSquare,
  Sparkles,
} from "lucide-react";

// Types for Chat
interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  // --- State for File Upload ---
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  
  // --- State for Chat ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();

  // --- Auto-scroll to bottom of chat ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- File Handlers (Identical to Visualizer) ---
  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && (selectedFile.type === "text/csv" || selectedFile.name.endsWith('.csv'))) {
      setFile(selectedFile);
      // Reset chat when file changes
      setActiveFilePath(null);
      setMessages([]);
    } else if (selectedFile) {
      toast({ title: "Invalid File", description: "Please upload a CSV file.", variant: "destructive" });
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e.target.files?.[0] || null);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    handleFileChange(e.dataTransfer.files?.[0] || null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
  }, []);

  const resetState = () => { 
    setFile(null); 
    setActiveFilePath(null); 
    setMessages([]); 
  };

  // --- Step 1: Upload File to get Path ---
  const handleStartChat = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setIsUploading(true);
    
    // We need to upload the file to the server first so the Python Agent can read it
    const formData = new FormData();
    formData.append("file", file);

    try {
      // NOTE: You need the upload_helper API route I provided in the previous response
      const response = await fetch("/api/upload_helper", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to upload file.");
      }

      setActiveFilePath(data.path);
      setMessages([{ role: "assistant", content: `I've analyzed **${file.name}**. Ask me anything about the data!` }]);
      toast({ title: "System Ready", description: "File uploaded successfully. You can now chat." });

    } catch (error: any) {
      toast({ title: "Upload Error", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  // --- Step 2: Chat Logic ---
  const handleSendMessage = async () => {
    if (!input.trim() || isChatLoading || !activeFilePath) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsChatLoading(true);

    try {
      // Call your backend agent
      const response = await fetch("/api/chat-with-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: activeFilePath,
          query: userMsg
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "I encountered an error analyzing that query." }]);
      }
    } catch (error) {
        setMessages((prev) => [...prev, { role: "assistant", content: "Network connection failed." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header - Matching Visualizer Style */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">AI Data Chat Agent</h1>
          <p className="text-lg text-foreground/70">
            Upload your dataset and ask questions in plain English.
          </p>
        </div>

        {/* Upload Section - Exact Replica of Visualizer UI */}
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-8 shadow-sm border border-border/50 mb-10">
          <form onSubmit={handleStartChat} className="space-y-6">
             <div 
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 
                ${file ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/70 hover:bg-primary/5'}
              `}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Input 
                type="file" 
                accept=".csv" 
                onChange={onInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={!!activeFilePath} // Disable if chat has started
              />
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                    <UploadCloud className="w-12 h-12 text-primary" />
                    <p className="font-semibold">Drag & drop your CSV here</p>
                  </motion.div>
                ) : (
                  <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-4">
                    <FileIcon className="w-10 h-10 text-primary"/>
                    <div className="text-left">
                      <p className="font-semibold truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-foreground/60">{activeFilePath ? "Active in Chat" : "Ready to upload"}</p>
                    </div>
                    {!activeFilePath && (
                      <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); resetState(); }}>
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* The Main Action Button */}
            {!activeFilePath && (
              <Button type="submit" size="lg" className="w-full text-lg" disabled={isUploading || !file}>
                {isUploading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Preparing Agent...</>) : ("Start Chatting")}
              </Button>
            )}
          </form>
        </div>

        {/* CHAT INTERFACE - Replaces the Visualizer Grid */}
        <AnimatePresence>
          {activeFilePath && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-card rounded-2xl border border-border/50 shadow-lg overflow-hidden flex flex-col h-[600px]"
            >
              
              {/* Chat Header */}
              <div className="bg-muted/30 border-b border-border/50 p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                   <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                   <h3 className="font-semibold">Data Assistant</h3>
                   <p className="text-xs text-foreground/60 flex items-center gap-1">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> 
                     Online • {file?.name}
                   </p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-black/20">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                     <div className={`max-w-[80%] md:max-w-[70%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}>
                            {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        </div>

                        {/* Bubble */}
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === "user" 
                            ? "bg-primary text-primary-foreground rounded-tr-sm" 
                            : "bg-white dark:bg-slate-800 border border-border/50 rounded-tl-sm"
                        }`}>
                           {msg.content}
                        </div>
                     </div>
                  </motion.div>
                ))}
                
                {/* Loading Indicator */}
                {isChatLoading && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border border-border/50 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                           <Loader2 className="w-4 h-4 animate-spin text-primary" />
                           <span className="text-sm text-foreground/60">Analyzing data...</span>
                        </div>
                     </div>
                   </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-background border-t border-border/50">
                <div className="relative flex gap-2">
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask a question (e.g., 'Which product has the highest sales?')"
                    className="pr-12 py-6 text-base shadow-sm focus-visible:ring-primary/20"
                    disabled={isChatLoading}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isChatLoading}
                    size="icon"
                    className="absolute right-2 top-1.5 h-9 w-9 rounded-lg"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}