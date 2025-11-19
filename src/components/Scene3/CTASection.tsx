"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="
        relative -mt-20   /* 위 섹션과 살짝 겹치게: seam 제거 (원하면 -mt-16~-mt-24로 미세조정) */
        bg-gradient-to-b from-[#120800] via-[#0f0a07] to-[#000000]
        py-28 text-center overflow-hidden
      "
    >
      {/* ── 위쪽 연결부: 자연스러운 이어짐 */}
      {/* 위 섹션 하단 그림자와 섞이도록 투명→검정 페이드 */}
      <div className="absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black/65 pointer-events-none" />
      {/* 곡면 디바이더로 미세한 포인트(CTA만의 구분감) */}
      <svg
        className="absolute -top-[1px] left-0 w-full h-14 text-[#120800]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,100 C260,45 1180,0 1440,55 L1440,0 L0,0 Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>

      {/*  앰버 라이트 글로우 (상·하에 아주 얇게) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,60,0.08)_0%,transparent_70%)] pointer-events-none" />
      {/* 얕은 앰버 밴드 — CTA만의 차이점 (아주 미세) */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[18vh] bg-[linear-gradient(90deg,transparent,rgba(255,170,90,0.04),transparent)]" />

      {/*  메인 문구 */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative z-10 px-6 max-w-[920px] mx-auto"
      >
        {/* 메탈릭 타이틀 */}
        <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold mb-5 leading-tight">
          <span
            className="
              bg-[linear-gradient(110deg,#e7e7e7_0%,#ffffff_35%,#b9b9b9_55%,#e2e2e2_100%)]
              bg-[length:180%_100%]
              text-transparent bg-clip-text
              drop-shadow-[0_0_18px_rgba(255,255,255,0.08)]
              animate-[shine_10s_linear_infinite]
            "
          >
            이 목과 현 위에서, 레전드와 함께
          </span>
        </h2>

        {/* 카피 */}
        <p className="text-[clamp(14px,2vw,20px)] leading-relaxed mb-12 text-center">
          <span className="text-amber-300 font-semibold">Fender Korea Launch Edition </span>
          <br className="hidden sm:block" />
          <span className="text-white">첫 스트로크와 함께, 관객은 당신 편이 된다.</span>
        </p>
        {/* 버튼 그룹 */}
        <div className="flex items-center justify-center gap-4 sm:gap-5">
          {/* Primary */}
          <motion.a
            href="#reserve"
            aria-label="사전 예약으로 이동"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="relative inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 rounded-2xl 
                       bg-white text-black font-semibold tracking-wide
                       shadow-[0_0_25px_rgba(255,200,100,0.15)]
                       focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black
                       overflow-hidden"
          >
            {/* 버튼 샤인 */}
            <span className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black,transparent)]">
              <span className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/30 animate-[btnshine_2.4s_ease_infinite]" />
            </span>
            사전 예약
            <motion.span
              aria-hidden
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "tween", duration: 0.18 }}
              className="text-black/70"
            >
              ↗
            </motion.span>
          </motion.a>
          {/* Secondary → 펜더 공식 홈페이지 이동 (Outline Fender Red) */}
          <motion.a
            href="https://intl.fender.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="펜더 공식 홈페이지로 이동"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="relative inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 rounded-2xl
                      border-2 border-[#DA0031] text-[#DA0031]
                      bg-transparent backdrop-blur
                      hover:bg-[#DA0031]/10
                      active:bg-[#DA0031]/20
                      shadow-[0_0_0_rgba(0,0,0,0)]
                      hover:shadow-[0_0_24px_rgba(218,0,49,0.25)]
                      focus:outline-none focus:ring-2 focus:ring-[#FF335A]/70
                      focus:ring-offset-2 focus:ring-offset-black font-semibold tracking-wide"
          >
            Fender
            <motion.span
              aria-hidden
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "tween", duration: 0.18 }}
              className="opacity-90"
            >
              ↗
            </motion.span>

            {/* 은은한 하이라이트 스윕 (옵션) */}
            <span className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black,transparent)]">
              <span className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/20 animate-[btnshine_2.4s_ease_infinite]" />
            </span>
          </motion.a>


        </div>

        {/* 푸터 라인 */}
        <p className="mt-10 text-sm text-white/50">
          © 2025 Fender Korea. All rights reserved.
        </p>
      </motion.div>

      {/* 하단 페이드 (페이지 끝과 부드럽게) */}
      <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black/80 via-black/0 to-transparent pointer-events-none" />

      {/* keyframes */}
      <style>{`
        @keyframes shine {
          0% { background-position: 180% 0%; }
          100% { background-position: -180% 0%; }
        }
        @keyframes btnshine {
          0% { transform: translateX(0); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </section>
  );
}
