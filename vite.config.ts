// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        manualChunks: {
          'scene3': [
            './src/components/Scene3/index.tsx',
            './src/components/Scene3/HeroSection.tsx',
            './src/components/Scene3/DesignSection.tsx',
            './src/components/Scene3/ToneSection.tsx',
            './src/components/Scene3/PerformanceSection.tsx',
            './src/components/Scene3/LimitedSection.tsx',
            './src/components/Scene3/CTASection.tsx',
          ]
        }
      }
    }
  },
  assetsInclude: ['**/*.glb'],  // GLB 파일을 에셋으로 처리
  publicDir: 'public',  // public 디렉토리 명시적 설정
  ssr: {
    noExternal: ['framer-motion', '@react-three/drei', '@react-three/fiber']
  }
});
