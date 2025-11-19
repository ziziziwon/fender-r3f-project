"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import logoRaw from "../assets/logo/fender.svg?raw"; // SVG raw 로드

type Props = {
  onPrev?: () => void;   // 좌측 로고 클릭 → 이전 씬
  onNext?: () => void;   // 우측 화살표 클릭 → 다음 씬
  logoWidth?: number;    // 로고 픽셀 너비 (기본 160)
  topOffsetVh?: number;  // 상단 여백 (vh)
  leftOffsetVw?: number; // 좌측 여백 (vw)
  rightOffsetVw?: number;// 우측 여백 (vw)
};

const TopNav: React.FC<Props> = ({
  onPrev,
  onNext,
  logoWidth = 160,
  topOffsetVh = 6,
  leftOffsetVw = 4,
  rightOffsetVw = 5,
}) => {
  // SVG 내부 fill/stroke → currentColor
  const logoSanitized = useMemo(
    () =>
      logoRaw
        .replace(/fill="[^"]*"/g, 'fill="currentColor"')
        .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
        .replace(/fill:[^;"]+/g, "fill:currentColor")
        .replace(/stroke:[^;"]+/g, "stroke:currentColor"),
    []
  );

  // ← / → 키로 이동
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPrev, onNext]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[80] pointer-events-none"
      aria-label="Top navigation"
    >
      {/* 좌측: Fender 로고 */}
      {onPrev && (
        <motion.button
          type="button"
          onClick={onPrev}
          aria-label="이전 씬으로 이동"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.3, 1] }}
          className="absolute pointer-events-auto text-white hover:text-[#DA0031] focus:outline-none focus-visible:ring focus-visible:ring-white/40"
          style={{
            top: `calc(${topOffsetVh}vh + max(env(safe-area-inset-top, 0px), 0px))`,
            left: `${leftOffsetVw}vw`,
            lineHeight: 0,
          }}
        >
          <style>{`.fender-logo svg, .fender-logo svg * { fill: currentColor !important; stroke: currentColor !important; }`}</style>
          <span
            className="fender-logo block"
            style={{ width: logoWidth, maxWidth: "min(34vw, 220px)" }}
            dangerouslySetInnerHTML={{ __html: logoSanitized }}
          />
        </motion.button>
      )}

      {/* 우측: 다음 씬 화살표 */}
      {onNext && (
        <motion.button
          type="button"
          onClick={onNext}
          aria-label="다음 씬으로 이동"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.3, 1], delay: 0.05 }}
          className="
            absolute pointer-events-auto group flex items-center justify-center
            w-[60px] h-[60px] rounded-full
            backdrop-blur-md border border-white/20
            bg-white/10 hover:bg-white/20
            shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            transition-all duration-300
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black
            text-white
          "
          style={{
            top: `calc(${topOffsetVh}vh + max(env(safe-area-inset-top, 0px), 0px))`,
            right: `${rightOffsetVw}vw`,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m-7-7 7 7-7 7"
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default TopNav;
