"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Zap, Database, Users } from "lucide-react";

const stats = [
  { icon: FileText, label: "Documents Processed", value: "10M+", suffix: "" },
  { icon: Zap, label: "Faster Research", value: "10x", suffix: "" },
  { icon: Database, label: "AI-Powered Retrieval", value: "99%", suffix: "Accuracy" },
  { icon: Users, label: "Multi-Document", value: "Unlimited", suffix: "Files" },
];

const AnimatedCounter = ({ value, suffix }: { value: string; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
      {isInView ? value : "0"}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
