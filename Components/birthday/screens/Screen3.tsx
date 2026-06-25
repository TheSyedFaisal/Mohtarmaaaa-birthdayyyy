import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";

export function Screen3({
  name,
  onNext,
}: {
  name: string;
  onNext: () => void;
}) {
  const lines = [
    "Naam aapka liya to adab se liya,",
    "Har lafz ko humne tarteeb se liya.",
    "Aap ki shaksiyat ki baat hi kuch aur hai,",
    "Is liye zikr bhi humne naseeb se liya.",
  ];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="font-display text-gold mb-8 text-sm tracking-[0.4em] uppercase md:text-base"
      >
        Mohtarma {name} ke liye…
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="glass shadow-elegant animate-soft-pulse max-w-2xl rounded-3xl px-8 py-10 md:px-14 md:py-14"
      >
        <div className="font-display text-foreground space-y-3 text-xl leading-relaxed italic md:text-3xl">
          {lines.map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                delay: 0.8 + i * 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {l}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.6 }}
        className="mt-12"
      >
        <StoryButton onClick={onNext}>Next</StoryButton>
      </motion.div>
    </div>
  );
}
