"use client";

import { useMemo } from "react";

export function Particles({ count = 28 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        gold: Math.random() > 0.5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.gold
              ? "radial-gradient(circle, oklch(0.78 0.12 78 / 0.9), transparent 70%)"
              : "radial-gradient(circle, oklch(0.92 0.04 295 / 0.9), transparent 70%)",
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}
