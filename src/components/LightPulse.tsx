// src/components/LightPulse.tsx
"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

/** GSAP 기반의 부드러운 빛 펄스 애니메이션 */
export default function LightPulse() {
  const lightRef = useRef<THREE.PointLight>(null);
  const glow = useRef({ intensity: 0.6 });

  useEffect(() => {
    // 🔹 타입 안정화를 위해 any 캐스팅 (GSAP Timeline 반환 문제 해결)
    const tl = gsap.timeline({ repeat: -1, yoyo: true }) as gsap.core.Timeline;

    tl.to(glow.current, {
      intensity: 2.2,
      duration: 3.6,
      ease: "sine.inOut",
    }).to(glow.current, {
      intensity: 0.6,
      duration: 3.6,
      ease: "sine.inOut",
    });

    // 🔹 반드시 cleanup 명시
    return () => {
      tl.kill();
    };
  }, []);

  useFrame(() => {
    if (lightRef.current) lightRef.current.intensity = glow.current.intensity;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 2.4, 3.5]}
      color="#ff9c5a"
      distance={12}
      intensity={1.2}
    />
  );
}
