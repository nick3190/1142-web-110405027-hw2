"use client";

interface IntroGlitchOverlayProps {
  active: boolean;
}

export function IntroGlitchOverlay({ active }: IntroGlitchOverlayProps) {
  if (!active) return null;

  return (
    <div
      className="intro-glitch-overlay pointer-events-none fixed inset-0 z-[150]"
      aria-hidden
    >
      <div className="intro-glitch-layer intro-glitch-layer--scan absolute inset-0" />
      <div className="intro-glitch-layer intro-glitch-layer--noise absolute inset-0" />
      <div className="intro-glitch-layer intro-glitch-layer--red absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="intro-pure-glitch-text text-base tracking-[0.4em] text-white uppercase sm:text-lg">
          系統初始化中
        </p>
      </div>
    </div>
  );
}
