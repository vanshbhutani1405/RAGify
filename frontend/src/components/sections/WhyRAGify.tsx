"use client";

import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";

export const WhyRAGify = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Wand2 className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why RAGify?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            RAGify transforms your uploaded documents into an intelligent AI knowledge system using
            <span className="text-primary font-semibold"> Retrieval-Augmented Generation</span>.
            We combine the power of semantic search with state-of-the-art language models to give you
            accurate, context-aware answers from your own documents.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
