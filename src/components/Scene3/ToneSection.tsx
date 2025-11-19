"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    };
    resize();

    let frame = 0;
    const waves = [
      { color: "rgba(255,220,180,0.3)", amp: 25, freq: 0.014, speed: 0.016 },
      { color: "rgba(255,255,255,0.15)", amp: 35, freq: 0.01, speed: 0.01 },
      { color: "rgba(255,150,80,0.25)", amp: 20, freq: 0.018, speed: 0.02 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      waves.forEach((wave, i) => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * wave.freq + frame * wave.speed + i) * wave.amp;
          ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.5, wave.color);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
      frame++;
      requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 right-0 w-full h-[200px] opacity-80 mix-blend-screen"
    />
  );
}

export default function ToneSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 }); // 30% 보이면 감지
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (inView) {
      setKey((prev) => prev + 1); // 스크롤 들어올 때마다 key 변경 → 재렌더
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-[#0a0a0a] via-[#1a0a00] to-[#3c2200] py-32 text-center overflow-hidden text-white"
    >
      <WaveCanvas />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(255,200,100,0.15),transparent_70%)] blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="
          relative z-10 px-4
          translate-y-[-10vh] md:translate-y-[-12vh]
        "
      >
        {/* 🎬 key로 재렌더 유도 */}
        <motion.h3
          key={`headline-${key}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[clamp(28px,4vw,44px)] font-semibold tracking-tight mb-5 text-white/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]"
        >
          다시 만난 톤, 처음 같던 떨림.
        </motion.h3>

        <motion.p
          key={`sub-${key}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          className="text-white/70 max-w-[680px] mx-auto leading-relaxed text-[clamp(15px,1.8vw,18px)]"
        >
          따뜻함과 선명함이 균형을 찾을 때, 연주는 더 깊어집니다. <br />
          한국에서 다시, 당신의 사운드를.
        </motion.p>
      </div>
    </section>
  );
}
