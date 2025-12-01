// src/app/cleaner/page.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UploadCloud,
  File,
  Trash2,
  Loader2,
  CheckCircle,
  Download,
} from "lucide-react";

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

interface ParsedCsvData {
  headers: string[];
  rows: string[][];
  originalRowCount: number;
}

export default function DataCleanerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [instructions, setInstructions] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cleanedData, setCleanedData] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedCsvData | null>(null);
  const { toast } = useToast();

  const resetState = () => {
    setFile(null);
    setCleanedData(null);
    setParsedData(null);
  };
  
  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setCleanedData(null);
      setParsedData(null);
    } else if (selectedFile) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid .csv file.",
        variant: "destructive",
      });
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files?.[0] || null);
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFileChange(event.dataTransfer.files?.[0] || null);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a CSV file to clean.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCleanedData(null);
    setParsedData(null);

    const formData = new FormData();
    formData.append("file", file);
    if (instructions) formData.append("instructions", instructions);

    try {
      const uploadResponse = await fetch("/api/clean-data", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.detail || "Failed to upload and clean file");
      }

      const result = await uploadResponse.json();
      setCleanedData(result.cleaned_csv_content);

      // Parse the CSV data for table display
      Papa.parse(result.cleaned_csv_content, {
        header: false,
        skipEmptyLines: true,
        complete: (parsed) => {
          const data = parsed.data as string[][];
          if(data.length > 0) {
            const headers = data[0];
            const rows = data.slice(1);
            setParsedData({ headers, rows, originalRowCount: rows.length });
          }
        },
      });

      toast({
        title: "Cleaning Complete!",
        description: "Your data has been processed by AI.",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Error cleaning data",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
      if (cleanedData) {
        const blob = new Blob([cleanedData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cleaned_${file?.name || "data"}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    };


  return (
    <section className="py-20 sm:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl p-8 shadow-2xl shadow-primary/10 border border-border/50"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              AI Data Cleaner
            </h1>
            <p className="text-lg text-foreground/70">
              Upload a CSV, provide instructions, and let AI do the hard work.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className="relative border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors duration-300 hover:border-primary/70 hover:bg-primary/5"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <AnimatePresence>
                {!file ? (
                  <motion.div key="upload-prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                    <UploadCloud className="w-12 h-12 text-primary" />
                    <p className="font-semibold">Drag & drop your CSV file here</p>
                    <p className="text-sm text-foreground/60">or click to browse</p>
                  </motion.div>
                ) : (
                  <motion.div key="file-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-4 text-left">
                    <File className="w-10 h-10 text-primary flex-shrink-0"/>
                    <div className="flex-grow">
                      <p className="font-semibold truncate">{file.name}</p>
                      <p className="text-sm text-foreground/60">{formatFileSize(file.size)}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); resetState(); }} className="flex-shrink-0">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <Label htmlFor="instructions" className="text-base">
                Cleaning Instructions (Optional)
              </Label>
              <Textarea
                id="instructions"
                placeholder="e.g., 'Remove rows with missing values, standardize all dates to YYYY-MM-DD format, and correct spelling in the city column.'"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="mt-2 min-h-[100px] text-base"
              />
            </div>

            <Button type="submit" size="lg" className="w-full text-lg" disabled={isLoading || !file}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Cleaning in Progress...
                </>
              ) : (
                "Start AI Cleaning"
              )}
            </Button>
          </form>
        </motion.div>

        <AnimatePresence>
          {parsedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 bg-card rounded-xl p-8 shadow-2xl shadow-primary/10 border border-border/50"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500"/>
                    <h2 className="text-2xl font-bold">Cleaning Successful</h2>
                </div>
                <Button onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Cleaned CSV
                </Button>
              </div>

              <div className="overflow-auto rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {parsedData.headers.map((header) => (
                        <TableHead key={header} className="font-bold">{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedData.rows.slice(0, 10).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {parsedData.originalRowCount > 10 && (
                <p className="mt-4 text-sm text-center text-foreground/60">
                  Showing first 10 rows of {parsedData.originalRowCount} total rows.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}