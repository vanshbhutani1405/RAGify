"use client";

import { motion } from "framer-motion";
import {
  FilePlus,
  History,
  Zap,
  Search,
  Database,
  Brain,
} from "lucide-react";

const features = [
  {
    icon: FilePlus,
    title: "Multi-document upload",
    description: "Upload and process multiple PDFs simultaneously",
  },
  {
    icon: History,
    title: "Conversational memory",
    description: "Maintain context across multiple interactions",
  },
  {
    icon: Zap,
    title: "Streaming responses",
    description: "Get real-time AI responses as they're generated",
  },
  {
    icon: Search,
    title: "Semantic retrieval",
    description: "Find relevant information based on meaning, not just keywords",
  },
  {
    icon: Database,
    title: "Fast vector search",
    description: "Lightning-fast similarity search across your document library",
  },
  {
    icon: Brain,
    title: "AI-powered understanding",
    description: "Deep comprehension of your document content",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need for intelligent document research
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass p-8 rounded-2xl"
            >
              <feature.icon className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
