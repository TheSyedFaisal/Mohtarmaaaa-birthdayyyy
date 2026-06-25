"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "ghost";
}

export function StoryButton({ children, onClick, variant = "primary" }: Props) {
  const isPrimary = variant === "primary";
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`group inline-flex cursor-pointer items-center gap-3 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors md:text-base ${
        isPrimary
          ? "bg-foreground text-background shadow-elegant hover:bg-[var(--gold-deep)]"
          : "glass text-foreground hover:text-[var(--gold-deep)]"
      }`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}
