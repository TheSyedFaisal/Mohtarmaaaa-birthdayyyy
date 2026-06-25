"use client";

import { motion } from "framer-motion";

interface Props {
  lines: string[];
  className?: string;
  startDelay?: number;
}

export function Typewriter({ lines, className = "", startDelay = 0.2 }: Props) {
  return (
    <div className={`space-y-4 ${className}`}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            delay: startDelay + i * 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
