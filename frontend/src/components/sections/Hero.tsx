"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, MessageCircle, Database, Sparkles, Upload, Brain, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-20"
        >
          <FileText className="w-16 h-16 text-primary/30" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 left-20"
        >
          <MessageCircle className="w-16 h-16 text-secondary/30" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-muted-foreground">
              AI-powered research assistant
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Turn Documents Into
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Conversations
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Supports PDF, DOCX and TXT documents for intelligent AI-powered conversations. RAGify transforms your documents into an AI-powered knowledge base.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="glass px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors">
              How It Works
            </a>
          </div>
        </motion.div>

        {/* Floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Upload, title: "Upload Documents", desc: "Drag & drop multiple PDFs" },
            { icon: Brain, title: "AI Processing", desc: "Semantic analysis & embeddings" },
            { icon: Database, title: "Smart Retrieval", desc: "Context-aware responses" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-2xl"
            >
              <item.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
