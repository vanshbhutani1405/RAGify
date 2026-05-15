"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/app/Sidebar";
import { UploadArea } from "@/components/app/UploadArea";
import { ChatInterface } from "@/components/app/ChatInterface";
import { FileText, ArrowLeft } from "lucide-react";

const demoFileNames: Record<string, string[]> = {
  financial: ["Financial_Report_2024.pdf", "Market_Analysis.pdf"],
  legal: ["Legal_Agreement.pdf", "Compliance_Policy.pdf"],
};

export default function AppPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);

  const handleUploadComplete = async (files: File[]) => {
    setIsProcessing(true);
    setUploadedFiles(files);
    setCurrentDemo(null);
  };

  const handleDemoSelect = async (demoType: "financial" | "legal") => {
    setIsProcessing(true);
    setCurrentDemo(demoType);
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const dummyFiles = demoFileNames[demoType].map(
      (name) => new File([], name, { type: "application/pdf" })
    );
    setUploadedFiles(dummyFiles);
    setIsProcessing(false);
  };

  const handleNewChat = () => {
    setActiveChat(null);
  };

  const displayNames = currentDemo ? demoFileNames[currentDemo] : uploadedFiles.map(f => f.name);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onNewChat={handleNewChat} activeChat={activeChat} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border p-4 glass">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            {((uploadedFiles.length > 0 || currentDemo) && !isProcessing) && (
              <div className="flex items-center space-x-4">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">
                    {currentDemo ? `${currentDemo.charAt(0).toUpperCase() + currentDemo.slice(1)} RAG` : 
                    `${displayNames.length} document${displayNames.length > 1 ? "s" : ""} uploaded`}
                  </p>
                  <p className="text-sm text-muted-foreground truncate max-w-xs">
                    {displayNames.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUploadedFiles([]);
                    setCurrentDemo(null);
                  }}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-border overflow-hidden">
            <UploadArea 
              onUploadComplete={handleUploadComplete} 
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              onDemoSelect={handleDemoSelect}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface 
              hasDocuments={(uploadedFiles.length > 0 || !!currentDemo) && !isProcessing} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
