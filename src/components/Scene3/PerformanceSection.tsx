"use client";

import { motion } from "framer-motion";
import React from "react";

// 1) 스펙 타입: title을 JSX(ReactNode)로
type Spec = {
  title: React.ReactNode;
  desc: string;
  tagline: string;
};

// 2) 데이터: 데스크톱에서만 줄바꿈 (<br className="hidden md:block" />)
const specs: Spec[] = [
  {
    title: (
      <>
        Neo-Vintage
        <br className="hidden md:block" />
        Pickups
      </>
    ),
    desc:
      "클래식 싱글코일의 감성을 유지하면서도, 현대적인 다이내믹을 세밀하게 구현한 하이엔드 사운드 엔진.",
    tagline: "— engineered for pure tone.",
  },
  {
    title: (
      <>
        Balanced
        <br className="hidden md:block" />
        Neck Profile
      </>
    ),
    desc:
      "정교한 인체공학적 설계로 장시간 연주에도 피로감 없이 안정적인 터치감과 완벽한 밸런스를 제공합니다.",
    tagline: "— crafted for lasting comfort.",
  },
  {
    title: (
      <>
        Resonance
        <br className="hidden md:block" />
        Body Design
      </>
    ),
    desc:
      "목재의 밀도와 두께를 정밀하게 조율하여, 공진의 깊이와 음의 잔향을 극대화한 프리미엄 바디 구조.",
    tagline: "— designed for endless sustain.",
  },
];

export default function PerformanceSection() {
  return (
    <section className="relative w-full h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#060606] via-[#0a0a0a] to-[#161616]">
      {/* 🌌 중앙 라이트 + 노이즈 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.08] mix-blend-soft-light pointer-events-none" />

      {/* 🔊 사운드 웨이브 */}
      <svg
        className="absolute inset-x-0 bottom-[18%] w-full h-[30vh] opacity-[0.25]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,160 C320,120 1120,200 1440,160 L1440,320 L0,320 Z"
          fill="url(#grad)"
          animate={{
            d: [
              "M0,160 C320,120 1120,200 1440,160 L1440,320 L0,320 Z",
              "M0,170 C400,140 1040,220 1440,180 L1440,320 L0,320 Z",
              "M0,150 C360,100 1080,180 1440,140 L1440,320 L0,320 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <defs>
          <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* 💬 텍스트 콘텐츠 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative z-10 px-6 max-w-[960px] mx-auto"
      >
        {/* ✨ 메탈릭 타이틀 */}
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.3, 1] }}
          className="text-[clamp(35px,5vw,60px)] font-extrabold mb-10 leading-tight text-center"
        >
          <span
            className="
              bg-[linear-gradient(110deg,#d8d8d8_0%,#f5f5f5_35%,#a9a9a9_55%,#dcdcdc_100%)]
              bg-[length:180%_100%]
              text-transparent bg-clip-text
              animate-shine
              drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]
            "
          >
            정밀함으로 완성된, 사운드의 진화.
          </span>
        </motion.h2>

        {/* 🎶 서브카피 */}
        <p className="text-white text-[clamp(15px,2vw,20px)] leading-relaxed mb-20 text-center">
          주파수, 진동, 울림. 모든 소리는 계산되고, 모든 울림은 감정이 된다. <br />
          펜더의 퍼포먼스 라인은 단순한 소리가 아닌,
          <span className="text-amber-300/90 font-medium">
            {" "}
            연주자의 에너지를 시각화하는 하나의 악기 그 자체입니다.
          </span>
        </p>

        {/* 🎛 3 spec cards (디자인 유지) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left items-stretch justify-items-center">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false }}
              className="relative group bg-gradient-to-b from-[#161616]/70 to-[#0a0a0a]/70 
                         border border-white/10 rounded-2xl p-7 backdrop-blur-md 
                         hover:border-amber-400/30 hover:shadow-[0_0_40px_rgba(255,200,100,0.15)] 
                         transition-all duration-500 max-w-[300px] w-full"
            >
              {/* 상단 라인 애니메이션 (그대로) */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-amber-400/0 via-amber-300/70 to-transparent origin-left"
              />

              {/* 제목: 모바일 1줄 트렁케이트, 데스크톱 줄바꿈 허용 */}
              <h3
                className="font-semibold text-[21px] leading-tight mb-3 text-white group-hover:text-amber-200 transition-colors
                           truncate md:overflow-visible md:whitespace-normal"
                title={typeof spec.title === "string" ? spec.title : undefined}
              >
                {spec.title}
              </h3>

              {/* 설명 & 슬로건 */}
              <p className="text-white/70 text-[15px] leading-relaxed mb-4">
                {spec.desc}
              </p>
              <p className="text-[13px] text-white/40 italic tracking-wide">
                {spec.tagline}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 하단 글로우 */}
      <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black/80 via-black/0 to-transparent" />

      {/* ✨ 메탈 텍스트 애니메이션 키프레임 */}
      <style>{`
        @keyframes shine {
          0% { background-position: 180% 0%; }
          100% { background-position: -180% 0%; }
        }
        .animate-shine {
          animation: shine 10s linear infinite;
        }
      `}</style>
    </section>
  );
}
