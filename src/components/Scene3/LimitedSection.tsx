"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* =========================
   교체 가능한 변수들
   ========================= */
const modelName = `Stratocaster Pro V`;        // 기타 기종명
const editionName = `Korea Limited Edition`;    // 에디션명
const limitedTotal = 300;                       // 총 한정 수량
const displaySerial = `001`;                    // 보여줄 시리얼(예시)

/* =========================
    숫자 롤링 컴포넌트 (재실행 지원)
   ========================= */
// 개별 자리수: 굴리다 멈춤
function Digit({ target, rolling }: { target: string; rolling: boolean }) {
  const [v, setV] = useState(target);

  useEffect(() => {
    if (!rolling) {
      setV(target);
      return;
    }
    let raf = 0;
    const tick = () => {
      setV(String(Math.floor(Math.random() * 10))); // 0~9 랜덤
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf); //  cleanup은 함수 반환
    };
  }, [rolling, target]);

  return <span>{v}</span>;
}

/**
 * NumberRoller
 * - finalNumber: 최종 숫자
 * - digits: 자리수(0 패딩)
 * - duration: 롤링 총 시간(ms)
 * - delay: 시작 지연(ms)
 * - trigger: 값이 바뀔 때마다 재실행
 * - replayOnView: 뷰포트 재진입 시 자동 재실행
 */
