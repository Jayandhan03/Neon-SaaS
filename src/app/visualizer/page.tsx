"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  UploadCloud,
  File as FileIcon,
  Trash2,
  Loader2,
  BarChart,
  PieChart,
  LineChart,
  ImageIcon,
} from "lucide-react";

// Types matching the JSON output from your Python Agent
interface VisualizationItem {
  title: string;
  description: string;
  file_path: string; // This will be the URL
  insight: string;
}

interface VisualizerData {
  summary: string;
  visualizations: VisualizationItem[];
}

export default function VisualizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visualData, setVisualData] = useState<VisualizerData | null>(null);
  const { toast } = useToast();

  // --- File Handlers ---
  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && (selectedFile.type === "text/csv" || selectedFile.name.endsWith('.csv'))) {
      setFile(selectedFile);
      setVisualData(null);
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

  const resetState = () => { setFile(null); setVisualData(null); };

  // --- API Submission ---
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setVisualData(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/generate-visualizations", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate visualizations.");
      }

      setVisualData(data.parsed_visuals);
      toast({ title: "Success", description: "Visualizations generated successfully!" });

    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">AI Data Visualizer</h1>
          <p className="text-lg text-foreground/70">
            Automatically generate charts and visual insights from your dataset.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-8 shadow-sm border border-border/50 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                      <p className="text-xs text-foreground/60">Ready to visualize</p>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); resetState(); }}>
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button type="submit" size="lg" className="w-full text-lg" disabled={isLoading || !file}>
              {isLoading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Charts...</>) : ("Generate Visuals")}
            </Button>
          </form>
        </div>

        {/* Results Grid */}
        <AnimatePresence>
          {visualData && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              
              {/* Summary Section */}
              {visualData.summary && (
                <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <BarChart className="w-5 h-5" /> Summary
                  </h3>
                  <p className="text-foreground/80">{visualData.summary}</p>
                </div>
              )}

              {/* Grid of Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {visualData.visualizations.map((vis, index) => (
                  <div key={index} className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4 border-b border-border/50 bg-muted/30">
                      <h3 className="font-semibold text-lg truncate" title={vis.title}>{vis.title}</h3>
                    </div>
                    
                    <div className="relative aspect-video bg-white flex items-center justify-center p-2">
                       {/* Using standard img tag to handle local server URLs easily */}
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img 
                        src={vis.file_path} 
                        alt={vis.title}
                        className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300" 
                       />
                    </div>

                    <div className="p-5 space-y-3">
                      <p className="text-sm text-foreground/70 italic">{vis.description}</p>
                      <div className="bg-primary/5 p-3 rounded-md">
                        <p className="text-sm font-medium text-primary flex gap-2">
                          <ImageIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {vis.insight}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}