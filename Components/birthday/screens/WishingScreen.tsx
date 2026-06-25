"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cake,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { StoryButton } from "../StoryButton";

interface Props {
  onRestart: () => void;
}

const wishes = [
  "Allah aapko hamesha khush, healthy aur peaceful rakhe.",
  "Aapki har dua qabool ho aur har mushkil asaan ho jaye.",
  "Aapki zindagi mein itni khushiyan ayen ke sadness ko appointment bhi na mile.",
  "Aap hamesha isi tarah cute, caring aur thori si dangerous bhi rahen.",
  "Aapke Dreams poore hon, plans successful hon, aur mood swings thore manageable hon.",
  "Aapki smile kabhi kam na ho, aur jis din kam ho us din internet achawwww chaleyyy🙃.",
  "Allah aapko izzat, barkat, mohabbat aur boht sara sukoon de.",
  "Aapke liye har din birthday jaisa special ho, bas cake calories count na hon.",
  "Aapki life mein ache log, achi memories aur achi selfies bhar bhar ke ayen.",
  "Aapki aankhon ki chamak aur dil ki softness hamesha same rahe.",
  "Aapka ghussa premium quality ka hai, lekin dua hai ke warranty mein kam use ho.",
  "Inshallah, aap bohat jaldi apni manzil tak pahunchen — woh manzil jo aap deserve karti hain, woh jo aapne khwabon mein dekhi hai. ✨🤲",
];

// ── Confetti particle config ──────────────────────────────────────────────────
const CONFETTI_COUNT = 80;
const CONFETTI_COLORS = [
  "#f472b6",
  "#a855f7",
  "#fb923c",
  "#facc15",
  "#34d399",
  "#60a5fa",
  "#f87171",
  "#c084fc",
  "#e879f9",
  "#38bdf8",
  "#fb7185",
  "#a3e635",
];

interface ConfettiPiece {
  id: number;
  x: number; // start % from left
  startY: number; // start % from top (negative = above screen)
  color: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  drift: number; // horizontal drift during fall
  shape: "rect" | "circle" | "star" | "diamond";
}

function useConfetti() {
  return useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
        id: i,
        x: Math.random() * 98,
        startY: -(5 + Math.random() * 30), // start above viewport
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 7 + Math.random() * 11,
        duration: 2.2 + Math.random() * 2.6, // longer so they reach the bottom
        delay: Math.random() * 1.6, // staggered waves
        rotate: Math.random() * 1080 - 540,
        drift: (Math.random() - 0.5) * 80, // slight left/right drift
        shape: (["rect", "circle", "star", "diamond"] as const)[i % 4],
      })),
    [],
  );
}

// ── Floating stars (background) ───────────────────────────────────────────────
function useFloatingStars() {
  return useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: 6 + Math.random() * 88,
        top: 8 + Math.random() * 82,
        delay: Math.random() * 2.8,
        duration: 2.2 + Math.random() * 2.2,
      })),
    [],
  );
}

