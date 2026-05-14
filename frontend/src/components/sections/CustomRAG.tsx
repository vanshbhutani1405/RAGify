"use client";

import { motion } from "framer-motion";
import { Cpu, Palette, Users } from "lucide-react";

export const CustomRAG = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Build Any Custom RAG System
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Upload your domain-specific documents and instantly create custom AI assistants
            tailored to your unique needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "Domain Expertise",
                desc: "Specialized knowledge for any industry",
              },
              {
                icon: Palette,
                title: "Fully Customizable",
                desc: "Tailor the AI to your specific requirements",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                desc: "Share knowledge bases across your organization",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass p-8 rounded-2xl"
              >
                <item.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
