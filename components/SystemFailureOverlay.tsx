"use client";

interface SystemFailureOverlayProps {
  active: boolean;
}

export function SystemFailureOverlay({ active }: SystemFailureOverlayProps) {
  if (!active) return null;

  return (
    <div className="system-failure-overlay pointer-events-none fixed inset-0 z-[200] flex items-center justify-center">
      <div className="system-failure-flash absolute inset-0" />
      <div className="system-failure-shake absolute inset-0 flex items-center justify-center">
        <div className="glitch-active px-4 text-center">
          <p className="text-2xl font-bold tracking-widest text-white sm:text-3xl">
            系統已損毀
          </p>
          <p className="mt-2 text-lg tracking-widest text-red-400 sm:text-xl">
            辨識失敗
          </p>
        </div>
      </div>
    </div>
  );
}
