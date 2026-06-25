"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 3 + Math.random() * 2.5,
        size: 4 + Math.random() * 6,
        rotate: Math.random() * 360,
        color: ["#c8a96a", "#e6e0f8", "#e8dfd8", "#d9bf85"][i % 4],
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: p.rotate + 540,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}
