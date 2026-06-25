"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
//  Types & timing constants (tweak these freely)
// ─────────────────────────────────────────────────────────────────────────────

type Side = "left" | "right" | "top" | "bottom";
type Expression =
  | "happy"
  | "wink"
  | "love"
  | "curious"
  | "surprised"
  | "shy"
  | "sleepy"
  | "excited";
type ArmPose = "default" | "wave" | "highfive";

const TIMING = {
  BREATH_DURATION: 2.6, // seconds — idle breathing cycle
  IDLE_ACTION_MIN: 4000, // ms — min gap between idle micro-actions
  IDLE_ACTION_MAX: 8000, // ms — max gap
  IDLE_ACTION_SHOW: 1200, // ms — expression flash duration

  PEEK_INITIAL_DELAY: 3000, // ms — first peek after mount
  PEEK_MIN: 8000, // ms — min interval between peeks
  PEEK_MAX: 20000, // ms — max interval

  HIGHFIVE_EVERY: 4, // trigger entrance scene every N peeks

  // Entrance scene timing (seconds)
  PEEK_IN_PAUSE: 0.35, // pause after entering upside-down
  FLIP_DURATION: 0.65, // flip right-way-up
  HIGHFIVE_HOLD: 0.8, // hold the high-five pose
  HIGHFIVE_PAUSE: 0.5, // extra pause after bounce
  FALL_DURATION: 0.7, // fall to bottom
} as const;

// Doraemon element size (px)
const W = 130;
const H = 200;
const PEEK_DEPTH = 90; // how many px are revealed for top/bottom peeks

const EXPRESSIONS: Expression[] = [
  "happy",
  "wink",
  "love",
  "curious",
  "surprised",
  "shy",
  "sleepy",
  "excited",
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));
const pick = <T,>(arr: T[]): T => arr[randInt(0, arr.length - 1)];

