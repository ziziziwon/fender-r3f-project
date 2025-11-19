"use client";

import { useRef } from "react";
import { Group } from "three";
import { useGLTF } from "@react-three/drei";

type Props = {
  url?: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  shadows?: boolean;
};

/** ✅ src 기준 상대경로를 안전하게 절대 URL로 변환 */
const DEFAULT_ROOM_URL = new URL("../assets/models/room.glb", import.meta.url).href;

export default function RoomModel({
  url = DEFAULT_ROOM_URL,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  shadows = true,
}: Props) {
  const group = useRef<Group>(null);
  const gltf = useGLTF(url);
  const scene = gltf.scene.clone(true);

  if (shadows) {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(DEFAULT_ROOM_URL);
