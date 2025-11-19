"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// 👇 각 섹션 import
import HeroSection from "./HeroSection";
import DesignSection from "./DesignSection";
import ToneSection from "./ToneSection";
import PerformanceSection from "./PerformanceSection"; 
import LimitedSection from "./LimitedSection";
import CTASection from "./CTASection";

interface Scene3Props {
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Scene3({ onPrev, onNext }: Scene3Props) {
  const [hasError, setHasError] = useState(false);

  // 네비게이션 버튼 컴포넌트
  const NavButtons = () => (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center gap-4">
      <button
        onClick={onPrev}
        className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
      >
        이전
      </button>
      <button
        onClick={onNext}
        className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
      >
        다음
      </button>
    </div>
  );

  if (hasError) {
    return (
      <div className="min-h-dvh bg-black text-white flex items-center justify-center">
        <p>콘텐츠를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <>
      <motion.main
        className="bg-black text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1] }}
        onError={() => setHasError(true)}
      >
        {/* 🎬 1. Hero */}
        <HeroSection />

        {/* 🎸 2. Design */}
        <DesignSection />

        {/* 🎧 3. Tone */}
        <ToneSection />

        {/* ⚙️ 4. Performance */}
        <PerformanceSection /> 

        {/* 🏅 5. Limited Edition */}
        <LimitedSection />

        {/* 🚀 6. CTA */}
        <CTASection />
      </motion.main>
      
      {/* 네비게이션 버튼 */}
      <NavButtons />
    </>
  );
}
