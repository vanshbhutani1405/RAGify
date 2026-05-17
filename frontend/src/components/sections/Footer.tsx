"use client";

import { Zap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              RAGify
            </span>
          </div>
          <p className="text-muted-foreground max-w-md">
            RAGify is an AI-powered research assistant that transforms documents into intelligent, contextual conversations using Retrieval-Augmented Generation.
          </p>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2026 RAGify. Built by <span className="text-primary font-semibold">Vansh</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};
