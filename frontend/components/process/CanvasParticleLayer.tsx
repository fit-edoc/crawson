"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { COS30, SIN30 } from "./isometric-utils";

export interface ParticleTarget {
  x: number;
  y: number;
}

interface CanvasParticleLayerProps {
  width?: number;
  height?: number;
  isActive?: boolean;
  className?: string;
  sourcePoint?: { x: number; y: number };
  enginePoint?: { x: number; y: number };
  gridTargets?: ParticleTarget[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  progress: number; // 0 to 1
  speed: number;
  targetIndex: number;
  size: number;
  alpha: number;
  color: string;
}

export const CanvasParticleLayer: React.FC<CanvasParticleLayerProps> = ({
  width = 320,
  height = 220,
  isActive = true,
  className = "absolute inset-0 pointer-events-none z-10",
  sourcePoint = { x: 65, y: 105 },
  enginePoint = { x: 160, y: 115 },
  gridTargets = [
    { x: 235, y: 78 },
    { x: 255, y: 95 },
    { x: 235, y: 115 },
    { x: 260, y: 135 },
  ],
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isMounted = true;
    let lastTime = performance.now();

    // Initialize initial pool of particles
    const PARTICLE_COUNT = 18;
    const colors = ["#000000", "#171717", "#404040", "#737373"];

    const initParticle = (p?: Partial<Particle>, immediate = false): Particle => {
      const targetIndex = Math.floor(Math.random() * gridTargets.length);
      return {
        id: Math.random(),
        x: sourcePoint.x,
        y: sourcePoint.y,
        progress: immediate ? Math.random() : 0,
        speed: 0.0035 + Math.random() * 0.003,
        targetIndex,
        size: 1.5 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        ...p,
      };
    };

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      initParticle(undefined, true)
    );

    // Setup high-DPI scaling
    const updateCanvasScale = () => {
      if (!canvas) return;
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const rect = canvas.getBoundingClientRect();
      const currentWidth = rect.width || width;
      const currentHeight = rect.height || height;

      canvas.width = Math.round(currentWidth * dpr);
      canvas.height = Math.round(currentHeight * dpr);

      ctx.resetTransform?.();
      ctx.scale(dpr * (currentWidth / width), dpr * (currentHeight / height));
    };

    updateCanvasScale();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasScale();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Main animation loop
    const render = (time: number) => {
      if (!isMounted) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      if (isActive) {
        const particles = particlesRef.current;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.progress += p.speed * (dt * 60);

          if (p.progress >= 1) {
            // Reset particle
            particles[i] = initParticle();
            continue;
          }

          // Two-phase journey:
          // Phase 1 (0 -> 0.45): sourcePoint to enginePoint
          // Phase 2 (0.45 -> 0.55): processing in enginePoint (slight vortex/pulse)
          // Phase 3 (0.55 -> 1.0): enginePoint to assigned gridTarget
          const target = gridTargets[p.targetIndex] || gridTargets[0];

          if (p.progress < 0.45) {
            const t = p.progress / 0.45;
            // Isometric linear interpolation with slight curve
            p.x = sourcePoint.x + (enginePoint.x - sourcePoint.x) * t;
            p.y = sourcePoint.y + (enginePoint.y - sourcePoint.y) * t - Math.sin(t * Math.PI) * 4;
          } else if (p.progress <= 0.55) {
            // Inside engine core
            const angle = ((p.progress - 0.45) / 0.1) * Math.PI * 2 + p.id * 10;
            p.x = enginePoint.x + Math.cos(angle) * 3;
            p.y = enginePoint.y + Math.sin(angle) * 2;
          } else {
            const t = (p.progress - 0.55) / 0.45;
            // Outflow to structured table grid
            p.x = enginePoint.x + (target.x - enginePoint.x) * t;
            p.y = enginePoint.y + (target.y - enginePoint.y) * t + Math.sin(t * Math.PI) * 3;
          }

          // Render particle: crisp monochrome geometric dot with trailing line
          ctx.save();
          ctx.globalAlpha = p.alpha * (p.progress < 0.1 ? p.progress * 10 : p.progress > 0.9 ? (1 - p.progress) * 10 : 1);
          ctx.fillStyle = p.color;

          // Draw particle diamond / square
          ctx.beginPath();
          ctx.rect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          ctx.fill();

          // Subtle mini particle trail along movement vector
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          const trailLength = 4 * (1 - p.progress * 0.3);
          const dx = p.progress < 0.5 ? -COS30 : COS30;
          const dy = p.progress < 0.5 ? -SIN30 : SIN30;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + dx * trailLength, p.y + dy * trailLength);
          ctx.stroke();

          ctx.restore();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      resizeObserver.disconnect();
    };
  }, [isActive, prefersReducedMotion, sourcePoint, enginePoint, gridTargets, width, height]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default CanvasParticleLayer;
