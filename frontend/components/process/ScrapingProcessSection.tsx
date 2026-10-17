"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProcessCard from "./ProcessCard";
import EnterUrlIllustration from "./EnterUrlIllustration";
import SelectFieldsIllustration from "./SelectFieldsIllustration";
import SmartExtractionIllustration from "./SmartExtractionIllustration";
import DownloadIllustration from "./DownloadIllustration";

export const ScrapingProcessSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      step: "01",
      title: "Enter URL",
      description: "Paste the target website URL into Crawson.",
      renderIllustration: (props: { isHovered: boolean }) => (
        <EnterUrlIllustration isHovered={props.isHovered} />
      ),
    },
    {
      step: "02",
      title: "Select Fields",
      description: "Choose what data to extract, like images, links, or text.",
      renderIllustration: (props: { isHovered: boolean }) => (
        <SelectFieldsIllustration isHovered={props.isHovered} />
      ),
    },
    {
      step: "03",
      title: "Smart Extraction",
      description: "Our engine statically or dynamically scrapes the target.",
      renderIllustration: (props: { isHovered: boolean }) => (
        <SmartExtractionIllustration isHovered={props.isHovered} />
      ),
    },
    {
      step: "04",
      title: "Download",
      description: "Export your scraped assets and structured data instantly.",
      renderIllustration: (props: { isHovered: boolean }) => (
        <DownloadIllustration isHovered={props.isHovered} />
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full bg-[#FFFFFF] py-12 md:py-16 px-4 sm:px-6 border-t border-[#E5E5E5] relative select-none overflow-hidden"
      aria-label="How Crawson Works"
    >
      <div className="max-w-6xl mx-auto">
        {/* Compact Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl font-Hero font-bold text-[#000000] tracking-tight mb-2"
          >
            How it Works
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="text-sm sm:text-base text-[#666666] max-w-xl mx-auto leading-relaxed font-normal"
          >
            Turn any website into structured data with our robust, four-step extraction pipeline.
          </motion.p>
        </div>

        {/* 2-Column Bento Grid with Left Title/Description and Right Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-stretch">
          {steps.map((item, index) => (
            <ProcessCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              illustration={item.renderIllustration}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrapingProcessSection;
