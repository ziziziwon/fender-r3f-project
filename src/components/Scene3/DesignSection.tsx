"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import GuitarModel from "../../components/GuitarModel";

export default function DesignSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center h-[100vh] px-8 gap-16 bg-gradient-to-br from-[#0b0d10] via-[#111315] to-[#1b1c1e] overflow-hidden">
      {/* 💬 Left Text */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.3, 1] }}
        viewport={{ once: false, amount: 0.5 }} //  다시 나타날 때마다 재생
        className="max-w-[520px] z-10"
      >
        <h2 className="text-[clamp(28px,3.6vw,50px)] font-bold mb-6 leading-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
          클래식 선율 위에, <br />
          새로운 빛을 새기다.
        </h2>
        <p className="text-white/80 leading-relaxed text-[clamp(14px,2vw,18px)]">
          펜더의 헤리티지 실루엣 위에 서울의 감성을 입혔습니다. <br />
          깊은 울림과 현대적인 균형이 공존하는 디자인, <br />
          그 첫 번째 사운드를 지금 만나보세요.
        </p>
      </motion.div>
      {/* 🛈 OrbitControls 안내 배지 (하단 중앙) */}
      <motion.div
        className="absolute inset-x-0 top-[7vh] z-40 pointer-events-none flex justify-center"
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: 30 }}
       transition={{
       duration: 0.9,
       ease: [0.25, 1, 0.3, 1],
  
      }}
      viewport={{ once: false, amount: 0.5 }}
      >
        <div
          className="
            pointer-events-auto
            mx-auto w-fit
            rounded-full px-4 py-2
            text-[12px] leading-none tracking-wide
            text-white/90
            backdrop-blur-md bg-white/10
            border border-white/15
            shadow-[0_8px_24px_rgba(0,0,0,0.25)]
            flex items-center gap-3
          "
          aria-label="OrbitControls usage hint"
        >
          <span className="opacity-90">시점 조작</span>
          <span className="opacity-60">•</span>
          <span className="opacity-90">드래그: 회전</span>
          <span className="opacity-60">•</span>
          <span className="opacity-90">줌 / 이동 비활성화</span>
        </div>
      </motion.div>
            {/*  3D Guitar Model */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.25, 1, 0.3, 1],
          delay: 0.2,
        }}
        viewport={{ once: false, amount: 0.4 }} //  재진입 시 다시 재생
        className="relative z-10 w-[min(90%,600px)] h-[min(90vw,600px)] rounded-3xl overflow-hidden bg-[#000]"
      >
        <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 11.5, 2.2], fov: 15 }}
        onCreated={({ gl }) => {
          console.log('Canvas created');
          gl.setClearColor('#000000');
        }}
      >
        {/*  Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[1.5, 3, 2]}
          angle={0.45}
          intensity={1.5}
          color="#ffd37a"
          penumbra={0.6}
          castShadow
        />
        <spotLight
          position={[-2.5, 3, 2]}
          angle={0.5}
          intensity={0.9}
          color="#88aaff"
          penumbra={0.5}
        />

        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        }>
          <GuitarModel position={[0, -0.3, 0]} scale={0.96} />
          <Environment preset="studio" />
          <ContactShadows
            opacity={0.22}
            blur={2.5}
            far={10}
            resolution={1024}
            scale={10}
            position={[0, -0.3, 0]}
          />
        </Suspense>

        {/* 마우스 드래그 컨트롤 활성화 */}
        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          enablePan={false}
          enableRotate
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.9}
          minPolarAngle={0.001}
          maxPolarAngle={Math.PI - 0.001}
          target={[0, -0.3, 0]} 
        />
      </Canvas>
      </motion.div>

      {/*  Ambient Accent Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,200,100,0.08)_0%,transparent_75%)] pointer-events-none" />

      {/*  Fade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </section>
  );
}
