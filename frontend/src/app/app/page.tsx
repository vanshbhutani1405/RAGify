"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/app/Sidebar";
import { UploadArea } from "@/components/app/UploadArea";
import { ChatInterface } from "@/components/app/ChatInterface";
import { FileText, ArrowLeft, MessageSquare } from "lucide-react";
import { clearCustomDocuments } from "@/lib/api";

const demoFileNames: Record<string, string[]> = {
  financial: ["Ragify Financial Rag Sample Document.pdf"],
  legal: ["Ragify Indian Legal Rag Sample Document.pdf"],
};

export default function AppPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [currentRagType, setCurrentRagType] = useState<string>("custom");
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  const handleUploadComplete = async (files: File[]) => {
    setUploadedFiles(files);
    setCurrentRagType("custom");
    setIsProcessing(false);
    setShowChatOnMobile(true);
  };

  const handleDemoSelect = async (demoType: "financial" | "legal") => {
    setIsProcessing(true);
    setCurrentRagType(demoType);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const dummyFiles = demoFileNames[demoType].map(
      (name) => new File([], name, { type: "application/pdf" })
    );
    setUploadedFiles(dummyFiles);
    setIsProcessing(false);
    setShowChatOnMobile(true);
  };

  const handleNewChat = () => {
    setActiveChat(null);
    setShowChatOnMobile(false);
  };

  const handleClear = async () => {
    if (currentRagType === "custom") {
      try {
        await clearCustomDocuments();
      } catch (e) {
        console.error("Failed to clear custom documents:", e);
      }
    }
    setUploadedFiles([]);
    setCurrentRagType("custom");
    setShowChatOnMobile(false);
  };

  const hasDocuments = (uploadedFiles.length > 0 || currentRagType !== "custom") && !isProcessing;
  const displayNames = currentRagType !== "custom" ? demoFileNames[currentRagType] : uploadedFiles.map(f => f.name);

  return (
    <div className="flex min-h-[100dvh] h-[100dvh] overflow-hidden">
      <div className="hidden md:block">
        <Sidebar onNewChat={handleNewChat} activeChat={activeChat} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border p-4 glass">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            {hasDocuments && (
              <div className="flex items-center space-x-4">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">
                    {currentRagType !== "custom" ? `${currentRagType.charAt(0).toUpperCase() + currentRagType.slice(1)} RAG` : 
                    `${displayNames.length} document${displayNames.length > 1 ? "s" : ""} uploaded`}
                  </p>
                  <p className="text-sm text-muted-foreground truncate max-w-xs">
                    {displayNames.join(", ")}
                  </p>
                </div>
                <button
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Clear
                </button>
              </div>
            )}
            {hasDocuments && (
              <button
                onClick={() => setShowChatOnMobile(!showChatOnMobile)}
                className="md:hidden flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">{showChatOnMobile ? "Upload" : "Chat"}</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-border overflow-hidden ${hasDocuments && showChatOnMobile ? "hidden md:flex" : "flex"}`}>
            <UploadArea 
              onUploadComplete={handleUploadComplete} 
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              onDemoSelect={handleDemoSelect}
            />
          </div>
          <div className={`flex-1 overflow-hidden ${hasDocuments && !showChatOnMobile ? "hidden md:flex" : "flex"}`}>
            <ChatInterface 
              hasDocuments={hasDocuments} 
              ragType={currentRagType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
