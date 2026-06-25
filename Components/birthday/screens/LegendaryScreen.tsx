"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";

interface Props {
  onNext: () => void;
}

export function LegendaryScreen({ onNext }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass shadow-elegant grid max-h-[92vh] w-full max-w-6xl grid-cols-1 items-center gap-6 overflow-y-auto rounded-3xl p-6 sm:gap-8 sm:p-10 md:grid-cols-12 md:overflow-hidden"
      >
        {/* Left Column: Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center md:col-span-5"
        >
          <div className="group relative max-w-[240px] overflow-hidden rounded-2xl border-4 border-white/60 bg-pink-100/30 shadow-md md:max-w-full">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={"/assets/50.jpeg"}
                alt="Legendary Mode Unlocked"
                width={420}
                height={320}
                className="rounded-xl object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent" />
          </div>
        </motion.div>

        {/* Right Column: Story Content */}
        <div className="flex h-full flex-col justify-between space-y-4 text-left md:col-span-7">
          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-2xl font-bold text-pink-700 sm:text-3xl"
            >
              👵 Future Ki Dadi Amma 👵
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3 text-xs leading-relaxed font-medium text-purple-950/90 sm:text-sm md:text-[14px]"
            >
              <div className="flex items-center justify-between rounded-xl border border-pink-200/50 bg-pink-100/40 p-2.5">
                <span className="font-bold text-purple-900">Year: 2096</span>
                <span className="rounded-full bg-pink-200 px-3 py-0.5 text-xs font-bold tracking-wider text-pink-700 uppercase">
                  Status: Still iconic. 😎
                </span>
              </div>

              <div className="space-y-2 rounded-xl border border-white/20 bg-white/40 p-3">
                <p className="text-purple-950 italic">
                  <strong>Grandchildren:</strong> Dadi, aap jawani mein kaisi
                  thi?
                  <br />
                  <strong>Aap:</strong> Bilkul tumhari tarah...
                  <br />
                  <span className="mt-1 block text-xs font-bold text-purple-700">
                    Aur poori family hansna shuru kar degi. 😂
                  </span>
                </p>
                <p className="text-purple-950">
                  Aap har kahani shuru karengi:{" "}
                  <span className="font-semibold text-purple-900">
                    Hamare zamane mein...
                  </span>
                  <br />
                  <span className="mt-0.5 block text-xs font-bold text-purple-700">
                    Aur ab sab samjh jayengey ke 1 ghantaa kahi nie gaya daaadi
                    amma ki storyy meee 😊🤣
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border-l-4 border-red-400 bg-red-50/50 p-2.5">
                  <p className="mb-1 text-[11px] font-bold tracking-wider text-red-700 uppercase">
                    ⚠ Mood Update Available ⚠
                  </p>
                  <p className="text-[12px] leading-snug text-purple-950">
                    Aapka ghussa ab bhi famous hoga. Farq sirf itna hoga ke sab
                    ko pehle se warning mil jaya karegi.
                  </p>
                </div>
                <div className="rounded-lg border-l-4 border-pink-400 bg-pink-50/50 p-2.5">
                  <p className="mb-1 text-[11px] font-bold tracking-wider text-pink-700 uppercase">
                    ❤️ Lekin dil?
                  </p>
                  <p className="text-[12px] leading-snug text-purple-950">
                    Wohi naram. Wohi caring. Wohi sab ko apna mehsoos karwane
                    wala.
                  </p>
                </div>
              </div>

              <p className="rounded-lg bg-white p-2 text-center text-[12px] font-semibold text-purple-900 italic sm:text-[13px]">
                Aur jab bhi purani photos dekhi jayengi... Sab kahenge:
                &quot;Wah... style bhi tha, attitude bhi tha, aur ghussa bhi
                premium quality ka tha.&quot; 😂👑
              </p>

              <p className="rounded-lg bg-white p-2 text-center text-[12px] font-semibold text-purple-900 italic sm:text-[13px]">
                Khair abhiii bhi kisi daaadii amma se kam nhi aaap lekin ye
                waali daadi amma certified dadi amma heinnn aur bhi ziadaa
                pyaariii. ❤️👌 Aaj bhi har bacchey ki jaan hein ap aur 2096 me
                bhi har bacchey ki jaan hongi ap😊
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-end pt-2"
          >
            <StoryButton onClick={onNext}>Reality</StoryButton>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
