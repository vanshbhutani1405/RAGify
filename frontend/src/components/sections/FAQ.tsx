"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is RAGify?",
    answer: "RAGify is an AI-powered research assistant that uses Retrieval-Augmented Generation to help you chat with your documents. Upload PDFs, ask questions, and get intelligent, context-aware answers.",
  },
  {
    question: "How many documents can I upload?",
    answer: "You can upload unlimited documents with RAGify. Our system efficiently processes and indexes all your content for fast, accurate retrieval.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! We take data security seriously. All your documents are encrypted and stored securely. You have full control over your data at all times.",
  },
  {
    question: "Can RAGify handle large documents?",
    answer: "Yes! RAGify is designed to handle documents of any size. Our advanced chunking and embedding technology ensures comprehensive coverage of your content.",
  },
  {
    question: "What file formats are supported?",
    answer: "Currently, RAGify supports PDF documents. We're continuously adding support for more file formats including Word, PowerPoint, and plain text files.",
  },
  {
    question: "How accurate are the responses?",
    answer: "RAGify provides highly accurate responses by combining semantic search with state-of-the-art language models. The system always cites its sources from your documents.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about RAGify
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
