"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import CanvasParticleLayer from "./CanvasParticleLayer";

interface IllustrationProps {
  isHovered?: boolean;
}

export const SmartExtractionIllustration: React.FC<IllustrationProps> = ({ isHovered = false }) => {
  const prefersReducedMotion = useReducedMotion();

  // Isometric Coordinates:
  // Source Webpage: Center (68, 112)
  // Engine: Center (160, 115)
  // Data Grid: Center (252, 112)

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
          <pattern id="iso-grid-03" width="40" height="23" patternUnits="userSpaceOnUse">
            <path
              d="M 0 11.5 L 20 0 L 40 11.5 L 20 23 Z"
              stroke="#F0F0F0"
              strokeWidth="0.75"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="320" height="220" fill="url(#iso-grid-03)" opacity="0.65" />
      </svg>

      {/* SVG Isometric Architecture Layer */}
      <motion.svg
        viewBox="0 0 320 220"
        className="w-full h-full relative z-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: isHovered ? -3 : [0, -2, 0],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Floor connection conduits (connecting webpage -> engine -> data grid) */}
        {/* Left Conduit */}
        <path
          d="M 95 112 L 138 115"
          stroke="#D4D4D4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 95 112 L 138 115"
          stroke="#171717"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Right Conduit */}
        <path
          d="M 182 115 L 222 112"
          stroke="#D4D4D4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 182 115 L 222 112"
          stroke="#171717"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* ==============================================
            1. SOURCE WEBPAGE (LEFT ISOMETRIC SLAB)
           ============================================== */}
        <g id="source-webpage">
          {/* Shadow */}
          <polygon
            points="68,142 108,162 68,168 28,162"
            fill="#000000"
            opacity="0.04"
            filter="blur(3px)"
          />

          {/* Left depth face */}
          <polygon
            points="28,104 68,124 68,130 28,110"
            fill="#EAEAEA"
            stroke="#D4D4D4"
            strokeWidth="1"
          />
          {/* Right depth face */}
          <polygon
            points="68,124 108,104 108,110 68,130"
            fill="#DFDFDF"
            stroke="#D4D4D4"
            strokeWidth="1"
          />
          {/* Top Face */}
          <polygon
            points="68,84 108,104 68,124 28,104"
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Webpage Header */}
          <line x1="42" y1="101" x2="52" y2="96" stroke="#D4D4D4" strokeWidth="1" />
          <circle cx="38" cy="103" r="1.5" fill="#171717" />

          {/* Wireframe lines on webpage */}
          <polygon points="50,96 74,96 82,100 58,100" fill="#F0F0F0" />
          <polygon points="46,105 82,105 88,108 52,108" fill="#E5E5E5" />
          <polygon points="42,112 68,112 74,115 48,115" fill="#EEEEEE" />

          {/* Label tag */}
          <rect x="36" y="70" width="36" height="11" rx="2" fill="#171717" />
          <text
            x="54"
            y="78"
            textAnchor="middle"
            fontSize="5.2"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#FFFFFF"
          >
            SOURCE
          </text>
        </g>

        {/* ==============================================
            2. DATA ENGINE (CENTER ISOMETRIC CUBE)
           ============================================== */}
        <g id="engine-core">
          {/* Engine Drop Shadow */}
          <polygon
            points="160,152 195,170 160,176 125,170"
            fill="#000000"
            opacity="0.06"
            filter="blur(4px)"
          />

          {/* Engine Left Depth Face */}
          <polygon
            points="126,112 160,130 160,154 126,136"
            fill="#1E1E1E"
            stroke="#171717"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Left vent lines */}
          <line x1="134" y1="126" x2="152" y2="135" stroke="#333333" strokeWidth="1" />
          <line x1="134" y1="132" x2="152" y2="141" stroke="#333333" strokeWidth="1" />
          <line x1="134" y1="138" x2="152" y2="147" stroke="#333333" strokeWidth="1" />

          {/* Engine Right Depth Face */}
          <polygon
            points="160,130 194,112 194,136 160,154"
            fill="#2B2B2B"
            stroke="#171717"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Right vent lines */}
          <line x1="168" y1="135" x2="186" y2="126" stroke="#404040" strokeWidth="1" />
          <line x1="168" y1="141" x2="186" y2="132" stroke="#404040" strokeWidth="1" />
          <line x1="168" y1="147" x2="186" y2="138" stroke="#404040" strokeWidth="1" />

          {/* Engine Top Face */}
          <polygon
            points="160,94 194,112 160,130 126,112"
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Engine Processor Aperture / Core Ring */}
          <polygon
            points="160,103 180,113 160,123 140,113"
            fill="#F0F0F0"
            stroke="#171717"
            strokeWidth="1"
          />
          <polygon
            points="160,108 170,113 160,118 150,113"
            fill="#171717"
          />

          {/* Animated Pulsing Engine Core Indicator */}
          <motion.circle
            cx="160"
            cy="113"
            r="3"
            fill="#000000"
            animate={
              prefersReducedMotion
                ? { scale: 1 }
                : {
                    scale: [1, 1.4, 1],
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Engine Status Pill */}
          <g transform="translate(136, 68)">
            <rect x="0" y="0" width="48" height="13" rx="2" fill="#171717" />
            <motion.circle
              cx="7"
              cy="6.5"
              r="2"
              fill="#FFFFFF"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      opacity: [0.4, 1, 0.4],
                    }
              }
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            />
            <text
              x="14"
              y="9.5"
              fontSize="5.2"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#FFFFFF"
              letterSpacing="0.3"
            >
              ENGINE
            </text>
          </g>
        </g>

        {/* ==============================================
            3. STRUCTURED DATA GRID (RIGHT ISOMETRIC TABLE)
           ============================================== */}
        <g id="data-grid">
          {/* Shadow */}
          <polygon
            points="252,142 292,162 252,168 212,162"
            fill="#000000"
            opacity="0.04"
            filter="blur(3px)"
          />

          {/* Left depth face */}
          <polygon
            points="212,104 252,124 252,130 212,110"
            fill="#EAEAEA"
            stroke="#D4D4D4"
            strokeWidth="1"
          />
          {/* Right depth face */}
          <polygon
            points="252,124 292,104 292,110 252,130"
            fill="#DFDFDF"
            stroke="#D4D4D4"
            strokeWidth="1"
          />
          {/* Top Face - Table Plate */}
          <polygon
            points="252,84 292,104 252,124 212,104"
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Table Header Row */}
          <polygon
            points="252,85 272,95 264,99 244,89"
            fill="#F0F0F0"
            stroke="#D4D4D4"
            strokeWidth="0.6"
          />
          <polygon
            points="272,95 291,104 283,108 264,99"
            fill="#F5F5F5"
            stroke="#D4D4D4"
            strokeWidth="0.6"
          />

          {/* Table Data Rows (illuminates with pulse) */}
          {/* Row 1 */}
          <motion.polygon
            points="234,94 254,104 246,108 226,98"
            fill="#F8F8F8"
            stroke="#E5E5E5"
            strokeWidth="0.6"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    fill: ["#F8F8F8", "#EAEAEA", "#F8F8F8"],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: 0.3,
            }}
          />
          <line x1="230" y1="99" x2="242" y2="105" stroke="#737373" strokeWidth="1" />

          {/* Row 2 */}
          <motion.polygon
            points="254,104 274,114 266,118 246,108"
            fill="#F8F8F8"
            stroke="#E5E5E5"
            strokeWidth="0.6"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    fill: ["#F8F8F8", "#EAEAEA", "#F8F8F8"],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: 0.8,
            }}
          />
          <line x1="250" y1="109" x2="262" y2="115" stroke="#737373" strokeWidth="1" />

          {/* Row 3 */}
          <motion.polygon
            points="226,108 246,118 238,122 218,112"
            fill="#F8F8F8"
            stroke="#E5E5E5"
            strokeWidth="0.6"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    fill: ["#F8F8F8", "#EAEAEA", "#F8F8F8"],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: 1.3,
            }}
          />
          <line x1="222" y1="113" x2="234" y2="119" stroke="#737373" strokeWidth="1" />

          {/* Label tag */}
          <rect x="238" y="70" width="38" height="11" rx="2" fill="#171717" />
          <text
            x="257"
            y="78"
            textAnchor="middle"
            fontSize="5.2"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#FFFFFF"
          >
            SCHEMA
          </text>
        </g>
      </motion.svg>

      {/* Canvas Particle Layer: Streams particles from webpage -> engine -> grid */}
      <CanvasParticleLayer
        width={320}
        height={220}
        isActive={!prefersReducedMotion}
        sourcePoint={{ x: 68, y: 104 }}
        enginePoint={{ x: 160, y: 114 }}
        gridTargets={[
          { x: 236, y: 96 },
          { x: 256, y: 106 },
          { x: 270, y: 112 },
          { x: 232, y: 114 },
        ]}
      />
    </div>
  );
};

export default SmartExtractionIllustration;
