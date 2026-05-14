"use client";

import { Hero } from "@/components/sections/Hero";
import { WhyRAGify } from "@/components/sections/WhyRAGify";
import { Features } from "@/components/sections/Features";
import { UseCases } from "@/components/sections/UseCases";
import { CustomRAG } from "@/components/sections/CustomRAG";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <WhyRAGify />
      <Features />
      <UseCases />
      <CustomRAG />
      <HowItWorks />
      <Stats />
      <FAQ />
      <Footer />
    </div>
  );
}
