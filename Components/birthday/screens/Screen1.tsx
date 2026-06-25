import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";

export function Screen1({
  name,
  onNext,
}: {
  name: string;
  onNext: () => void;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="font-display text-foreground text-5xl font-medium tracking-tight md:text-7xl"
        >
          Mohtarma <span className="text-gold italic">{name}</span>...
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-display text-muted-foreground text-xl italic md:text-3xl"
        >
          Aaj ka din waqai khaas hai.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="text-muted-foreground text-sm tracking-wide md:text-base"
        >
          Magar iski ek wajah hai…
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.2 }}
        className="mt-14"
      >
        <StoryButton onClick={onNext}>Aagey Barhein</StoryButton>
      </motion.div>
    </div>
  );
}
