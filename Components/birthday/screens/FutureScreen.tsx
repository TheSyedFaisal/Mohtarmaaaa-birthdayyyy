"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";
interface Props {
  onNext: () => void;
}

export function FutureScreen({ onNext }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass shadow-elegant grid max-h-[92vh] w-full max-w-7xl grid-cols-1 items-center gap-6 overflow-y-auto rounded-3xl p-6 sm:gap-8 sm:p-10 md:grid-cols-12 md:overflow-hidden"
      >
        {/* Left Column: Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center md:col-span-5"
        >
          <div className="group relative max-w-[240px] overflow-hidden rounded-2xl border-4 border-white/60 bg-amber-100/30 shadow-md md:max-w-full">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src="/assets/40.jpeg"
                alt="Future Version Detected"
                width={420}
                height={300}
                className="rounded-xl object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent" />
          </div>
        </motion.div>

        {/* Right Column: Story Content */}
        <div className="flex h-full flex-col justify-between space-y-4 text-left md:col-span-7">
          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-2xl font-bold text-amber-700 sm:text-3xl"
            >
              🧑‍🦳 Chuntooo Muntoooo Ki Amma 🧑‍🦳
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3 text-xs leading-relaxed font-medium text-purple-950/90 sm:text-sm md:text-[14px]"
            >
              <div className="rounded-xl border border-amber-200/50 bg-amber-100/40 p-3">
                <div className="flex items-center justify-between rounded-xl border border-pink-200/50 bg-pink-100/40 p-2.5">
                  <span className="font-bold text-purple-900">Age: 40</span>
                  <span className="rounded-full bg-pink-200 px-3 py-0.5 text-xs font-bold tracking-wider text-pink-700 uppercase">
                    Status: Still gorgeous. 👌😊
                  </span>
                </div>

                <span className="mt-2 block text-[11px] font-bold tracking-wider text-amber-700 uppercase">
                  Personality Report:
                </span>
                <ul className="space-y-0.5 text-purple-900">
                  <li>✔ Ab bhi sab ki favourite</li>
                  <li>✔ Ab bhi har gathering ki jaan</li>
                  <li>
                    ✔ Ab bhi kabhi kabhi ghussa jaldi aa jaaaataa heee 😌😂
                  </li>
                  <li>
                    ✔ ab bhi ankheinn ushii tarhaa rakhtii heinn🤨 bas farq
                    itna he ke pehley dusro ko dikhati thi ab unhey😊🤭 aur
                    bacchoo ko dikhati hein😅{" "}
                  </li>
                  <li>
                    ✔ ab thorii moti hogayiii lagtaa hee unhoney apkaa noodless
                    wagera band karwaakee healthy khana khilana shuru krdiaa
                    he🤭😂🥳 yayyyyyyyyyy🥳
                  </li>
                </ul>
              </div>

              <div className="space-y-2 rounded-xl border border-white/20 bg-white/40 p-3">
                <span className="block text-[11px] font-bold tracking-wider text-purple-700 uppercase">
                  🔮 Predictions:
                </span>
                <p className="leading-snug text-purple-900">
                  Jab koi kahega:{" "}
                  <span className="font-semibold text-pink-600">Relax...</span>{" "}
                  To ghussa double speed se ayega. 🤣
                </p>
                <p className="leading-snug text-purple-900">
                  Aap har discussion ke end par kahengi:{" "}
                  <span className="font-semibold text-purple-950">
                    Mujhe pata tha aisa hi hoga.
                  </span>{" "}
                  Chahe pehle kuch pata ho ya na ho. 😭😂
                </p>
              </div>

              <p className="rounded-lg border-l-4 border-amber-400 bg-amber-50/50 p-2.5 text-[12px] leading-snug sm:text-[13px]">
                Aapki photo gallery mein:
                <br />
                📸 5000 random screenshots | 📸 2000 aesthetic pictures | 📸 Aur
                asal zaroori photos sirf 3 hongiiii🤐🙃
                <br />
                <span className="mt-1 block text-[11px] font-bold text-purple-800">
                  Future scientists bhi iska reason nahi dhoond paayenge. 😂
                </span>
              </p>

              <p className="pt-1 text-center font-bold text-pink-600 sm:text-left">
                Aur phir bhi... Har room mein enter hote hi attention
                automatically aap ki taraf shift ho jayegi. ✨😊
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-end pt-2"
          >
            <StoryButton onClick={onNext}>Go Legendary 👑</StoryButton>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
