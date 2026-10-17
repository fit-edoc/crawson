"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How does Crawson handle dynamic SPA and JavaScript websites?",
    answer:
      "Crawson operates a dual-engine architecture: static extraction parses HTML instantly, while our headless Chrome browser fallback automatically engages the moment client-side rendering or lazy-loaded elements are detected.",
  },
  {
    id: "faq-2",
    question: "What export formats and asset downloads are supported?",
    answer:
      "All structured data can be exported in clean JSON or CSV formats. Downloaded assets—including images, documents, and media thumbnails—are automatically packed into a single organized ZIP archive.",
  },
  {
    id: "faq-3",
    question: "How does visual field selection work?",
    answer:
      "Simply choose what data fields to capture (like titles, links, or image URLs). Our engine maps those targets to deterministic selectors and extracts uniform records across the entire site.",
  },
  {
    id: "faq-4",
    question: "Are there rate limits or anti-bot protections to worry about?",
    answer:
      "Our extraction engine includes automated request throttling, dynamic user-agent rotation, and respectful crawling intervals to maintain high success rates without triggering rate limits.",
  },
  {
    id: "faq-5",
    question: "Is any coding knowledge required to extract data?",
    answer:
      "None at all. Crawson provides a visual point-and-click workflow: paste any target URL, choose fields, monitor the extraction pipeline, and export clean data immediately.",
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const prefersReducedMotion = useReducedMotion();

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#FFFFFF] py-16 md:py-24 px-4 sm:px-6 md:px-8 border-t border-[#E5E5E5] relative select-none overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Larger FAQ Headline & Narrative Text (No badge, no centered headlines) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-Hero font-bold text-[#000000] tracking-tight leading-[1.1] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-normal max-w-md">
              Everything you need to know about our isometric scraping engine, structured fallback pipelines, and asset export capabilities.
            </p>
          </motion.div>

          {/* Right Column: Borderless FAQ Accordion with Large Icon-Only Toggle & Blur-to-0-Blur Animation */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#E5E5E5]">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  className="py-5 sm:py-6 border-none bg-transparent"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none group bg-transparent border-none p-0"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span
                      className={`text-base sm:text-lg md:text-xl font-medium tracking-tight transition-colors duration-200 pr-2 ${
                        isOpen ? "text-[#000000] font-semibold" : "text-[#222222] group-hover:text-[#000000]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Large Icon Only with NO Background */}
                    <span
                      className="flex-shrink-0 text-[#000000] transition-transform duration-200 p-0 bg-transparent"
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                      ) : (
                        <Plus className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75] text-[#444444] group-hover:text-[#000000]" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 0, height: 0, filter: "blur(10px)" }
                        }
                        animate={
                          prefersReducedMotion
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 1, height: "auto", filter: "blur(0px)" }
                        }
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0, height: 0 }
                            : { opacity: 0, height: 0, filter: "blur(10px)" }
                        }
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm sm:text-base text-[#666666] leading-relaxed font-normal pt-3.5 pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
