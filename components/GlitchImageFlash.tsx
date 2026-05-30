"use client";

import Image from "next/image";

interface GlitchImageFlashProps {
  src: string;
  cropZoom?: number;
  useCover?: boolean;
}

export function GlitchImageFlash({
  src,
  cropZoom = 1,
  useCover = true,
}: GlitchImageFlashProps) {
  return (
    <div
      className="glitch-image-flash pointer-events-none absolute inset-0 z-[3] overflow-hidden"
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 480px"
        className={`quiz-photo ${useCover ? "object-cover object-center" : "object-contain"}`}
        style={cropZoom > 1 ? { transform: `scale(${cropZoom})` } : undefined}
      />
    </div>
  );
}