// ─────────────────────────────────────────────────────────────────────────────
//  Eye renderer
// ─────────────────────────────────────────────────────────────────────────────
function Eyes({ expression }: { expression: Expression }) {
  const EyeBall = ({
    cx,
    cy,
    wink,
    heart,
    star,
    sleepy,
    wide,
  }: {
    cx: number;
    cy: number;
    wink?: boolean;
    heart?: boolean;
    star?: boolean;
    sleepy?: boolean;
    wide?: boolean;
  }) => {
    if (heart)
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <path
            d="M0 -5 C-1 -8, -6 -8, -6 -4 C-6 0, 0 5, 0 5 C0 5, 6 0, 6 -4 C6 -8, 1 -8, 0 -5 Z"
            fill="#E53935"
            stroke="#C62828"
            strokeWidth="0.5"
          />
        </g>
      );
    if (star)
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <path
            d="M0 -6 L1.5 -2 L5.7 -2 L2.4 0.8 L3.5 5 L0 2.5 L-3.5 5 L-2.4 0.8 L-5.7 -2 L-1.5 -2 Z"
            fill="#FFEB3B"
            stroke="#F57F17"
            strokeWidth="0.5"
          />
        </g>
      );
    if (wink)
      return (
        <path
          d={`M${cx - 7} ${cy} Q${cx} ${cy - 8} ${cx + 7} ${cy}`}
          fill="none"
          stroke="#0D47A1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    if (sleepy)
      return (
        <>
          <ellipse
            cx={cx}
            cy={cy + 2}
            rx="7"
            ry="5"
            fill="#fff"
            stroke="#0D47A1"
            strokeWidth="2"
          />
          <circle cx={cx} cy={cy + 4} r="2.5" fill="#000" />
          <path
            d={`M${cx - 7} ${cy + 2} Q${cx} ${cy - 4} ${cx + 7} ${cy + 2}`}
            fill="#29B6F6"
            stroke="#0D47A1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      );
    if (wide)
      return (
        <>
          <ellipse
            cx={cx}
            cy={cy}
            rx="9"
            ry="12"
            fill="#fff"
            stroke="#0D47A1"
            strokeWidth="2"
          />
          <circle cx={cx} cy={cy} r="3.5" fill="#000" />
          <circle cx={cx - 1} cy={cy - 2} r="1.2" fill="#fff" />
        </>
      );
    return (
      <>
        <ellipse
          cx={cx}
          cy={cy}
          rx="7"
          ry="10"
          fill="#fff"
          stroke="#0D47A1"
          strokeWidth="2"
        />
        <circle cx={cx} cy={cy} r="2.8" fill="#000" />
        <circle cx={cx - 1} cy={cy - 2} r="1" fill="#fff" />
      </>
    );
  };

  switch (expression) {
    case "happy":
      return (
        <>
          <path
            d="M37 28 Q44 20 51 28"
            fill="none"
            stroke="#0D47A1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M51 28 Q58 20 65 28"
            fill="none"
            stroke="#0D47A1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      );
    case "wink":
      return (
        <>
          <path
            d="M37 28 Q44 20 51 28"
            fill="none"
            stroke="#0D47A1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <EyeBall cx={58} cy={28} />
        </>
      );
    case "love":
      return (
        <>
          <EyeBall cx={43} cy={28} heart />
          <EyeBall cx={57} cy={28} heart />
        </>
      );
    case "curious":
      return (
        <>
          <EyeBall cx={43} cy={28} />
          <EyeBall cx={57} cy={28} />
        </>
      );
    case "surprised":
      return (
        <>
          <EyeBall cx={43} cy={28} wide />
          <EyeBall cx={57} cy={28} wide />
        </>
      );
    case "shy":
      return (
        <>
          <EyeBall cx={43} cy={28} />
          <EyeBall cx={57} cy={28} />
          <ellipse cx={36} cy={36} rx="5" ry="3" fill="#FF8A80" opacity="0.6" />
          <ellipse cx={64} cy={36} rx="5" ry="3" fill="#FF8A80" opacity="0.6" />
        </>
      );
    case "sleepy":
      return (
        <>
          <EyeBall cx={43} cy={28} sleepy />
          <EyeBall cx={57} cy={28} sleepy />
        </>
      );
    case "excited":
      return (
        <>
          <EyeBall cx={43} cy={28} star />
          <EyeBall cx={57} cy={28} star />
        </>
      );
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Mouth renderer
// ─────────────────────────────────────────────────────────────────────────────
function Mouth({ expression }: { expression: Expression }) {
  if (expression === "surprised")
    return (
      <ellipse
        cx="50"
        cy="62"
        rx="8"
        ry="9"
        fill="#E53935"
        stroke="#0D47A1"
        strokeWidth="2"
      />
    );
  if (expression === "sleepy")
    return (
      <path
        d="M40 60 Q50 56 60 60"
        fill="none"
        stroke="#0D47A1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    );
  if (
    expression === "happy" ||
    expression === "excited" ||
    expression === "love"
  )
    return (
      <>
        <path
          d="M34 56 Q50 76 66 56 Z"
          fill="#E53935"
          stroke="#0D47A1"
          strokeWidth="2"
        />
        <path d="M42 64 Q50 56 58 64 Q50 72 42 64 Z" fill="#FF8A80" />
      </>
    );
  return (
    <path
      d="M36 56 Q50 72 64 56"
      fill="none"
      stroke="#0D47A1"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Arms renderer
// ─────────────────────────────────────────────────────────────────────────────
function Arms({ pose }: { pose: ArmPose }) {
  if (pose === "wave")
    return (
      <>
        <path
          d="M24 100 Q4 108 2 118"
          stroke="#29B6F6"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="2"
          cy="120"
          r="9"
          fill="#fff"
          stroke="#0D47A1"
          strokeWidth="2"
        />
        <path
          d="M76 96 Q96 78 102 62"
          stroke="#29B6F6"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="103"
          cy="60"
          r="9"
          fill="#fff"
          stroke="#0D47A1"
          strokeWidth="2"
        />
      </>
    );
  if (pose === "highfive")
    return (
      <>
        <path
          d="M26 96 Q6 72 2 56"
          stroke="#29B6F6"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="2"
          cy="54"
          r="9"
          fill="#fff"
          stroke="#0D47A1"
          strokeWidth="2"
        />
        <path
          d="M74 96 Q94 72 98 56"
          stroke="#29B6F6"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="98"
          cy="54"
          r="9"
          fill="#fff"
          stroke="#0D47A1"
          strokeWidth="2"
        />
      </>
    );
  return (
    <>
      <path
        d="M24 100 Q4 108 2 118"
        stroke="#29B6F6"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="2"
        cy="120"
        r="9"
        fill="#fff"
        stroke="#0D47A1"
        strokeWidth="2"
      />
      <path
        d="M76 100 Q96 108 98 118"
        stroke="#29B6F6"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="98"
        cy="120"
        r="9"
        fill="#fff"
        stroke="#0D47A1"
        strokeWidth="2"
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  DoraemonSVG — full body 100×160 viewBox
//  `svgRotate` rotates the whole SVG (used for upside-down top-peek)
//  `flip`      mirrors horizontally (used for right-side peeks)
// ─────────────────────────────────────────────────────────────────────────────
function DoraemonSVG({
  expression,
  flip = false,
  svgRotate = 0,
  armPose = "default",
}: {
  expression: Expression;
  flip?: boolean;
  svgRotate?: number;
  armPose?: ArmPose;
}) {
  return (
    <svg
      viewBox="0 0 100 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        transform: `scaleX(${flip ? -1 : 1}) rotate(${svgRotate}deg)`,
        filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
        overflow: "visible",
      }}
    >
      <ellipse
        cx="36"
        cy="148"
        rx="14"
        ry="8"
        fill="#fff"
        stroke="#0D47A1"
        strokeWidth="2"
      />
      <ellipse
        cx="64"
        cy="148"
        rx="14"
        ry="8"
        fill="#fff"
        stroke="#0D47A1"
        strokeWidth="2"
      />
      <rect
        x="24"
        y="92"
        width="52"
        height="56"
        rx="18"
        fill="#29B6F6"
        stroke="#0D47A1"
        strokeWidth="2.5"
      />
      <circle
        cx="50"
        cy="110"
        r="21"
        fill="#fff"
        stroke="#0D47A1"
        strokeWidth="1.5"
      />
      <path
        d="M34 110 A16 16 0 0 0 66 110 Z"
        fill="#fff"
        stroke="#0D47A1"
        strokeWidth="1.5"
      />
      <path
        d="M26 91 Q50 102 74 91"
        fill="none"
        stroke="#E53935"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="97"
        r="5.5"
        fill="#FFEB3B"
        stroke="#F57F17"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="95.5" r="1.5" fill="#5D4037" />
      <line x1="50" y1="97" x2="50" y2="102" stroke="#5D4037" strokeWidth="1" />
      <Arms pose={armPose} />
      <circle
        cx="50"
        cy="46"
        r="38"
        fill="#29B6F6"
        stroke="#0D47A1"
        strokeWidth="2.5"
      />
      <ellipse
        cx="50"
        cy="52"
        rx="28"
        ry="24"
        fill="#fff"
        stroke="#0D47A1"
        strokeWidth="1.5"
      />
      <circle
        cx="50"
        cy="41"
        r="5.5"
        fill="#E53935"
        stroke="#0D47A1"
        strokeWidth="1.5"
      />
      <circle cx="48.5" cy="39.5" r="1.8" fill="#fff" opacity="0.7" />
      <line
        x1="50"
        y1="46.5"
        x2="50"
        y2="60"
        stroke="#0D47A1"
        strokeWidth="2"
      />
      <line
        x1="40"
        y1="47"
        x2="20"
        y2="43"
        stroke="#0D47A1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="38"
        y1="52"
        x2="18"
        y2="52"
        stroke="#0D47A1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="57"
        x2="20"
        y2="61"
        stroke="#0D47A1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="47"
        x2="80"
        y2="43"
        stroke="#0D47A1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="62"
        y1="52"
        x2="82"
        y2="52"
        stroke="#0D47A1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="57"
        x2="80"
        y2="61"
        stroke="#0D47A1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Eyes expression={expression} />
      <Mouth expression={expression} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  useIdleAnimation — micro-actions while peeking
// ─────────────────────────────────────────────────────────────────────────────
function useIdleAnimation(enabled: boolean) {
  const [expression, setExpression] = useState<Expression>("happy");
  const [armPose, setArmPose] = useState<ArmPose>("default");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const scheduleAction = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => {
        if (!mountedRef.current || !enabled) return;
        const action = pick(["expr", "expr", "wave", "blink"] as const);
        if (action === "wave") {
          setArmPose("wave");
          setTimeout(() => {
            if (mountedRef.current) setArmPose("default");
          }, TIMING.IDLE_ACTION_SHOW + 600);
        } else {
          setExpression(pick(EXPRESSIONS));
          setTimeout(() => {
            if (mountedRef.current) setExpression("happy");
          }, TIMING.IDLE_ACTION_SHOW);
        }
        scheduleAction();
      },
      randInt(TIMING.IDLE_ACTION_MIN, TIMING.IDLE_ACTION_MAX),
    );
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setExpression("happy");
      setArmPose("default");
      return;
    }
    scheduleAction();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, scheduleAction]);

  return { expression, armPose };
}

// ─────────────────────────────────────────────────────────────────────────────
//  Main component
// ─────────────────────────────────────────────────────────────────────────────
export function DoraemonPeeker() {
  // ── Peek element (sides) ──
  const peekControls = useAnimation();
  const lockRef = useRef(false);
  const peekCount = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const [peekCfg, setPeekCfg] = useState<{
    side: Side;
    expression: Expression;
    edgePercent: number;
  }>({ side: "left", expression: "happy", edgePercent: 50 });

  const [idleEnabled, setIdleEnabled] = useState(false);
  const { expression: idleExpr, armPose: idleArm } =
    useIdleAnimation(idleEnabled);
  const [peekArmOverride, setPeekArmOverride] = useState<ArmPose>("default");

  // ── Entrance / high-five element (separate DOM node so its rotate is independent) ──
  const entranceControls = useAnimation();
  const [showEntrance, setShowEntrance] = useState(false);
  const [entranceExpr, setEntranceExpr] = useState<Expression>("surprised");
  const [entranceArm, setEntranceArm] = useState<ArmPose>("default");

  // ─────────────────────────────────────────────────────────────────────────
  //  Part 2 — High-five entrance scene (uses separate element)
  //  Called automatically every HIGHFIVE_EVERY peeks
  // ─────────────────────────────────────────────────────────────────────────
  const runHighFiveScene = useCallback(async () => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 600;

    // Reset entrance element state
    setEntranceExpr("surprised");
    setEntranceArm("default");
    setShowEntrance(true);

    // ── 1. Place upside-down above screen center ──
    await entranceControls.set({
      x: "-50%",
      y: -(H + 30),
      rotate: 180, // upside-down — face toward viewer
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    });

    // ── 2. Drop down into view (upside-down, face showing) ──
    await entranceControls.start({
      y: -10,
      transition: { type: "spring", stiffness: 180, damping: 18, mass: 1 },
    });

    // Brief pause — let user see the upside-down face
    await new Promise((r) => setTimeout(r, TIMING.PEEK_IN_PAUSE * 1000));

    // ── 3. Flip right-way-up ──
    setEntranceExpr("happy");
    await entranceControls.start({
      rotate: 0,
      transition: {
        duration: TIMING.FLIP_DURATION,
        ease: [0.34, 1.56, 0.64, 1], // bouncy back ease
      },
    });

    // ── 4. High-five pose + excited expression + happy bounce ──
    setEntranceExpr("excited");
    setEntranceArm("highfive");
    await entranceControls.start({
      y: [-10, -38, -10],
      scaleX: [1, 1.06, 1],
      scaleY: [1, 0.93, 1],
      transition: { duration: TIMING.HIGHFIVE_HOLD, ease: "easeInOut" },
    });
    await new Promise((r) => setTimeout(r, TIMING.HIGHFIVE_PAUSE * 1000));

    // ── 5. Fall to bottom with squash-and-stretch + wave hand ──
    setEntranceExpr("surprised");
    setEntranceArm("wave");
    await entranceControls.start({
      y: vh + H + 60,
      scaleX: [1, 0.82, 1.04, 1],
      scaleY: [1, 1.22, 0.88, 1],
      rotate: 12, // slight tilt while falling
      transition: {
        duration: TIMING.FALL_DURATION,
        ease: [0.55, 0, 1, 0.45], // fast accelerating fall
      },
    });

    // ── Cleanup ──
    setShowEntrance(false);
  }, [entranceControls]);

  // ─────────────────────────────────────────────────────────────────────────
  //  Part 1 — Normal peek from any edge
  // ─────────────────────────────────────────────────────────────────────────
  const runPeek = useCallback(async () => {
    if (lockRef.current || !mountedRef.current) return;
    lockRef.current = true;
    peekCount.current += 1;

    const side = pick<Side>(["left", "right", "top", "bottom"]);
    const expression = pick(EXPRESSIONS);
    const edgePercent = rand(10, 80);

    setPeekCfg({ side, expression, edgePercent });
    setPeekArmOverride("default");
    setIdleEnabled(false);

    // ── Decide if this peek triggers the high-five scene ──
    const isHighFive = peekCount.current % TIMING.HIGHFIVE_EVERY === 0;

    // ── Peek style determines how far Doraemon slides in ──
    type PeekStyle = "sneaky" | "normal" | "full";
    const peekStyle: PeekStyle =
      side === "left" || side === "right"
        ? pick(["sneaky", "sneaky", "normal", "full"] as PeekStyle[])
        : "normal";

    const peekDepth = peekStyle === "full" ? W + 15 : W;

    // Coordinates
    const peekedX =
      side === "left" ? -(W - peekDepth) : side === "right" ? W - peekDepth : 0;
    const peekedY =
      side === "top"
        ? -(H - PEEK_DEPTH)
        : side === "bottom"
          ? H - PEEK_DEPTH
          : 0;
    const exitX =
      side === "left" ? -(W * 2 + 20) : side === "right" ? W * 2 + 20 : 0;
    const exitY =
      side === "top" ? -(H * 2 + 20) : side === "bottom" ? H * 2 + 20 : 0;

    // 3-D tilt on entry
    const tiltIn =
      side === "left"
        ? { rotateY: 35, rotateZ: 0, rotateX: 0 }
        : side === "right"
          ? { rotateY: -35, rotateZ: 0, rotateX: 0 }
          : side === "top"
            ? { rotateX: -40, rotateZ: 0, rotateY: 0 }
            : { rotateX: 40, rotateZ: 0, rotateY: 0 };

    // ── 1. Teleport off-screen ──
    await peekControls.set({
      x: side === "left" || side === "right" ? exitX : 0,
      y: side === "top" || side === "bottom" ? exitY : 0,
      ...tiltIn,
      opacity: 1,
    });

    // ── 2. Spring in ──
    await peekControls.start({
      x: peekedX,
      y: peekedY,
      rotateY: side === "left" ? 8 : side === "right" ? -8 : 0,
      rotateX: side === "top" ? -8 : side === "bottom" ? 8 : 0,
      rotateZ: 0,
      transition: { type: "spring", stiffness: 200, damping: 16, mass: 0.9 },
    });

    // ── If HIGH-FIVE: trigger entrance scene on top of this peek, then exit ──
    if (isHighFive) {
      // Run the separate entrance element's scene (doesn't block peek element)
      runHighFiveScene(); // fire and forget — it runs in parallel visually

      // Peek element just stays briefly then retreats
      await new Promise((r) => setTimeout(r, 400));
      await peekControls.start({
        x: exitX,
        y: exitY,
        ...tiltIn,
        transition: { type: "spring", stiffness: 280, damping: 24, mass: 0.7 },
      });
      lockRef.current = false;
      return;
    }

    // ── 3. Idle while peeking (breathing + expression changes) ──
    setIdleEnabled(true);
    const idleDuration =
      peekStyle === "sneaky"
        ? rand(1200, 2200)
        : peekStyle === "full"
          ? rand(4000, 6000)
          : rand(2500, 4000);

    const yFrames = (
      side === "top"
        ? [0, 8, -4, 0]
        : side === "bottom"
          ? [0, -8, 4, 0]
          : [0, -5, 3, 0]
    ).map((v) => peekedY + v);

    await peekControls.start({
      rotateZ:
        side === "left"
          ? [0, 6, -4, 2, 0]
          : side === "right"
            ? [0, -6, 4, -2, 0]
            : [0, 3, -3, 1.5, 0],
      y: yFrames,
      transition: { duration: idleDuration / 1000, ease: "easeInOut" },
    });
    setIdleEnabled(false);

    // ── 4. Wave goodbye before retracting ──
    setPeekArmOverride("wave");
    await peekControls.start({
      y: peekedY - 8,
      transition: { duration: 0.25, ease: "easeOut" },
    });
    await new Promise((r) => setTimeout(r, 380));
    setPeekArmOverride("default");

    // ── 5. Retract ──
    await peekControls.start({
      x: exitX,
      y: exitY,
      ...tiltIn,
      transition: { type: "spring", stiffness: 280, damping: 24, mass: 0.7 },
    });

    lockRef.current = false;
  }, [peekControls, runHighFiveScene]);

  // ─────────────────────────────────────────────────────────────────────────
  //  Schedule recurring peeks
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const timerRef: { current: ReturnType<typeof setTimeout> | null } = {
      current: null,
    };
    const scheduleNext = (): ReturnType<typeof setTimeout> => {
      const delay = randInt(TIMING.PEEK_MIN, TIMING.PEEK_MAX);
      timerRef.current = setTimeout(() => {
        runPeek();
        timerRef.current = scheduleNext();
      }, delay);
      return timerRef.current;
    };

    const initial = setTimeout(() => runPeek(), TIMING.PEEK_INITIAL_DELAY);
    const kickoff = setTimeout(() => {
      timerRef.current = scheduleNext();
    }, 10000);

    return () => {
      clearTimeout(initial);
      clearTimeout(kickoff);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  //  CSS edge position for the peek element
  // ─────────────────────────────────────────────────────────────────────────
  const getPeekStyle = (): React.CSSProperties => {
    const { side, edgePercent } = peekCfg;
    const vw = typeof window !== "undefined" ? window.innerWidth : 800;
    const vh = typeof window !== "undefined" ? window.innerHeight : 600;
    switch (side) {
      case "left":
        return {
          left: 0,
          top: (vh * edgePercent) / 100 - H / 2,
          right: "auto",
          bottom: "auto",
        };
      case "right":
        return {
          right: 0,
          left: "auto",
          top: (vh * edgePercent) / 100 - H / 2,
          bottom: "auto",
        };
      case "top":
        return {
          top: 0,
          left: (vw * edgePercent) / 100 - W / 2,
          right: "auto",
          bottom: "auto",
        };
      case "bottom":
        return {
          bottom: 0,
          top: "auto",
          left: (vw * edgePercent) / 100 - W / 2,
          right: "auto",
        };
    }
  };

  // For top peek: SVG rotate 180° so the face faces the viewer (upside-down body)
  const svgFlip = peekCfg.side === "right";
  const svgRotate = peekCfg.side === "top" ? 180 : 0;

  // Active expression & arm during idle
  const peekExpr = idleEnabled ? idleExpr : peekCfg.expression;
  const peekArm =
    peekArmOverride !== "default"
      ? peekArmOverride
      : idleEnabled
        ? idleArm
        : "default";

  return (
    // ── Fixed viewport-covering layer — clips overflow ──
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 9999,
        perspective: "600px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* ── PEEK element (edges, idle, wave-goodbye) ── */}
      <motion.div
        animate={peekControls}
        initial={{ x: -(W * 2), y: 0, opacity: 1 }}
        style={{ position: "absolute", width: W, height: H, ...getPeekStyle() }}
      >
        {/* Breathing wrapper — subtle scale/y pulse while visible */}
        <motion.div
          animate={
            idleEnabled
              ? { scaleY: [1, 1.03, 1], scaleX: [1, 0.98, 1], y: [0, -3, 0] }
              : { scaleY: 1, scaleX: 1, y: 0 }
          }
          transition={{
            duration: TIMING.BREATH_DURATION,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: "bottom center",
          }}
        >
          <DoraemonSVG
            expression={peekExpr}
            flip={svgFlip}
            svgRotate={svgRotate}
            armPose={peekArm}
          />
        </motion.div>
      </motion.div>

      {/* ── ENTRANCE element (high-five scene — completely separate node) ── */}
      <AnimatePresence>
        {showEntrance && (
          <motion.div
            key="hf-entrance"
            animate={entranceControls}
            initial={{ x: "-50%", y: -(H + 30), rotate: 180, opacity: 1 }}
            style={{
              position: "fixed",
              left: "50%",
              top: 0,
              width: W,
              height: H,
              transformOrigin: "center top",
            }}
          >
            <DoraemonSVG
              expression={entranceExpr}
              flip={false}
              svgRotate={0}
              armPose={entranceArm}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
