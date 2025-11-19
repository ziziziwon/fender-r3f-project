"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  onPrev?: () => void;
};

const Scene4: React.FC<Props> = ({ onPrev }) => {
  return (
    <motion.main
      className="relative min-h-dvh bg-[#0b0b0c] text-white flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1] }}
    >
      {/* 💡 은은한 중앙 글로우 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)]" />

      <div className="relative max-w-[960px] mx-auto text-center px-8 space-y-12">
        {/* 🎸 타이틀 */}
        <motion.h1
          className="text-[clamp(40px,6vw,80px)] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#f2f2f2] via-[#cfcfcf] to-[#a8a8a8]"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Behind the Portfolio
        </motion.h1>

        {/* 스토리라인 */}
        <motion.p
          className="text-white/85 leading-relaxed text-[clamp(15px,2vw,18px)] font-light tracking-wide"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          이 포트폴리오는 단순한 결과물이 아니라 <br />
          <span className="font-semibold text-white">
            ‘디자인 감정’과 ‘인터랙션 기술’
          </span>
          을 융합한 개인 실험입니다. <br />
          최근 한국 진출로 큰 화제를 모은{" "}
          <span className="text-white">Fender Korea</span>를 모티프로 삼아, <br />
          펜더가 한국에 남긴 역사적 흐름과 문화적 정서를 재해석했습니다. <br />
          그 스토리를 기반으로, 가상의{" "}
          <span className="font-semibold text-white">
            “한국 런칭 리미티드 에디션 프로모션”
          </span>{" "}
          사이트를 기획했습니다. <br />
          단순한 제품 홍보가 아닌,{" "}
          <span className="text-white">
            한국 뮤지션에게 다시 돌아온 펜더의 정신
          </span>
          을 시각적으로 풀어낸<br />
           감성적 브랜드 스토리텔링 프로젝트입니다.
        </motion.p>

        {/* 기술 스택 */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          {[
            { name: "React + TypeScript", desc: "컴포넌트 기반 설계와 안정성" },
            { name: "Tailwind CSS", desc: "미니멀하고 정돈된 미학" },
            { name: "Framer Motion", desc: "감정의 흐름을 애니메이션으로" },
            { name: "GSAP", desc: "스크롤 기반의 몰입형 인터랙션" },
            { name: "Three.js / R3F", desc: "3D 모델과 빛의 감성 표현" },
            { name: "MUI + Custom Theme", desc: "일관된 UI 톤 & 깊이" },
          ].map((tech) => (
            <motion.div
              key={tech.name}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-6 w-full text-center transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20"
              whileHover={{ scale: 1.04 }}
            >
              <p className="font-semibold text-white mb-1">{tech.name}</p>
              <p className="text-sm text-white/60">{tech.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 버튼 */}
        <div className="flex items-center justify-center gap-5 mt-12">
          {/* 좌: 화이트 버튼 */}
          {onPrev && (
            <motion.button
              type="button"
              onClick={onPrev}
              className="
                group relative inline-flex items-center gap-2
                rounded-[18px] px-6 py-3
                bg-white text-[#111] font-semibold
                shadow-[0_6px_20px_rgba(0,0,0,0.25)]
                hover:shadow-[0_8px_26px_rgba(0,0,0,0.35)]
                transition-all
              "
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>이전으로</span>
              <span className="text-lg translate-y-[1px]">↗</span>
              <span className="pointer-events-none absolute inset-x-2 top-0 h-1.5 rounded-t-[14px] bg-white/60 blur-[1px]" />
            </motion.button>
          )}

          {/* 우: 레드 글로시 버튼 (같은 탭에서 열기) */}
          <motion.a
            href="https://jjw0144.mycafe24.com/"
            target="_self"
            rel="noopener noreferrer"
            aria-label="포트폴리오 홈페이지로 이동"
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
            <span>portfolio</span>
            <motion.span
              aria-hidden
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "tween", duration: 0.18 }}
              className="opacity-90 text-lg"
            >
              ↗
            </motion.span>

            {/* 은은한 하이라이트 스윕 */}
            <span className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black,transparent)]">
              <span className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/20 animate-[btnshine_2.4s_ease_infinite]" />
            </span>
          </motion.a>
        </div>

        {/* 푸터 시그니처 */}
        <motion.p
          className="text-white/50 text-sm tracking-wide mt-14"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          © 2025 Fender Korea Tribute — Designed & Coded by{" "}
          <span className="text-white/70 font-medium">Jiwon Jeong</span>
        </motion.p>
      </div>

      {/* 상/하 그라데이션 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* 애니메이션 키프레임 */}
      <style>{`
        @keyframes btnshine {
          0%   { transform: translateX(-150%) rotate(12deg); }
          100% { transform: translateX(150%) rotate(12deg); }
        }
      `}</style>
    </motion.main>
  );
};

export default Scene4;
