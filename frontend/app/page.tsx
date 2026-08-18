"use client";

import Link from "next/link";
import AnimatedButton from "@/components/AnimatedButton";
import { buttonVariants } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const blurWord: Variants = {
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
        className="w-[calc(100%-2rem)] max-w-4xl bg-[#000000] backdrop-blur-3xl mt-2 sm:mt-4 rounded-full fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 z-50"
      >
        <div className="flex items-center gap-3 font-khand text-xl text-slate-800">
         <div className="flex items-center gap-2"><Image src="/logo.png" alt="logo" width={30} height={30} className="rounded-lg" />
          <p className="text-white font-khand text-xl md:text-2xl">Crawson</p>
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
          className="text-4xl font-Hero sm:text-5xl md:text-6xl lg:text-7xl text-black mb-6 tracking-tight leading-[1.2] flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 gap-y-2" 

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
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rotate-12 bg-slate-200 rounded-2xl object-cover inline-block shadow-md" 
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

        <motion.div initial={{opacity:0,filter:"blur(2px)",y:10}} animate={{opacity:1,filter:"blur(0px)",y:0}} transition={{duration:1,ease:"linear"}} className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
        </motion.div>
      </div>

      {/* Hero Image Section */}
      <div className="w-full max-w-5xl mx-auto mt-24 px-4 pb-24 z-10">
        <div className="w-full aspect-video bg-black backdrop-blur-sm rounded-[2rem] sm:rounded-[3rem] p-2 sm:p-4 shadow-2xl border border-white/50 flex items-center justify-center">
          {/* Main Showcase Image Placeholder */}
          <video src="/showcase.mp4" autoPlay muted loop className="w-full h-full object-cover  rounded-[1.5rem] sm:rounded-[2.5rem] bg-slate-100 shadow-inner" ></video>
        </div>
      </div>

      {/* How does it work Section */}
      <div className="w-full bg-white py-32 px-4 z-10 border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl  text-slate-900 mb-4 tracking-tight uppercase font-oswald">How it Works</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-oswald)' }}>Turn any website into structured data with our robust, four-step extraction pipeline.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {stepCards.map((card, index) => (
              <motion.div 
                key={card.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="bg-white border border-slate-200 p-8 rounded-[2rem] hover:bg-slate-950 hover:text-white transition-all duration-500 group shadow-sm hover:shadow-2xl relative"
              >
                <div className="text-5xl font-black text-slate-100 group-hover:text-slate-800 transition-colors mb-6 font-khand">{card.step}</div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-white text-slate-900 transition-colors">{card.title}</h3>
                <p className="text-slate-500 group-hover:text-slate-400 font-medium leading-relaxed transition-colors text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-[#0a0a0a] pt-24 pb-8 px-6 flex flex-col z-10 border-t border-slate-900 overflow-hidden relative">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          {/* Left CTA */}
          <div className="flex flex-col gap-6 max-w-sm">
            <h3 className="text-white text-4xl md:text-5xl font-khand font-khand leading-tight">Ready to extract data at scale?</h3>
            <Link href="/tool">
              <button className=" px-2 py-2 rounded-md bg-white text-black">
                Launch Scraper
              </button>
            </Link>
          </div>
          
          {/* Right Socials */}
          <div className="flex flex-col gap-4">
            <span className="text-white/50 font-khand text-sm uppercase tracking-widest">Connect</span>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Giant Text Section */}
        <div className="w-full flex flex-col items-center mt-auto border-t border-white/10 pt-8 relative max-w-7xl mx-auto">
           <div className="w-full flex items-center justify-center gap-4 overflow-hidden mb-8">
             <Image src="/logo.png" alt="logo" width={200} height={200} className="rounded-[2vw] md:w-[10vw] md:h-[10vw] hidden sm:block object-cover" />
             <h1 className="text-[10vw] font-khand text-white leading-[0.8] tracking-tighter uppercase font-Hero m-0 p-0">CRAWSON</h1>
           </div>
           
           <div className="w-full flex flex-col sm:flex-row justify-between items-center text-white/50 text-sm font-khand mt-4 gap-2">
             <span>© 2024 Crawson. All Rights Reserved.</span>
             <span className="flex items-center gap-1">Made with <span className="text-white">♥</span></span>
           </div>
        </div>
      </footer>
    </main>
  );
}
