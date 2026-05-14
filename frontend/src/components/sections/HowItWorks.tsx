"use client";

import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  Database,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Documents", desc: "Add your PDFs to the system" },
  { icon: Brain, title: "Create Embeddings", desc: "AI analyzes and understands content" },
  { icon: Database, title: "Build Vector Database", desc: "Store semantic representations" },
  { icon: MessageSquare, title: "Ask Questions", desc: "Query your knowledge base naturally" },
  { icon: CheckCircle2, title: "Get AI Answers", desc: "Receive accurate, context-aware responses" },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Simple 5-step process to unlock your document intelligence
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass p-6 rounded-2xl text-center">
                  <div className="absolute lg:-top-12 lg:left-1/2 lg:-translate-x-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mb-4 mx-auto">
                    {index + 1}
                  </div>
                  <step.icon className="w-10 h-10 text-primary mx-auto mb-4 mt-8 lg:mt-0" />
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
