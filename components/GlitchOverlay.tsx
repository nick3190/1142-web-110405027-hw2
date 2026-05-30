import type { GlitchVariant } from "@/data/glitch";

interface GlitchOverlayProps {
  variant: GlitchVariant;
}

export function GlitchOverlay({ variant }: GlitchOverlayProps) {
  if (variant === "none") return null;

  const showError = variant === "red-error" || variant === "crazy";
  const isRed = variant === "red" || variant === "red-error" || variant === "crazy";
  const isCrazy = variant === "crazy";
  const isSlight = variant === "slight";
  const isRedError = variant === "red-error";

  const overlayClass = isCrazy
    ? "glitch-overlay-crazy"
    : isRedError
      ? "glitch-overlay"
      : isRed
        ? "glitch-overlay-red"
        : isSlight
          ? "glitch-overlay-slight"
          : "glitch-overlay";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] ${overlayClass}`}
      aria-hidden
    >
      {isRed && (
        <div className="absolute inset-0 bg-red-600/70 mix-blend-screen" />
      )}
      {isSlight && (
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
      )}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />
      {showError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-bold tracking-widest text-white uppercase ${
              isCrazy ? "glitch-active text-5xl" : "glitch-active text-3xl"
            }`}
          >
            ERROR
          </span>
        </div>
      )}
      {isCrazy && (
        <>
          <div className="absolute inset-0 flex items-center justify-center translate-x-2">
            <span className="glitch-active text-5xl font-bold tracking-widest text-red-500 uppercase opacity-70">
              ERROR
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center -translate-x-2">
            <span className="glitch-active text-5xl font-bold tracking-widest text-cyan-300 uppercase opacity-70">
              ERROR
            </span>
          </div>
        </>
      )}
    </div>
  );
}