// ── Party Popper burst animation (top corners) ────────────────────────────────
function PartyPopperBurst({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <motion.div
      className="pointer-events-none absolute top-0 z-30"
      style={{ [isLeft ? "left" : "right"]: "2%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {/* Popper icon */}
      <motion.div
        initial={{ scale: 0, rotate: isLeft ? -30 : 30, opacity: 0 }}
        animate={{
          scale: [0, 1.4, 1],
          rotate: isLeft ? [-30, 20, 10] : [30, -20, -10],
          opacity: [0, 1, 1],
        }}
        transition={{ duration: 0.6, delay: 0.15, ease: "backOut" }}
        className="text-4xl"
        style={{ transformOrigin: "bottom center" }}
      >
        🎉
      </motion.div>
    </motion.div>
  );
}

// ── Confetti Rain ─────────────────────────────────────────────────────────────
function ConfettiRain() {
  const pieces = useConfetti();
  return (
    // fixed so it covers the FULL viewport, not just the card
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 9999 }}
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.startY}vh`,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: [`${p.x}vw`, `${p.x + p.drift * 0.5}vw`, `${p.x + p.drift}vw`],
            y: "110vh", // fall all the way past the bottom edge
            opacity: 1, // stay fully visible — container clips at bottom
            rotate: p.rotate,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.2, 0.0, 0.8, 1.0], // fast start, slow settle
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: p.size,
            height:
              p.shape === "rect"
                ? p.size * 1.8
                : p.shape === "diamond"
                  ? p.size
                  : p.size,
            backgroundColor:
              p.shape === "star" || p.shape === "diamond"
                ? "transparent"
                : p.color,
            borderRadius:
              p.shape === "circle" ? "50%" : p.shape === "rect" ? "2px" : 0,
            transform: p.shape === "diamond" ? "rotate(45deg)" : undefined,
            fontSize:
              p.shape === "star" || p.shape === "diamond"
                ? p.size + 6
                : undefined,
            color:
              p.shape === "star" || p.shape === "diamond" ? p.color : undefined,
          }}
        >
          {p.shape === "star" && "★"}
          {p.shape === "diamond" && "◆"}
        </motion.div>
      ))}
    </div>
  );
}

// ── Floating Hearts ─────────────────────────────────────────────────────────
function useFloatingHearts() {
  return useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 3,
        size: 16 + Math.random() * 16,
      })),
    [],
  );
}

// ── Badge styles per wish ─────────────────────────────────────────────────────
const badgeStyles = [
  {
    wrap: "bg-pink-100/80 text-pink-700 border-pink-200/70",
    dot: "bg-pink-500",
    Icon: Heart,
  },
  {
    wrap: "bg-amber-100/80 text-amber-700 border-amber-200/70",
    dot: "bg-amber-500",
    Icon: Gift,
  },
  {
    wrap: "bg-purple-100/80 text-purple-700 border-purple-200/70",
    dot: "bg-purple-500",
    Icon: Sparkles,
  },
];

// ── Main Component ────────────────────────────────────────────────────────────
export function WishingScreen({ onRestart }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showConfetti, setShowConfetti] = useState(true);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFinal = current >= wishes.length;
  const floatingStars = useFloatingStars();
  const floatingHearts = useFloatingHearts();
  const activeBadge = badgeStyles[current % badgeStyles.length];

  // Stop confetti after ~3 seconds
  useEffect(() => {
    confettiTimer.current = setTimeout(() => setShowConfetti(false), 3000);
    return () => {
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
    };
  }, []);

  const moveTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(wishes.length, nextIndex));
      if (clamped === current) return;
      setDirection(clamped > current ? 1 : -1);
      setCurrent(clamped);
    },
    [current],
  );

  const goPrevious = useCallback(() => moveTo(current - 1), [current, moveTo]);
  const goNext = useCallback(() => moveTo(current + 1), [current, moveTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [goNext, goPrevious]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* ── Confetti burst on entry ── */}
      <AnimatePresence>{showConfetti && <ConfettiRain />}</AnimatePresence>

      {/* ── Party Popper icons (top corners) ── */}
      <AnimatePresence>
        {showConfetti && (
          <>
            <PartyPopperBurst side="left" />
            <PartyPopperBurst side="right" />
          </>
        )}
      </AnimatePresence>

      {/* ── Floating Hearts (bottom → top, infinite) ── */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {floatingHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute text-pink-500/60"
            style={{ left: `${h.left}%`, width: h.size, height: h.size }}
          >
            <Heart fill="currentColor" className="h-full w-full" />
          </motion.div>
        ))}
      </div>

      {/* ── Floating background stars ── */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {floatingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute text-yellow-500/60"
            style={{ left: `${star.left}%`, top: `${star.top}%` }}
            animate={{
              opacity: [0.25, 1, 0.25],
              scale: [0.75, 1.2, 0.75],
              rotate: [0, 18, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.div>
        ))}
      </div>

      {/* ── Main Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass relative z-20 flex max-h-[92vh] w-full max-w-3xl flex-col gap-6 overflow-y-auto rounded-3xl border-white/70 p-5 sm:p-8"
      >
        {/* Header */}
        <div className="space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-pink-200/70 bg-pink-100/70 text-pink-700"
          >
            <Cake className="h-7 w-7" />
          </motion.div>

          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-display text-3xl font-bold text-pink-700 sm:text-4xl"
            >
              Happy Birthday, Mohtarma!
            </motion.h2>
          </div>
        </div>

        {/* ── Wishes Area ── */}
        <div className="space-y-5">
          {current === 0 && !showFinal && (
            <div className="rounded-2xl border border-pink-200/80 bg-pink-50/80 p-4 text-sm leading-relaxed font-medium text-purple-950">
              <p>
                Dua hai ke aapka naya saal beautiful memories, easy days, loyal
                people, aur boht si khushiyon se fill ho.
              </p>
              <p className="mt-3 text-pink-700">
                Aur haan, birthday queen ko tang karna allowed hai, lekin limit
                mein. Warna look mil jaye gi: 🤨🤨🤨
              </p>
            </div>
          )}
          {!showFinal ? (
            <>
              <div className="grid grid-cols-[40px_minmax(0,1fr)_40px] items-center gap-2 sm:grid-cols-[48px_minmax(0,1fr)_48px] sm:gap-4">
                <button
                  type="button"
                  onClick={goPrevious}
                  disabled={current === 0}
                  aria-label="Previous wish"
                  className="z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/55 text-purple-900/80 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-35 sm:h-12 sm:w-12"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current}
                    initial={{
                      opacity: 0,
                      x: direction > 0 ? 50 : -50,
                      scale: 0.95,
                    }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: direction > 0 ? -50 : 50,
                      scale: 0.95,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-pink-300/80 bg-gradient-to-br from-pink-50/90 via-white/80 to-purple-50/90 px-6 py-10 text-center shadow-lg sm:min-h-[320px] sm:px-12 sm:py-14"
                  >
                    {/* Decorative glow ring */}
                    <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-pink-300/20 via-purple-300/10 to-amber-200/20 blur-xl" />

                    {/* Badge Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.15,
                        duration: 0.5,
                        ease: "backOut",
                      }}
                      className={`relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white ${activeBadge.wrap.split(" ")[1] || "border-pink-300 text-pink-600"}`}
                    >
                      <activeBadge.Icon
                        className="h-8 w-8"
                        fill={current % 3 === 0 ? "currentColor" : "none"}
                      />

                      {/* Sparkle dots around badge */}
                      {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <motion.span
                          key={deg}
                          className="absolute h-2 w-2 rounded-full bg-pink-400"
                          style={{
                            top: "50%",
                            left: "50%",
                            transformOrigin: "0 0",
                            transform: `rotate(${deg}deg) translateX(30px) translateY(-50%)`,
                          }}
                          animate={{
                            scale: [0.5, 1.3, 0.5],
                            opacity: [0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            delay: deg / 600,
                          }}
                        />
                      ))}
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="relative mx-auto max-w-xl text-2xl leading-relaxed font-bold text-pink-800 sm:text-3xl"
                    >
                      {wishes[current]}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="relative mt-6 text-xs font-bold tracking-[0.25em] text-pink-500/70 uppercase"
                    >
                      ✨ Wish {current + 1} of {wishes.length} ✨
                    </motion.p>

                    {/* Next button directly inside the card for a quick step through */}
                    {current < wishes.length - 1 && (
                      <motion.button
                        type="button"
                        onClick={goNext}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="relative mx-auto mt-8 flex items-center gap-2 rounded-full border border-pink-300/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-pink-700 transition hover:bg-pink-50 hover:shadow-md"
                      >
                        Next Wish <ChevronRight className="h-4 w-4" />
                      </motion.button>
                    )}

                    {current === wishes.length - 1 && (
                      <motion.button
                        type="button"
                        onClick={goNext}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="relative mx-auto mt-8 flex animate-pulse items-center gap-2 rounded-full border border-purple-300/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 hover:shadow-md"
                      >
                        See Final Message <ChevronRight className="h-4 w-4" />
                      </motion.button>
                    )}
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next wish"
                  className="z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/55 text-purple-900/80 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-35 sm:h-12 sm:w-12"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Progress dots */}
              <div
                className="flex items-center justify-center gap-2"
                aria-label="Wish progress"
              >
                {wishes.map((wish, index) => (
                  <button
                    key={wish}
                    type="button"
                    onClick={() => moveTo(index)}
                    aria-label={`Go to wish ${index + 1}`}
                    aria-current={index === current ? "step" : undefined}
                    className={`h-2.5 rounded-full transition-all duration-200 ${
                      index === current
                        ? `w-8 ${badgeStyles[index % badgeStyles.length].dot}`
                        : "w-2.5 bg-white/70 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            /* ── Final screen ── */
            <div className="mx-auto max-w-2xl rounded-2xl border border-pink-300/70 bg-pink-50/80 p-6 text-center sm:p-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-pink-200 bg-white/60 text-pink-700">
                <PartyPopper className="h-6 w-6" />
              </div>
              <p className="text-base leading-relaxed font-bold text-pink-800 sm:text-lg">
                Aap rare edition hain. Cute bhi, caring bhi, aur thori si dramaa
                queeeen bhi 🤐😊😂
              </p>

              <p className="mt-6 text-base leading-relaxed font-bold text-purple-800 sm:text-2xl">
                🎂❤️🎉 Happy Birthdayyy Babaaa Ki ladlii betiiiiiii 🎂❤️🎉
              </p>
              <div className="mt-6">
                <StoryButton onClick={onRestart} variant="ghost">
                  Replay Journey
                </StoryButton>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
