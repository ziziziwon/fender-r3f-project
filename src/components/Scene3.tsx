"use client";

import React from "react";
import { motion } from "framer-motion";

// 네비
import TopNav from "./TopNav";

// 섹션들
import HeroSection from "./Scene3/HeroSection";
import DesignSection from "./Scene3/DesignSection";
import ToneSection from "./Scene3/ToneSection";
import PerformanceSection from "./Scene3/PerformanceSection";
import LimitedSection from "./Scene3/LimitedSection";
import CTASection from "./Scene3/CTASection";

type Props = {
  onPrev?: () => void; // 씬2 등 뒤로
  onNext?: () => void; // 씬4 등 앞으로
};

const Scene3: React.FC<Props> = ({ onPrev, onNext }) => {
  return (
    <motion.main
      className="relative bg-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
    >
      <TopNav onPrev={onPrev} onNext={onNext} />

      {/* 섹션들 */}
      <HeroSection />
      <DesignSection />
      <ToneSection />
      <PerformanceSection />
      <LimitedSection />
      <CTASection />
    </motion.main>
  );
};

export default Scene3;
