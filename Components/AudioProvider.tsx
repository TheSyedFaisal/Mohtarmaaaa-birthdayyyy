"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type TrackId = "song1" | "song2";

interface AudioManagerContextValue {
  activeTrack: TrackId;
  isMuted: boolean;
  isPlaying: boolean;
  setActiveTrack: (track: TrackId) => void;
  toggleMute: () => void;
}

const AudioManagerContext = createContext<AudioManagerContextValue | null>(
  null,
);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [activeTrack, setActiveTrackState] = useState<TrackId>("song1");
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const audioRef = useRef<{
    song1: HTMLAudioElement;
    song2: HTMLAudioElement;
  } | null>(null);
  const activeTrackRef = useRef<TrackId>(activeTrack);
  const isMutedRef = useRef(isMuted);
  const playRequestId = useRef(0);

  const song1Url = "/assets/song1.mp3";
  const song2Url = "/assets/song2.mp3";

  activeTrackRef.current = activeTrack;
  isMutedRef.current = isMuted;

  const getAudio = useCallback(
    (track: TrackId) => audioRef.current?.[track] ?? null,
    [],
  );

  const getOtherTrack = useCallback(
    (track: TrackId) => (track === "song1" ? "song2" : "song1"),
    [],
  );

  const tryPlayTrack = useCallback(
    async (track: TrackId) => {
      const audio = getAudio(track);
      if (!audio) return false;

      if (isMutedRef.current) {
        audio.muted = true;
        audio.pause();
        setIsPlaying(false);
        return false;
      }

      audio.muted = false;
      const requestId = ++playRequestId.current;

      try {
        await audio.play();
        if (requestId !== playRequestId.current) return false;
        setIsPlaying(true);
        setAutoplayBlocked(false);
        return true;
      } catch {
        if (requestId !== playRequestId.current) return false;
        setIsPlaying(false);
        setAutoplayBlocked(true);
        return false;
      }
    },
    [getAudio],
  );

  useEffect(() => {
    const audio1 = new Audio(song1Url);
    const audio2 = new Audio(song2Url);

    [audio1, audio2].forEach((audio) => {
      audio.loop = true;
      audio.volume = 0.35;
      audio.preload = "auto";
    });

    audioRef.current = { song1: audio1, song2: audio2 };

    void tryPlayTrack("song1");

    return () => {
      audio1.pause();
      audio2.pause();
      audio1.src = "";
      audio2.src = "";
      audioRef.current = null;
    };
  }, [song1Url, song2Url, tryPlayTrack]);

  useEffect(() => {
    const currentAudio = getAudio(activeTrack);
    const otherAudio = getAudio(getOtherTrack(activeTrack));

    if (otherAudio) {
      otherAudio.pause();
    }

    if (!currentAudio) return;

    currentAudio.muted = isMuted;

    if (activeTrack === "song2") {
      currentAudio.currentTime = 0;
    }

    if (isMuted) {
      currentAudio.pause();
      setIsPlaying(false);
      return;
    }

    void tryPlayTrack(activeTrack);
  }, [activeTrack, getAudio, getOtherTrack, isMuted, tryPlayTrack]);

  useEffect(() => {
    if (!autoplayBlocked || isMutedRef.current) return;

    const attemptUnlock = () => {
      void tryPlayTrack(activeTrackRef.current);
    };

    window.addEventListener("pointerdown", attemptUnlock, { passive: true });
    window.addEventListener("keydown", attemptUnlock);

    return () => {
      window.removeEventListener("pointerdown", attemptUnlock);
      window.removeEventListener("keydown", attemptUnlock);
    };
  }, [autoplayBlocked, tryPlayTrack]);

  const setActiveTrack = useCallback((track: TrackId) => {
    setActiveTrackState(track);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((current) => !current);
  }, []);

  const value = useMemo(
    () => ({
      activeTrack,
      isMuted,
      isPlaying,
      setActiveTrack,
      toggleMute,
    }),
    [activeTrack, isMuted, isPlaying, setActiveTrack, toggleMute],
  );

  return (
    <AudioManagerContext.Provider value={value}>
      {children}
    </AudioManagerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioManagerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioProvider");
  }
  return context;
}
