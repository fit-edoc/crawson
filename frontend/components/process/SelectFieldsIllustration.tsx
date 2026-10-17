"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IllustrationProps {
  isHovered?: boolean;
}

export const SelectFieldsIllustration: React.FC<IllustrationProps> = ({ isHovered = false }) => {
  const prefersReducedMotion = useReducedMotion();

  const windowDepth = 7;

  return (
    <div className="relative w-full h-[180px] sm:h-[195px] flex items-center justify-center overflow-hidden bg-[#FAFAFA] rounded-lg select-none border border-[#F0F0F0]">
      {/* Background isometric grid */}
      <svg
        viewBox="0 0 320 220"
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="iso-grid-02" width="40" height="23" patternUnits="userSpaceOnUse">
            <path
              d="M 0 11.5 L 20 0 L 40 11.5 L 20 23 Z"
              stroke="#F0F0F0"
              strokeWidth="0.75"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="320" height="220" fill="url(#iso-grid-02)" opacity="0.65" />
      </svg>

      <motion.svg
        viewBox="0 0 320 220"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: isHovered ? -4 : [0, -3, 0],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Drop shadow */}
        <polygon
          points="160,165 256,219 160,223 64,219"
          fill="#000000"
          opacity="0.04"
          filter="blur(4px)"
        />

        {/* Isometric Webpage Slab */}
        {/* Left depth face */}
        <polygon
          points={`64,96 160,150 160,${150 + windowDepth} 64,${96 + windowDepth}`}
          fill="#EAEAEA"
          stroke="#D4D4D4"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Right depth face */}
        <polygon
          points={`160,150 256,96 256,${96 + windowDepth} 160,${150 + windowDepth}`}
          fill="#DFDFDF"
          stroke="#D4D4D4"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Top face */}
        <polygon
          points="160,42 256,96 160,150 64,96"
          fill="#FFFFFF"
          stroke="#171717"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Mini Webpage Header */}
        <polygon
          points="160,44 246,92 238,96 152,48"
          fill="#F5F5F5"
        />
        <circle cx="106" cy="74" r="1.8" fill="#171717" />
        <line x1="116" y1="78" x2="148" y2="78" stroke="#D4D4D4" strokeWidth="1.2" />

        {/* ==============================================
            ELEMENT 1: IMAGE FIELD (Left top area)
           ============================================== */}
        <g id="element-image">
          {/* Base image container polygon */}
          <polygon
            points="114,84 154,84 140,104 100,104"
            fill="#F8F8F8"
            stroke="#E5E5E5"
            strokeWidth="1"
          />

          {/* Minimalist mountain/landscape photo graphic */}
          <polygon
            points="108,98 118,88 128,98"
            fill="#E0E0E0"
          />
          <polygon
            points="122,98 132,91 142,98"
            fill="#D4D4D4"
          />
          <circle cx="134" cy="88" r="1.8" fill="#CCCCCC" />

          {/* Animated selection outline + checkmark */}
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: [0, 0, 1, 1, 1, 0],
                  }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              times: [0, 0.18, 0.22, 0.85, 0.95, 1],
            }}
          >
            {/* Crisp black selection boundary */}
            <polygon
              points="113,83 155,83 141,105 99,105"
              fill="none"
              stroke="#000000"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            {/* 4 Corner handles */}
            <rect x="111" y="81" width="3" height="3" fill="#000000" />
            <rect x="153" y="81" width="3" height="3" fill="#000000" />
            <rect x="139" y="103" width="3" height="3" fill="#000000" />
            <rect x="97" y="103" width="3" height="3" fill="#000000" />

            {/* Check indicator badge */}
            <polygon
              points="148,74 176,74 182,78 154,78"
              fill="#171717"
            />
            <text
              x="153"
              y="77"
              fontSize="4.8"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#FFFFFF"
            >
              ✓ IMG
            </text>
          </motion.g>
        </g>

        {/* ==============================================
            ELEMENT 2: TEXT FIELD (Right side area)
           ============================================== */}
        <g id="element-text">
          {/* Base text block lines */}
          <polygon
            points="165,85 220,85 212,93 157,93"
            fill="#F8F8F8"
            stroke="#E5E5E5"
            strokeWidth="0.8"
          />
          <line x1="164" y1="89" x2="208" y2="89" stroke="#A3A3A3" strokeWidth="1.8" />

          <polygon
            points="155,95 210,95 204,101 149,101"
            fill="#F8F8F8"
            stroke="#E5E5E5"
            strokeWidth="0.8"
          />
          <line x1="154" y1="98" x2="198" y2="98" stroke="#D4D4D4" strokeWidth="1.2" />

          {/* Animated selection outline + checkmark */}
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: [0, 0, 0, 1, 1, 0],
                  }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              times: [0, 0.42, 0.46, 0.85, 0.95, 1],
            }}
          >
            {/* Crisp black selection boundary */}
            <polygon
              points="164,83 223,83 207,103 148,103"
              fill="none"
              stroke="#000000"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <rect x="162" y="81" width="3" height="3" fill="#000000" />
            <rect x="221" y="81" width="3" height="3" fill="#000000" />
            <rect x="205" y="101" width="3" height="3" fill="#000000" />
            <rect x="146" y="101" width="3" height="3" fill="#000000" />

            {/* Check indicator badge */}
            <polygon
              points="218,74 246,74 252,78 224,78"
              fill="#171717"
            />
            <text
              x="222"
              y="77"
              fontSize="4.8"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#FFFFFF"
            >
              ✓ TEXT
            </text>
          </motion.g>
        </g>

        {/* ==============================================
            ELEMENT 3: LINK FIELD (Bottom center area)
           ============================================== */}
        <g id="element-link">
          {/* Base link button pill */}
          <polygon
            points="128,114 186,114 176,124 118,124"
            fill="#F5F5F5"
            stroke="#E5E5E5"
            strokeWidth="0.8"
          />
          {/* Link icon line */}
          <path
            d="M 134 119 L 140 119 M 144 119 L 170 119"
            stroke="#737373"
            strokeWidth="1.2"
          />

          {/* Animated selection outline + checkmark */}
          <motion.g
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: [0, 0, 0, 1, 1, 0],
                  }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              times: [0, 0.65, 0.69, 0.85, 0.95, 1],
            }}
          >
            {/* Crisp black selection boundary */}
            <polygon
              points="126,112 188,112 178,126 116,126"
              fill="none"
              stroke="#000000"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <rect x="124" y="110" width="3" height="3" fill="#000000" />
            <rect x="186" y="110" width="3" height="3" fill="#000000" />
            <rect x="176" y="124" width="3" height="3" fill="#000000" />
            <rect x="114" y="124" width="3" height="3" fill="#000000" />

            {/* Check indicator badge */}
            <polygon
              points="180,105 208,105 214,109 186,109"
              fill="#171717"
            />
            <text
              x="185"
              y="108"
              fontSize="4.8"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#FFFFFF"
            >
              ✓ HREF
            </text>
          </motion.g>
        </g>

        {/* Bottom Status Counter Badge: "3 fields selected" */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: [0, 0, 0, 0, 1, 1, 0],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            times: [0, 0.68, 0.72, 0.74, 0.88, 0.95, 1],
          }}
        >
          <rect
            x="112"
            y="136"
            width="96"
            height="15"
            rx="3"
            fill="#171717"
          />
          <text
            x="160"
            y="146.5"
            textAnchor="middle"
            fontSize="6"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#FFFFFF"
            letterSpacing="0.5"
          >
            ● 3 FIELDS SELECTED
          </text>
        </motion.g>

        {/* Animated Isometric Cursor selecting sequentially */}
        <motion.g
          initial={
            prefersReducedMotion
              ? { x: 155, y: 122, opacity: 0 }
              : { x: 70, y: 140, opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 0 }
              : {
                  x: [70, 125, 125, 185, 185, 155, 155, 70],
                  y: [140, 95, 95, 95, 95, 122, 122, 140],
                  scale: [1, 1, 0.85, 1, 0.85, 1, 0.85, 1],
                  opacity: [0, 1, 1, 1, 1, 1, 0, 0],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            times: [0, 0.16, 0.22, 0.4, 0.46, 0.63, 0.69, 0.9],
            ease: "easeInOut",
          }}
        >
          {/* Isometric Arrow Pointer */}
          <polygon
            points="0,0 12,5 7,7 11,14 8,15 4,8 0,11"
            fill="#171717"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default SelectFieldsIllustration;
