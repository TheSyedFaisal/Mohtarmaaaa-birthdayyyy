"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";
interface Props {
  onNext: () => void;
}

export function Lawyer26Screen({ onNext }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass shadow-elegant max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl p-6 sm:p-10 md:overflow-hidden"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display mb-6 w-full text-center text-2xl font-bold text-purple-700 sm:text-3xl"
        >
          ⚖️ 26 Saal — Advocate Mohtarma! ⚖️
        </motion.h2>

        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-12">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center md:col-span-5"
          >
            <div className="group relative max-w-[280px] overflow-hidden rounded-2xl border-4 border-white/60 bg-purple-100/30 shadow-md md:max-w-full">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src="/assets/lawyer.jpeg"
                  alt="Advocate Mohtarma"
                  width={420}
                  height={320}
                  className="rounded-xl object-cover"
                />
              </div>
              {/* Shiny overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent" />
              {/* Badge */}
              <div className="absolute top-3 right-3 rounded-full bg-purple-600/90 px-2 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow-md">
                Advocate ⚖️
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex h-full flex-col justify-between space-y-4 text-left md:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3 text-xs leading-relaxed font-medium text-purple-950/90 sm:text-sm md:text-[14px]"
            >
              {/* Celebration banner */}
              <div className="rounded-xl border border-purple-200/60 bg-gradient-to-r from-purple-100/70 to-pink-100/70 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-base font-bold text-purple-900">
                    Age: 26 🎂
                  </span>
                  <span className="rounded-full bg-purple-200 px-3 py-0.5 text-xs font-bold tracking-wider text-purple-800 uppercase">
                    Status: Licensed to Win ⚖️
                  </span>
                </div>
                <p className="mt-2 text-[13px] font-semibold text-purple-800">
                  Akhirkar! Mohtarma officially Advocate ban gayi hain. 🎉 Jo
                  arguments ghar mein practice hoti thin, ab court mein chalein
                  gi. 😂
                </p>
              </div>

              {/* Stats */}
              <div className="rounded-xl border border-white/20 bg-white/30 p-3">
                <span className="mb-2 block text-[11px] font-bold tracking-wider text-purple-700 uppercase">
                  📋 Lawyer Stats:
                </span>
                <ul className="space-y-1 text-purple-900">
                  <li>
                    ⚖️ Arguments: Expert level — trained since childhood 😌
                  </li>
                  <li>🏆 Last word: Always hers. In court AND at home.</li>
                  <li>
                    📚 Law books padhi hain, aur ghussa bhi upgraded hua hai 😂
                  </li>
                  <li>
                    🤫 Cross-examination skills: Jab bhi ghar aati hain, sab
                    prepare rehte hain 😭
                  </li>
                </ul>
              </div>

              {/* Fun quote box */}
              <p className="rounded-lg border-l-4 border-purple-400 bg-purple-50/60 p-2.5 text-[12px] leading-snug sm:text-[13px]">
                Bachpan mein kehti thin:{" "}
                <span className="font-semibold text-purple-800">
                  Mujhe law mein jaana hai.
                </span>
                <br />
                <span className="mt-1 block font-semibold text-purple-900">
                  Aur actually chali gayi. This is not a drill. Mohtarma ne goal
                  set kiya aur kiya. 💪🔥
                </span>
              </p>

              <p className="pt-1 text-center font-bold text-pink-600 sm:text-left">
                😈 Revenge mode activated: Jinhone bhi pareshan kiya hai, unki
                list ban chuki hai — ab sirf execution baaki hai 😈 list ke
                andar me to nahi nawww🙃
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-end pt-2"
            >
              <StoryButton onClick={onNext}>What&apos;s Next? 🔮</StoryButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
