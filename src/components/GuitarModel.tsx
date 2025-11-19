"use client";

import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";

// 모델 경로를 상수로 정의
const MODEL_PATH = "./assets/models/guitar3.glb";

export default function GuitarModel(props: any) {
  const [loaded, setLoaded] = useState(false);
  const { gl } = useThree();

  useEffect(() => {
    // WebGL 컨텍스트 확인
    if (gl.domElement) {
      console.log('WebGL context is available');
    }
  }, [gl]);

  useEffect(() => {
    // 모델 파일 존재 여부 확인
    fetch(MODEL_PATH)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Model file not found: ${MODEL_PATH}`);
        }
        setLoaded(true);
      })
      .catch(error => {
        console.error('Model file check failed:', error);
      });
  }, []);

  try {
    const { scene } = useGLTF(MODEL_PATH);

    if (!scene || !loaded) {
      return null;
    }

    return (
      <primitive 
        object={scene} 
        {...props}
      />
    );
  } catch (error) {
    console.error('Error loading guitar model:', error);
    return null;
  }
}

// 모델 프리로드
try {
  useGLTF.preload("./assets/models/guitar3.glb");
} catch (error) {
  console.error('Error preloading guitar model:', error);
}
