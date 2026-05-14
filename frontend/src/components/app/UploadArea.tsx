"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { uploadDocuments } from "@/lib/api";

interface UploadAreaProps {
  onUploadComplete: (files: File[]) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
}

const processingSteps = [
  "Extracting document text...",
  "Splitting content into chunks...",
  "Creating embeddings...",
  "Building vector database...",
  "Optimizing semantic retrieval...",
  "Preparing AI memory...",
];

export const UploadArea = ({ onUploadComplete, isProcessing, setIsProcessing }: UploadAreaProps) => {
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

      await uploadDocuments(selectedFiles);
      
      onUploadComplete(selectedFiles);
      setSelectedFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>
        
        {error && (
          <div className="mb-6 glass p-4 rounded-xl border border-destructive/50 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <p className="text-destructive">{error}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-12 rounded-2xl text-center"
            >
              <Loader2 className="w-16 h-16 text-primary mx-auto mb-6 animate-spin" />
              <h3 className="text-2xl font-bold mb-2">Processing Documents...</h3>
              <p className="text-muted-foreground mb-8">
                Large documents may take some time to process.
              </p>
              <div className="space-y-3">
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
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted animate-pulse" />
                    )}
                    <span className={index < currentStep ? "text-foreground" : "text-muted-foreground"}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
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
                <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Drag & Drop PDFs</h3>
                <p className="text-muted-foreground">
                  or click to browse your files
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Selected Files ({selectedFiles.length})</h4>
                    <button
                      onClick={() => setSelectedFiles([])}
                      className="text-muted-foreground hover:text-foreground text-sm"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="glass p-4 rounded-xl flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium truncate max-w-xs">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleUpload}
                    className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
                  >
                    Upload and Process
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
