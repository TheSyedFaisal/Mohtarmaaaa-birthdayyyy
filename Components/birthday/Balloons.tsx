"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const balloonColors = [
  "rgba(244, 143, 177, 0.7)", // Soft Pink
  "rgba(206, 147, 216, 0.7)", // Soft Purple
  "rgba(255, 235, 156, 0.7)", // Soft Gold
  "rgba(255, 255, 255, 0.85)", // Elegant White
  "rgba(240, 98, 146, 0.65)", // Deeper Pink
  "rgba(186, 104, 200, 0.65)", // Deeper Purple
];

export function Balloons() {
  const balloonsList = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const size = 45 + Math.random() * 35; // Size between 45px and 80px
      return {
        id: i,
        left: 5 + Math.random() * 90, // Random horizontal start position
        delay: Math.random() * 6,
        duration: 9 + Math.random() * 7, // Float up speed
        color: balloonColors[i % balloonColors.length],
        size,
        swayRange: 20 + Math.random() * 30, // Sway amount
      };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {balloonsList.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{
            y: "-20vh",
            x: [0, b.swayRange, -b.swayRange, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            y: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: b.duration / 2,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              times: [0, 0.1, 0.9, 1],
            },
          }}
          className="absolute flex flex-col items-center"
          style={{
            left: `${b.left}%`,
            width: b.size,
          }}
        >
          {/* Balloon body */}
          <div
            className="relative rounded-full shadow-lg"
            style={{
              width: b.size,
              height: b.size * 1.2,
              backgroundColor: b.color,
              borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
            }}
          >
            {/* Highlight/shine effect */}
            <div className="absolute top-2 left-3 h-6 w-3 rotate-[30deg] rounded-full bg-white/35" />
          </div>
          {/* Balloon knot */}
          <div
            className="-mt-1 h-2 w-2 border-r-4 border-b-6 border-l-4 border-transparent"
            style={{ borderBottomColor: b.color }}
          />
          {/* Balloon string */}
          <div className="bg-muted-foreground/30 h-16 w-0.5 opacity-60" />
        </motion.div>
      ))}
    </div>
  );
}
