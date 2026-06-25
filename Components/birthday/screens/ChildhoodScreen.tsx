"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StoryButton } from "../StoryButton";
interface Props {
  onNext: () => void;
}

export function ChildhoodScreen({ onNext }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass shadow-elegant max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl p-6 sm:p-10 md:overflow-hidden"
      >
        {/* Heading: full width, centered across the whole card */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display mx-auto mb-6 w-full text-center text-2xl font-bold text-pink-700 sm:text-3xl"
        >
          👶 Masooom Si Ghussey wali choti si Mohtarmaaa 👶
        </motion.h2>

        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-12">
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
                  src="/assets/10.jpeg"
                  alt="Childhood Days"
                  width={420}
                  height={300}
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent" />
            </div>
          </motion.div>

          {/* Right Column: Story Content */}
          <div className="flex h-full flex-col justify-between space-y-4 text-left md:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3 text-xs leading-relaxed font-medium text-purple-950/90 sm:text-sm md:text-[14px]"
            >
              <p>Yahan hum dekh sakte hain ek masoom si bachi...</p>
              <p className="font-semibold text-purple-900 italic">
                Jisko lagta tha ke 20 saal ki age mein log bohat mature ho jaate
                hain. 🤣
              </p>
              <p className="font-semibold text-purple-900 italic">
                lekin ab jab ye bachii khud 20 saal ki hogyi he to kehtii he me
                galat sochtii thii🤐😅
              </p>

              <div className="rounded-xl border border-white/20 bg-white/30 p-3">
                <div>
                  <span className="mb-1 block text-[11px] font-bold tracking-wider text-pink-600 uppercase">
                    bachpan me kesi thi mohtarmaa
                  </span>
                  <ul className="space-y-1 text-purple-900">
                    <li>
                      ✔ Ghussaa to tab bhi itna hi thaa jitna aaj hee😡😂
                    </li>
                    <li>✔ Cutee bhi utnii hi thi jitnii aaaj heinn 👌</li>
                    <li>
                      ✔ cartoon tab bhi utna hi dekhti thi jitnaa aaj dekhti
                      heinn 😂
                    </li>
                    <li>
                      ✔ bachpan me shayad thori si babloo bablooo si thi
                      mohtarmaaa😂
                    </li>
                  </ul>
                </div>
              </div>

              <p className="font-bold text-pink-600">
                From Faiazaaa:{" "}
                <span className="font-normal text-purple-950">
                  Aqal tab bhi itni hi thi jitni aaj hai. 😭😂
                </span>
              </p>
              <p className="font-bold text-pink-600">
                From Faysal:{" "}
                <span className="font-normal text-purple-950">
                  Iska matball he kee bachpan me bhi ziada samjhdaar thi aur
                  aaaj bhi ziada samjhdaar hein ☺️
                </span>
              </p>

              <p className="rounded-lg border-l-4 border-pink-400 bg-pink-100/50 p-2.5 text-[12px] sm:text-[13px]">
                bachpan me mohtarma sahiba ko lagta thaa ke 20 saal ke logon ke
                paas har sawal ka jawab hota hai...
                <br />
                <span className="mt-1 block font-semibold text-purple-900">
                  Ab 20 saal ki age mein pata chala ke sab log bas confidence ke
                  saath andaza laga rahe hote hain. 🤣
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-end pt-2"
            >
              <StoryButton onClick={onNext}>Level Up! 🎮</StoryButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
