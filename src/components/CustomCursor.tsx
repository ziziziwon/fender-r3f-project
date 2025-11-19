"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "dot" | "ring" | "hidden";
type CursorState = { variant: CursorVariant; label?: string };
type CursorCtx = { setCursor: (next: Partial<CursorState>) => void; clearCursor: () => void };

const CursorContext = createContext<CursorCtx | null>(null);

type Props = {
  children: ReactNode;
  hideOsCursor?: boolean;     // OS 커서 숨김
  autoBind?: boolean;         // data-cursor="ring|hidden|dot" 자동 처리
  enabledOnTouch?: boolean;   // 터치에서도 강제 표시
  dotSize?: number;           // 도트 지름(px)
  ringSize?: number;          // 링 지름(px)
  ringColor?: string;         // 링/라벨 색
  hideDotOnRing?: boolean;    // 링일 때 도트 숨김
  dotSmooth?: number;         // 0=즉시, 0.05~0.2 권장(기본 0.12)
  snapToDevicePixel?: boolean;// DPR 스냅(기본 true)
};

export function CursorProvider({
  children,
  hideOsCursor = true,
  autoBind = true,
  enabledOnTouch = false,
  dotSize = 10,
  ringSize = 120,
  ringColor = "#D21F1B",
  hideDotOnRing = true,
  dotSmooth = 0.12,
  snapToDevicePixel = true,
}: Props) {
  const isTouchLike = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: coarse)").matches;
  }, []);

  const [state, setState] = useState<CursorState>({ variant: "dot", label: "" });
  const [dotColor, setDotColor] = useState<string>("#fff");

  const setCursor = (next: Partial<CursorState>) => setState((s) => ({ ...s, ...next }));
  const clearCursor = () => setState({ variant: "dot", label: "" });

  // 원시 좌표(즉시 반응)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // 도트는 약간의 스무딩(원치 않으면 dotSmooth=0)
  const dotX = dotSmooth > 0 ? useSpring(rawX, { stiffness: 700, damping: 35, mass: 0.7 }) : rawX;
  const dotY = dotSmooth > 0 ? useSpring(rawY, { stiffness: 700, damping: 35, mass: 0.7 }) : rawY;

  // 링은 **절대 지연 없음**: 포인터와 완전 일치
  const ringX = rawX;
  const ringY = rawY;

  // 좌표 업데이트
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const dpr = snapToDevicePixel ? (window.devicePixelRatio || 1) : 1;
      const sx = snapToDevicePixel ? Math.round(e.clientX * dpr) / dpr : e.clientX;
      const sy = snapToDevicePixel ? Math.round(e.clientY * dpr) / dpr : e.clientY;
      rawX.set(sx);
      rawY.set(sy);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, [rawX, rawY, snapToDevicePixel]);

  // OS 커서 숨김
  useEffect(() => {
    if (!hideOsCursor || isTouchLike) return;
    document.body.classList.add("cursor-none");
    return () => document.body.classList.remove("cursor-none");
  }, [hideOsCursor, isTouchLike]);

  // 배경 톤에 따라 도트 색 변경
  useEffect(() => {
    if (isTouchLike) return;
    const onMove = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const host = el?.closest<HTMLElement>("[data-bg]");
      const bg = host?.getAttribute("data-bg");
      setDotColor(bg === "light" ? "#000" : "#fff");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isTouchLike]);

  // data-cursor 자동 바인딩
  useEffect(() => {
    if (!autoBind) return;
    if (isTouchLike && !enabledOnTouch) return;

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (!el) return;
      const type = el.getAttribute("data-cursor");
      const label = el.getAttribute("data-cursor-label") ?? "";
      if (type === "ring") setCursor({ variant: "ring", label });
      else if (type === "hidden") setCursor({ variant: "hidden", label: "" });
      else clearCursor();
    };
    const onOut = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (!el) return;
      clearCursor();
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [autoBind, isTouchLike, enabledOnTouch]);

  if (isTouchLike && !enabledOnTouch) {
    return <CursorContext.Provider value={{ setCursor, clearCursor }}>{children}</CursorContext.Provider>;
  }

  const showDot = state.variant !== "hidden" && (hideDotOnRing ? state.variant !== "ring" : true);

  return (
    <CursorContext.Provider value={{ setCursor, clearCursor }}>
      {children}

      {/* ● 도트 (약간의 스무딩) */}
      {showDot && (
        <motion.div
          className="pointer-events-none fixed z-[100000] rounded-full will-change-transform"
          style={{
            left: 0,
            top: 0,
            x: dotX,           // ← transform 기반 이동 (더 부드럽고 정확)
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
          }}
        />
      )}

      {/* ◎ 링 (지연 없이 포인터와 완전 일치) */}
      {state.variant === "ring" && (
        <motion.div
          className="pointer-events-none fixed z-[100001] will-change-transform"
          style={{
            left: 0,
            top: 0,
            x: ringX,          // ← 원시 좌표 그대로
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            width: ringSize,
            height: ringSize,
          }}
          initial={{ scale: 0.98, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 20, mass: 0.7 }}
        >
          <div className="absolute inset-0 rounded-full" style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} />
          <div className="absolute inset-0 rounded-full border" style={{ borderColor: ringColor }} />
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-[10px] tracking-[.2em] uppercase" style={{ color: ringColor, userSelect: "none" }}>
              {state.label || "HOVER"}
            </span>
          </div>
        </motion.div>
      )}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used inside <CursorProvider>.");
  return ctx;
}
