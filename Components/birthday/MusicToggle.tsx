"use client";

import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useAudioPlayer } from "../AudioProvider";

export function MusicToggle() {
  const { isMuted, toggleMute } = useAudioPlayer();

  return (
    <motion.button
      onClick={toggleMute}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isMuted ? "Unmute music" : "Mute music"}
      className="glass text-foreground shadow-elegant absolute top-5 right-5 z-30 rounded-full p-3"
    >
      {isMuted ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Music className="h-4 w-4 text-[var(--gold-deep)]" />
      )}
    </motion.button>
  );
}
