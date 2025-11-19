import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import logoRaw from "../assets/logo/fender.svg?raw";
import introVideo from "../assets/video/MV.mp4"; 

type Props = {
  onDone?: () => void;
  onNext?: () => void;
};

const wrap: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

const logoEnter: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const Scene1: React.FC<Props> = ({ onDone, onNext }) => {
  const goNext = onDone ?? onNext ?? (() => {});

  const logoSanitized = useMemo(() => {
    return logoRaw
      .replace(/fill="[^"]*"/g, 'fill="currentColor"')
      .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
      .replace(/fill:[^;"]+/g, "fill:currentColor")
      .replace(/stroke:[^;"]+/g, "stroke:currentColor");
  }, []);

  return (
    <motion.section
      className="relative min-h-dvh overflow-hidden bg-black"
      variants={wrap}
      initial="initial"
      animate="animate"
      aria-label="Intro / Hero"
    >
      {/* 🎬 배경 비디오 */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={introVideo}       
        autoPlay
        muted
        loop
        playsInline
      />

      {/* 어둡게 오버레이 */}
      <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />

      {/* 로고 버튼 */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <style>{`
          .fender-logo svg, .fender-logo svg * {
            fill: currentColor !important;
            stroke: currentColor !important;
          }
        `}</style>

        <motion.button
          type="button"
          variants={logoEnter}
          onClick={goNext}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") goNext();
          }}
          aria-label="Enter Site"
          className="
            fender-logo
            w-[320px] max-w-[70vw]
            text-white hover:text-[#DA291C]
            transition-colors duration-300
            focus:outline-none focus-visible:ring focus-visible:ring-white/40
            [&>svg]:block [&>svg]:w-full [&>svg]:h-auto
          "
          dangerouslySetInnerHTML={{ __html: logoSanitized }}
        />
      </div>
    </motion.section>
  );
};

export default Scene1;
