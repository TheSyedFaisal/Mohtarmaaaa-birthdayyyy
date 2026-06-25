import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";

export function Screen4({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="glass shadow-elegant max-w-2xl rounded-3xl px-8 py-12 md:px-14"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-foreground text-2xl leading-relaxed italic md:text-4xl"
        >
          Kuch log zindagi mein sirf milte nahi…
          <br />
          Balkay apni jagah bana lete hain.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mx-auto my-8 h-px w-24 bg-[var(--gold)]"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="text-muted-foreground text-base tracking-wide md:text-lg"
        >
          Aur aap unhi mein se ek hain.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.4 }}
        className="mt-12"
      >
        <StoryButton onClick={onNext}>Next</StoryButton>
      </motion.div>
    </div>
  );
}
