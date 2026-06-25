import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";

export function Screen6({
  name,
  onRestart,
}: {
  name: string;
  onRestart: () => void;
}) {
  const paragraph = [
    "Aap jese log roz roz nahi milte.",
    "Aur jo mil jayein, unki qadar karna farz ban jata hai.",
    "Aap ke liye jo izzat dil mein hai,",
    "wo lafzon mein poori tarah bayan nahi ho sakti.",
    "Bas itna kehna kaafi hai —",
    "Aap waqai bohat khaas hain.",
  ];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="glass shadow-elegant max-w-2xl rounded-3xl px-8 py-10 md:px-14 md:py-12"
      >
        <div className="font-display text-foreground space-y-2 text-lg leading-relaxed md:text-2xl">
          {paragraph.map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.35 }}
            >
              {l}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 2.7 }}
          className="mx-auto my-7 h-px w-24 bg-[var(--gold)]"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.9 }}
          className="font-display text-gold text-xl italic md:text-3xl"
        >
          Khush rahen hamesha, Mohtarma {name} ✨
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.6 }}
        className="mt-10"
      >
        <StoryButton variant="ghost" onClick={onRestart}>
          Phir se dekhein
        </StoryButton>
      </motion.div>
    </div>
  );
}
