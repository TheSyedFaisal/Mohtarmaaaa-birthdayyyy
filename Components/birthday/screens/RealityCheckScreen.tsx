"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { StoryButton } from "../StoryButton";

interface Props {
  onNext: () => void;
}

export function RealityCheckScreen({ onNext }: Props) {
  const [showCredits, setShowCredits] = useState(false);

  // Trigger the credits and extra effects after 6 seconds or on a button click
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCredits(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const heartsList = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      size: 16 + Math.random() * 16,
    }));
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Floating Hearts Animation */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {heartsList.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute text-pink-500/60"
            style={{
              left: `${h.left}%`,
              width: h.size,
              height: h.size,
            }}
          >
            <Heart fill="currentColor" className="h-full w-full" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="glass shadow-elegant relative z-20 w-full max-w-2xl space-y-6 rounded-3xl p-8 text-center sm:p-12"
      >
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display flex items-center justify-center gap-2 text-3xl font-bold text-pink-600 sm:text-4xl"
          >
            <Heart
              fill="currentColor"
              className="h-8 w-8 animate-pulse text-pink-500"
            />
            Reality
            <Heart
              fill="currentColor"
              className="h-8 w-8 animate-pulse text-pink-500"
            />
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="space-y-4 text-sm leading-relaxed font-medium text-purple-950 sm:text-base md:text-lg"
          >
            <p className="text-lg font-semibold text-pink-700 italic">
              Mazak apni jagah... Lekin ek baat sach hai.
            </p>
            <p>Har age mein aap khoobsurat lagengiiii.</p>
            <p>
              10 saal ki age mein yakeeenan boht ziada cute thiii☺️. 20 saal ki
              age mein too cuteness overloaded hogyi he jese cheezious ke pizza
              me cheesee☺️😂
            </p>
            <p>
              Aur future mein bhi isi tarah sab ki favourite rahengi ✨. bass
              ittuu si moti hojayengii lekin 2096 me dubara young hojayengii
              slim 👌☺️
            </p>
            <p>
              ek baat to he jo apko maan ni paregii ke ap apni age ke kisi bhi
              hissey me chalii jayen apki 🤨🤨 ye waali adat khtm nie honey
              waali koi bichara galti se tareeef krdey ap shuru hojayengiii
              🤨🤨🤨🤨🤨
            </p>

            {/* <p className="text-pink-600 font-bold bg-white/45 p-4 rounded-2xl border border-white/40 shadow-inner mt-4">
              Allah aapko hamesha khush rakhe,
              <br />
              har dua qubool ho,
              <br />
              aur zindagi mein itni khushiyan de ke unhein count karna mushkil ho jaye.
            </p> */}
          </motion.div>
        </div>

        {/* Ending reveals */}
        <AnimatePresence>
          {showCredits && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6 border-t border-purple-200/40 pt-4"
            >
              <motion.h3
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-display text-xl font-bold text-purple-800 sm:text-2xl"
              >
                Thank you for being awesome ❤️
              </motion.h3>

              <div className="space-y-3">
                <h4 className="text-2xl font-extrabold tracking-widest text-pink-600 drop-shadow-md sm:text-3xl">
                  🎉 One More Thing 🎉
                </h4>
              </div>

              <div className="pt-2">
                <StoryButton onClick={onNext} variant="ghost">
                  Open wishes
                </StoryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showCredits && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="pt-2 text-xs font-medium text-purple-950/50"
          >
            Wait for the final message...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
