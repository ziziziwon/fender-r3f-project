# 🎸 Fender Korea – R3F 3D Interaction Web Project

> An immersive 3D web experience showcasing Fender guitars, built with React Three Fiber (R3F) and GSAP scroll animations.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=flat-square&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=flat-square&logo=greensock&logoColor=white)

## 📖 Project Overview

Fender Korea의 프리미엄 기타를 소개하는 인터랙티브 3D 웹 경험입니다. 사용자의 스크롤에 반응하는 유려한 3D 애니메이션과 몰입감 있는 비주얼 스토리텔링을 통해 제품의 가치를 전달합니다.

### ✨ Key Features

- **🎯 Interactive 3D Scenes**: React Three Fiber를 활용한 고퀄리티 3D 렌더링
- **📜 Scroll-based Animations**: GSAP ScrollTrigger로 구현된 자연스러운 스크롤 애니메이션
- **🎨 Custom Visual Effects**: 텍스트 이펙트, 라이트 펄스, 샤인 스크롤 등 커스텀 비주얼 효과
- **🖱️ Custom Cursor**: 브랜드 아이덴티티를 강조하는 커스텀 커서
- **⚡ Performance Optimized**: 최적화된 3D 로딩 및 렌더링
- **📱 Responsive Design**: 다양한 화면 크기 지원

## 🛠 Tech Stack

### Core
- **React 18** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 빌드 도구

### 3D & Animation
- **React Three Fiber (R3F)** - React용 Three.js 렌더러
- **@react-three/drei** - R3F 유틸리티 헬퍼
- **Three.js** - WebGL 3D 라이브러리
- **GSAP (GreenSock)** - 프로페셔널 애니메이션 라이브러리
- **ScrollTrigger** - 스크롤 기반 애니메이션 플러그인

### Styling
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **PostCSS** - CSS 변환 도구

### Development
- **ESLint** - 코드 품질 관리
- **Git LFS** - 대용량 3D 모델 파일 관리

## 🎬 Scene Structure

### Scene 1 - Intro
- 조선펑크의 정서를 담기 위한 크라잉넛의 공연 영상을 직접 편집해 구성한 인트로.
- 공연의 열기와 현장 질감을 Premiere Pro에서 컷·조명·노이즈를 조절하며 브랜드 무드로 재해석  

### Scene 2 - Immersive Room Experience
- 3D 룸 환경
- 인터랙티브 공간 탐험
- 영상 자산 통합

### Scene 3 - Product Details (Multi-Section)
- **Hero Section**: 제품 메인 비주얼
- **Design Section**: 디자인 철학 소개
- **Tone Section**: 사운드 특성 설명
- **Performance Section**: 성능 하이라이트
- **Limited Section**: 한정판 정보
- **CTA Section**: 행동 유도 섹션

### Scene 4 - Outro & Behind the Portfolio

- 작품 소개
- 작업 툴

## 📁 Project Structure

