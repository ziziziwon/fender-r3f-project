"use client";
import { motion } from "framer-motion";
import { ShineScroll } from "./ShineScroll";
export default function HeroSection() {
  return (
    <section className="relative h-[100vh] flex flex-col justify-center items-center text-center bg-[#0A0A0A] overflow-hidden select-none">
      {/*  메탈릭 + 스크롤 반사광 */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
        className="text-[clamp(25px,4vw,75px)] font-bold leading-tight"
      >
        <ShineScroll>
          전설의 톤, 새 무대 위로.
          <br />
          펜더, 한국 상륙.
        </ShineScroll>
      </motion.h1>

      {/* 서브 문구 */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 text-white text-[clamp(14px,2vw,20px)]"
      >
        과거를 재생하고, 미래를 연주하다.
      </motion.p>
    </section>
  );
}
