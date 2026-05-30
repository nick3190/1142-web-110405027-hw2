"use client";

interface BootGateProps {
  onStart: () => void;
}

export function BootGate({ onStart }: BootGateProps) {
  return (
    <button
      type="button"
      onClick={onStart}
      className="boot-gate fixed inset-0 z-[300] flex cursor-pointer flex-col items-center justify-center gap-4 bg-black px-6 text-center"
    >
      <p className="boot-gate-label text-lg tracking-[0.35em] text-foreground uppercase sm:text-xl">
        點擊螢幕開始
      </p>
      <p className="boot-gate-sub text-sm text-foreground/50">CLICK TO START</p>
    </button>
  );
}
