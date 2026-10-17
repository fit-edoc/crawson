"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IllustrationProps {
  isHovered?: boolean;
}

export const EnterUrlIllustration: React.FC<IllustrationProps> = ({ isHovered = false }) => {
  const prefersReducedMotion = useReducedMotion();

  // Isometric projection helper for 30-degree angles
  // Center of viewBox is (160, 110)
  // Browser window corners:
  // Top corner: (160, 42)
  // Right corner: (256, 96)
  // Bottom corner: (160, 150)
  // Left corner: (64, 96)
  const windowDepth = 7;

  return (
    <div className="relative w-full h-[180px] sm:h-[195px] flex items-center justify-center overflow-hidden bg-[#FAFAFA] rounded-lg select-none border border-[#F0F0F0]">
      {/* Background isometric grid lines for spatial depth */}
      <svg
        viewBox="0 0 320 220"
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="iso-grid-01" width="40" height="23" patternUnits="userSpaceOnUse">
            <path
              d="M 0 11.5 L 20 0 L 40 11.5 L 20 23 Z"
              stroke="#F0F0F0"
              strokeWidth="0.75"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="320" height="220" fill="url(#iso-grid-01)" opacity="0.65" />
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
        {/* Soft isometric drop shadow */}
        <polygon
          points="160,165 256,219 160,223 64,219"
          fill="#000000"
          opacity="0.04"
          filter="blur(4px)"
        />

        {/* Browser Window Isometric 3D Slab */}
        {/* Left Depth Face */}
        <polygon
          points={`64,96 160,150 160,${150 + windowDepth} 64,${96 + windowDepth}`}
          fill="#EAEAEA"
          stroke="#D4D4D4"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Right Depth Face */}
        <polygon
          points={`160,150 256,96 256,${96 + windowDepth} 160,${150 + windowDepth}`}
          fill="#DFDFDF"
          stroke="#D4D4D4"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Top Face - Main Browser Plate */}
        <polygon
          points="160,42 256,96 160,150 64,96"
          fill="#FFFFFF"
          stroke="#171717"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Browser Top Navigation Divider Line */}
        <line
          x1="86"
          y1="84"
          x2="234"
          y2="84"
          stroke="#E5E5E5"
          strokeWidth="1"
        />

        {/* 3 Isometric Window Controls (Dots) */}
        <circle cx="82" cy="74" r="2.2" fill="#D4D4D4" />
        <circle cx="90" cy="78" r="2.2" fill="#D4D4D4" />
        <circle cx="98" cy="82" r="2.2" fill="#D4D4D4" />

        {/* Isometric Address Bar */}
        {/* Outer pill frame */}
        <polygon
          points="114,68 214,68 230,77 130,77"
          fill="#F5F5F5"
          stroke="#D4D4D4"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Lock / Protocol Icon */}
        <path
          d="M 125 72 L 129 74 L 129 76 L 125 74 Z"
          stroke="#737373"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Typing URL text simulation inside the isometric address bar */}
        {/* We use an animated group with clip-path or path mask */}
        <g transform="translate(133, 73)">
          {/* Animated typing text representation in isometric plane */}
          <motion.text
            x="0"
            y="0"
            fontSize="7"
            fontFamily="monospace"
            fontWeight="600"
            fill="#171717"
            transform="matrix(0.866, 0.45, 0, 1, 0, 0)"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: [0, 0, 1, 1, 1, 0],
                  }
            }
            transition={{
              duration: 4.5,
              repeat: Infinity,
              times: [0, 0.15, 0.35, 0.85, 0.95, 1],
              ease: "easeInOut",
            }}
          >
            crawson.dev/api
          </motion.text>

          {/* Blinking Typing Caret */}
          <motion.line
            x1="58"
            y1="-4"
            x2="58"
            y2="3"
            stroke="#000000"
            strokeWidth="1.2"
            transform="matrix(0.866, 0.45, 0, 1, 0, 0)"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 1 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: [1, 0, 1, 0, 1, 0, 0],
                  }
            }
            transition={{
              duration: 4.5,
              repeat: Infinity,
              times: [0, 0.2, 0.4, 0.6, 0.8, 0.85, 1],
            }}
          />
        </g>

        {/* Subtle Confirmation Badge: "200 OK" / Checkmark */}
        <motion.g
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : {
                  opacity: [0, 0, 0, 1, 1, 0],
                  scale: [0.8, 0.8, 0.8, 1, 1, 0.8],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.4, 0.45, 0.85, 0.95, 1],
            ease: "easeOut",
          }}
        >
          {/* Status pill badge on right side of address bar */}
          <polygon
            points="206,62 236,62 244,67 214,67"
            fill="#171717"
            stroke="#171717"
            strokeWidth="0.8"
          />
          <text
            x="213"
            y="65"
            fontSize="5.5"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#FFFFFF"
            transform="matrix(0.866, 0.45, 0, 1, -26, -30)"
          >
            ✓ 200 OK
          </text>
        </motion.g>

        {/* Webpage Content Body Wireframe (illuminates when URL confirms) */}
        {/* Hero Wireframe Box */}
        <motion.polygon
          points="100,98 150,98 160,104 110,104"
          fill="#F5F5F5"
          stroke="#E5E5E5"
          strokeWidth="0.8"
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: [0.3, 0.3, 0.3, 1, 1, 0.3],
                  fill: ["#F5F5F5", "#F5F5F5", "#F5F5F5", "#EAEAEA", "#EAEAEA", "#F5F5F5"],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.4, 0.45, 0.85, 0.95, 1],
          }}
        />

        {/* Skeleton content lines */}
        <motion.polygon
          points="100,108 175,108 185,114 110,114"
          fill="#E5E5E5"
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: [0.2, 0.2, 0.2, 0.8, 0.8, 0.2],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.4, 0.48, 0.85, 0.95, 1],
          }}
        />
        <motion.polygon
          points="100,118 160,118 170,124 110,124"
          fill="#EEEEEE"
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: [0.2, 0.2, 0.2, 0.7, 0.7, 0.2],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.4, 0.52, 0.85, 0.95, 1],
          }}
        />

        {/* Three mini column cards inside page body */}
        <motion.polygon
          points="105,128 128,128 135,133 112,133"
          fill="#F5F5F5"
          stroke="#E5E5E5"
          strokeWidth="0.8"
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: [0.2, 0.2, 0.2, 1, 1, 0.2],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.4, 0.55, 0.85, 0.95, 1],
          }}
        />
        <motion.polygon
          points="138,128 161,128 168,133 145,133"
          fill="#F5F5F5"
          stroke="#E5E5E5"
          strokeWidth="0.8"
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: [0.2, 0.2, 0.2, 1, 1, 0.2],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.4, 0.58, 0.85, 0.95, 1],
          }}
        />
        <motion.polygon
          points="171,128 194,128 201,133 178,133"
          fill="#F5F5F5"
          stroke="#E5E5E5"
          strokeWidth="0.8"
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: [0.2, 0.2, 0.2, 1, 1, 0.2],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.4, 0.61, 0.85, 0.95, 1],
          }}
        />

        {/* Animated Isometric Cursor Pointer */}
        <motion.g
          initial={
            prefersReducedMotion
              ? { x: 195, y: 73, opacity: 0 }
              : { x: 70, y: 140, opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 0 }
              : {
                  x: [70, 140, 195, 195, 210, 70],
                  y: [140, 95, 73, 73, 68, 140],
                  opacity: [0, 1, 1, 1, 0, 0],
                  scale: [1, 1, 0.88, 1, 1, 1],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.15, 0.35, 0.55, 0.85, 1],
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

export default EnterUrlIllustration;
