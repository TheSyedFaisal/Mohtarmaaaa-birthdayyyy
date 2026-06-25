import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";
import { Confetti } from "../Confetti";

export function Screen5({
  name,
  onNext,
}: {
  name: string;
  onNext: () => void;
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <Confetti />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 text-5xl md:text-6xl"
        >
          🎂
        </motion.div>
        <h1 className="font-display text-foreground text-4xl leading-tight font-semibold md:text-6xl">
          Happy Birthday
          <br />
          Mohtarma <span className="text-gold italic">{name}</span> 🎉
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mx-auto my-7 h-px w-32 bg-[var(--gold)]"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="font-display text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed italic md:text-2xl"
        >
          Dua hai ke aap hamesha khush rahen,
          <br />
          Aur zindagi aap ke liye hamesha asaan rahe.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="relative z-10 mt-12"
      >
        <StoryButton onClick={onNext}>Final Message</StoryButton>
      </motion.div>
    </div>
  );
}
