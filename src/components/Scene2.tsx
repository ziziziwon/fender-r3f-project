"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Html,
  useProgress,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { CursorProvider } from "../components/CustomCursor";
import RoomModel from "../components/RoomModel";
import TextFXHeadline from "../components/TextFXHeadline";
import logoRaw from "../assets/logo/fender.svg?raw"; //  SVG 파일 로드

/* ---------------- 타입 정의 ---------------- */
type Props = {
  onPrev?: () => void;
  onNext?: () => void;
};

/* ---------------- 로딩 HUD ---------------- */
const LoaderHUD: React.FC = () => {
  const { progress, active } = useProgress();
  if (!active) return null;
  return (
    <div className="absolute inset-0 z-30 grid place-items-center">
      <div className="px-6 py-4 rounded-2xl backdrop-blur-md bg-white/45 border border-white/60 shadow-lg">
        <div className="text-center">
          <div className="text-sm font-medium text-black/70">Loading room…</div>
          <div className="mt-1 text-2xl font-bold tracking-tight">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- 카메라 FOV 업데이트 ---------------- */
const CameraFovUpdater: React.FC<{ fov: number }> = ({ fov }) => {
  const { camera } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = fov;
    cam.updateProjectionMatrix();
  }, [fov, camera]);
  return null;
};

/* ---------------- 메인 Scene ---------------- */
const Scene2: React.FC<Props> = ({ onPrev, onNext }) => {
  const fov = 10;
  const cameraPos: [number, number, number] = [-60, 60, 140];
  const MODEL_OFFSET_Y = -8;

  // SVG 내부 fill/stroke를 currentColor로 변경 (색상 제어 가능하게)
  const logoSanitized = useMemo(() => {
    return logoRaw
      .replace(/fill="[^"]*"/g, 'fill="currentColor"')
      .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
      .replace(/fill:[^;"]+/g, "fill:currentColor")
      .replace(/stroke:[^;"]+/g, "stroke:currentColor");
  }, []);

  return (
    <div
      className="stage relative w-full min-h-[100dvh] overflow-hidden isolate"
      style={{ background: "#181c20", color: "#e8edf2" }}
      data-bg="dark"
    >
      <CursorProvider>
        <section
          aria-label="room-viewport"
          className="relative w-full"
          style={{ height: "100dvh", marginTop: 0 }}
        >
          {/*  상단 펜더 로고 버튼 */}
          <div className="absolute top-[6vh] left-[4vw] z-40">
            <style>{`.fender-logo svg, .fender-logo svg * { fill: currentColor !important; stroke: currentColor !important; }`}</style>
            <button
              type="button"
              aria-label="Go to Scene 1"
              className="
                fender-logo
                w-[160px] max-w-[aoto]
                text-white hover:text-fender-red
                transition-colors duration-300
                focus:outline-none focus-visible:ring focus-visible:ring-white/40
                [&>svg]:block [&>svg]:w-full [&>svg]:h-auto
              "
              dangerouslySetInnerHTML={{ __html: logoSanitized }}
              onClick={onPrev}
            />
          </div>

          {/* 비네트 효과 */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          <LoaderHUD />

          {/* 텍스트 인터랙션 */}
          <div className="absolute z-30 inset-0 pointer-events-none">
            <div
              className="
                pointer-events-auto
                absolute top-[4vh] left-1/2
                -translate-x-1/2 
                w-[min(55rem,50vw)]
                px-4
              "
            >
              <TextFXHeadline
                text="A Legacy in Korea"
                sub="세대를 관통하는 소리, 펜더로 이어지다."
                align="center"
                sizeClamp="clamp(20px,5vw,75px)"
                weight="800"
                tracking="0.02em"
                highlightColor="#ffffff"
                darkGlowColor="rgba(255,255,255,0.10)"
              />
            </div>
          </div>

          {/*  화살표 버튼 (씬3으로 이동) */}
        <button
          onClick={onNext}
          aria-label="Go to next scene"
          className="
            group absolute top-[6vh] right-[5vw] z-40
            flex items-center justify-center
            w-[60px] h-[60px] rounded-full
            backdrop-blur-md border border-white/20
            bg-white/10 hover:bg-white/20
            shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            transition-all duration-300
          "
        >
          {/* 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m-7-7 7 7-7 7"
            />
          </svg>
        </button>

        {/* 🛈 OrbitControls 안내 배지 (하단 중앙) */}
<div className="absolute inset-x-0 bottom-[3vh] z-40 pointer-events-none">
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
    <span className="opacity-90">스크롤: 줌</span>
    <span className="opacity-60">•</span>
    <span className="opacity-90">Shift+드래그: 이동</span>
  </div>
</div>

          {/* 3D 씬 */}
          <Canvas
            className="absolute inset-0"
            shadows
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            onCreated={({ gl, scene }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.15;
              gl.outputColorSpace = THREE.SRGBColorSpace;
              scene.background = null;
            }}
          >
            <PerspectiveCamera
              makeDefault
              position={cameraPos}
              fov={fov}
              near={0.1}
              far={1000}
            />
            <CameraFovUpdater fov={fov} />

            <OrbitControls
              makeDefault
              enableDamping
              dampingFactor={0.05}
              target={[0, 1.3, 0]}
              minPolarAngle={Math.PI * 0.05}
              maxPolarAngle={Math.PI * 0.95}
            />

            <ambientLight intensity={0.3} />
            <hemisphereLight
              color="#3c4048"
              groundColor="#12151a"
              intensity={0.35}
            />
            <spotLight position={[-1.2, 4.2, 2.3]} angle={0.55} penumbra={0.6} intensity={1.2} color="#ff4d3f" castShadow />
            <spotLight position={[1.9, 4.3, 2.0]} angle={0.55} penumbra={0.6} intensity={1.1} color="#4d7bff" castShadow />
            <spotLight position={[0.3, 1.3, 3.6]} angle={0.5} penumbra={0.7} intensity={0.4} color="#33ff88" />
            <directionalLight position={[0, 2.6, 5.2]} intensity={1.3} castShadow />
            <Environment preset="city" blur={0.45} />

            <group rotation={[0, 0, 0]} position={[0, MODEL_OFFSET_Y, 0]}>
              <RoomModel />
            </group>

            <ContactShadows
              frames={1}
              opacity={0.1}
              blur={2.8}
              far={22}
              resolution={1024}
              scale={22}
              position={[0, MODEL_OFFSET_Y - 0.001, 0]}
            />

            <Html prepend center zIndexRange={[10, 0]}>
              <span className="sr-only">Room model viewer</span>
            </Html>
          </Canvas>
        </section>
      </CursorProvider>
    </div>
  );
};

export default Scene2;
