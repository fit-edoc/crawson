"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface ProcessCardProps {
  step: string;
  title: string;
  description: string;
  illustration: (props: { isHovered: boolean }) => React.ReactNode;
  index: number;
  className?: string;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({
  step,
  title,
  description,
  illustration,
  index,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -2,
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative flex flex-col sm:flex-row items-center justify-between bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#000000] rounded-xl p-3.5 sm:p-4 md:p-5 transition-colors duration-200 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${className}`}
      role="region"
      aria-label={`${step} — ${title}`}
    >
      {/* Left Column: Title & Description */}
      <div className="w-full sm:w-[46%] md:w-[48%] flex flex-col justify-center flex-shrink-0 pr-0 sm:pr-3 mb-3 sm:mb-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center font-mono text-[11px] font-semibold text-[#171717] bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded tracking-wide">
            {step}
          </span>
          <span className="text-[10px] font-mono text-[#999999] tracking-wider uppercase">
            STEP {step}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#000000] tracking-tight group-hover:text-black transition-colors leading-snug">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mt-1.5 font-normal">
          {description}
        </p>

        {/* Subtle active status indicator */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#171717] opacity-40 group-hover:opacity-100 transition-opacity" />
          <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider">
            Ready
          </span>
        </div>
      </div>

      {/* Right Column: Animation Illustration */}
      <div className="w-full sm:w-[54%] md:w-[52%] flex-grow relative overflow-hidden rounded-lg">
        {illustration({ isHovered })}
      </div>
    </motion.article>
  );
};

export default ProcessCard;
