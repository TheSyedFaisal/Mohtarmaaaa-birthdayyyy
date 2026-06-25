"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export function Sparkles() {
  const sparklesList = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      size: 15 + Math.random() * 15,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {sparklesList.map((s) => (
        <motion.svg
          key={s.id}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute text-[var(--gold)] opacity-70"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M12 3V9M12 15V21M3 12H9M15 12H21M5.636 5.636L9.878 9.878M14.122 14.122L18.364 18.364M18.364 5.636L14.122 9.878M9.878 14.122L5.636 18.364"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}
