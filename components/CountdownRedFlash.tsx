"use client";

interface CountdownRedFlashProps {
  active: boolean;
  flash: boolean;
  urgent: boolean;
}

export function CountdownRedFlash({
  active,
  flash,
  urgent,
}: CountdownRedFlashProps) {
  if (!active) return null;

  return (
    <>
      {flash && (
        <div
          className="countdown-red-flash pointer-events-none fixed inset-0 z-[90]"
          aria-hidden
        />
      )}
      {urgent && (
        <div
          className="countdown-red-flash countdown-red-flash--urgent pointer-events-none fixed inset-0 z-[89]"
          aria-hidden
        />
      )}
    </>
  );
}
