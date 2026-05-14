"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Scale,
  HeartPulse,
  FlaskConical,
  GraduationCap,
  Building2,
} from "lucide-react";

const useCases = [
  { icon: TrendingUp, title: "Financial RAG", color: "from-blue-500 to-cyan-500" },
  { icon: Scale, title: "Legal RAG", color: "from-purple-500 to-pink-500" },
  { icon: HeartPulse, title: "Healthcare RAG", color: "from-red-500 to-orange-500" },
  { icon: FlaskConical, title: "Research Assistant", color: "from-green-500 to-emerald-500" },
  { icon: GraduationCap, title: "Academic AI Tutor", color: "from-yellow-500 to-amber-500" },
  { icon: Building2, title: "Startup Knowledge Base", color: "from-indigo-500 to-violet-500" },
];

export const UseCases = () => {
  return (
    <section id="use-cases" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            One RAG for Every Domain
          </h2>
          <p className="text-xl text-muted-foreground">
            Perfect for any industry or use case
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-8 rounded-2xl text-center"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${useCase.color} mb-6`}>
                <useCase.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{useCase.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
