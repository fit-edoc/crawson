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
          style={{ fontFamily: 'var(--font-kanit)', fontWeight: 500 }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span variants={blurWord}>Extract the</motion.span> 
          {/* Inline Image Placeholder */}
          <motion.img 
            variants={blurWord}
            src="/logo.png" 
            alt="Hero Icon" 
            className="w-16 h-16 sm:w-20 rotate-12 sm:h-20 bg-slate-200 rounded-2xl object-cover inline-block shadow-md" 
          />
          <motion.span variants={blurWord}>Web Data</motion.span>
          <motion.span variants={blurWord} className="w-full block mt-2">Without Limits</motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed flex flex-wrap justify-center gap-x-2 gap-y-1" 
          style={{ fontFamily: 'var(--font-khand)' }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={blurWord} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tool">
            <AnimatedButton className="bg-slate-900 text-white px-8 py-2 rounded-md font-medium  hover:shadow-xl hover:bg-slate-800 transition-all h-10">
              Launch Scraper 
            </AnimatedButton>
          </Link>
          <Link href="/tool">
            <AnimatedButton className="bg-white text-black px-8 py-2 rounded-md border border-black/10 font-medium  hover:shadow-xl hover:bg-slate-50 transition-all h-10">
              View Features 
            </AnimatedButton>
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="w-full max-w-5xl mx-auto mt-24 px-4 pb-24 z-10">
        <div className="w-full aspect-video bg-black backdrop-blur-sm rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-4 shadow-2xl border border-white/50 flex items-center justify-center">
          {/* Main Showcase Image Placeholder */}
          <video src="/showcase.mp4" autoPlay muted loop className="w-full h-full object-cover  rounded-[1.5rem] sm:rounded-[2.5rem] bg-slate-100 shadow-inner" ></video>
        </div>
      </div>

      {/* How does it work Section */}
      <div className="w-full bg-white py-32 px-4 z-10 border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-khand text-slate-900 mb-4 tracking-tight uppercase" style={{ fontFamily: 'var(--font-kanit)' }}>How it Works</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-khand)' }}>Turn any website into structured data with our robust, four-step extraction pipeline.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {stepCards.map((card, index) => (
