"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IllustrationProps {
  isHovered?: boolean;
}

export const DownloadIllustration: React.FC<IllustrationProps> = ({ isHovered = false }) => {
  const prefersReducedMotion = useReducedMotion();

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
          <pattern id="iso-grid-04" width="40" height="23" patternUnits="userSpaceOnUse">
            <path
              d="M 0 11.5 L 20 0 L 40 11.5 L 20 23 Z"
              stroke="#F0F0F0"
              strokeWidth="0.75"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="320" height="220" fill="url(#iso-grid-04)" opacity="0.65" />
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
        {/* Soft ground shadow under tray */}
        <polygon
          points="160,180 235,218 160,222 85,218"
          fill="#000000"
          opacity="0.05"
          filter="blur(4px)"
        />

        {/* ==============================================
            ISOMETRIC DOWNLOAD TRAY / BASE PLATFORM
           ============================================== */}
        <g id="download-tray">
          {/* Tray left depth face */}
          <polygon
            points="88,144 160,180 160,188 88,152"
            fill="#D9D9D9"
            stroke="#CCCCCC"
            strokeWidth="1.2"
          />
          {/* Tray right depth face */}
          <polygon
            points="160,180 232,144 232,152 160,188"
            fill="#CFCFCF"
            stroke="#CCCCCC"
            strokeWidth="1.2"
          />
          {/* Tray top surface */}
          <polygon
            points="160,108 232,144 160,180 88,144"
            fill="#EEEEEE"
            stroke="#171717"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Tray interior well / indent */}
          <polygon
            points="160,114 224,146 160,178 96,146"
            fill="#E0E0E0"
            stroke="#D4D4D4"
            strokeWidth="1"
          />
          {/* Alignment guides inside tray */}
          <line x1="160" y1="124" x2="160" y2="168" stroke="#D0D0D0" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="112" y1="146" x2="208" y2="146" stroke="#D0D0D0" strokeWidth="0.8" strokeDasharray="3 3" />
        </g>

        {/* ==============================================
            STACKING ASSETS / FILES
            Sheet 1: JSON Data Table Sheet (Bottom of stack)
            Sheet 2: Image Media Asset Card (Middle of stack)
            Sheet 3: CSV / Structured File Sheet (Top of stack)
           ============================================== */}

        {/* FILE 1: JSON Data Sheet (descends first into stack) */}
        <motion.g
          initial={
            prefersReducedMotion
              ? { y: 0, opacity: 1 }
              : { y: -36, opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { y: 0, opacity: 1 }
              : {
                  y: [-36, -36, 0, 0, 0, -36],
                  opacity: [0, 0.4, 1, 1, 1, 0],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.1, 0.28, 0.85, 0.95, 1],
            ease: "easeInOut",
          }}
        >
          {/* Left depth edge */}
          <polygon
            points="104,142 160,170 160,173 104,145"
            fill="#EAEAEA"
            stroke="#D4D4D4"
            strokeWidth="0.8"
          />
          {/* Right depth edge */}
          <polygon
            points="160,170 216,142 216,145 160,173"
            fill="#DFDFDF"
            stroke="#D4D4D4"
            strokeWidth="0.8"
          />
          {/* Main Sheet Top Face */}
          <polygon
            points="160,114 216,142 160,170 104,142"
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Grid lines inside JSON table */}
          <line x1="126" y1="140" x2="152" y2="153" stroke="#CCCCCC" strokeWidth="1" />
          <line x1="168" y1="153" x2="194" y2="140" stroke="#CCCCCC" strokeWidth="1" />
          <text
            x="147"
            y="136"
            fontSize="5.5"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#171717"
            transform="matrix(0.866, 0.45, 0, 1, 0, 0)"
          >
            {"{ } JSON"}
          </text>
        </motion.g>

        {/* FILE 2: Image Media Card (descends second into stack) */}
        <motion.g
          initial={
            prefersReducedMotion
              ? { y: 0, opacity: 1 }
              : { y: -48, opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { y: 0, opacity: 1 }
              : {
                  y: [-48, -48, -5, -5, -5, -48],
                  opacity: [0, 0, 1, 1, 1, 0],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.18, 0.4, 0.85, 0.95, 1],
            ease: "easeInOut",
          }}
        >
          {/* Left depth edge */}
          <polygon
            points="106,139 160,166 160,169 106,142"
            fill="#EAEAEA"
            stroke="#D4D4D4"
            strokeWidth="0.8"
          />
          {/* Right depth edge */}
          <polygon
            points="160,166 214,139 214,142 160,169"
            fill="#DFDFDF"
            stroke="#D4D4D4"
            strokeWidth="0.8"
          />
          {/* Main Card Top Face */}
          <polygon
            points="160,112 214,139 160,166 106,139"
            fill="#FAFAFA"
            stroke="#171717"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Thumbnail landscape outline */}
          <polygon points="132,143 144,134 156,143" fill="#E0E0E0" />
          <polygon points="148,143 160,137 172,143" fill="#D4D4D4" />
          <circle cx="166" cy="133" r="1.6" fill="#A3A3A3" />
        </motion.g>

        {/* FILE 3: CSV / Structured Table Sheet (descends third to complete stack) */}
        <motion.g
          initial={
            prefersReducedMotion
              ? { y: 0, opacity: 1 }
              : { y: -60, opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { y: 0, opacity: 1 }
              : {
                  y: [-60, -60, -10, -10, -10, -60],
                  opacity: [0, 0, 1, 1, 1, 0],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.28, 0.52, 0.85, 0.95, 1],
            ease: "easeInOut",
          }}
        >
          {/* Left depth edge */}
          <polygon
            points="108,136 160,162 160,165 108,139"
            fill="#EAEAEA"
            stroke="#D4D4D4"
            strokeWidth="0.8"
          />
          {/* Right depth edge */}
          <polygon
            points="160,162 212,136 212,139 160,165"
            fill="#DFDFDF"
            stroke="#D4D4D4"
            strokeWidth="0.8"
          />
          {/* Main Card Top Face */}
          <polygon
            points="160,110 212,136 160,162 108,136"
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />

          {/* Table headers and rows */}
          <line x1="128" y1="138" x2="192" y2="138" stroke="#171717" strokeWidth="0.8" />
          <line x1="122" y1="145" x2="186" y2="145" stroke="#E5E5E5" strokeWidth="0.8" />
          <line x1="130" y1="152" x2="178" y2="152" stroke="#E5E5E5" strokeWidth="0.8" />

          {/* Badge: CSV / ASSETS */}
          <text
            x="146"
            y="126"
            fontSize="5.5"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#171717"
            transform="matrix(0.866, 0.45, 0, 1, 0, 0)"
          >
            DATA.CSV
          </text>
        </motion.g>

        {/* ==============================================
            ANIMATED ISOMETRIC DOWNLOAD ARROW
            Descends from above into the stacked tray
           ============================================== */}
        <motion.g
          initial={
            prefersReducedMotion
              ? { y: 0, opacity: 1 }
              : { y: -40, opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { y: 0, opacity: 1 }
              : {
                  y: [-40, -40, 0, -3, 0, -40],
                  opacity: [0, 0, 1, 1, 1, 0],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.52, 0.65, 0.72, 0.85, 0.95],
            ease: "easeOut",
          }}
        >
          {/* Isometric Arrow 3D Depth */}
          {/* Arrow Shaft Back Depth */}
          <polygon
            points="156,58 164,58 164,78 156,78"
            fill="#262626"
          />
          {/* Arrow Head Depth */}
          <polygon
            points="148,78 160,90 172,78 166,78 166,58 154,58 154,78"
            fill="#171717"
            stroke="#171717"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Crisp White Inner Line */}
          <polyline
            points="160,62 160,84"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <polyline
            points="154,78 160,84 166,78"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* ==============================================
            EXPORT CONFIRMATION BADGE: [ READY • 100% ]
           ============================================== */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : {
                  opacity: [0, 0, 0, 1, 1, 0],
                  scale: [0.9, 0.9, 0.9, 1, 1, 0.9],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.65, 0.7, 0.88, 0.96, 1],
            ease: "easeOut",
          }}
        >
          <rect
            x="105"
            y="172"
            width="110"
            height="16"
            rx="3"
            fill="#171717"
          />
          <text
            x="160"
            y="182.5"
            textAnchor="middle"
            fontSize="6"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#FFFFFF"
            letterSpacing="0.6"
          >
            ✓ EXPORT READY • 100%
          </text>
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default DownloadIllustration;