function NumberRoller({
  finalNumber,
  digits = 3,
  duration = 1200,
  delay = 0,
  trigger = 0,
  replayOnView = true,
  className,
}: {
  finalNumber: number;
  digits?: number;
  duration?: number;
  delay?: number;
  trigger?: number;
  replayOnView?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });

  const [rolling, setRolling] = useState(false);

  // 타이머 id 저장 (브라우저: number)
  const delayRef = useRef<number | null>(null);
  const endRef = useRef<number | null>(null);

  const target = useMemo(
    () => String(finalNumber).padStart(digits, "0"),
    [finalNumber, digits]
  );

  // 공통 실행 함수
  const start = (withDelay = delay) => {
    if (delayRef.current !== null) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    if (endRef.current !== null) {
      clearTimeout(endRef.current);
      endRef.current = null;
    }

    setRolling(false);

    const runNow = () => {
      setRolling(true);
      endRef.current = window.setTimeout(() => {
        setRolling(false);
      }, duration);
    };

    if (withDelay > 0) {
      delayRef.current = window.setTimeout(runNow, withDelay);
    } else {
      runNow();
    }
  };

  // 트리거 변경 시 재생
  useEffect(() => {
    start(delay);
    return () => {
      if (delayRef.current !== null) clearTimeout(delayRef.current);
      if (endRef.current !== null) clearTimeout(endRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, finalNumber, digits, duration, delay]);

  // 뷰포트 재진입 시 자동 재생(옵션)
  useEffect(() => {
    if (!replayOnView) return;

    if (inView) {
      start(delay);
    } else {
      // 다음 진입을 위해 리셋
      if (delayRef.current !== null) {
        clearTimeout(delayRef.current);
        delayRef.current = null;
      }
      if (endRef.current !== null) {
        clearTimeout(endRef.current);
        endRef.current = null;
      }
      setRolling(false);
    }

    return () => {
      if (delayRef.current !== null) clearTimeout(delayRef.current);
      if (endRef.current !== null) clearTimeout(endRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, replayOnView, duration, delay]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {target.split("").map((ch, i) => (
        <Digit key={i} target={ch} rolling={rolling} />
      ))}
    </span>
  );
}

/* =========================
   섹션 컴포넌트
   ========================= */
export default function LimitedSection() {
  // 모바일 주소창 변동 대응: --vh 셋업 (진짜 풀뷰)
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // ▶ 클릭 재생 트리거
  const [trigger, setTrigger] = useState(0);

  return (
    <section
      className="
        relative w-full 
        h-[100svh] md:h-[100dvh] min-h-[100vh]
        flex items-center justify-center text-center 
        overflow-hidden bg-black border-t border-white/10
      "
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      {/* ✨ 은은한 링 글로우 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,60,0.08)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative z-10 px-6 w-full max-w-[960px] mx-auto"
      >
        {/* 상단 라벨군 */}
        <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-[12px] tracking-wide border border-white/15 text-white/80 bg-white/5 backdrop-blur">
            {modelName}
          </span>
          <span className="px-3 py-1 rounded-full text-[12px] tracking-wide border border-amber-400/40 text-amber-300 bg-amber-50/5 backdrop-blur shadow-[0_0_18px_rgba(255,200,100,0.15)]">
            {editionName}
          </span>
          <span className="px-3 py-1 rounded-full text-[12px] tracking-wide border border-white/15 text-white/70 bg-white/5">
            Made for Korea
          </span>
        </div>

        {/* 메인 타이틀: 두 줄 + 센터 정렬 */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1] }}
          className="text-[clamp(26px,4vw,44px)] font-extrabold leading-tight mb-4 text-center"
          aria-label={`${modelName} — ${editionName}`}
        >
          <span className="block">{modelName}</span>
          <span className="block bg-gradient-to-r from-[#ffd166] to-[#ffb347] bg-clip-text text-transparent">
            {editionName}
          </span>
        </motion.h3>

        {/* 서브카피 */}
        <p className="text-white/70 mb-10 text-[clamp(14px,2vw,18px)] leading-relaxed">
          단 {limitedTotal}대. 넘버링 각인과 전용 하드케이스, 그리고 한국만을 위한 튜닝이 더해진
          <span className="text-amber-300/90"> 리미티드 런</span>.
        </p>

        {/* 넘버링 + 핵심 포인트 3 */}
        <div className="flex flex-col items-center gap-6">
          {/* 넘버 플레이트 (랜덤 롤링 → 멈춤) + 재실행 지원 */}
          <motion.button
            type="button"
            onClick={() => setTrigger((t) => t + 1)}
            title="클릭하여 시리얼 애니메이션 재실행"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-amber-400/50 text-amber-300 font-semibold tracking-wider backdrop-blur-md bg-amber-50/5 shadow-[0_0_25px_rgba(255,200,100,0.25)] hover:bg-amber-50/10 hover:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-300/60 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Limited Serial Number"
          >
            No.&nbsp;
            <NumberRoller
              finalNumber={Number(displaySerial)}
              digits={Math.max(String(limitedTotal).length, 3)} // 총 수량 길이에 맞춤
              duration={1200}   // 롤링 총 시간(ms)
              delay={150}       // 시작 지연
              trigger={trigger} // 클릭할 때마다 재실행
              replayOnView={true} // 스크롤 재진입 시 자동 재생
              className="tabular-nums" /* 숫자 폭 고정 → 흔들림 최소화 */
            />
            &nbsp;/&nbsp;{String(limitedTotal).padStart(3, "0")}
          </motion.button>

          {/* 포인트 라인업 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[880px] mt-2">
            {[
              { k: "넘버링 각인", e: "Serialized Neck Plate" },
              { k: "전용 하드케이스", e: "Custom Hard Case" },
              { k: "K-톤 튜닝", e: "Seoul Voice Setup" },
            ].map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.6, ease: "easeOut" }}
                className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-5 py-4 text-left"
              >
                <div className="text-[13px] text-white/50 tracking-wide">{it.e}</div>
                <div className="text-[16px] text-white mt-0.5 font-medium">{it.k}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 하단 서브 문구 + 주석 */}
        <p className="mt-10 text-white/65 text-[clamp(12px,1.6vw,16px)]">
          역사적인 런칭을 기념하는 한정 수량 — 오직 한국에서.
        </p>
        <p className="mt-3 text-white/40 text-[12px]">
          * 실제 시리얼은 생산/유통 일정에 따라 상이할 수 있습니다.
        </p>
      </motion.div>

      {/* 바닥 그라데이션 */}
      <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black/80 via-black/0 to-transparent pointer-events-none" />
    </section>
  );
}
