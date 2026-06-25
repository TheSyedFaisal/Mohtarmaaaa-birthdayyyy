"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Particles } from "./Particles";
import { ProgressDots } from "./ProgressDots";
import { MusicToggle } from "./MusicToggle";
import { Balloons } from "./Balloons";
import { Sparkles } from "./Sparkles";
import { Confetti } from "./Confetti";
import { DoraemonPeeker } from "./DoraemonPeeker";
import { useAudioPlayer } from "../AudioProvider";

import { HeroScreen } from "./screens/HeroScreen";
import { ChildhoodScreen } from "./screens/ChildhoodScreen";
import { Level20Screen } from "./screens/Level20Screen";
import { Lawyer26Screen } from "./screens/Lawyer26Screen";
import { FutureScreen } from "./screens/FutureScreen";
import { LegendaryScreen } from "./screens/LegendaryScreen";
import { RealityCheckScreen } from "./screens/RealityCheckScreen";
import { WishingScreen } from "./screens/WishingScreen";

const TOTAL = 8;

export function BirthdayExperience({ name = "Mohtarma" }: { name?: string }) {
  const [index, setIndex] = useState(0);

  const displayName = name === "[NAME]" || !name ? "Mohtarma" : name;

  const go = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(TOTAL - 1, i)));
  }, []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const restart = useCallback(() => go(0), [go]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, next]);

  // swipe nav
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (dx < -50) next();
    if (dx > 50) go(index - 1);
    setTouchStart(null);
  };

  const { setActiveTrack } = useAudioPlayer();

  useEffect(() => {
    setActiveTrack(index === 7 ? "song2" : "song1");
  }, [index, setActiveTrack]);

  const screens = [
    <HeroScreen key="hero" onNext={next} />,
    <ChildhoodScreen key="childhood" onNext={next} />,
    <Level20Screen key="level20" onNext={next} />,
    <Lawyer26Screen key="lawyer26" onNext={next} />,
    <FutureScreen key="future" onNext={next} />,
    <LegendaryScreen key="legendary" onNext={next} />,
    <RealityCheckScreen key="reality" onNext={next} />,
    <WishingScreen key="wishing" onRestart={restart} />,
  ];

  return (
    <>
      <main
        className="animated-gradient relative h-screen w-screen overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Background Particles (always present) */}
        <Particles />

        {/* Floating Balloons (present on storytelling screens before the ending flow) */}
        {index < 6 && <Balloons />}

        {/* Confetti Effects (present on Hero, Reality Check, and Wishing screens) */}
        {(index === 0 || index >= 6) && <Confetti />}

        {/* Sparkles (present on middle storytelling screens & final) */}
        {index > 0 && <Sparkles />}

        {/* soft vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, oklch(0.28 0.02 60 / 0.08) 100%)",
          }}
        />

        <ProgressDots total={TOTAL} current={index} onJump={go} />
        <MusicToggle />

        <div className="relative z-20 h-full w-full">
          <AnimatePresence mode="wait">
            <motion.section
              key={index}
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              {screens[index]}
            </motion.section>
          </AnimatePresence>
        </div>

        {/* signature */}
        <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-[10px] font-semibold tracking-[0.3em] text-purple-900/60 uppercase">
          A birthday tribute for {displayName}
        </div>
      </main>
      {/* Doraemon — fixed-position, clipped viewport layer — zero layout impact */}
      <DoraemonPeeker />
    </>
  );
}
