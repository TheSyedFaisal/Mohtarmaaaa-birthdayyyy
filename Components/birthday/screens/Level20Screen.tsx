"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";
interface Props {
  onNext: () => void;
}

export function Level20Screen({ onNext }: Props) {
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
          <div className="group relative max-w-[240px] overflow-hidden rounded-2xl border-4 border-white/60 bg-purple-100/30 shadow-md md:max-w-full">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src="/assets/20.jpeg"
                alt="Level 20 Unlocked"
                width={420}
                height={280}
                className="rounded-xl object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent" />
          </div>
        </motion.div>

        {/* Right Column: Story Content */}
        <div className="flex h-full flex-col justify-between space-y-4 text-left md:col-span-7">
          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-2xl font-bold text-purple-700 sm:text-3xl"
            >
              🎉 20 Saal Ki Cute Face Wali Auniee
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3 text-xs leading-relaxed font-medium text-purple-950/90 sm:text-sm md:text-[14px]"
            >
              <p className="text-lg font-semibold text-pink-600">
                Mubarak ho! Aap officially 20 saal ki ho chuki hain.
              </p>

              <div className="space-y-2 rounded-xl border border-purple-200/50 bg-purple-100/40 p-3.5">
                <span className="block pt-1 font-bold tracking-wider text-purple-700 uppercase">
                  Current Status
                </span>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-purple-900">
                  <li>✔ Bachi bhi hein</li>
                  <li>✔ Bari bhi hein</li>
                  <li>✔ Confused bhi hein</li>
                  <li>✔ Aur phir bhi sab ko advice deti hein 😂</li>
                  <li>✔ Hath itney nazuk se heinn</li>
                  <li>
                    ✔ phr bhi sabko autograph dene ki dhamki deti rehtii😂
                  </li>
                  <li>✔ Ankheyn dekhoo inkiiii gayen jesii bari barii👌☺️</li>
                  <li>
                    ✔ bass jab yoon 🤨🤨 krti henaww to aur pyaari lagti heinn
                    yakeeenannn☺️👌
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50/50 p-2.5">
                <p className="font-bold text-amber-800">
                  ab sunengi ap logo ke dangerous sawal jo sunti arhi bachpan se
                </p>
                <p className="text-lg text-purple-950 italic">
                  Beta future ka kya plan hai?
                </p>
                <p className="mt-1 font-bold text-purple-900">
                  Aur andar se jawab ayegaa:{" "}
                  <span className="text-lg">bhai kaaam kr naww apnaaa🤣</span>
                </p>
              </div>

              <p className="pt-1 text-[12px] font-bold text-pink-600 italic sm:text-[13px]">
                Dua hai ke aapki khushiyan aapki gallery ki photos se bhi zyada
                hon. ❤️
                <br />
                <span className="font-normal text-purple-950">
                  Aur memories itni hon ke phone storage har saal warning dena
                  shuru kar de. 😂
                </span>
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-end pt-2"
          >
            <StoryButton onClick={onNext}>Fast Forward ⏩</StoryButton>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
