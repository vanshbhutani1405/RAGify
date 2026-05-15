"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, CheckCircle2, Loader2, AlertCircle, TrendingUp, Scale } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { uploadDocuments } from "@/lib/api";

interface UploadAreaProps {
  onUploadComplete: (files: File[]) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  onDemoSelect?: (demoType: "financial" | "legal") => void;
}

const processingSteps = [
  "Extracting text...",
  "Splitting chunks...",
  "Creating embeddings...",
  "Building vector DB...",
  "Optimizing retrieval...",
  "Preparing AI...",
];

const demoCards = [
  {
    type: "financial" as const,
    icon: TrendingUp,
    title: "Financial RAG",
    description: "Analyze financial reports, revenue trends, and insights.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "legal" as const,
    icon: Scale,
    title: "Legal RAG",
    description: "Chat with legal agreements, policies, and contracts.",
    color: "from-purple-500 to-pink-500",
  },
];

export const UploadArea = ({ onUploadComplete, isProcessing, setIsProcessing, onDemoSelect }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
    } else {
      setError("Please upload PDF files only");
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = Array.from(e.target.files || []).filter(
      (file) => file.type === "application/pdf"
    );
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
    } else {
      setError("Please upload PDF files only");
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setCurrentStep(0);

    try {
      for (let i = 0; i < processingSteps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setCurrentStep(i + 1);
      }

      await uploadDocuments(selectedFiles, "custom");
      
      onUploadComplete(selectedFiles);
      setSelectedFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-hidden">
      <div className="max-w-2xl mx-auto w-full h-full flex flex-col">
        <div>
          <h2 className="text-xl font-bold mb-1">Upload Documents</h2>
          <p className="text-muted-foreground mb-4 text-xs">
            RAGify uses RAG to transform documents into an AI knowledge system.
          </p>
          
          {error && (
            <div className="mb-3 glass p-2 rounded-lg border border-destructive/50 flex items-center space-x-2">
              <AlertCircle className="w-3.5 h-3.5 text-destructive" />
              <p className="text-destructive text-xs">{error}</p>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-5 rounded-xl text-center flex-1 flex flex-col justify-center"
            >
              <Loader2 className="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
              <h3 className="text-lg font-bold mb-1">Processing...</h3>
              <p className="text-muted-foreground mb-4 text-xs">
                Large docs may take time.
              </p>
              <div className="space-y-1.5">
                {processingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: index < currentStep ? 1 : 0.3,
                    }}
                    className="flex items-center justify-center space-x-2"
                  >
                    {index < currentStep ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-muted animate-pulse" />
                    )}
                    <span className={`text-xs ${index < currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 flex-1 flex flex-col overflow-hidden"
            >
              <div className="flex-shrink-0">
                <h3 className="text-base font-semibold mb-2">Upload Your Own</h3>
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-white/5"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Upload className="w-9 h-9 text-muted-foreground mx-auto mb-2" />
                  <h4 className="text-base font-semibold mb-0.5">Drag & Drop PDFs</h4>
                  <p className="text-xs text-muted-foreground">
                    or click to browse
                  </p>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <h5 className="font-semibold text-xs">Selected ({selectedFiles.length})</h5>
                      <button
                        onClick={() => setSelectedFiles([])}
                        className="text-muted-foreground hover:text-foreground text-xs"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-28 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="glass p-2 rounded-md flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="w-3.5 h-3.5 text-primary" />
                            <div>
                              <p className="font-medium text-xs truncate max-w-[160px]">{file.name}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleUpload}
                      className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      Upload & Process
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 flex-1">
                <h3 className="text-base font-semibold mb-2">Or Try Demo RAGs</h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {demoCards.map((demo, index) => (
                    <motion.button
                      key={demo.type}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => onDemoSelect?.(demo.type)}
                      className="glass p-3 rounded-md text-left w-full hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`p-2 rounded-md bg-gradient-to-br ${demo.color}`}>
                          <demo.icon className="w-4.5 h-4.5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-0.5">{demo.title}</h4>
                          <p className="text-[11px] text-muted-foreground">{demo.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
