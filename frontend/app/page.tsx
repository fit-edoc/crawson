"use client";

import Link from "next/link";
import AnimatedButton from "@/components/AnimatedButton";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const blurWord = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 10 },
  show: { filter: "blur(0px)", opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stepCards = [
  { step: "01", title: "Enter URL", desc: "Paste the target website URL into Crawson." },
  { step: "02", title: "Select Fields", desc: "Choose what data to extract like images, links, or text." },
  { step: "03", title: "Smart Extraction", desc: "Our engine statically or dynamically scrapes the target." },
  { step: "04", title: "Download", desc: "Export your scraped assets and structured data instantly." }
];

export default function LandingPage() {
  const tagline = "The next-generation web scraping engine. Bypass lazy-loading, extract structured data, and download assets instantly with our smart static and dynamic fallback technology.";
  const words = tagline.split(" ");

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center overflow-x-hidden relative">
      {/* Decorative Background Elements (Keeping the user's requested colors) */}
     

      {/* Navbar Structure */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-[#000000] backdrop-blur-3xl mt-4 rounded-full fixed top-4 left-1/2 -translate-x-1/2 flex items-center justify-between py-3 px-3 z-50"
      >
        <div className="flex items-center gap-3 font-khand text-xl text-slate-800">
         <div className="flex items-center gap-2"><Image src="/logo.png" alt="logo" width={30} height={30} className="rounded-lg" />
          <p className="text-white font-khand text-2xl">Crawson</p>
          </div>
        </div>
        
        <Link href={'/tool'}>
        <AnimatedButton className="bg-[#ffffff] text-black px-6 py-1 rounded-lg font-khand shadow-sm hover:bg-black hover:border-white hover:text-white hover:shadow-md transition-shadow">
          Get Started
        </AnimatedButton>
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-40 sm:mt-48 max-w-4xl mx-auto px-4 z-10">
        
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl text-slate-900 mb-6 tracking-tight leading-[1.2] flex flex-wrap justify-center items-center gap-x-4 gap-y-2" 
