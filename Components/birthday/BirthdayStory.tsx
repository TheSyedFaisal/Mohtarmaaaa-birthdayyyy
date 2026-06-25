"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "./Typewriter";
import { Confetti } from "./Confetti";
import { MusicToggle } from "./MusicToggle";
import { ChevronLeft, ChevronRight, Heart as HeartIcon } from "lucide-react";

const img10 = "/assets/10.png";
const img20 = "/assets/20.png";
const img40 = "/assets/40.png";
const img50 = "/assets/50.png";

const stages = [
  {
    id: 1,
    image: img10,
    text: "Beta jie — ye aap hain jo 10 saal ki thin... aisi thi cutie si! Lekin gussa to dekho inka — tab bhi utna hi tha. Full badmaash! 😄",
    emoji: "🎂✨",
  },
  {
    id: 2,
    image: img20,
    text: "Aise kya dekh rahi hain? Ye bhi aap hi hain — 20 saal ki! Abhi bhi utni hi cutie... aur utna hi gussa! Lekin aur pyaari ho gayi hain 💕",
    emoji: "💕🎉",
  },
  {
    id: 3,
    image: img40,
    text: "Aise kya dekh rahi hain? Ye bhi aap hi hain — 40 saal ki Mohtarma! Gussa to dekho abhi bhi khatam nahi hua... lekin thodi si moti ho gayi hain 😂",
    emoji: "✨💕",
  },
  {
    id: 4,
    image: img50,
    text: "Han jie — Dadi Amma! 90 saal baad bhi aisi hi dikhein gi aap... bachpan se bhi zyada cutie! 🥰 Lekin dekho to — Mohtarma wala gussa kahan chala gaya? Wo to nahi dikh raha... Lekin aap phir bhi 90 saal mein bhi aisi hi dikhein gi jesi abhi hain 💖",
    emoji: "🥰🎀",
  },
  {
    id: 5,
    label: "Celebration",
    image: img50,
    text: "Janamdin Mubarak! Aapko bohat bohat mubarak ho — aap hamesha khush rahen! 🎉🎂✨",
    emoji: "🎉🥳",
  },
];

interface BirthdayStoryProps {
  showMusic?: boolean;
  showConfetti?: boolean;
}

export function BirthdayStory({
  showMusic = true,
  showConfetti = true,
}: BirthdayStoryProps) {
  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState<Array<{ id: number; left: number }>>([]);
  const timerRef = useRef<number | null>(null);

  // spawn hearts when the index changes
  useEffect(() => {
    const idBase = Date.now();
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: idBase + i,
      left: 10 + Math.random() * 80,
    }));
    setHearts(newHearts);
    const t = window.setTimeout(() => setHearts([]), 1200);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    // auto-advance every 6.5s unless on last stage
    if (index < stages.length - 1) {
      timerRef.current = window.setTimeout(() => {
        setIndex((i) => Math.min(i + 1, stages.length - 1));
      }, 6500);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index]);

  // simple swipe handling
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) =>
    (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    if (touchStartX.current == null) return;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) setIndex((i) => Math.min(i + 1, stages.length - 1));
      else setIndex((i) => Math.max(i - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-yellow-50">
      {showMusic ? <MusicToggle /> : null}
      {showConfetti ? <Confetti /> : null}

      <div className="relative z-10 w-full max-w-4xl p-4 sm:p-8">
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/40 shadow-2xl backdrop-blur-md">
          <div
            className="relative h-[60vh] w-full bg-gray-100 sm:h-[72vh]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={stages[index].id}
                initial={{ opacity: 0, scale: 1.03, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -12 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-transparent p-6 sm:p-12">
                  <div className="relative w-full">
                    <Image
                      src={stages[index].image}
                      alt={stages[index].label ?? "Birthday stage image"}
                      width={720}
                      height={420}
                      className="h-auto max-w-full rounded-md object-contain"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute right-6 bottom-6 left-6 text-white sm:right-12 sm:bottom-12 sm:left-12">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="-translate-y-0.5 transform text-2xl sm:text-3xl">
                        {stages[index].emoji}
                      </div>
                      <div>
                        <div className="text-sm tracking-widest text-white/90 uppercase opacity-90">
                          {stages[index].label}
                        </div>
                        <div className="mt-1 max-w-3xl rounded-lg bg-gradient-to-r from-black/20 to-transparent p-4">
                          <Typewriter
                            lines={[stages[index].text]}
                            startDelay={0.3}
                            className="font-serif text-base sm:text-xl"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Previous"
                        className="glass shadow-elegant rounded-full p-3"
                      >
                        <ChevronLeft className="h-5 w-5 text-white" />
                      </motion.button>
                      <motion.button
                        onClick={() =>
                          setIndex((i) => Math.min(i + 1, stages.length - 1))
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Next"
                        className="glass shadow-elegant rounded-full p-3"
                      >
                        <ChevronRight className="h-5 w-5 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* hearts animation */}
            {hearts.map((h) => (
              <motion.span
                key={h.id}
                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -140, scale: [0.6, 1, 0.8] }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute text-pink-400"
                style={{ left: `${h.left}%`, bottom: 80 }}
              >
                <HeartIcon className="h-6 w-6 text-pink-400 drop-shadow-md" />
              </motion.span>
            ))}

            {/* mobile hint removed (was: "Tap to advance") */}
          </div>

          <div className="flex items-center justify-center gap-3 p-4 sm:p-6">
            {stages.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to ${s.label}`}
                className={`h-3 w-3 rounded-full ${i === index ? "bg-[var(--gold-deep)]" : "bg-white/60"} object-contain shadow-sm`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BirthdayStory;
