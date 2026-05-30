import Image from "next/image";
import type { ReactNode } from "react";

interface QuizImageFrameProps {
  src: string;
  aspect: "square" | "wide" | "wide-alt";
  size?: "full-width" | "fit";
  crop?: boolean;
  cropZoom?: number;
  priority?: boolean;
  overlay?: ReactNode;
}

const ASPECT_CLASS = {
  square: "aspect-square",
  wide: "aspect-[2816/1536]",
  "wide-alt": "aspect-[2400/1792]",
} as const;

const SIZE_CLASS = {
  "full-width": "w-full",
  fit: "h-full max-h-full w-auto max-w-full",
} as const;

export function QuizImageFrame({
  src,
  aspect,
  size = "full-width",
  crop = false,
  cropZoom = 1,
  priority,
  overlay,
}: QuizImageFrameProps) {
  return (
    <div
      className={`quiz-image-frame pixel-border relative shrink-0 overflow-hidden bg-black ${ASPECT_CLASS[aspect]} ${SIZE_CLASS[size]}`}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 480px"
        className={`quiz-photo ${crop ? "object-cover object-center" : "object-contain"}`}
        style={
          crop && cropZoom > 1
            ? { transform: `scale(${cropZoom})` }
            : undefined
        }
      />
      {overlay}
    </div>
  );
}
