interface Props {
  total: number;
  current: number;
  onJump: (i: number) => void;
}

export function ProgressDots({ total, current, onJump }: Props) {
  return (
    <div className="absolute top-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          aria-label={`Screen ${i + 1}`}
          className="h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{
            width: i === current ? 32 : 10,
            background:
              i === current
                ? "var(--gold-deep)"
                : i < current
                  ? "oklch(0.745 0.094 78 / 0.55)"
                  : "oklch(0.28 0.02 60 / 0.18)",
          }}
        />
      ))}
    </div>
  );
}
