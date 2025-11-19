"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type ShineScrollProps = {
  children: React.ReactNode;
  startPct?: number;
  endPct?: number;
  angleDeg?: number;
  reverse?: boolean;
  stiffness?: number;
  damping?: number;
};

export function ShineScroll({
  children,
  startPct = 85,
  endPct = 25,
  angleDeg = 115,
  reverse = false,
  stiffness = 360,
  damping = 18,
}: ShineScrollProps) {
  const wrap = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: [`start ${startPct}%`, `end ${endPct}%`] as const,
  });

  const eased = useSpring(scrollYProgress, { stiffness, damping, mass: 0.2 });
  const bgPos = useTransform(eased, (v) => `${(reverse ? 1 - v : v) * 100}% 0%`);

  return (
    <span ref={wrap} className="relative inline-block">
      {/* 베이스 메탈 톤 */}
      <span
        className="relative text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #8a8a8a 0%, #4d4d4d 50%, #1e1e1e 100%)",
          WebkitTextStroke: "0.25px rgba(255,255,255,0.07)",
        }}
      >
        {children}
      </span>

      {/*  초광도 반사광 */}
      <motion.span
        aria-hidden
        className="absolute inset-0 text-transparent bg-clip-text pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${angleDeg}deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.05) 65%,
            rgba(255,255,255,1) 67%,
            rgba(255,255,255,1) 68%,
            rgba(255,255,255,0.05) 71%,
            rgba(255,255,255,0) 100%)`,  // ← 전체적으로 오른쪽 이동
          backgroundSize: "270% 100%",
          backgroundPosition: bgPos,
          mixBlendMode: "screen",
          filter: "brightness(2.4) contrast(2.3)",
          willChange: "background-position",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
