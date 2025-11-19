"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { lazy, Suspense } from 'react';

// 동기적으로 로드되는 컴포넌트들
import Scene1 from "./components/Scene1";
import Scene2 from "./components/Scene2";
import Scene4 from "./components/Scene4";

// 지연 로딩되는 컴포넌트들
const Scene3 = lazy(() => import("./components/Scene3"));

type Scene = 0 | 1 | 2 | 3;
type Dir = 1 | -1;

/** slide 애니메이션 */
const slide: Variants = {
  enter: (dir: Dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: Dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] },
  }),
};

export default function App() {
  const [scene, setScene] = useState<Scene>(0);
  const [dir, setDir] = useState<Dir>(1);

  useEffect(() => {
    console.log('App mounted');
  }, []);

  const go = (n: Scene, d: Dir) => {
    console.log(`Navigating to scene ${n}`);
    setDir(d);
    setScene(n);
  };
  const next = () => go((Math.min(scene + 1, 3) as Scene), 1);
  const prev = () => go((Math.max(scene - 1, 0) as Scene), -1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-dvh bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={`scene-${scene}`}
          className="min-h-dvh"
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          custom={dir}
        >
          {scene === 0 && <Scene1 onNext={() => go(1, 1)} />}

          {scene === 1 && (
            <Scene2
              onPrev={() => go(0, -1)}
              onNext={() => go(2, 1)}
            />
          )}

          {scene === 2 && (
            <Suspense fallback={
              <div className="min-h-dvh bg-black flex items-center justify-center">
                <div className="text-white text-xl">로딩중...</div>
              </div>
            }>
              <Scene3
                onPrev={() => go(1, -1)}
                onNext={() => go(3, 1)}
              />
            </Suspense>
          )}

          {scene === 3 && (
            <Scene4
              onPrev={() => go(2, -1)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
