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
  FileText,
  Lightbulb,
  Target,
  TrendingUp,
  BarChart2,
  BookOpen,
  Download,
} from "lucide-react";

// --- Interfaces ---

// Ensure these keys match exactly what your Python "parsed_report" returns
interface ReportData {
  subject: string;
  executive_summary: string;
  data_overview_and_quality_review: string;
  descriptive_and_diagnostic_analysis: string;
  key_insights_and_patterns: string;
  strategic_opportunity: string;
  recommendations_and_forecast: string;
}

interface ApiErrorResponse {
  error: string;
  details?: string;
}

// --- Helper Functions ---

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// --- Main Component ---

export default function ReportGeneratorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const { toast } = useToast();

  // 1. Handle File Selection (Drag & Drop + Click)
  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && (selectedFile.type === "text/csv" || selectedFile.name.endsWith('.csv'))) {
      setFile(selectedFile);
      setReportData(null); // Reset report if new file selected
    } else if (selectedFile) {
      toast({ 
        title: "Invalid File Type", 
        description: "Please upload a .csv file.", 
        variant: "destructive" 
      });
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files?.[0] || null);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange(e.dataTransfer.files?.[0] || null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const resetState = () => {
    setFile(null);
    setReportData(null);
  };

  // 2. Submit to API
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setReportData(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // We will create this API route in the next step
      const response = await fetch("/api/generate-report", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate report");
      }

      if (data.parsed_report) {
        setReportData(data.parsed_report);
        toast({ title: "Success", description: "Report generated successfully!" });
      } else {
        throw new Error("Report generated but data format is incorrect.");
      }

    } catch (error: any) {
      console.error("Error generating report:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Something went wrong.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Download Handler
  const handleDownload = () => {
    if (!reportData) return;
    
    const reportText = `
Subject: ${reportData.subject || "Business Report"}

--- Executive Summary ---
${reportData.executive_summary}

--- Data Overview & Quality Review ---
${reportData.data_overview_and_quality_review}

--- Descriptive & Diagnostic Analysis ---
${reportData.descriptive_and_diagnostic_analysis}

--- Key Insights & Patterns ---
${reportData.key_insights_and_patterns}

--- Strategic Opportunity ---
${reportData.strategic_opportunity}

--- Recommendations & Forecast ---
${reportData.recommendations_and_forecast}
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Report-${file?.name.replace('.csv', '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4. Helper Component for Sections
  const SectionCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <div className="bg-card/50 rounded-lg border border-border/50 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-xl font-semibold text-primary/90">{title}</h3>
      </div>
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed">
        <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 m-0 border-0 shadow-none text-inherit">
          {children || "No data available for this section."}
        </pre>
      </div>
    </div>
  );
  
  // --- Render ---
  return (
    <section className="py-20 sm:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header & Upload Area */}
        <div className="bg-card rounded-xl p-8 shadow-2xl shadow-primary/10 border border-border/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">AI Business Report Generator</h1>
            <p className="text-lg text-foreground/70">Transform your CSV data into actionable, executive-level insights.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div 
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 
                ${file ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/70 hover:bg-primary/5'}
              `}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Input 
                id="file-upload" 
                type="file" 
                accept=".csv" 
                onChange={onInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                    <UploadCloud className="w-12 h-12 text-primary" />
                    <p className="font-semibold">Drag & drop your dataset here</p>
                    <p className="text-sm text-foreground/60">or click to browse for a CSV file</p>
                  </motion.div>
                ) : (
                  <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-4 text-left">
                    <FileIcon className="w-10 h-10 text-primary flex-shrink-0"/>
                    <div className="flex-grow">
                      <p className="font-semibold truncate">{file.name}</p>
                      <p className="text-sm text-foreground/60">{formatFileSize(file.size)}</p>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); resetState(); }} className="flex-shrink-0">
                      <Trash2 className="w-5 h-5 text-destructive hover:text-destructive/80" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button type="submit" size="lg" className="w-full text-lg" disabled={isLoading || !file}>
              {isLoading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Data...</>) : ("Generate Full Report")}
            </Button>
          </form>
        </div>

        {/* Results Display */}
        <AnimatePresence>
          {reportData && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-12 space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-6">
                 <h2 className="text-3xl font-bold text-primary">{reportData.subject}</h2>
                 <Button onClick={handleDownload} variant="outline"><Download className="mr-2 h-4 w-4" /> Download Report</Button>
              </div>

              <SectionCard icon={<BookOpen className="w-6 h-6"/>} title="Executive Summary">
                {reportData.executive_summary}
              </SectionCard>
              <SectionCard icon={<BarChart2 className="w-6 h-6"/>} title="Data Overview & Quality Review">
                {reportData.data_overview_and_quality_review}
              </SectionCard>
              <SectionCard icon={<FileText className="w-6 h-6"/>} title="Descriptive & Diagnostic Analysis">
                {reportData.descriptive_and_diagnostic_analysis}
              </SectionCard>
              <SectionCard icon={<Lightbulb className="w-6 h-6"/>} title="Key Insights & Patterns">
                {reportData.key_insights_and_patterns}
              </SectionCard>
              <SectionCard icon={<Target className="w-6 h-6"/>} title="Strategic Opportunity">
                {reportData.strategic_opportunity}
              </SectionCard>
              <SectionCard icon={<TrendingUp className="w-6 h-6"/>} title="Recommendations & Forecast">
                {reportData.recommendations_and_forecast}
              </SectionCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}