"use client";

import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";

interface Props {
  onNext: () => void;
}

export function HeroScreen({ onNext }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 text-center sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="glass shadow-elegant relative w-full max-w-2xl space-y-8 overflow-hidden rounded-3xl p-8 sm:p-12"
      >
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-bold tracking-tight text-pink-600 drop-shadow-sm sm:text-6xl"
          >
            🎉 Happy Birthday! 🎂
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-xl font-medium text-[var(--gold-deep)] italic sm:text-2xl"
          >
            Today we celebrate the day a legend was born. 😎✨
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="rounded-2xl border border-white/40 bg-white/40 p-5 shadow-inner"
        >
          <p className="text-sm leading-relaxed font-medium text-purple-950 sm:text-xl">
            Warning: This experience contains excessive amounts of birthday
            wishes, emotional damage from future predictions, dangerous levels
            of cuteness, and a 100% guarantee that you will get bored. Proceed
            at your own risk. 😂{" "}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="pt-2"
        >
          <StoryButton onClick={onNext}>Start the Journey</StoryButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