```
thisisreal/
├── src/
│   ├── components/
│   │   ├── Scene1.tsx              # 히어로 & 기타 쇼케이스
│   │   ├── Scene2.tsx              # 룸 경험
│   │   ├── Scene3/
│   │   │   ├── index.tsx           # Scene 3 메인 컴포넌트
│   │   │   ├── HeroSection.tsx     # 히어로 섹션
│   │   │   ├── DesignSection.tsx   # 디자인 섹션
│   │   │   ├── ToneSection.tsx     # 톤 섹션
│   │   │   ├── PerformanceSection.tsx
│   │   │   ├── LimitedSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── ShineScroll.tsx     # 샤인 스크롤 효과
│   │   ├── Scene4.tsx              # 아웃트로
│   │   ├── GuitarModel.tsx         # 3D 기타 모델
│   │   ├── RoomModel.tsx           # 3D 룸 모델
│   │   ├── CustomCursor.tsx        # 커스텀 커서
│   │   ├── LoadingProgress.tsx     # 로딩 프로그레스
│   │   ├── LightPulse.tsx          # 라이트 펄스 효과
│   │   ├── TextFXHeadline.tsx      # 텍스트 이펙트
│   │   └── TopNav.tsx              # 상단 네비게이션
│   ├── assets/
│   │   ├── models/
│   │   │   ├── guitar3.glb         # 기타 3D 모델 (Git LFS)
│   │   │   └── room.glb            # 룸 3D 모델 (Git LFS)
│   │   ├── video/
│   │   │   └── MV.mp4              # 배경 영상
│   │   └── logo/
│   │       └── fender.svg          # 펜더 로고
│   ├── types/
│   │   └── vite-raw.d.ts           # Vite 타입 정의
│   ├── App.tsx                      # 메인 앱 컴포넌트
│   ├── App.css                      # 앱 스타일
│   ├── main.tsx                     # 앱 엔트리 포인트
│   └── index.css                    # 글로벌 스타일
├── public/
│   └── assets/
│       └── models/
│           └── guitar3.glb          # 퍼블릭 3D 모델
├── dist/                            # 빌드 결과물
├── .gitattributes                   # Git LFS 설정
├── package.json                     # 의존성 관리
├── tsconfig.json                    # TypeScript 설정
├── vite.config.ts                   # Vite 설정
├── tailwind.config.js               # Tailwind 설정
├── postcss.config.js                # PostCSS 설정
└── eslint.config.js                 # ESLint 설정
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x 이상
- **npm** 또는 **yarn**
- **Git LFS** (대용량 파일 관리용)

### Installation

```bash
# 1. 저장소 클론
git clone https://github.com/ziziziwon/fender-r3f-project.git

# 2. 프로젝트 디렉토리 이동
cd fender-r3f-project

# 3. Git LFS 파일 다운로드
git lfs pull

# 4. 의존성 설치
npm install
```

### Development

```bash
# 개발 서버 시작 (기본 포트: 5173)
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 확인하세요.

### Build

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

## 💡 Technical Highlights

### 3D 모델 최적화
- **Git LFS**를 활용한 대용량 `.glb` 파일 관리
- Lazy loading을 통한 초기 로딩 시간 최적화
- Progressive loading으로 사용자 경험 개선

### 애니메이션 성능
- **GSAP ScrollTrigger**로 스크롤 기반 애니메이션 구현
- `requestAnimationFrame`을 활용한 부드러운 렌더링
- 불필요한 리렌더링 방지를 위한 React 최적화

### 반응형 디자인
- Tailwind CSS를 활용한 모바일 우선 디자인
- 다양한 화면 크기에 대응하는 3D 뷰포트 조정
- 터치 이벤트 지원

## 📦 Dependencies

### Production
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "@react-three/fiber": "^8.x",
  "@react-three/drei": "^9.x",
  "three": "^0.160.x",
  "gsap": "^3.x"
}
```

### Development
```json
{
  "typescript": "^5.x",
  "vite": "^5.x",
  "@vitejs/plugin-react": "^4.x",
  "tailwindcss": "^3.x",
  "eslint": "^9.x"
}
```

## 🎯 Performance Tips

- **3D 모델 최적화**: Blender 등을 사용해 폴리곤 수를 줄이고 텍스처를 압축하세요
- **코드 분할**: React의 `lazy`와 `Suspense`를 활용해 컴포넌트를 분할 로딩하세요
- **이미지 최적화**: WebP 포맷을 사용하고 적절한 크기로 리사이징하세요
- **번들 분석**: `vite-bundle-visualizer`를 사용해 번들 크기를 모니터링하세요

## 🤝 Contributing

프로젝트 개선을 위한 기여를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👤 Author

**ziziziwon**
- GitHub: [@ziziziwon](https://github.com/ziziziwon)

## 🙏 Acknowledgments

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - 훌륭한 React 3D 렌더링 라이브러리
- [GSAP](https://greensock.com/gsap/) - 강력한 애니메이션 엔진
- [Three.js](https://threejs.org/) - WebGL을 쉽게 만들어주는 3D 라이브러리
- [Fender](https://www.fender.com/) - 영감을 준 브랜드

---

<div align="center">
  Made with ❤️ and ☕ for Fender Korea
</div>
