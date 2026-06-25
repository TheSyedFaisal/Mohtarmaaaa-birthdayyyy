import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";
import { Typewriter } from "../Typewriter";

export function Screen2({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <Typewriter
        className="font-display text-foreground max-w-3xl text-2xl leading-relaxed md:text-4xl"
        lines={[
          "Aap sirf ek dost nahi…",
          "Balkay ek bohat hi mohtaram shaksiyat hain.",
          "Jin ke liye alfaaz aksar kam par jatay hain.",
        ]}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.2 }}
        className="mt-14"
      >
        <StoryButton onClick={onNext}>Continue</StoryButton>
      </motion.div>
    </div>
  );
}
