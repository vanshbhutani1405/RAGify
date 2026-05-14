"use client";

import { motion } from "framer-motion";
import { Zap, Plus, FileText, MessageSquare, TrendingUp, Scale, HeartPulse, Menu } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  onNewChat: () => void;
  activeChat: string | null;
}

export const Sidebar = ({ onNewChat, activeChat }: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const recentChats = [
    { id: "1", title: "Financial Report Analysis" },
    { id: "2", title: "Research Paper Summary" },
    { id: "3", title: "Legal Document Review" },
  ];

  const features = [
    { icon: FileText, title: "Document Upload" },
    { icon: MessageSquare, title: "AI Chat" },
    { icon: TrendingUp, title: "Financial RAG" },
    { icon: Scale, title: "Legal RAG" },
    { icon: HeartPulse, title: "Healthcare RAG" },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden glass p-2 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      <motion.div
        initial={false}
        animate={{ x: isMobileOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed md:static top-0 left-0 h-full w-72 glass border-r border-border z-40 flex flex-col"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              RAGify
            </span>
          </div>
          <button
            onClick={onNewChat}
            className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">Recent Chats</h3>
            <div className="space-y-1">
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeChat === chat.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm truncate">{chat.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">Features</h3>
            <div className="space-y-1">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-3 py-2 text-muted-foreground"
                >
                  <feature.icon className="w-4 h-4" />
                  <span className="text-sm">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};
