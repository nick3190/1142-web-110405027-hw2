export function GlitchOverlay() {
  return (
    <div
      className="glitch-overlay pointer-events-none fixed inset-0 z-[100]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-red-600/70 mix-blend-screen" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="glitch-active text-4xl font-bold tracking-widest text-white uppercase">
          ERROR
        </span>
      </div>
    </div>
  );
}
